import { useQuery } from 'react-query';
import { xoomBackendUrl } from '../axios/getAxios';

export default function useGetAllMatches() {
  const {
    data: allMatches,
    error: allMatchesError,
    isLoading: allMatchesLoading,
    refetch: allMatchesRefetch,
  } = useQuery('allMatches', async () => {
    const { data } = await xoomBackendUrl.get('/api/admin/matches');
    return data?.data;
  });

  return { allMatches, allMatchesError, allMatchesLoading, allMatchesRefetch };
}
