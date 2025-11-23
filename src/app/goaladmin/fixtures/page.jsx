import Link from 'next/link';
import { FaHome } from 'react-icons/fa';
import FixtureContainer from './_components/FixtureContainer';

export const metadata = {
  title: 'Goalzzz Admin | Fixtures',
};

export default function Page() {
  return (
    <div>
      <div className="text-sm breadcrumbs p-5">
        <ul>
          <li>
            <Link href="/xoomadmin/dashboard">
              <FaHome className="text-xl" />
            </Link>
          </li>
          <li className="font-medium">Fixture</li>
        </ul>
      </div>
      <div className="card w-full bg-white shadow-md">
        <div className="card-body">
          <h2 className="card-title">Fixtures</h2>
          <FixtureContainer />
        </div>
      </div>
    </div>
  );
}
