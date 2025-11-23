import { sportMonkUrl } from '@/lib/axios/getAxios';
import { useQuery } from 'react-query';

export default function useFetchLeagueTeamStates(id) {
  const { isLoading: leagueTeamStatesLoading, data: leagueTeamStatesData } =
    useQuery(`league-teamStates-${id}`, async () => {
      const response = await sportMonkUrl.get(
        `/seasons/${id}?include=teams.statistics.details&filters=teamStatisticSeasons:${id};teamStatisticDetailTypes:52,194`
      );
      if (response.status === 200) {
        return response.data?.data;
      } else {
        throw new Error('Failed to fetch all Leagues data');
      }
    });
  return { leagueTeamStatesLoading, leagueTeamStatesData };
}
