import moment from 'moment';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { PiVideoLight } from 'react-icons/pi';

import { FaRegCopyright, FaRegNewspaper } from 'react-icons/fa6';

export default function Footer2() {
  const updateYear = moment().format('YYYY [escaped] YYYY').split(' ');

  const pathname = usePathname();
  const isCurrentPath = (path) => pathname.includes(path);

  return (
    <div className="mt-16">
      <div className="web_menu_bar bg-gray-100 relative mt-12 pb-5">
        <div className="bg-gray-100  -mt-4 -skew-y-[0.5deg] ">
          <div className="mx-auto w-full max-w-screen-xl py-5 skew-y-[0.5deg]">
            <div className="flex flex-wrap justify-between ">
              <div className="p-0">
                <img src="logo.png" alt="App Logo" className="h-14" />
                <h2 className="my-2 font-bold ms-2">
                  Goalzzz is The best Football App
                </h2>
              </div>
              <div className="font-semibold">
                <p>
                  <Link href="/">Matches</Link>
                </p>
                <p className="py-1">
                  <Link href="/favorites">Favorites</Link>
                </p>
                <p className="py-1">
                  <Link href="/news">News</Link>
                </p>
                <p className="py-1">
                  <Link href="/watch">Highlights</Link>
                </p>
              </div>
              {/* <div className="font-semibold">
                <p>
                  {' '}
                  <a href="">Terms of Use</a>
                </p>
                <p className="py-1">
                  {' '}
                  <a href="">Privacy Policy</a>
                </p>
                <p className="py-1">
                  {' '}
                  <a href="">Contact</a>
                </p>
              </div> */}
              <div className="font-bold px-2">
                {/* <div className="py-4">
                  <h2>Follow Us On</h2>
                  <div className="flex gap-2">
                    
                    <div className="w-10 h-10 rounded-full bg-gray-200 flex justify-center items-center">
                      <FaFacebookF className="text-blue-500 text-xl" />
                    </div>
                    <div className="w-10 h-10 rounded-full bg-gray-200 flex justify-center items-center">
                      <FaTwitter className="text-blue-400 text-xl" />
                    </div>
                    <div className="w-10 h-10 rounded-full bg-gray-200 flex justify-center items-center">
                      <FaYoutube className="text-red-600 text-xl" />
                    </div>
                    <div className="w-10 h-10 rounded-full bg-gray-200 flex justify-center items-center">
                      <FaInstagram className="text-rose-500 text-xl" />
                    </div>
                  </div>
                </div> 
                <div>
                  <h2>Get The App</h2>
                  <div className="flex gap-2">
              <FaFacebookF />
                  <TiSocialTwitter />
                    <div className="w-10 h-10 rounded-full bg-gray-200 flex justify-center items-center">
                      <FaApple className="text-black text-xl" />
                    </div>
                    <div className="w-10 h-10 rounded-full bg-gray-200 flex justify-center items-center">
                      <FaGooglePlay className="text-gray-700 text-xl" />
                    </div>
                  </div>
                </div> */}
              </div>
            </div>
            <hr className="my-3 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-4" />
            {/* copyright section */}
            <div className="flex justify-center">
              <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
                <span className="">
                  <FaRegCopyright className="font-bold text-black inline-block" />
                </span>{' '}
                Copyright {updateYear[2]}{' '}
                <span className="hover:underline font-bold text-black">
                  Goalzzz™
                </span>
                . All Rights Reserved.
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="mobile_menu_bar bg-black w-full h-16 mt-8 pb-5 fixed bottom-0 left-0">
        <div className="flex flex-wrap justify-around p-2">
          <div className="flex flex-col justify-center">
            <Link
              className={` ${
                pathname === '/' || isCurrentPath('/match')
                  ? "text-secondary after:content-[''] after:absolute relative after:top-4 after:text-white after:left-11"
                  : 'text-white '
              }`}
              href="/"
            >
              <div className="flex justify-center">
                <img
                  src={
                    pathname === '/' || isCurrentPath('/match')
                      ? '/icons/soccer_red.png'
                      : '/icons/soccer_field.png'
                  }
                  width={25}
                  height={25}
                  alt="Picture of the author"
                />
              </div>
              <div className="font-xs">
                <small className="text-center">Home</small>
              </div>
            </Link>
          </div>

          <div className="flex flex-col justify-center">
            <Link
              className={` ${
                pathname === '/favorites'
                  ? "text-secondary after:content-[''] after:absolute relative    after:top-4 after:text-white after:left-11"
                  : 'text-white'
              }`}
              href="/favorites"
            >
              <div className="flex justify-center">
                <img
                  src={
                    pathname === '/favorites'
                      ? '/icons/star_red.png'
                      : '/icons/star_white.png'
                  }
                  width={25}
                  height={25}
                  alt="Picture of the author"
                />
              </div>
              <div className="font-xs">
                <small className="text-center">Favorites</small>
              </div>
            </Link>
          </div>

          <div className="flex flex-col justify-center">
            <Link
              className={` ${
                pathname === '/watch'
                  ? "text-secondary after:content-[''] after:absolute relative after:top-4 after:text-white after:left-11"
                  : 'text-white'
              }`}
              href="/watch"
            >
              <div className="flex justify-center">
                {pathname === '/watch' ? (
                  <div>
                    <PiVideoLight className="text-red-500 text-2xl font-extrabold" />
                  </div>
                ) : (
                  <div>
                    <PiVideoLight className="text-2xl font-extrabold" />
                  </div>
                )}
              </div>
              <div className="font-xs">
                <small className="text-center">Watch</small>
              </div>
            </Link>
          </div>

          <div className="flex flex-col justify-center">
            <Link
              className={` ${
                pathname === '/news'
                  ? "text-secondary after:content-[''] after:absolute relative after:top-4 after:text-white after:left-11"
                  : 'text-white'
              }`}
              href="/news"
            >
              <div className="flex justify-center">
                {pathname === '/news' ? (
                  <div>
                    <FaRegNewspaper className="text-red-500 text-2xl" />
                  </div>
                ) : (
                  <div>
                    <FaRegNewspaper className=" text-2xl" />
                  </div>
                )}
              </div>
              <div className="font-xs">
                <small className="text-center">News</small>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
