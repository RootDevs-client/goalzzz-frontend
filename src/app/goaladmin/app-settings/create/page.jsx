import BreadCrumb from '@/components/Global/BreadCrumb';
import CreateAppSettingsForm from '../_components/CreateAppSettingsForm';

export default function page() {
  const breadMenu = {
    path1: 'App Settings',
    link1: '/goaladmin/app-settings',
    path2: 'Create Settings',
    link2: '/goaladmin/app-settings/create',
  };

  return (
    <div>
      <BreadCrumb breadMenu={breadMenu} />

      <CreateAppSettingsForm />
    </div>
  );
}
