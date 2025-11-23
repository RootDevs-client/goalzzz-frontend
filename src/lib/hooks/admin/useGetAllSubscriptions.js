import { xoomBackendUrl } from '@/lib/axios/getAxios';
import { useQuery } from 'react-query';

export default function useGetAllSubscriptions(token) {
  const {
    isLoading: allSubscriptionsLoading,
    data: allSubscriptions,
    refetch: allSubscriptionsRefetch,
  } = useQuery('admin-all-subscriptions', async () => {
    const response = await xoomBackendUrl.get(`/api/admin/subscriptions`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (response.status === 200) {
      return response.data?.data;
    } else {
      throw new Error('Failed to fetch all subscriptions data!');
    }
  });
  return { allSubscriptions, allSubscriptionsLoading, allSubscriptionsRefetch };
}
