import BreadCrumb from '@/components/Global/BreadCrumb';
import CreateAppSettingsForm from './CreateAppSettingsForm';

export default function AppSettingsHome() {
  const breadMenu = {
    path1: 'App Settings',
    link1: '/xoomadmin/app-settings',
  };

  return (
    <div>
      <div className="">
        <BreadCrumb breadMenu={breadMenu} />
        {/* <Link
          href="/xoomadmin/app-settings/create"
          className="btn btn-success btn-sm rounded-md"
        >
          Create Settings
        </Link> */}

        <CreateAppSettingsForm />
      </div>
    </div>
  );
}
