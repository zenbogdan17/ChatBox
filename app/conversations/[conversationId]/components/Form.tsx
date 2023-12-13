'use client';

import useConversation from '@/app/hooks/useConversation';
import axios from 'axios';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { HiPhoto, HiPaperAirplane } from 'react-icons/hi2';
import MessageInput from './MessageInput';
import { CldUploadButton } from 'next-cloudinary';

const Form = () => {
  const { conversationId } = useConversation();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      message: '',
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setValue('message', '', { shouldValidate: true });

    let storedData: string | null = localStorage.getItem('replyData');

    storedData = storedData && JSON.parse(storedData);

    axios.post('/api/messages', {
      ...data,
      conversationId: conversationId,
      replyData: storedData,
    });

    localStorage.removeItem('replyData');
  };

  const handlerUpload = (result: any) => {
    axios.post('/api/messages', {
      image: result?.info?.secure_url,
      conversationId,
    });
  };

  return (
    <div className="py-7 px-4 bg-[var(--dark)]  flex items-center gap-2 lg:gap-4 w-full">
      <CldUploadButton
        options={{ maxFiles: 1 }}
        onUpload={handlerUpload}
        uploadPreset="t5wvc2zy"
      >
        <HiPhoto size={30} className="text-white" />
      </CldUploadButton>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex items-center gap-2 lg:gap-4 w-full"
      >
        <MessageInput
          id="message"
          register={register}
          errors={errors}
          required
          placeholder="Write a message"
        />

        <button
          type="submit"
          className="rounded-full p-2 cursor-pointer transition bg-[var(--white)] hover:bg-[var(--grey)]"
        >
          <HiPaperAirplane />
        </button>
      </form>
    </div>
  );
};

export default Form;
