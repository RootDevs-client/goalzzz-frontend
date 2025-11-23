import { xoomBackendUrl } from '@/lib/axios/getAxios';
import { useQuery } from 'react-query';

export default function useGetBlackList() {
  const {
    isLoading: isLoadingBlackList,
    data: blackList,
    refetch: refetchBlackList,
  } = useQuery('black-list', async () => {
    const response = await xoomBackendUrl.put('/api/black-list/update');
    return response.data;
  });
  return { blackList, isLoadingBlackList, refetchBlackList };
}
