import BreadCrumb from '@/components/Global/BreadCrumb';
import Link from 'next/link';
import { FaPlus } from 'react-icons/fa6';
import AllMatches from './AllMatches';

export default function LiveMatchesHome() {
  const breadMenu = {
    path1: 'live matches',
    link1: '/xoomadmin/manage-live',
  };

  return (
    <div>
      <div className="flex items-center justify-between ">
        <BreadCrumb breadMenu={breadMenu} />

        <Link
          href="/xoomadmin/manage-live/create"
          className="btn btn-primary btn-outline btn-sm rounded"
        >
          <FaPlus />
          Create New match
        </Link>
      </div>
      <AllMatches />
    </div>
  );
}
