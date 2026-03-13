import { getPayload } from 'payload';
import config from '@/payload.config';
import { NextResponse } from 'next/server';

export async function GET() {
  const payload = await getPayload({ config });
  const redirects = await payload.find({
    collection: 'redirects' as any,
    limit: 1000,
  });
  return NextResponse.json(redirects.docs);
}
