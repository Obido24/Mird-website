import 'server-only';

import { NextResponse } from 'next/server';
import { FieldValue } from 'firebase-admin/firestore';
import { adminDb } from '@/lib/firebase-admin';
import { getAdminUserFromSession } from '@/lib/admin-session';

const allowedCollections = new Set([
  'clients',
  'projects',
  'portfolio',
  'services',
  'courses',
  'payments',
  'inquiries',
  'users'
]);

export async function requireAdminApiAccess() {
  const user = await getAdminUserFromSession();

  if (!user) {
    return {
      error: NextResponse.json({ error: 'Admin session required.' }, { status: 401 }),
      user: null
    };
  }

  return { error: null, user };
}

export function getAllowedCollection(name: string) {
  if (!allowedCollections.has(name)) {
    return null;
  }

  return adminDb().collection(name);
}

export function cleanPayload(payload: unknown) {
  if (!payload || typeof payload !== 'object' || Array.isArray(payload)) {
    return null;
  }

  const cleaned: Record<string, unknown> = {};

  for (const [key, value] of Object.entries(payload)) {
    if (key === 'id' || key === 'createdAt' || key === 'updatedAt') {
      continue;
    }

    cleaned[key] = value;
  }

  return cleaned;
}

export function timestampsForCreate(payload: Record<string, unknown>) {
  return {
    ...payload,
    createdAt: FieldValue.serverTimestamp(),
    updatedAt: FieldValue.serverTimestamp()
  };
}

export function timestampsForUpdate(payload: Record<string, unknown>) {
  return {
    ...payload,
    updatedAt: FieldValue.serverTimestamp()
  };
}
