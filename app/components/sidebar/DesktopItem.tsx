'use client';

import clsx from 'clsx';
import Link from 'next/link';

interface DesktopItemProps {
  label: string;
  icon: any;
  href: string;
  onClick?: () => void;
  active?: boolean;
  newMessage?: boolean;
}

const DesktopItem = ({
  label,
  icon: Icon,
  href,
  onClick,
  active,
  newMessage,
}: DesktopItemProps) => {
  const handlerClick = () => {
    if (onClick) {
      return onClick();
    }
  };

  return (
    <div className="relative">
      {label === 'Chat' && newMessage && (
        <span className="absolute right-2 top-2 h-3 w-3 bg-red-500 rounded-full"></span>
      )}

      <li onClick={handlerClick}>
        <Link
          href={href}
          className={clsx(
            `group flex gap-x-3 rounded-md p-3 text-sm leading-6 font-semibold 
          text-[var(--grey)]
          hover:text-[var(--white)] hover:bg-[var(--bleak)]`,
            active && `text-[var(--white)] bg-[var(--bleak)]`
          )}
        >
          <Icon className="h-6 w-6 shrink-0" />
          <span className="sr-only">{label}</span>
        </Link>
      </li>
    </div>
  );
};

export default DesktopItem;
