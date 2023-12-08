'use client';

import clsx from 'clsx';
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';

interface InputProps {
  label: string;
  id: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  disabled?: boolean;
}

const Input = ({
  label,
  id,
  type,
  placeholder,
  required,
  register,
  errors,
  disabled,
}: InputProps) => {
  return (
    <div>
      <label className="block text-sm font-medium leading-6 " htmlFor={id}>
        {label}
      </label>
      <div className="mt-2">
        <input
          id={id}
          type={type}
          autoComplete={id}
          disabled={disabled}
          {...register(id, { required })}
          placeholder={placeholder}
          className={clsx(
            `form-input block w-full bg-[var(--bg2)] rounded-lg border-0 py-1.5 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-[var(--white)] sm:text-sm sm:leading-6`,
            errors[id] && 'focus:ring-rose-500',
            disabled && 'opacity-50 cursor-default'
          )}
        ></input>
      </div>
    </div>
  );
};

export default Input;
