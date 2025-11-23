import { sportMonkUrl } from '@/lib/axios/getAxios';
import { useQuery } from 'react-query';

export default function useFetchMatchLineups(id) {
  const { isLoading: matchLineupsLoading, data: matchLineupsData } = useQuery(
    `match-lineups-${id}`,
    async () => {
      const response = await sportMonkUrl.get(
        `/fixtures/${id}?include=formations;lineups.player;lineups.position;lineups.type;lineups.details.type&filters=lineupTypes:11,12`
      );
      if (response.status === 200) {
        return response.data;
      } else {
        throw new Error('Failed to fetch match events and comments data!');
      }
    }
  );
  return { matchLineupsLoading, matchLineupsData };
}
