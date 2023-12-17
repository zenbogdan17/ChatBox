import { FullConversationType } from '../types';

export default function handlerNewMessages(
  initialItems: FullConversationType[],
  currentUserEmail: string | null | undefined
) {
  const result = initialItems.map((item) =>
    item.messages[item.messages.length - 1].seen.some(
      (seen) => seen.email === currentUserEmail
    )
  );

  return result.includes(false);
}
