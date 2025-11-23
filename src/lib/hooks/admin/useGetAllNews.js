import { xoomBackendUrl } from '@/lib/axios/getAxios';
import { useQuery } from 'react-query';

export default function useGetAllNews(token) {
  const {
    isLoading: allNewsLoading,
    data: allNews,
    refetch: allNewsRefetch,
  } = useQuery('admin-all-news', async () => {
    const response = await xoomBackendUrl.get(`/api/admin/news`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (response.status === 200) {
      return response.data?.data;
    } else {
      throw new Error('Failed to fetch all news data!');
    }
  });
  return { allNews, allNewsLoading, allNewsRefetch };
}
