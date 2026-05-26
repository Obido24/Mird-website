import { NextResponse } from 'next/server';
import { cleanPayload, getAllowedCollection, requireAdminApiAccess, timestampsForUpdate } from '@/lib/admin-api';

type RouteContext = {
  params: Promise<{ collection: string; id: string }>;
};

export async function PUT(request: Request, context: RouteContext) {
  const access = await requireAdminApiAccess();
  if (access.error) return access.error;

  const { collection: collectionName, id } = await context.params;
  const collection = getAllowedCollection(collectionName);

  if (!collection) {
    return NextResponse.json({ error: 'Unknown admin resource.' }, { status: 404 });
  }

  const payload = cleanPayload(await request.json().catch(() => null));

  if (!payload) {
    return NextResponse.json({ error: 'Invalid request payload.' }, { status: 400 });
  }

  await collection.doc(id).update(timestampsForUpdate(payload));

  return NextResponse.json({ ok: true });
}

export async function DELETE(_request: Request, context: RouteContext) {
  const access = await requireAdminApiAccess();
  if (access.error) return access.error;

  const { collection: collectionName, id } = await context.params;
  const collection = getAllowedCollection(collectionName);

  if (!collection) {
    return NextResponse.json({ error: 'Unknown admin resource.' }, { status: 404 });
  }

  await collection.doc(id).delete();

  return NextResponse.json({ ok: true });
}
