import BreadCrumb from '@/components/Global/BreadCrumb';
import CreateMatchForm from '../_components/CreateMatchForm';

export default async function Page({ searchParams }) {
  const breadMenu = {
    path1: 'live matches',
    link1: '/xoomadmin/manage-live',
    path2: 'create',
    link2: '/xoomadmin/manage-live/create',
  };

  return (
    <>
      <BreadCrumb breadMenu={breadMenu} />
      <CreateMatchForm queryString={searchParams} />
    </>
  );
}
