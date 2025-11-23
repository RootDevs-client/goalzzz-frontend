import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BiVideoRecording } from 'react-icons/bi';
import { BsCalendar2DayFill } from 'react-icons/bs';
import { FaCrown, FaUsersCog } from 'react-icons/fa';
import { FiMonitor } from 'react-icons/fi';
import { HiMiniCog6Tooth } from 'react-icons/hi2';
import { MdDashboard, MdDevices } from 'react-icons/md';
import { PiNewspaperClipping } from 'react-icons/pi';
import { RiStarHalfLine } from 'react-icons/ri';

export default function SideBar() {
  const pathname = usePathname();
  // const [currentMenu, setCurrentMenu] = useState('');

  // const toggleMenu = (value) => {
  //   setCurrentMenu((oldValue) => {
  //     return oldValue === value ? '' : value;
  //   });
  // };

  // useEffect(() => {
  //   if (pathname.includes('popular')) {
  //     setCurrentMenu('popular');
  //   } else {
  //     setCurrentMenu('');
  //   }
  // }, [pathname]);

  return (
    <div className="h-full text-center">
      <div className="px-2 py-5">
        <ul>
          <Link href="/goaladmin/dashboard">
            <li
              className={`rounded px-5 py-2 font-medium ${
                pathname.includes('goaladmin/dashboard')
                  ? 'text-secondary'
                  : 'text-[#7987a1]'
              } hover:text-secondary transition-all ease-linear duration-300 text-start mb-1 flex items-center`}
            >
              <MdDashboard className="text-xl mr-3 w-[20px]" />
              <span>Dashboard</span>
            </li>
          </Link>
          <Link href="/goaladmin/manage-live">
            <li
              className={`rounded px-5 py-2 font-medium ${
                pathname.includes('goaladmin/manage-live')
                  ? 'text-secondary'
                  : 'text-[#7987a1]'
              } hover:text-secondary transition-all ease-linear duration-300 text-start mb-1 flex items-center`}
            >
              <FiMonitor className="text-xl mr-3 w-[20px]" />
              <span>Manage Live</span>
            </li>
          </Link>
          <Link href="/goaladmin/fixtures">
            <li
              className={`rounded px-5 py-2 font-medium ${
                pathname.includes('goaladmin/fixtures')
                  ? 'text-secondary'
                  : 'text-[#7987a1]'
              } hover:text-secondary transition-all ease-linear duration-300 text-start mb-1 flex items-center`}
            >
              <BsCalendar2DayFill className="text-xl mr-3 w-[20px]" />
              <span>Fixtures</span>
            </li>
          </Link>
          <Link href="/goaladmin/app-settings">
            <li
              className={`rounded px-5 py-2 font-medium ${
                pathname.includes('goaladmin/app-settings')
                  ? 'text-secondary'
                  : 'text-[#7987a1]'
              } hover:text-secondary transition-all ease-linear duration-300 text-start mb-1 flex items-center`}
            >
              <MdDevices className="text-xl mr-3 w-[20px]" />
              <span>App Settings</span>
            </li>
          </Link>
          <Link href="/goaladmin/popular/leagues">
            <li
              className={`${
                pathname.includes('goaladmin/popular/leagues')
                  ? 'text-secondary'
                  : 'text-[#7987a1]'
              } rounded px-5 py-2 font-medium hover:text-secondary transition-all ease-linear duration-300 text-start mb-1 flex items-center`}
            >
              <RiStarHalfLine className="text-xl mr-3 w-[20px]" />
              <span>Popular Leagues</span>
            </li>
          </Link>
          <Link href="/goaladmin/highlights">
            <li
              className={`rounded px-5 py-2 font-medium ${
                pathname.includes('goaladmin/highlights')
                  ? 'text-secondary'
                  : 'text-[#7987a1]'
              } hover:text-secondary transition-all ease-linear duration-300 text-start mb-1 flex items-center`}
            >
              <BiVideoRecording className="text-xl mr-3 w-[20px]" />
              <span>Highlights</span>
            </li>
          </Link>
          <Link href="/goaladmin/news">
            <li
              className={`rounded px-5 py-2 font-medium ${
                pathname.includes('goaladmin/news')
                  ? 'text-secondary'
                  : 'text-[#7987a1]'
              } hover:text-secondary transition-all ease-linear duration-300 text-start mb-1 flex items-center`}
            >
              <PiNewspaperClipping className="text-xl mr-3 w-[20px]" />
              <span>News</span>
            </li>
          </Link>
          <Link href="/goaladmin/users">
            <li
              className={`rounded px-5 py-2 font-medium ${
                pathname.includes('goaladmin/users')
                  ? 'text-secondary'
                  : 'text-[#7987a1]'
              } hover:text-secondary transition-all ease-linear duration-300 text-start mb-1 flex items-center`}
            >
              <FaUsersCog className="text-xl mr-3 w-[20px]" />
              <span>Users</span>
            </li>
          </Link>
          <Link href="/goaladmin/subscriptions">
            <li
              className={`rounded px-5 py-2 font-medium ${
                pathname.includes('goaladmin/subscriptions')
                  ? 'text-secondary'
                  : 'text-[#7987a1]'
              } hover:text-secondary transition-all ease-linear duration-300 text-start mb-1 flex items-center`}
            >
              <FaCrown className="text-xl mr-3 w-[20px]" />
              <span>Subscriptions</span>
            </li>
          </Link>
          {/* <Link href="/goaladmin/payments">
            <li
              className={`rounded px-5 py-2 font-medium ${
                pathname.includes('goaladmin/payments')
                  ? 'text-secondary'
                  : 'text-[#7987a1]'
              } hover:text-secondary transition-all ease-linear duration-300 text-start mb-1 flex items-center`}
            >
              <FaCcStripe className="text-xl mr-3 w-[20px]" />
              <span>Payment</span>
            </li>
          </Link> */}
          <Link href="/goaladmin/general-settings">
            <li
              className={`rounded px-5 py-2 font-medium ${
                pathname.includes('goaladmin/general-settings')
                  ? 'text-secondary'
                  : 'text-[#7987a1]'
              } hover:text-secondary transition-all ease-linear duration-300 text-start mb-1 flex items-center`}
            >
              <HiMiniCog6Tooth className="text-xl mr-3 w-[20px]" />
              <span>General Settings</span>
            </li>
          </Link>
          {/* <motion.li
            className={`select-none text-[#7987a1] rounded p-2 font-medium transition-all ease-linear duration-300 text-start cursor-pointer ${
              currentMenu === 'popular' ? 'active' : ''
            }`}
            onClick={() => toggleMenu('popular')}
            whileHover={{ scale: 1.0 }}
          >
            <div
              className={`flex items-center justify-start hover:text-secondary ${
                currentMenu === 'popular' ? 'text-secondary' : ''
              }`}
            >
              <RiStarHalfLine className="text-xl mr-3 w-[20px]" />
              <span>Popular</span>
              {currentMenu === 'popular' ? (
                <BsChevronDown className="ml-2" />
              ) : (
                <BsChevronRight className="ml-2" />
              )}
            </div>
            {currentMenu === 'popular' && (
              <motion.ul
                className="pl-6 pt-3"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <Link href="/goaladmin/popular/leagues">
                  <motion.li
                    className={`rounded p-2 font-medium flex items-center hover:text-secondary ${
                      pathname.includes('popular/leagues') && 'text-secondary'
                    }`}
                    whileHover={{ scale: 1.0 }}
                  >
                    <IoReturnDownForwardOutline className="mr-3 text-xl" />{' '}
                    Leagues
                  </motion.li>
                </Link>
                <Link href="/goaladmin/popular/teams">
                  <motion.li
                    className={`rounded p-2 font-medium flex items-center hover:text-secondary ${
                      pathname.includes('popular/teams') && 'text-secondary'
                    }`}
                    whileHover={{ scale: 1.0 }}
                  >
                    <IoReturnDownForwardOutline className="mr-3 text-xl" />{' '}
                    Teams
                  </motion.li>
                </Link>
              </motion.ul>
            )}
          </motion.li> */}
        </ul>
      </div>
    </div>
  );
}
