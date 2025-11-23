import { xoomBackendUrl } from '@/lib/axios/getAxios';
import { useQuery } from 'react-query';

export default function useGetTopLeagues() {
  const {
    isLoading: isLoadingTopLeagues,
    data: topLeagues,
    refetch: refetchTopLeagues,
  } = useQuery('top-leagues', async () => {
    const response = await xoomBackendUrl.get('/api/league/top-leagues');
    return response.data;
  });
  return { topLeagues, isLoadingTopLeagues, refetchTopLeagues };
}
