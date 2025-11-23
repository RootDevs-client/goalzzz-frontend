import { xoomBackendUrl } from '@/lib/axios/getAxios';
import { useQuery } from 'react-query';

export default function useGetAllHighlights({ token, page, limit }) {
  const {
    isLoading: highlightsLoading,
    data: highlights,
    refetch: highlightsRefetch,
  } = useQuery(
    ['admin-all-news', page, limit],
    async () => {
      const response = await xoomBackendUrl.get(
        `/api/admin/highlights?page=${page}&limit=${limit}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (response.status === 200) {
        return response.data;
      } else {
        throw new Error('Failed to fetch all news data!');
      }
    },
    {
      // cacheTime: 0,
      keepPreviousData: true,
    }
  );
  return { highlights, highlightsLoading, highlightsRefetch };
}
