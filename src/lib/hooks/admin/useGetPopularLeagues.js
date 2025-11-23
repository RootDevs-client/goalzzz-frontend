import { xoomBackendUrl } from '@/lib/axios/getAxios';
import { useQuery } from 'react-query';

export default function useGetPopularLeagues(token) {
  const {
    isLoading: popularLeaguesLoading,
    data: popularLeagues,
    refetch: popularLeaguesRefetch,
  } = useQuery('popular-leagues', async () => {
    const response = await xoomBackendUrl.get(`api/admin/popular-leagues`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (response.status === 200) {
      return response.data?.data;
    } else {
      throw new Error('Failed to fetch all Leagues data');
    }
  });
  return { popularLeagues, popularLeaguesLoading, popularLeaguesRefetch };
}
