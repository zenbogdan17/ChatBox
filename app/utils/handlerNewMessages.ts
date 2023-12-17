import { useSession } from 'next-auth/react';
import { FullConversationType } from '../types';

export default function handlerNewMessages(
  initialItems: FullConversationType[]
) {
  const session = useSession();

  const result = initialItems.map((item) =>
    item.messages[item.messages.length - 1].seen.some(
      (seen) => seen.email === session.data?.user?.email
    )
  );

  return result.includes(false);
}
