import { xoomBackendUrl } from '@/lib/axios/getAxios';

const refreshAccessToken = async (url, token) => {
  try {
    const { data } = await xoomBackendUrl.get(url, {
      headers: {
        Authorization: `Refresh ${token.refreshToken}`,
      },
    });

    if (data?.status) {
      return {
        ...token,
        accessToken: data?.data?.accessToken,
        refreshToken: data?.data?.refreshToken,
        expiresIn: data?.data?.expiresIn,
      };
    }
  } catch (error) {
    console.error('Something went wrong on refreshToken!');
  }
};

export default async function getAccessToken(token, role) {
  const apiUrl =
    role === 'admin' ? '/api/admin/refresh-token' : '/api/user/refresh-token';
  return await refreshAccessToken(apiUrl, token);
}
