import Link from 'next/link';
import { FaHome } from 'react-icons/fa';
import { FaAngleRight } from 'react-icons/fa6';

export default function BreadCrumb({ breadMenu }) {
  return (
    <div className="flex" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-3">
        <li className="inline-flex items-center">
          <Link href="/admin/dashboard">
            <FaHome className="mr-2 text-xl" />
          </Link>
          <FaAngleRight className="mr-2 text-sm" />
          <Link
            href={breadMenu.link1}
            className="inline-flex items-center text-base font-semibold text-gray-700 hover:text-secondary"
          >
            <span className="capitalize">{breadMenu.path1}</span>
          </Link>
        </li>
        {breadMenu.path2 && (
          <li>
            <div className="flex items-center">
              <FaAngleRight className="mr-2 text-sm" />
              <Link
                href={breadMenu.link2}
                className="inline-flex items-center text-base font-semibold text-gray-700 hover:text-secondary"
              >
                <span className="capitalize">{breadMenu.path2}</span>
              </Link>
            </div>
          </li>
        )}
        {breadMenu.path3 && (
          <li aria-current="page">
            <div className="flex items-center">
              <svg
                className="mx-1 h-3 w-3 text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 9 4-4-4-4"
                />
              </svg>
              <span className="ml-1 text-base font-medium capitalize text-gray-500 dark:text-gray-400 md:ml-2">
                {breadMenu.path3}
              </span>
            </div>
          </li>
        )}
      </ol>
    </div>
  );
}
