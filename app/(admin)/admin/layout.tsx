import { redirect } from 'next/navigation';
import { AdminShell } from '@/components/admin/admin-shell';
import { getAdminUserFromSession } from '@/lib/admin-session';

export default async function AdminLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getAdminUserFromSession();

  if (!user) {
    redirect('/admin/login');
  }

  return <AdminShell userName={user.name}>{children}</AdminShell>;
}
