import BreadCrumb from '@/components/Global/BreadCrumb';
import CreateAppSettingsForm from '../_components/CreateAppSettingsForm';

export default function page() {
  const breadMenu = {
    path1: 'App Settings',
    link1: '/xoomadmin/app-settings',
    path2: 'Create Settings',
    link2: '/xoomadmin/app-settings/create',
  };

  return (
    <div>
      <BreadCrumb breadMenu={breadMenu} />

      <CreateAppSettingsForm />
    </div>
  );
}
