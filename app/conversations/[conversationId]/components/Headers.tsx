'use client';

import Avatar from '@/app/components/Avatar';
import useOtherUser from '@/app/hooks/useOtherUser';
import { Conversation, User } from '@prisma/client';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import { HiChevronLeft } from 'react-icons/hi';
import { HiEllipsisHorizontal } from 'react-icons/hi2';
import ProfileDrawer from './ProfileDrawer';
import AvatarGroup from '@/app/components/AvatarGroup';
import useActiveList from '@/app/hooks/useActiveList';

interface HeadersProps {
  conversation: Conversation & { users: User[] };
}

const Headers = ({ conversation }: HeadersProps) => {
  const otherUser = useOtherUser(conversation);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const { members } = useActiveList();
  const isActive = members.indexOf(otherUser?.email!) !== -1;

  const statusText = useMemo(() => {
    if (conversation.isGroup) {
      return `${conversation.users.length} members`;
    }

    return isActive ? 'Active' : 'Offline';
  }, [conversation]);

  return (
    <>
      <ProfileDrawer
        data={conversation}
        isOpen={drawerOpen}
        onClose={() => {
          setDrawerOpen(false);
        }}
      />
      <div className=" bg-[var(--dark)] w-full flex  sm:px-4 py-3 px-4 lg:px-6 justify-between items-center shadow-md">
        <div className="flex gap-3 items-center">
          <Link
            className="lg:hidden block text-white hover:text-[var(--sea)] transition cursor-pointer"
            href="/conversations"
          >
            <HiChevronLeft size={30} />
          </Link>
          {conversation.isGroup ? (
            <AvatarGroup users={conversation.users} />
          ) : (
            <Avatar user={otherUser} />
          )}

          <div className="flex flex-col text-white">
            <div>{conversation.name || otherUser.name}</div>
            <div className="text-sm font-light text-[var(--grey)]">
              {statusText}
            </div>
          </div>
        </div>

        <HiEllipsisHorizontal
          size={32}
          onClick={() => {
            setDrawerOpen(true);
          }}
          className="text-white cursor-pointer hover:text-[var(--grey)] transition"
        />
      </div>
    </>
  );
};

export default Headers;
