import BreadCrumb from '@/components/Global/BreadCrumb';
import SettingsMainForm from './SettingsMainForm';

export default function GeneralSettingsHome() {
  const breadMenu = {
    path1: 'administration',
    link1: '/goaladmin/general-settings',
  };

  return (
    <>
      <div className="flex items-center justify-between py-5">
        <BreadCrumb breadMenu={breadMenu} />
      </div>
      <SettingsMainForm />
    </>
  );
}
