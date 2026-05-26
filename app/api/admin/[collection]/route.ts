import { NextResponse } from 'next/server';
import { cleanPayload, getAllowedCollection, requireAdminApiAccess, timestampsForCreate } from '@/lib/admin-api';

type RouteContext = {
  params: Promise<{ collection: string }>;
};

export async function GET(_request: Request, context: RouteContext) {
  const access = await requireAdminApiAccess();
  if (access.error) return access.error;

  const { collection: collectionName } = await context.params;
  const collection = getAllowedCollection(collectionName);

  if (!collection) {
    return NextResponse.json({ error: 'Unknown admin resource.' }, { status: 404 });
  }

  const snapshot = await collection.get();
  const records = snapshot.docs.map((entry) => ({ id: entry.id, ...entry.data() }));

  return NextResponse.json({ records });
}

export async function POST(request: Request, context: RouteContext) {
  const access = await requireAdminApiAccess();
  if (access.error) return access.error;

  const { collection: collectionName } = await context.params;
  const collection = getAllowedCollection(collectionName);

  if (!collection) {
    return NextResponse.json({ error: 'Unknown admin resource.' }, { status: 404 });
  }

  const payload = cleanPayload(await request.json().catch(() => null));

  if (!payload) {
    return NextResponse.json({ error: 'Invalid request payload.' }, { status: 400 });
  }

  const docRef = await collection.add(timestampsForCreate(payload));

  return NextResponse.json({ id: docRef.id });
}
