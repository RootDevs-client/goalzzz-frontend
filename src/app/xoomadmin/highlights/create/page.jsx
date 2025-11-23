import BreadCrumb from '@/components/Global/BreadCrumb';
import CreateHighlight from '../_components/CreateHighlight';

export default async function page({ searchParams }) {
  const breadMenu = {
    path1: 'Highlights',
    link1: '/xoomadmin/highlights',
    path2: 'Create',
    link2: '/xoomadmin/highlights/create',
  };

  return (
    <>
      <BreadCrumb breadMenu={breadMenu} />
      <CreateHighlight query={searchParams} />
    </>
  );
}
