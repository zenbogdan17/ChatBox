'use client';

import clsx from 'clsx';
import Link from 'next/link';
import React from 'react';

interface MobileItemProps {
  icon: any;
  href: string;
  onClick?: () => void;
  active?: boolean;
}

const MobileItem = ({ icon: Icon, href, onClick, active }: MobileItemProps) => {
  const handlerClick = () => {
    if (onClick) {
      return onClick();
    }
  };

  return (
    <Link
      onClick={onClick}
      href={href}
      className={clsx(
        `group flex gap-x-3 text-sm leading-6 font-semibold w-full justify-center p-5
          text-[var(--grey)]
          hover:text-[var(--white)] hover:bg-[var(--bleak)]`,
        active && `text-[var(--white)] bg-[var(--bleak)]`
      )}
    >
      <Icon className="h-6 w-6" />
    </Link>
  );
};

export default MobileItem;
