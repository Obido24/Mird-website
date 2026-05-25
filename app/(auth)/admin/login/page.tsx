"use client";

import { useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { sendPasswordResetEmail, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { Sparkles } from 'lucide-react';
import { MidrLogo } from '@/components/brand/midr-logo';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { auth, firebaseReady } from '@/lib/firebase';

function getDefaultAdminEmail() {
  return process.env.NEXT_PUBLIC_MIDR_ADMIN_EMAIL?.trim() || 'admin@midr.example';
}

function getFirebaseErrorMessage(error: unknown) {
  const code = typeof error === 'object' && error !== null && 'code' in error ? String(error.code) : '';
  const message = typeof error === 'object' && error !== null && 'message' in error ? String(error.message) : '';

  switch (code) {
    case 'auth/invalid-credential':
    case 'auth/invalid-login-credentials':
    case 'auth/wrong-password':
    case 'auth/user-not-found':
      return 'Those Firebase credentials do not match an admin account.';
    case 'auth/too-many-requests':
      return 'Firebase temporarily blocked the sign-in attempt. Please try again later.';
    default:
      return message || 'Unable to sign in. Check credentials and admin access.';
  }
}

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState(getDefaultAdminEmail());
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'resetting' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const isError = status === 'error';

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus('loading');
    setMessage('');

    if (!email.trim() || !password.trim()) {
      setStatus('error');
      setMessage('Email and password are required.');
      return;
    }

    if (!firebaseReady || !auth) {
      setStatus('error');
      setMessage('Firebase Auth is not configured yet.');
      return;
    }

    try {
      const credentials = await signInWithEmailAndPassword(auth, email, password);
      const idToken = await credentials.user.getIdToken();

      const response = await fetch('/api/auth/session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ idToken })
      });

      if (!response.ok) {
        const payload = (await response.json().catch(() => null)) as { error?: string } | null;
        if (response.status === 403) {
          throw new Error(payload?.error ?? 'Not authorized for MIDR admin.');
        }

        throw new Error(payload?.error ?? 'Session creation failed');
      }

      router.push('/admin');
      router.refresh();
    } catch (error) {
      if (auth) {
        await signOut(auth).catch(() => undefined);
      }
      setStatus('error');
      setMessage(getFirebaseErrorMessage(error));
    }
  }

  async function handlePasswordReset() {
    setStatus('resetting');
    setMessage('');

    if (!email.trim()) {
      setStatus('error');
      setMessage('Enter the admin email address first.');
      return;
    }

    if (!firebaseReady || !auth) {
      setStatus('error');
      setMessage('Firebase Auth is not configured yet.');
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email.trim());
      setStatus('idle');
      setMessage(`Password reset email sent to ${email.trim()}. Check that inbox and spam folder.`);
    } catch (error) {
      setStatus('error');
      setMessage(getFirebaseErrorMessage(error));
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-b from-background via-background to-surface px-4 py-12">
      <Card className="w-full max-w-md">
        <CardHeader className="flex flex-col items-center text-center">
          <MidrLogo className="mx-auto h-14 w-auto max-w-[190px]" priority />
          <CardTitle className="mt-4 text-3xl">Admin Login</CardTitle>
          <CardDescription className="mt-2 max-w-sm">
            Use the approved MIDR admin email from Firebase Authentication. The password is the one you created in Firebase for that account.
          </CardDescription>
          <p className="mt-3 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-muted">
            Approved email: <span className="text-foreground">{getDefaultAdminEmail()}</span>
          </p>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="label" htmlFor="email">
                Email
              </label>
              <Input id="email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} />
            </div>
            <div>
              <label className="label" htmlFor="password">
                Password
              </label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>
            <Button type="submit" className="w-full" disabled={status === 'loading'}>
              <Sparkles className="h-4 w-4" />
              {status === 'loading' ? 'Signing In...' : 'Enter Dashboard'}
            </Button>
            <Button
              type="button"
              variant="secondary"
              className="w-full"
              onClick={handlePasswordReset}
              disabled={status === 'resetting'}
            >
              {status === 'resetting' ? 'Sending Reset Email...' : 'Reset Password'}
            </Button>
            {message ? (
              <p className={`text-sm ${isError ? 'text-danger' : 'text-success'}`}>{message}</p>
            ) : null}
          </form>
        </CardContent>
      </Card>
    </main>
  );
}
