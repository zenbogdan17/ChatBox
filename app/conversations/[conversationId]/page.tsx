import getConversationsById from '@/app/actions/getConversationsById';
import getMessages from '@/app/actions/getMessages';
import EmptyState from '@/app/components/EmptyState';

import Headers from './components/Headers';
import Body from './components/Body';
import Form from './components/Form';
import Conversations from './components/Conversations';

interface IParams {
  conversationId: string;
}

const ConversationId = async ({ params }: { params: IParams }) => {
  const conversation = await getConversationsById(params.conversationId);

  const messages = await getMessages(params.conversationId);

  if (!conversation) {
    return (
      <div className="lg:pl-[400px] h-full">
        <div className="h-full flex flex-col ">
          <EmptyState />
        </div>
      </div>
    );
  }

  return (
    <div className="lg:pl-[400px] h-full">
      <div className="h-full flex flex-col">
        <Conversations conversation={conversation} messages={messages} />
      </div>
    </div>
  );
};

export default ConversationId;
