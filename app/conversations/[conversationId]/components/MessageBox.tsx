'use client';

import Avatar from '@/app/components/Avatar';
import { FullMessageType } from '@/app/types';
import clsx from 'clsx';
import { format } from 'date-fns';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import ImageModal from './ImageModal';
import MessageModal from './MessageModal';

interface MessageBoxProps {
  isLast?: boolean;
  data: FullMessageType;
  handlerReply: (data: FullMessageType) => void;
  setTargetMessageRef: React.Dispatch<
    React.SetStateAction<HTMLDivElement | null>
  >;
}

const MessageBox = ({
  isLast,
  data,
  handlerReply,
  setTargetMessageRef,
}: MessageBoxProps) => {
  const session = useSession();
  const [touchStart, setTouchStart] = useState(0);
  const [editedMessage, setEditedMessage] = useState<FullMessageType | null>(
    null
  );

  const [replyData, setReplyData] = useState<{
    id: string;
    body: string;
    user: string;
  } | null>(null);

  const [isDelete, setIsDelete] = useState(false);
  const [imageModalOpen, setImageModalOpen] = useState(false);
  const [messageModal, setMessageModal] = useState({
    isOpen: false,
    message: '',
  });

  const isOwn = session?.data?.user?.email === data?.sender?.email;
  const seenList = (data.seen || [])
    .filter((user) => user.email !== data?.sender?.email)
    .map((user) => user.name)
    .join(', ');

  const container = clsx('flex gap-3 p-4', isOwn && 'justify-end');
  const avatar = clsx(isOwn && 'order-2');
  const body = clsx('flex flex-col gap-2', isOwn && 'items-end');
  const message = clsx(
    'text-sm w-fit overflow-hidden ',
    isOwn
      ? 'bg-[var(--dark)] cursor-pointer hover:bg-[var(--black)]'
      : 'bg-[var(--dark-sea)] cursor-pointer hover:bg-[var(--dark-sea2)]',
    data.image ? 'rounded-md p-0' : 'rounded-2xl py-2 px-3'
  );

  const handlerMessage = (data: FullMessageType) => {
    if (data.sender.email === session.data?.user?.email) {
      setMessageModal((prev) => ({
        ...prev,
        isOpen: true,
      }));
    }

    return;
  };

  const handleEdit = (editedData: FullMessageType) => {
    setEditedMessage(editedData);
  };

  useEffect(() => {
    if (replyData) {
      localStorage.setItem('replyData', JSON.stringify(replyData));
    }
  }, [replyData]);

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();

    if (data.sender.name) {
      const replyBody = data.image ? 'Image' : data.body || '';

      handlerReply({ ...data, body: replyBody });
      setReplyData({ id: data.id, body: replyBody, user: data.sender.name });
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.timeStamp);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const touchEnd = e.timeStamp;

    if (touchEnd - touchStart >= 500) {
      if (data.body && data.sender.name) {
        handlerReply(data);
        setReplyData({ id: data.id, body: data.body, user: data.sender.name });
      }
    }
  };

  return (
    <>
      <MessageModal
        isOpen={messageModal.isOpen}
        onClose={() => setMessageModal((prev) => ({ ...prev, isOpen: false }))}
        data={data}
        handleEdit={handleEdit}
        onDelete={() => setIsDelete(true)}
      />

      {!isDelete && (
        <div
          className={`${container} relative`}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          ref={(el) => setTargetMessageRef(el)}
        >
          <div className={avatar}>
            <Avatar user={data.sender} />
          </div>

          <div className={body}>
            <div className="flex items-center gap-1">
              <div className="text-sm">{data.sender.name}</div>
            </div>

            <div className={message}>
              <ImageModal
                src={data.image}
                isOpen={imageModalOpen}
                onClose={() => setImageModalOpen(false)}
              />

              {data.image ? (
                <Image
                  onClick={() => setImageModalOpen(true)}
                  onContextMenu={handleContextMenu}
                  src={data.image}
                  alt="image"
                  height="288"
                  width="288"
                  className="object-cover cursor-pointer hover:scale-110 transition translate"
                />
              ) : (
                <div
                  onClick={() => handlerMessage(data)}
                  onContextMenu={handleContextMenu}
                >
                  {data.replyData && (
                    <div
                      className={`border-l-2 ${
                        isOwn && 'border-[var(--violet)]'
                      }  m-1 p-1`}
                    >
                      <h3
                        className={`${
                          isOwn ? 'text-[var(--grey)]' : 'text-[--light]'
                        }`}
                      >
                        {data.replyData.user}
                      </h3>
                      <p>{data.replyData.body}</p>
                    </div>
                  )}

                  <div className={`${data.replyData && 'pl-2'}`}>
                    {typeof editedMessage === 'object' &&
                    editedMessage !== null &&
                    'body' in editedMessage &&
                    editedMessage.id === data.id
                      ? editedMessage.body
                      : data.body}
                  </div>
                </div>
              )}
            </div>
            {isLast && isOwn && seenList.length > 0 && (
              <div className="text-xs font-light text-gray-500">{`Seen by ${seenList}`}</div>
            )}

            <div className="text-xs text-[var(--sea)] absolute  bottom-0">
              {format(new Date(data.createdAt), 'k:m')}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MessageBox;
