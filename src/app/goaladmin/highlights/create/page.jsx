import BreadCrumb from '@/components/Global/BreadCrumb';
import CreateHighlight from '../_components/CreateHighlight';

export default async function page({ searchParams }) {
  const breadMenu = {
    path1: 'Highlights',
    link1: '/goaladmin/highlights',
    path2: 'Create',
    link2: '/goaladmin/highlights/create',
  };

  return (
    <>
      <BreadCrumb breadMenu={breadMenu} />
      <CreateHighlight query={searchParams} />
    </>
  );
}
