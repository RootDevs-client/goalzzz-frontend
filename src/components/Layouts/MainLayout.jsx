'use client';

import { useAuthStore } from '@/lib/auth-store';
import { usePathname } from 'next/navigation';
import AdminLayout from './Admin/AdminLayout';
import BlankLayout from './BlankLayout';
import ClientLayout from './Client/ClientLayout';

export default function MainLayout({ children }) {
  const pathname = usePathname();

  const { isAdmin } = useAuthStore();

  if (pathname.includes('xoomadmin/login')) {
    return <BlankLayout>{children}</BlankLayout>;
  } else if (pathname.includes('xoomadmin') && isAdmin) {
    return <AdminLayout>{children}</AdminLayout>;
  } else {
    return <ClientLayout>{children}</ClientLayout>;
  }
}
