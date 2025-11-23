import ThreeColumnLayout from '@/components/Layouts/Client/ThreeColumnLayout';
import WatchHome from './_components/WatchHome';

export const metadata = {
  title: 'Goalzzz | Watch',
};

export default async function Page() {
  return (
    <ThreeColumnLayout>
      <WatchHome />
    </ThreeColumnLayout>
  );
}
