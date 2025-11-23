import { sportMonkUrl } from '@/lib/axios/getAxios';
import { useQuery } from 'react-query';

export default function useFetchTeamTrophies(id) {
  const {
    isLoading: teamTrophiesLoading,
    data: teamTrophiesData,
    refetch: teamTrophiesRefetch,
  } = useQuery(`team-trophies-${id}`, async () => {
    const response = await sportMonkUrl.get(
      `/teams/${id}?include=trophies.league;trophies.season;trophies.trophy`
    );
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error('Failed to fetch Teams trophies');
    }
  });
  return { teamTrophiesLoading, teamTrophiesData, teamTrophiesRefetch };
}
