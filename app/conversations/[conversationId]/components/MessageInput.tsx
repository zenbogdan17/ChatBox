import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';

interface MessageInputProps {
  id: string;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<FieldValues>;
  placeholder?: string;
  type?: string;
  required?: boolean;
}

const MessageInput = ({
  id,
  register,
  errors,
  placeholder,
  type,
  required,
}: MessageInputProps) => {
  return (
    <div className="relative w-full">
      <input
        id={id}
        type={type}
        autoComplete={id}
        {...register(id, { required })}
        placeholder={placeholder}
        className="text-white font-light py-2 px-4 bg-[var(--bg)] w-full rounded-full focus:outline-none"
      />
    </div>
  );
};

export default MessageInput;
