import { NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebase-admin';

function isNonEmptyString(value: unknown) {
  return typeof value === 'string' && value.trim().length > 0;
}

function asTrimmedString(value: unknown) {
  return typeof value === 'string' ? value.trim() : '';
}

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as {
      name?: unknown;
      email?: unknown;
      interest?: unknown;
      message?: unknown;
    };

    if (
      !isNonEmptyString(payload.name) ||
      !isNonEmptyString(payload.email) ||
      !isNonEmptyString(payload.interest) ||
      !isNonEmptyString(payload.message)
    ) {
      return NextResponse.json({ error: 'Name, email, service needed, and message are required.' }, { status: 400 });
    }

    await adminDb().collection('inquiries').add({
      name: asTrimmedString(payload.name),
      email: asTrimmedString(payload.email),
      interest: asTrimmedString(payload.interest),
      message: asTrimmedString(payload.message),
      source: 'Website contact form',
      status: 'new',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: 'Unable to save inquiry.' }, { status: 500 });
  }
}
