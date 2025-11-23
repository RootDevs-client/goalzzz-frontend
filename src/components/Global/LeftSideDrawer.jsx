import { useAuthStore } from '@/lib/auth-store';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import toast from 'react-hot-toast';
import { HiMenuAlt2 } from 'react-icons/hi';
import { IoClose } from 'react-icons/io5';

export default function LeftSideDrawer() {
  const { user } = useAuthStore();

  const pathname = usePathname();
  const isCurrentPath = (path) => pathname.includes(path);

  const closeDrawer = () => {
    document.getElementById('menu-drawer').checked = false;
  };

  const handleLogout = async () => {
    if (user) {
      useAuthStore.getState().logout();
    }
    closeDrawer();
    toast.success('Signed out successfully!');
  };

  return (
    <div className="flex items-center justify-between h-[75px] bg-white p-3">
      <Link
        href="/"
        className="flex items-center text-2xl font-semibold text-black uppercase md:text-3xl"
      >
        <img src="logo.png" alt="App Logo" className="h-14" />
      </Link>

      <div>
        {/* drawer */}
        <div className="z-10 drawer">
          <input id="menu-drawer" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content">
            {/* Page content here */}
            <label
              htmlFor="menu-drawer"
              className="cursor-pointer drawer-button"
            >
              <HiMenuAlt2 className="text-2xl text-secondary hover:text-black" />
            </label>
          </div>

          <div className="drawer-side">
            <label
              htmlFor="menu-drawer"
              aria-label="close sidebar"
              className="drawer-overlay"
            ></label>

            <div className="min-h-full relative p-4 menu w-80 bg-base-100 text-base-content rounded-tr-2xl rounded-br-2xl">
              <button
                className="btn btn-ghost absolute right-0"
                onClick={() =>
                  (document.getElementById('menu-drawer').checked = false)
                }
              >
                <IoClose className="text-2xl text-secondary" />
              </button>
              <div className="flex flex-col p-5">
                <div className="flex flex-col">
                  <Link
                    href="/"
                    className="text-2xl font-semibold text-gray-800 uppercase"
                    onClick={closeDrawer}
                  >
                    <span className="text-secondary">x</span>oom sports
                  </Link>
                  {/* <p className="pt-5 font-semibold">LOGIN OR REGISTER</p> */}
                </div>

                <div className="py-5">
                  <hr className="border-t-2 border-white" />
                </div>

                <div id="menu_settings">
                  <p className="py-1 text-lg font-semibold">PAGES</p>

                  <div className="flex justify-between py-1">
                    <Link
                      className={` ${
                        pathname === '/' || isCurrentPath('/match')
                          ? "text-secondary after:content-[''] after:absolute relative after:top-4 after:text-white after:left-11"
                          : 'text-black hover:text-secondary'
                      }`}
                      href="/"
                      onClick={closeDrawer}
                    >
                      <p className="text-sm font-semibold">HOME</p>
                    </Link>
                  </div>

                  <div className="flex justify-between py-1">
                    <Link
                      className={` ${
                        isCurrentPath('/favorites')
                          ? "text-secondary after:content-[''] after:absolute relative after:top-4 after:text-white after:left-12"
                          : 'text-black hover:text-secondary'
                      }`}
                      href="/favorites"
                      onClick={closeDrawer}
                    >
                      <p className="text-sm font-semibold uppercase">
                        favorites
                      </p>
                    </Link>
                  </div>

                  <div className="flex justify-between py-1">
                    <Link
                      className={` ${
                        isCurrentPath('/watch')
                          ? "text-secondary after:content-[''] after:absolute relative after:top-4 after:text-white after:left-8"
                          : 'text-black hover:text-secondary'
                      }`}
                      href="/watch"
                      onClick={closeDrawer}
                    >
                      <p className="text-sm font-semibold">WATCH</p>
                    </Link>
                  </div>

                  <div className="flex justify-between py-1">
                    <Link
                      className={` ${
                        isCurrentPath('/news')
                          ? "text-secondary after:content-[''] after:absolute relative after:top-4 after:text-white after:left-8"
                          : 'text-black hover:text-secondary'
                      }`}
                      href="/news"
                      onClick={closeDrawer}
                    >
                      <p className="text-sm font-semibold">NEWS</p>
                    </Link>
                  </div>

                  {user ? (
                    <>
                      <div className="dropdown dropdown-bottom py-1">
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
                          <li>
                            <Link
                              className="px-2 py-1 font-medium text-white !hover:text-gray-200"
                              href={'/profile'}
                              onClick={() =>
                                (document.getElementById(
                                  'menu-drawer'
                                ).checked = false)
                              }
                            >
                              Profile
                            </Link>
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
                      href={'/login'}
                      className="text-black text-sm uppercase font-semibold py-1 cursor-pointer hover:text-secondary"
                      onClick={closeDrawer}
                    >
                      login
                    </Link>
                  )}
                </div>
                {/* 
                <div id="menu_support" className="pt-8">
                  <p className="py-1 text-lg font-semibold ">SUPPORT</p>

                  <Link
                    href="#"
                    className="flex justify-between py-1 cursor-pointer hover:text-secondary"
                    onClick={closeDrawer}
                  >
                    <div>
                      <p className="text-sm font-semibold">SUPPORT & CONTACT</p>
                    </div>
                    <div>
                      <GoArrowRight className="text-2xl font-bold" />
                    </div>
                  </Link>

                  <div className="flex justify-between py-1 cursor-pointer hover:text-secondary">
                    <div>
                      <p className="text-sm font-semibold">RATE THIS APP</p>
                    </div>
                    <div>
                      <GoArrowRight className="text-2xl font-bold" />
                    </div>
                  </div>

                  <Link
                    href="https://xoomsport.com/terms"
                    className="flex justify-between py-1 cursor-pointer hover:text-secondary"
                    onClick={closeDrawer}
                  >
                    <div>
                      <p className="text-sm font-semibold">TERMS OF USE</p>
                    </div>
                    <div>
                      <GoArrowRight className="text-2xl font-bold" />
                    </div>
                  </Link>

                  <Link
                    href="https://xoomsport.com/policy"
                    className="flex justify-between py-1 cursor-pointer hover:text-secondary"
                    onClick={closeDrawer}
                  >
                    <div>
                      <p className="text-sm font-semibold">PRIVACY & POLICY</p>
                    </div>
                    <div>
                      <GoArrowRight className="text-2xl font-bold" />
                    </div>
                  </Link>
                </div> */}

                <div className="py-5">
                  <hr className="border-t-2 border-white " />
                </div>

                <div className="">
                  <p className="font-semibold text-rose-500">
                    COPYRIGHT &copy; XOOMSPORT
                  </p>
                  <p className="pt-1 font-semibold">ALL RIGHTS RESERVED.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* drawer */}
      </div>
    </div>
  );
}
