import { sportMonkUrl } from '@/lib/axios/getAxios';
import { useQuery } from 'react-query';

export default function useFetchPlayerStates(id) {
  const { isLoading: leaguePlayerStatesLoading, data: leaguePlayerStatesData } =
    useQuery(`league-playerStates-${id}`, async () => {
      const response = await sportMonkUrl.get(
        `/seasons/${id}?include=topscorers.player;topscorers.participant&filters=seasonTopscorerTypes:208,209`
      );
      if (response.status === 200) {
        return response.data?.data;
      } else {
        throw new Error('Failed to fetch all Leagues data');
      }
    });
  return { leaguePlayerStatesLoading, leaguePlayerStatesData };
}
