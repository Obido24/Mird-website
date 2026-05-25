import { adminDb } from '@/lib/firebase-admin';

type AdminToken = {
  admin?: boolean;
  email?: string | null;
  name?: string | null;
  uid?: string;
};

function getApprovedAdminEmail() {
  return process.env.NEXT_PUBLIC_MIDR_ADMIN_EMAIL?.trim().toLowerCase() ?? '';
}

export function isAdminClaimed(token: AdminToken) {
  const approvedEmail = getApprovedAdminEmail();
  const email = token.email?.trim().toLowerCase() ?? '';

  return token.admin === true || (approvedEmail.length > 0 && email === approvedEmail);
}

async function isFirestoreAdmin(token: AdminToken) {
  const normalizedEmail = token.email?.trim().toLowerCase();
  const checks: Array<Promise<boolean>> = [];

  if (normalizedEmail) {
    checks.push(
      adminDb()
        .collection('users')
        .where('email', '==', normalizedEmail)
        .limit(1)
        .get()
        .then((snapshot) => {
          if (snapshot.empty) {
            return false;
          }

          const record = snapshot.docs[0].data() as { role?: string; active?: boolean };
          return record.role === 'admin' && record.active !== false;
        })
    );
  }

  if (token.uid) {
    checks.push(
      adminDb()
        .collection('users')
        .where('firebaseUid', '==', token.uid)
        .limit(1)
        .get()
        .then((snapshot) => {
          if (snapshot.empty) {
            return false;
          }

          const record = snapshot.docs[0].data() as { role?: string; active?: boolean };
          return record.role === 'admin' && record.active !== false;
        })
    );
  }

  const results = await Promise.all(checks);
  return results.some(Boolean);
}

export async function canAccessAdmin(token: AdminToken) {
  if (isAdminClaimed(token)) {
    return true;
  }

  try {
    return await isFirestoreAdmin(token);
  } catch {
    return false;
  }
}

export function getAdminDisplayName(token: AdminToken) {
  return token.name ?? token.email ?? 'Admin';
}
