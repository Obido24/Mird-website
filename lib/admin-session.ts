import 'server-only';

import { cookies } from 'next/headers';
import { adminAuth } from '@/lib/firebase-admin';
import { canAccessAdmin, getAdminDisplayName } from '@/lib/admin-access';

export async function getAdminUserFromSession() {
  const cookieStore = await cookies();
  const session = cookieStore.get('midr-session')?.value;

  if (!session) {
    return null;
  }

  try {
    const decoded = await adminAuth().verifySessionCookie(session, true);
    if (!(await canAccessAdmin(decoded))) {
      return null;
    }

    return {
      uid: decoded.uid,
      name: getAdminDisplayName(decoded),
      email: decoded.email ?? null
    };
  } catch {
    return null;
  }
}
