import { sportMonkUrl } from '@/lib/axios/getAxios';
import { useQuery } from 'react-query';

export default function useFetchLeagueStandings(id) {
  const {
    isLoading: leagueStandingsLoading,
    data: leagueStandingsData,
    refetch: leagueStandingRefetch,
  } = useQuery(`league-standings-${id}`, async () => {
    try {
      const response = await sportMonkUrl.get(
        `/standings/seasons/${id}?include=details.type;group;participant;rule.type&filters=standingdetailTypes:129,130,131,132,133,134,179,187,135,136,137,138,139,140,185,141,142,143,144,145,146,186`
      );

      if (response.status === 200) {
        const data = response?.data?.data || [];
        return {
          message:
            data.length > 0 ? 'Data fetched successfully' : 'No data exists',
          status: true,
          data,
        };
      } else {
        throw new Error('Failed to fetch all Leagues data');
      }
    } catch (error) {
      // You can log the error or handle it in a way that makes sense for your application
      console.error('Error fetching league standings:', error.message);
      throw error;
    }
  });

  return { leagueStandingsLoading, leagueStandingsData, leagueStandingRefetch };
}
