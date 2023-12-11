'use client';

import Avatar from '@/app/components/Avatar';
import { FullMessageType } from '@/app/types';
import clsx from 'clsx';
import { format } from 'date-fns';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useState } from 'react';
import ImageModal from './ImageModal';
import MessageModal from './MessageModal';

interface MessageBoxProps {
  isLast?: boolean;
  data: FullMessageType;
}

const MessageBox = ({ isLast, data }: MessageBoxProps) => {
  const session = useSession();
  const [editedMessage, setEditedMessage] = useState<FullMessageType | null>(
    null
  );
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
    'text-sm w-fit overflow-hidden',
    isOwn
      ? 'bg-[var(--dark)] cursor-pointer hover:bg-[var(--black)]'
      : 'bg-[var(--dark-sea)]',
    data.image ? 'rounded-md p-0' : 'rounded-full py-2 px-3'
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
        <div className={`${container} relative`}>
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
                  src={data.image}
                  alt="image"
                  height="288"
                  width="288"
                  className="object-cover cursor-pointer hover:scale-110 transition translate"
                />
              ) : (
                <div onClick={() => handlerMessage(data)}>
                  <div onClick={() => handlerMessage(data)}>
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
              {format(new Date(data.createdAt), 'm:k')}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MessageBox;
