import { sportMonkUrl } from '@/lib/axios/getAxios';
import { useQuery } from 'react-query';

export default function useFetchLeagueFixtures(id) {
  const { isLoading: leagueFixturesLoading, data: leagueFixturesData } =
    useQuery(`league-fixtures-${id}`, async () => {
      const response = await sportMonkUrl.get(
        `/seasons/${id}?include=fixtures.participants;fixtures.scores;fixtures.state;fixtures.league`
      );
      if (response.status === 200) {
        return response.data;
      } else {
        throw new Error('Failed to fetch league fixture data!');
      }
    });
  return { leagueFixturesLoading, leagueFixturesData };
}
