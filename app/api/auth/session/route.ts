import { NextResponse } from 'next/server';
import { adminAuth } from '@/lib/firebase-admin';
import { canAccessAdmin, getAdminDisplayName } from '@/lib/admin-access';

function getSessionError(error: unknown) {
  const message = error instanceof Error ? error.message : '';

  if (message.includes('Firebase Admin is not configured')) {
    return {
      error: 'Firebase Admin is not configured on the live server. Add the Firebase service account environment variables and redeploy.',
      status: 500
    };
  }

  if (message.includes('verify') || message.includes('token')) {
    return {
      error: 'Firebase could not verify this sign-in token.',
      status: 401
    };
  }

  return {
    error: 'Unable to create admin session.',
    status: 500
  };
}

export async function POST(request: Request) {
  try {
    const { idToken } = (await request.json()) as { idToken?: string };

    if (!idToken) {
      return NextResponse.json({ error: 'Missing idToken' }, { status: 400 });
    }

    const decodedToken = await adminAuth().verifyIdToken(idToken);
    const isAdmin = await canAccessAdmin(decodedToken);

    if (!isAdmin) {
      return NextResponse.json({ error: 'Not authorized' }, { status: 403 });
    }

    const expiresIn = 1000 * 60 * 60 * 24 * 5;
    const sessionCookie = await adminAuth().createSessionCookie(idToken, { expiresIn });
    const response = NextResponse.json({
      ok: true,
      user: {
        uid: decodedToken.uid,
        name: getAdminDisplayName(decodedToken),
        email: decodedToken.email ?? null
      }
    });

    response.cookies.set('midr-session', sessionCookie, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: expiresIn / 1000
    });

    return response;
  } catch (error) {
    const sessionError = getSessionError(error);
    return NextResponse.json({ error: sessionError.error }, { status: sessionError.status });
  }
}
