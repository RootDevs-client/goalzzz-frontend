import { sportMonkUrl } from '@/lib/axios/getAxios';
import { useQuery } from 'react-query';

export default function useMatchStatistics(id) {
  const { isLoading: matchStatisticsLoading, data: matchStatisticsData } =
    useQuery(`match-statistics-${id}`, async () => {
      const response = await sportMonkUrl.get(
        `/fixtures/${id}?include=statistics.type&filters=fixtureStatisticTypes:34,42,45,51,56,83,84,86`
      );
      if (response.status === 200) {
        return response.data;
      } else {
        throw new Error('Failed to fetch match statistics data!');
      }
    });
  return { matchStatisticsLoading, matchStatisticsData };
}
