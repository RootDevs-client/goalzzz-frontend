import BreadCrumb from '@/components/Global/BreadCrumb';
import CloneMatchForm from '../../_components/CloneMatchForm';

export default async function Page({ params }) {
  const { match_id } = params;
  const breadMenu = {
    path1: 'live matches',
    link1: '/admin/manage-live',
    path2: 'clone',
    link2: `/admin/manage-live/clone/${match_id}`,
  };

  return (
    <>
      <BreadCrumb breadMenu={breadMenu} />
      <CloneMatchForm match_id={match_id} />
    </>
  );
}
