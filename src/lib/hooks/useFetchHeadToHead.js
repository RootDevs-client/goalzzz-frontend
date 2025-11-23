import { sportMonkUrl } from '@/lib/axios/getAxios';
import { useQuery } from 'react-query';

export default function useFetchHeadToHead(teamOne, teamTwo) {
  const { isLoading: headToHeadLoading, data: headToHeadData } = useQuery(
    `h-to-h-${teamOne}-${teamTwo}`,
    async () => {
      const response = await sportMonkUrl.get(
        `/fixtures/head-to-head/${teamOne}/${teamTwo}?include=participants;state;periods;scores;`
      );
      if (response.status === 200) {
        return response.data?.data;
      } else {
        throw new Error('Failed to fetch league fixture data!');
      }
    }
  );
  return { headToHeadLoading, headToHeadData };
}
