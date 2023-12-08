'use client';

import Avatar from '@/app/components/Avatar';
import LoadingModal from '@/app/components/LoadingModal';
import { User } from '@prisma/client';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useCallback, useState } from 'react';

interface UserBoxProps {
  data: User;
}

const UserBox = ({ data }: UserBoxProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handlerClick = useCallback(() => {
    setIsLoading(true);

    axios
      .post('/api/conversations', {
        userId: data.id,
      })
      .then((data) => {
        router.push(`/conversations/${data.data.id}`);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [data, router]);

  return (
    <>
      <LoadingModal isShow={isLoading} />

      <div
        onClick={handlerClick}
        className="w-full relative flex items-center space-x-3  p-3 rounded-lg transition cursor-pointer text-[var(--white)]  hover:bg-[var(--dark)]  "
      >
        <Avatar user={data} />
        <div className="min-w-0 flex-1">
          <div className="focus:outline-none">
            <div className="flex justify-between items-center mb-1">
              <p className="text-sm font-medium">{data.name}</p>
            </div>
          </div>
        </div>

        <div className="absolute w-11/12 h-[1px] bg-[var(--dark)] bottom-0 left-0 hover:hidden"></div>
      </div>
    </>
  );
};

export default UserBox;
