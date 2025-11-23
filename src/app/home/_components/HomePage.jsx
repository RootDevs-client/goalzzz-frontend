import Link from 'next/link';
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';

export default function HomePage() {
  return (
    <div className="bg-gradient-to-r from-slate-900 to-slate-700 flex items-center justify-center h-screen">
      <div className="card rounded-md w-10/12 bg-base-100 shadow-xl ">
        <figure className="w-40 m-auto p-2">
          <img
            src="/images/xslogo.webp"
            alt="Logo"
            width={100}
            height={100}
            className="w-full rounded"
            priority={true}
          />
        </figure>
        <div className="card-body">
          <h4 className="text-center text-2xl font-bold mb-4">
            Watch Sports Matches Online in HD for Free!
          </h4>
          <p className="text-center text-base mb-4">
            Explore and enjoy live broadcasts of popular football matches. Tune
            in for exciting sports action and follow your favorite leagues and
            teams.
          </p>
          <div className="flex items-center justify-center mb-6">
            <Link href="/" className="btn btn-success rounded-md">
              Browse Matches
            </Link>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-2 text-center text-gray-700">
              Follow us on social media and share Goalzzz with your friends
            </h4>
            <div className="flex justify-center gap-2">
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

          <div className="mt-6">
            <h4 className="text-lg font-semibold mb-2 text-gray-600">
              Terms and Conditions
            </h4>
            <p className="text-sm text-gray-600">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
