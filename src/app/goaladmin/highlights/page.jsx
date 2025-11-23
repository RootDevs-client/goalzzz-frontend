import BreadCrumb from '@/components/Global/BreadCrumb';
import HighlightsHome from './_components/HighlightsHome';

export const metadata = {
  title: 'Goalzzz Admin | Highlight',
};

export default async function page() {
  const breadMenu = {
    path1: 'Highlights',
    link1: '/goaladmin/highlights',
  };

  return (
    <div>
      <BreadCrumb breadMenu={breadMenu} />
      <HighlightsHome />
    </div>
  );
}
