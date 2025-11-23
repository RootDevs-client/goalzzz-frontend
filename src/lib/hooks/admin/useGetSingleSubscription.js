import { xoomBackendUrl } from '@/lib/axios/getAxios';
import { useQuery } from 'react-query';

export default function useGetSingleSubscription(token, id) {
  const {
    isLoading: singleSubscriptionLoading,
    data: singleSubscription,
    refetch: singleSubscriptionRefetch,
  } = useQuery(
    'admin-single-subscriptions',
    async () => {
      const response = await xoomBackendUrl.get(
        `/api/admin/subscriptions/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (response.status === 200) {
        return response.data?.data;
      } else {
        throw new Error('Failed to fetch subscription data!');
      }
    },
    {
      cacheTime: 0,
    }
  );
  return {
    singleSubscription,
    singleSubscriptionLoading,
    singleSubscriptionRefetch,
  };
}
