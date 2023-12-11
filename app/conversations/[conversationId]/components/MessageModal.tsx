'use client';

import Button from '@/app/components/Button';
import Modal from '@/app/components/Modal';
import Input from '@/app/components/inputs/Input';
import { FullMessageType } from '@/app/types';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { MdDelete } from 'react-icons/md';

interface MessageModalProps {
  isOpen?: boolean;
  onClose: () => void;
  data: FullMessageType;
  handleEdit: (editedData: FullMessageType) => void;
  onDelete: () => void;
}

const MessageModal = ({
  isOpen,
  onClose,
  data,
  handleEdit,
  onDelete,
}: MessageModalProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      message: data.body,
      id: data.id,
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    axios
      .post(`/api/messages/${data.id}`, data)
      .then((data) => {
        router.refresh();

        if (data.data.body) {
          handleEdit(data.data);
        }

        onClose();
      })
      .catch(() => {
        toast.error('Something went wrong!');
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const deleteMessage = () => {
    setIsLoading(true);

    axios
      .delete(`/api/messages/${data.id}`)
      .then(() => {
        onClose();
        onDelete();
        router.refresh();
      })
      .catch(() => {
        toast.error('Something went wrong!');
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-8">
          <p className="pb-2">Edit your message</p>

          <Input
            disabled={isLoading}
            id="message"
            errors={errors}
            required
            register={register}
          />
        </div>

        <div className="flex justify-end gap-x-2">
          <Button type="submit" disabled={isLoading}>
            <div className="flex items-center">Save</div>
          </Button>

          <Button danger onClick={deleteMessage} disabled={isLoading}>
            <div className="flex items-center gap-x-2">
              Delete message
              <MdDelete size={16} />
            </div>
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default MessageModal;
