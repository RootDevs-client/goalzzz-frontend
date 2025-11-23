'use client';

import { useAuthStore } from '@/lib/auth-store';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import 'react-perfect-scrollbar/dist/css/styles.css';
import Footer from './Footer';
import Header from './Header';
import SideBar from './SideBar';

export default function AdminLayout({ children }) {
  const { push } = useRouter();

  const { token, isAdmin } = useAuthStore();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    if (!token && !isAdmin) {
      push('/login');
    }

    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex h-screen">
      <Header toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
      <aside
        className={`mt-16 bg-white ${
          isSidebarOpen ? 'w-60' : 'w-0'
        } transition-all`}
        style={{ top: '64px', height: `calc(100vh - 64px)` }}
      >
        <PerfectScrollbar>
          <SideBar />
        </PerfectScrollbar>
      </aside>
      <div className="flex flex-1 flex-col mt-16 bg-slate-100">
        {/* <PerfectScrollbar> */}
        <main
          className={`overflow-y-auto flex-grow md:px-10 px-2 md:py-5 py-2 scroll-smooth h-full`}
        >
          {children}
        </main>
        {/* </PerfectScrollbar> */}
        <Footer />
      </div>
    </div>
  );
}
