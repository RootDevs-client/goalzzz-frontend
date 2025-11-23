import { useAuthStore } from '@/lib/auth-store';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { IoLogOutOutline } from 'react-icons/io5';
import { LuUserCog } from 'react-icons/lu';
import { RiMenuFoldFill, RiMenuUnfoldFill, RiUserFill } from 'react-icons/ri';
import { SlLock } from 'react-icons/sl';

export default function Header({ toggleSidebar, isSidebarOpen }) {
  const { user } = useAuthStore();

  const { replace } = useRouter();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsDropdownOpen((prevState) => !prevState);
  };

  const handleLogout = async () => {
    toggleDropdown();

    if (user) {
      useAuthStore.getState().logout();
    }

    replace('/goaladmin/login');
  };

  const handleOutsideClick = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    window.addEventListener('mousedown', handleOutsideClick);
    return () => {
      window.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  return (
    <header className="h-16 bg-white fixed top-0 left-0 right-0 flex items-center justify-between p-2 z-10 shadow-md">
      <div className="flex items-center gap-2">
        <button
          className="ml-2 bg-gray-100 shadow text-white p-2 rounded-full border border-gray-300"
          onClick={toggleSidebar}
        >
          {isSidebarOpen ? (
            <RiMenuFoldFill className="text-2xl text-gray-800" />
          ) : (
            <RiMenuUnfoldFill className="text-2xl text-gray-800" />
          )}
        </button>
        <h4 className="text-lg font-semibold">Goalzzz</h4>
      </div>
      <div className="relative" ref={dropdownRef}>
        <button
          className="bg-gray-100 shadow text-gray-800 p-2 rounded-full border border-gray-300"
          onClick={toggleDropdown}
        >
          <RiUserFill className="text-2xl" />
        </button>
        {isDropdownOpen && (
          <div className="absolute top-[60px] right-0 bg-white rounded shadow-md z-20 p-2 w-52">
            <ul className="flex flex-col items-center">
              <li className="font-medium p-2 text-gray-600">{user?.name}</li>
              <li className="w-full font-medium flex items-center justify-start text-sm hover:bg-rose-200 p-2 rounded cursor-pointer">
                <LuUserCog className="mr-2 text-base" />
                Edit Profile
              </li>
              <li className="w-full font-medium flex items-center justify-start text-sm hover:bg-rose-200 p-2 rounded cursor-pointer">
                <SlLock className="mr-2 text-base" />
                Change Password
              </li>
              <li
                onClick={handleLogout}
                className="w-full font-medium flex items-center justify-start text-sm hover:bg-rose-200 p-2 rounded cursor-pointer"
              >
                <IoLogOutOutline className="mr-2 text-base" />
                Logout
              </li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
}
