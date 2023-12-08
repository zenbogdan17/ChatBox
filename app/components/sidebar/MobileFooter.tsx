'use client';

import useConversation from '@/app/hooks/useConversation';
import useRouters from '@/app/hooks/useRoutes';

import MobileItem from './MobileItem';

const MobileFooter = () => {
  const routes = useRouters();
  const { isOpen } = useConversation();

  if (isOpen) {
    return null;
  }

  return (
    <div className="fixed justify-between w-full bottom-0 z-40 flex items-center bg-[var(--dark)] text-[var(--white)]  lg:hidden   ">
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
