'use client';

import MainLoader from '@/components/Global/MainLoader';
import { useAuthStore } from '@/lib/auth-store';
import { xoomBackendUrl } from '@/lib/axios/getAxios';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function AuthContext({ children }) {
  const router = useRouter();
  const pathname = usePathname();

  const { token, isAdmin, user, updateUser, setLoading, isLoading } =
    useAuthStore();

  useEffect(() => {
    if (token === undefined) return;
    const validateUser = async () => {
      if (token && !isAdmin) {
        setLoading(true);

        try {
          const { data } = await xoomBackendUrl.get('/api/user/me', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (data.status) {
            updateUser(data?.user);

            if (token && data.user) {
              router.replace('/');
            }
          }
        } catch (error) {
          console.error('Failed to validate user:', error);
          useAuthStore.getState().logout();
          router.replace('/');
        } finally {
          setLoading(false);
        }
      }
    };

    validateUser();
  }, [token, updateUser, router]);

  useEffect(() => {
    if (token === undefined) return;
    const publicRoutes = [
      '/login',
      '/phone-login',
      '/register',
      '/xoomadmin/login',
      '/package',
      '/payment/success',
      '/payment/canceled',
      '/error',
    ];
    const isPublicRoute = publicRoutes.includes(pathname);
    const isAdminRoute = pathname.startsWith('/xoomadmin');

    if (!token && !isPublicRoute) {
      router.replace('/phone-login');
      return;
    }

    if (isAdminRoute && !isAdmin && pathname !== '/xoomadmin/login') {
      router.replace('/xoomadmin/login');
      return;
    }
  }, [pathname, token, isAdmin, user, router]);

  if (isLoading) {
    return <MainLoader />;
  }

  return children;
}
