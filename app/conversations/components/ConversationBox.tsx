'use client';

import { FullConversationType } from '@/app/types';
import { useCallback, useMemo } from 'react';
import { Conversation, Message, User } from '@prisma/client';
import { useSession } from 'next-auth/react';
import { format } from 'date-fns';
import clsx from 'clsx';
import useOtherUser from '@/app/hooks/useOtherUser';
import { useRouter } from 'next/navigation';
import Avatar from '@/app/components/Avatar';
import AvatarGroup from '@/app/components/AvatarGroup';

interface ConversationBoxProps {
  data: FullConversationType;
  selected?: boolean;
}

function truncateText(text: string | null, maxLength: number) {
  if (text && text.length > maxLength) {
    return text.slice(0, maxLength) + '...';
  } else {
    return text;
  }
}

const ConversationBox = ({ data, selected }: ConversationBoxProps) => {
  const otherUser = useOtherUser(data);
  const session = useSession();
  const router = useRouter();

  const handlerClick = useCallback(() => {
    router.push(`/conversations/${data.id}`);
  }, [data.id, router]);

  const lastMessage = useMemo(() => {
    const message = data.messages || [];

    return message[message.length - 1];
  }, [data.messages]);

  const userEmail = useMemo(() => {
    return session.data?.user?.email ?? null;
  }, [session.data?.user?.email as string | null]);

  const hasSeen = useMemo(() => {
    if (!lastMessage) {
      return false;
    }

    const seenArray = lastMessage.seen || [];

    if (!userEmail) {
      return false;
    }

    return seenArray.filter((user) => user.email === userEmail).length !== 0;
  }, [lastMessage, userEmail]);

  const lastMessageText = useMemo(() => {
    if (lastMessage?.image) {
      return 'Sent an image';
    }

    if (lastMessage?.body) {
      return lastMessage.body;
    }

    return 'Started a conversation';
  }, [lastMessage]);

  return (
    <div
      className={clsx(
        `w-full relative flex items-center space-x-3 rounded-lg transition cursor-pointer  p-3 text-[var(--white)]  hover:bg-[var(--dark)]`,
        selected ? 'bg-[var(--dark)]' : ''
      )}
      onClick={handlerClick}
    >
      {data.isGroup ? (
        <AvatarGroup users={data.users} />
      ) : (
        <Avatar user={otherUser} />
      )}

      <div className="min-w-0 flex-1">
        <div className="focus:outline-none">
          <div className="flex justify-between items-center mb-1">
            <p className="text-sm font-medium">
              {truncateText(data.name || otherUser.name, 20)}
            </p>
            {lastMessage?.createdAt && (
              <p className="text-xs font-light text-[var(--grey)]">
                {format(new Date(lastMessage.createdAt), 'p')}
              </p>
            )}
          </div>
          <p
            className={clsx(
              `truncate text-xs`,
              hasSeen ? 'text-[var(--grey)]' : ''
            )}
          >
            {lastMessageText}
          </p>
        </div>
      </div>

      <div className="absolute w-11/12 h-[1px] bg-[var(--dark)] bottom-0 left-0 hover:hidden"></div>
    </div>
  );
};

export default ConversationBox;
