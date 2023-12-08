'use client';

import clsx from 'clsx';

interface ButtonProps {
  type?: 'button' | 'submit' | 'reset' | undefined;
  fullWidth?: boolean;
  children?: React.ReactNode;
  onClick?: () => void;
  secondary?: boolean;
  danger?: boolean;
  disabled?: boolean;
}

const Button = ({
  type,
  fullWidth,
  children,
  onClick,
  secondary,
  danger,
  disabled,
}: ButtonProps) => {
  return (
    <button
      className={clsx(
        `flex justify-center rounded-md px-3 py-2 text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 text-white`,
        disabled && ' opacity-50 cursor-default',
        fullWidth && 'w-full',
        secondary ? ' hover:text-[var(--grey)]' : '',
        danger &&
          'bg-rose-600 hover:bg-rose-800 focus-visible:outline-rose-600',
        !secondary &&
          !danger &&
          'bg-[var(--violet)] hover:bg-[var(--violet-dark)] focus-visible:outline-[var(--violet-dark)]'
      )}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
