'use client';

import useConversation from '@/app/hooks/useConversation';
import { FullMessageType } from '@/app/types';
import { useEffect, useRef, useState } from 'react';
import MessageBox from './MessageBox';
import axios from 'axios';
import { pusherClient } from '@/app/libs/pusher';
import { find } from 'lodash';
import { FaReplyAll } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';

interface BodyProps {
  initialMessages: FullMessageType[];
}

const Body = ({ initialMessages }: BodyProps) => {
  const [replyToMessage, setReplyToMessage] = useState<FullMessageType | null>(
    null
  );
  const [messages, setMessages] = useState(initialMessages);
  const bottomRef = useRef<HTMLDivElement>(null);

  const { conversationId } = useConversation();

  useEffect(() => {
    axios.post(`/api/conversations/${conversationId}/seen`);
  }, [conversationId]);

  useEffect(() => {
    pusherClient.subscribe(conversationId);
    bottomRef?.current?.scrollIntoView();

    const messageHandler = (message: FullMessageType) => {
      axios.post(`/api/conversations/${conversationId}/seen`);

      setMessages((current) => {
        if (find(current, { id: message.id })) {
          return current;
        }

        return [...current, message];
      });

      bottomRef?.current?.scrollIntoView();
    };

    const updateMessageHandler = (newMessage: FullMessageType) => {
      setMessages((current) =>
        current.map((currentMessage) => {
          if (currentMessage.id === newMessage.id) {
            return newMessage;
          }

          return currentMessage;
        })
      );
    };

    pusherClient.bind('messages:new', messageHandler);
    pusherClient.bind('message:update', updateMessageHandler);

    return () => {
      pusherClient.unsubscribe(conversationId);
      pusherClient.unbind('messages:new', messageHandler);
      pusherClient.unbind('message:update', updateMessageHandler);
    };
  }, [conversationId]);

  useEffect(() => {
    setReplyToMessage(null);
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto bg-[var(--bg2)] text-[var(--white)] z-10 relative">
      {messages.map((message, i) => (
        <MessageBox
          isLast={i === messages.length - 1}
          data={message}
          key={message.id}
          handlerReply={(data: FullMessageType) => setReplyToMessage(data)}
        />
      ))}
      <div ref={bottomRef} className="pt-24" />

      {replyToMessage && (
        <div className="fixed w-full bottom-24 ">
          <div className="flex gap-x-10 items-center bg-[var(--dark)] border-b border-[var(--dark-sea)]  p-4 relative">
            <FaReplyAll className="text-[var(--grey)]" size={25} />
            <div>
              <h3 className="text-[var(--grey)]">
                Reply {replyToMessage.sender.name}
              </h3>
              <p> {replyToMessage.body}</p>
            </div>

            <IoClose
              className="cursor-pointer fixed right-[30px] bottom-[120px]"
              onClick={() => {
                setReplyToMessage(null);
                localStorage.removeItem('replyData');
              }}
              size={28}
              style={{ zIndex: 9999 }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Body;
