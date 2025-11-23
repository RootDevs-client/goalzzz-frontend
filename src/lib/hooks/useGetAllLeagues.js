import { sportMonkUrl } from '@/lib/axios/getAxios';
import { useQuery } from 'react-query';

export default function useGetAllLeagues() {
  const {
    isLoading: isLoadingAllLeagues,
    data: allLeaguesData,
    refetch: refetchAllLeagues,
  } = useQuery('all-leagues', async () => {
    const response = await sportMonkUrl.get(
      '/leagues?include=country;currentSeason;seasons'
    );

    return response.data;
  });
  return { allLeaguesData, isLoadingAllLeagues, refetchAllLeagues };
}
