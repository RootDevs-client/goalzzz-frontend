import { xoomBackendUrl } from '@/lib/axios/getAxios';
import { useQuery } from 'react-query';

export default function useGetUserProfile(token, isAdmin, user) {
  const {
    isLoading: userProfileLoading,
    data: userProfile,
    refetch: refetchProfile,
  } = useQuery(
    'user-profile',
    async () => {
      const apiEndpoint = isAdmin ? '/api/admin/profile' : '/api/user/profile';

      const response = await xoomBackendUrl.post(
        apiEndpoint,
        {
          phone: user?.phone,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        return response.data?.data;
      } else {
        throw new Error('Failed to fetch user profile data!');
      }
    },
    {
      enabled: !!token,
    }
  );

  return { userProfile, userProfileLoading, refetchProfile };
}
