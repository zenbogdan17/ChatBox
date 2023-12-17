import { FullMessageType } from '../types';

export default function filterMessages(
  filter: string,
  initialMessages: FullMessageType[]
) {
  const filteredMessages = initialMessages.filter(({ body }) =>
    body?.toLowerCase().includes(filter.toLowerCase())
  );

  return filteredMessages;
}
