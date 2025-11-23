import { xoomBackendUrl } from '@/lib/axios/getAxios';
import { useQuery } from 'react-query';

export default function useGetSelectedPointTable() {
  const {
    isLoading: isLoadingSelectedPointTable,
    data: selectedPointTable,
    refetch: refetchSelectedPointTable,
  } = useQuery('selected-point-table', async () => {
    const response = await xoomBackendUrl.get(
      '/api/league/selected-point-table'
    );
    return response.data;
  });
  return {
    selectedPointTable,
    isLoadingSelectedPointTable,
    refetchSelectedPointTable,
  };
}
