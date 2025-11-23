import { xoomBackendUrl } from '@/lib/axios/getAxios';
import { useQuery } from 'react-query';

export default function useGetSingleUser(token, id) {
  const {
    isLoading: singleUserLoading,
    data: singleUser,
    refetch: singleUserRefetch,
  } = useQuery(
    'admin-single-users',
    async () => {
      const response = await xoomBackendUrl.get(`/api/admin/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.status === 200) {
        return response.data?.data;
      } else {
        throw new Error('Failed to fetch single user data!');
      }
    },
    {
      cacheTime: 0,
    }
  );
  return { singleUser, singleUserLoading, singleUserRefetch };
}
