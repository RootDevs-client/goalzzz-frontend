import { xoomBackendUrl } from '@/lib/axios/getAxios';
import PhoneLogin from '../_components/PhoneLogin';

export const getGeneralSettings = async () => {
  try {
    const res = await xoomBackendUrl.get(`/api/general-settings`);
    return res.data;
  } catch (error) {
    console.error('Error fetching single news:', error);
    throw error;
  }
};

export default async function page({ searchParams }) {
  const { MobileNumber } = searchParams;

  let phone;
  if (MobileNumber && MobileNumber?.startsWith(' ')) {
    phone = '+' + MobileNumber?.trim();
  } else {
    phone = MobileNumber;
  }

  const settings = await getGeneralSettings();

  return (
    <div className="max-w-screen-lg mx-auto px-2">
      <PhoneLogin phone={phone} countries={settings?.data?.allowedCountries} />
    </div>
  );
}
