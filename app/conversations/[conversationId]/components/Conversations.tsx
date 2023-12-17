'use client';

import { FullMessageType } from '@/app/types';
import { Conversation, User } from '@prisma/client';
import React, { useState } from 'react';
import Headers from './Headers';
import Body from './Body';
import Form from './Form';

interface ConversationsProps {
  conversation: Conversation & { users: User[] };
  messages: FullMessageType[];
}

const Conversations = ({ conversation, messages }: ConversationsProps) => {
  const [searchMessage, setSearchMessage] = useState<FullMessageType | null>(
    null
  );

  return (
    <>
      <Headers
        conversation={conversation}
        initialMessages={messages}
        handlerSearchMessage={(message: FullMessageType) =>
          setSearchMessage(message)
        }
      />
      <Body initialMessages={messages} searchMessage={searchMessage} />
      <Form />
    </>
  );
};

export default Conversations;
