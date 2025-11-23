import { sportMonkUrl } from '@/lib/axios/getAxios';
import { useQuery } from 'react-query';

export default function useTeamDetails(id) {
  const { isLoading: teamDetailsLoading, data: teamDetailsData } = useQuery(
    `team-details-${id}`,
    async () => {
      const response = await sportMonkUrl.get(
        `/teams/${id}?include=activeSeasons.league;country;upcoming.participants;upcoming.scores;upcoming.state;upcoming.league;latest.participants;latest.scores;latest.state;latest.league`
      );
      if (response.status === 200) {
        return response.data;
      } else {
        throw new Error('Failed to fetch team statistics data!');
      }
    }
  );
  return { teamDetailsLoading, teamDetailsData };
}
