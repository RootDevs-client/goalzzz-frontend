import BreadCrumb from '@/components/Global/BreadCrumb';
import EditMatchForm from '../../_components/UpdateMatchForm';

export default async function Page({ params }) {
  const { match_id } = params;

  const breadMenu = {
    path1: 'live matches',
    link1: '/goaladmin/manage-live',
    path2: 'update',
    link2: `/goaladmin/manage-live/update/${match_id}`,
  };

  return (
    <>
      <BreadCrumb breadMenu={breadMenu} />
      <EditMatchForm match_id={match_id} />
    </>
  );
}
