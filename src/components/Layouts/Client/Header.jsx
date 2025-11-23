'use client';
import LeftSideDrawer from '@/components/Global/LeftSideDrawer';
import AuthModal from '@/components/Modal/AuthModal';
import { useAuthStore } from '@/lib/auth-store';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export default function Header() {
  const pathname = usePathname();
  const { replace } = useRouter();

  const { user } = useAuthStore();

  const handleLogout = async () => {
    if (user) {
      useAuthStore.getState().logout();
    }
    replace('/phone-login');
    toast.success('Signed out successfully!');
  };

  const isCurrentPath = (path) => pathname.includes(path);

  return (
    <header>
      <div className="relative w-full mx-auto h-[75px] bg-primary hidden sm:block">
        <div className="absolute -top-10 z-40 inset-0 bg-primary transform -skew-y-[0.5deg] origin-bottom-right"></div>
        <div className="relative z-50 max-w-screen-xl p-4 mx-auto top-2">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="flex items-center text-2xl font-semibold text-white uppercase md:text-3xl"
            >
              <img src="logo-white.png" alt="App Logo" className="h-14" />
            </Link>
            <ul className="flex items-center gap-3 text-lg text-white uppercase md:gap-5">
              <Link
                className={` ${
                  pathname === '/' || isCurrentPath('/match')
                    ? "text-secondary after:content-['_-'] after:absolute relative after:top-4 after:text-white after:left-11"
                    : 'text-white hover:text-secondary'
                }`}
                href="/"
              >
                matches
              </Link>
              <Link
                className={` ${
                  isCurrentPath('/favorites')
                    ? "text-secondary after:content-['_-'] after:absolute relative after:top-4 after:text-white after:left-12"
                    : 'text-white hover:text-secondary'
                }`}
                href="/favorites"
              >
                favorites
              </Link>
              <Link
                className={` ${
                  isCurrentPath('/watch')
                    ? "text-secondary after:content-['_-'] after:absolute relative after:top-4 after:text-white after:left-8"
                    : 'text-white hover:text-secondary'
                }`}
                href="/watch"
              >
                watch
              </Link>
              <Link
                className={` ${
                  isCurrentPath('/news')
                    ? "text-secondary after:content-['_-'] after:absolute relative after:top-4 after:text-white after:left-6"
                    : 'text-white hover:text-secondary'
                }`}
                href="/news"
              >
                news
              </Link>
              {user ? (
                <>
                  <div className="dropdown dropdown-end">
                    <div
                      tabIndex={0}
                      role="button"
                      className="btn btn-ghost btn-circle btn-sm avatar ring-2 ring-white"
                    >
                      <div className="w-10 rounded-full">
                        {user?.image ? (
                          <img
                            src={user?.image}
                            alt="User Profile"
                            height={40}
                            width={40}
                          />
                        ) : (
                          <img
                            src="/images/default_profile.png"
                            alt="User Profile"
                            height={40}
                            width={40}
                          />
                        )}
                      </div>
                    </div>
                    <ul
                      tabIndex={0}
                      className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow-md bg-primary rounded-md border border-gray-200 w-52"
                    >
                      <div className="flex items-center gap-2 px-2 py-1 font-medium">
                        <span className="text-white hover:text-secondary">
                          {user?.name}
                        </span>{' '}
                      </div>
                      <li className="px-2 py-1 font-medium text-white hover:text-secondary">
                        <Link href={'/profile'}>Profile</Link>
                      </li>
                      <li
                        className="w-full mx-auto mt-3 rounded-md btn btn-sm btn-error"
                        onClick={handleLogout}
                      >
                        Logout
                      </li>
                    </ul>
                  </div>
                </>
              ) : (
                <Link
                  href={'/phone-login'}
                  className="text-white cursor-pointer hover:text-secondary"
                >
                  login
                </Link>
              )}
            </ul>
          </div>
        </div>
      </div>
      <div className="block sm:hidden">
        <LeftSideDrawer />
      </div>
      {/* Modals */}
      <AuthModal />
    </header>
  );
}
