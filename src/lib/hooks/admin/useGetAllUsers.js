import { xoomBackendUrl } from '@/lib/axios/getAxios';
import { useQuery } from 'react-query';

export default function useGetAllUsers(token) {
  const {
    isLoading: allUsersLoading,
    data: allUsers,
    refetch: allUsersRefetch,
  } = useQuery('admin-all-users', async () => {
    const response = await xoomBackendUrl.get(`/api/admin/users`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (response.status === 200) {
      return response.data?.data;
    } else {
      throw new Error('Failed to fetch all users data!');
    }
  });
  return { allUsers, allUsersLoading, allUsersRefetch };
}
