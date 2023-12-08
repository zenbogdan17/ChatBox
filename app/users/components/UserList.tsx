'use client';

import { User } from '@prisma/client';
import React from 'react';
import UserBox from './UserBox';

interface UserListProps {
  items: User[];
}

const UserList = ({ items }: UserListProps) => {
  return (
    <aside className="fixed inset-y-0 pb-20 lg:pb-0 lg:left-20 lg:w-80 lg:block overflow-y-auto  block w-full left-0 bg-[var(--bg)]">
      <div className="px-5">
        <div className="flex-col">
          <div className="text-2xl font-bold text-[var(--white)] py-4">
            Users
          </div>
        </div>

        {items.map((item) => (
          <UserBox key={item.id} data={item} />
        ))}
      </div>
    </aside>
  );
};

export default UserList;
