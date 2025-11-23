import { xoomBackendUrl } from '@/lib/axios/getAxios';
import { useQuery } from 'react-query';

export default function useGetAppSettings() {
  const {
    isLoading: isLoadingAppSettings,
    data: appSettings,
    refetch: refetchAppSettings,
  } = useQuery('app-settings', async () => {
    const response = await xoomBackendUrl.get('/api/admin/app-settings');
    return response.data;
  });
  return { appSettings, isLoadingAppSettings, refetchAppSettings };
}
