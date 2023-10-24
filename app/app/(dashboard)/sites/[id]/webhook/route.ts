import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { content } = await req.json();
  console.log('### content: ', { content });

  return new NextResponse('Received', {
    status: 200,
  });
}
