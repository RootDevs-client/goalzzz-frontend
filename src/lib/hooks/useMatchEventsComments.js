import { sportMonkUrl } from '@/lib/axios/getAxios';
import { useQuery } from 'react-query';

export default function useMatchEventsComments(id) {
  const {
    isLoading: matchEventsCommentsLoading,
    data: matchEventsCommentsData,
  } = useQuery(`event-comments-${id}`, async () => {
    const response = await sportMonkUrl.get(
      `/fixtures/${id}?include=comments;events.type;state`
    );
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error('Failed to fetch match events and comments data!');
    }
  });
  return { matchEventsCommentsLoading, matchEventsCommentsData };
}
