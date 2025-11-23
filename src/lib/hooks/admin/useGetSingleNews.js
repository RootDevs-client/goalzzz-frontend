import { xoomBackendUrl } from '@/lib/axios/getAxios';
import { useQuery } from 'react-query';

export default function useGetSingleNews(token, id) {
  const {
    isLoading: singleNewsLoading,
    data: singleNews,
    refetch: singleNewsRefetch,
  } = useQuery(
    'admin-single-news',
    async () => {
      const response = await xoomBackendUrl.get(`/api/admin/news/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.status === 200) {
        return response.data?.data;
      } else {
        throw new Error('Failed to fetch all news data!');
      }
    },
    {
      cacheTime: 0,
    }
  );
  return { singleNews, singleNewsLoading, singleNewsRefetch };
}
