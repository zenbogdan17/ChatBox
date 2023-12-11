'use client';

import useConversation from '@/app/hooks/useConversation';
import useRouters from '@/app/hooks/useRoutes';

import MobileItem from './MobileItem';
import Avatar from '../Avatar';
import { useState } from 'react';
import { User } from '@prisma/client';
import SettingsModal from './SettingsModal';

interface MobileFooterProps {
  currentUser: User;
}

const MobileFooter = ({ currentUser }: MobileFooterProps) => {
  const [isOpenModal, setIsOpenModal] = useState(false);

  const routes = useRouters();
  const { isOpen } = useConversation();

  if (isOpen) {
    return null;
  }

  return (
    <div className="fixed justify-between w-full bottom-0 z-40 flex items-center bg-[var(--dark)] text-[var(--white)] lg:hidden">
      <SettingsModal
        currentUser={currentUser}
        isOpen={isOpenModal}
        onClose={() => {
          setIsOpenModal(false);
        }}
      />

      <div
        onClick={() => setIsOpenModal(true)}
        className=" cursor-pointer hover:opacity-75 transition px-20"
      >
        <Avatar user={currentUser} />
      </div>

      {routes.map((routes) => (
        <MobileItem
          key={routes.label}
          href={routes.href}
          active={routes.active}
          icon={routes.icon}
          onClick={routes.onClick}
        />
      ))}
    </div>
  );
};

export default MobileFooter;
