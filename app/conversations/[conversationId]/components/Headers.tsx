'use client';

import Avatar from '@/app/components/Avatar';
import useOtherUser from '@/app/hooks/useOtherUser';
import { Conversation, User } from '@prisma/client';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import { HiChevronLeft } from 'react-icons/hi';
import { HiEllipsisHorizontal } from 'react-icons/hi2';
import ProfileDrawer from './ProfileDrawer';
import AvatarGroup from '@/app/components/AvatarGroup';
import useActiveList from '@/app/hooks/useActiveList';
import { FaSearch } from 'react-icons/fa';
import Input from '@/app/components/inputs/Input';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { FullMessageType } from '@/app/types';
import filterMessages from '@/app/utils/filterMessages';
import { IoMdClose } from 'react-icons/io';
import { format } from 'date-fns';

interface HeadersProps {
  conversation: Conversation & { users: User[] };
  initialMessages: FullMessageType[];
  handlerSearchMessage: (message: FullMessageType) => void;
}

const Headers = ({
  conversation,
  initialMessages,
  handlerSearchMessage,
}: HeadersProps) => {
  const otherUser = useOtherUser(conversation);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [filteredMessages, setFilteredMessages] = useState<
    FullMessageType[] | null
  >(null);
  const [inputSearchIsShow, setInputSearchIsShow] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      search: '',
    },
  });

  const { members } = useActiveList();
  const isActive = members.indexOf(otherUser?.email!) !== -1;

  const statusText = useMemo(() => {
    if (conversation.isGroup) {
      return `${conversation.users.length} members`;
    }

    return isActive ? 'Active' : 'Offline';
  }, [conversation]);

  const handleSearch: SubmitHandler<FieldValues> = (data) => {
    setFilteredMessages(filterMessages(data.search, initialMessages));
  };

  const handlerClickOnSearchMessage = (data: FullMessageType) => {
    setFilteredMessages(null);
    setValue('search', '');
    setInputSearchIsShow(false);
    handlerSearchMessage(data);
  };

  return (
    <>
      <ProfileDrawer
        data={conversation}
        isOpen={drawerOpen}
        onClose={() => {
          setDrawerOpen(false);
        }}
      />
      <div className=" bg-[var(--dark)] w-full flex  sm:px-4 py-3 px-4 lg:px-6 justify-between items-center shadow-md">
        <div className="flex gap-3 items-center">
          <Link
            className="lg:hidden block text-white hover:text-[var(--sea)] transition cursor-pointer"
            href="/conversations"
          >
            <HiChevronLeft size={30} />
          </Link>
          {conversation.isGroup ? (
            <AvatarGroup users={conversation.users} />
          ) : (
            <Avatar user={otherUser} />
          )}

          <div className="flex flex-col text-white w-40">
            <div>{conversation.name || otherUser.name}</div>
            <div className="text-sm font-light text-[var(--grey)]">
              {statusText}
            </div>
          </div>
        </div>

        {inputSearchIsShow && (
          <div className="mx-10 w-full relative">
            <form onSubmit={handleSubmit(handleSearch)}>
              <Input id="search" errors={errors} required register={register} />

              <FaSearch
                size={18}
                className="text-white cursor-pointer hover:text-[var(--grey)] transition absolute right-3 top-2"
                onClick={handleSubmit(handleSearch)}
              />
            </form>

            {filteredMessages === null || (
              <div className="w-full bg-[var(--bg)] rounded-lg absolute top-10 z-20 shadow-lg">
                {Object.keys(filteredMessages).length === 0 ? (
                  <div className="relative">
                    <IoMdClose
                      className="absolute right-2 top-2 text-white cursor-pointer hover:bg-[var(--dark)]"
                      size={24}
                      onClick={() => {
                        setFilteredMessages(null);
                        setValue('search', '');
                        setInputSearchIsShow(false);
                      }}
                    />

                    <p className="py-10 px-4">No messages found</p>
                  </div>
                ) : (
                  <div className="min-h-20 max-h-80 overflow-y-auto ">
                    <IoMdClose
                      className="absolute right-2 top-2 text-white cursor-pointer hover:bg-[var(--dark)] z-40"
                      size={24}
                      onClick={() => {
                        setFilteredMessages(null);
                        setValue('search', '');
                        setInputSearchIsShow(false);
                      }}
                    />
                    {filteredMessages.map((data: FullMessageType) => (
                      <div
                        className="flex gap-5 py-4 pl-3 rounded-lg hover:bg-[var(--dark)] cursor-pointer relative"
                        key={data.id}
                        onClick={() => handlerClickOnSearchMessage(data)}
                      >
                        <div className="w-12">
                          <Avatar user={data.sender} />
                        </div>

                        <div>
                          <h3>{data.sender.name}</h3>
                          <p className="text-[var(--grey)]">{data.body}</p>
                        </div>
                        <span className="text-xs text-[var(--sea)] absolute right-4 bottom-7">
                          {format(new Date(data.createdAt), 'dd.LL.yyyy')}
                        </span>
                        <span className="text-xs text-[var(--sea)] absolute right-4 bottom-4">
                          {format(new Date(data.createdAt), 'k:m')}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        <div className="flex items-center gap-10">
          {!inputSearchIsShow && (
            <FaSearch
              size={18}
              className="text-white cursor-pointer hover:text-[var(--grey)] transition"
              onClick={() => setInputSearchIsShow(true)}
            />
          )}
          <HiEllipsisHorizontal
            size={32}
            onClick={() => {
              setDrawerOpen(true);
            }}
            className="text-white cursor-pointer hover:text-[var(--grey)] transition"
          />
        </div>
      </div>
    </>
  );
};

export default Headers;
