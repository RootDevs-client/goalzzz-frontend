import { sportMonkUrl } from '@/lib/axios/getAxios';
import { useQuery } from 'react-query';

export default function useFetchTeamInfo(id) {
  const { isLoading: teamInfoLoading, data: teamInfoData } = useQuery(
    `match-team-info-${id}`,
    async () => {
      const response = await sportMonkUrl.get(
        `/teams/${id}?include=latest.participants;latest.scores;latest.state;latest.league;`
      );
      if (response.status === 200) {
        return response.data?.data;
      } else {
        throw new Error('Failed to fetch all team data');
      }
    }
  );
  return { teamInfoLoading, teamInfoData };
}
