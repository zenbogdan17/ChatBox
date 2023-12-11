import { NextResponse } from 'next/server';
import prisma from '@/app/libs/prismadb';
import getCurrentUser from '@/app/actions/getCurrentUser';

interface IParams {
  messageId?: string;
}

export async function POST(request: Request, { params }: { params: IParams }) {
  try {
    const body = await request.json();
    const { message } = body;
    const { messageId } = params;

    console.log(params);

    const updateMessage = await prisma.message.update({
      where: {
        id: messageId,
      },
      data: {
        body: message,
      },
    });

    return NextResponse.json(updateMessage);
  } catch (error) {
    return new NextResponse('Internal Error', { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: IParams }
) {
  try {
    const { messageId } = params;
    const currentUser = await getCurrentUser();

    if (!currentUser?.id) return new NextResponse('Unauthorized');

    const deletedMessage = await prisma.message.deleteMany({
      where: {
        id: messageId,
      },
    });

    return NextResponse.json(deletedMessage);
  } catch (error: any) {
    console.log(error, 'ERROR_MESSAGE_DELETE');

    return new NextResponse('Internal Error', { status: 500 });
  }
}
