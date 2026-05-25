import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { AdminShell } from '@/components/admin/admin-shell';
import { adminAuth } from '@/lib/firebase-admin';
import { canAccessAdmin, getAdminDisplayName } from '@/lib/admin-access';

async function getAdminUser() {
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
      name: getAdminDisplayName(decoded)
    };
  } catch {
    return null;
  }
}

export default async function AdminLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getAdminUser();

  if (!user) {
    redirect('/admin/login');
  }

  return <AdminShell userName={user.name}>{children}</AdminShell>;
}
