import { xoomBackendUrl } from '@/lib/axios/getAxios';
import { useQuery } from 'react-query';

export default function useGetAllNews() {
  const {
    isLoading: allNewsLoading,
    data: allNews,
    refetch: allNewsRefetch,
  } = useQuery('client-all-news', async () => {
    const response = await xoomBackendUrl.get(`/api/news`);
    if (response.status === 200) {
      return response.data?.data;
    } else {
      throw new Error('Failed to fetch all news data!');
    }
  });
  return { allNews, allNewsLoading, allNewsRefetch };
}
