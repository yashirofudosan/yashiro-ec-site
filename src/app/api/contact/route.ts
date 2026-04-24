import { NextResponse } from 'next/server';
import { client } from '@/lib/microcms';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, topic, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Send data to microCMS 'inquiries' endpoint
    const response = await client.create({
      endpoint: 'inquiries',
      content: {
        name,
        email,
        topic: topic || 'other',
        message
      }
    });

    return NextResponse.json({ success: true, id: response.id });
  } catch (error: any) {
    console.error('microCMS Inquiry POST error:', error);
    return NextResponse.json({ error: error.message || 'Failed to submit inquiry' }, { status: 500 });
  }
}
