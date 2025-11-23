import { useQuery } from 'react-query';
import { xoomBackendUrl } from '../axios/getAxios';

export default function useGetSingleMatch(match_id) {
  const {
    data: singleMatch,
    error: singleMatchError,
    isLoading: singleMatchLoading,
    refetch: singleMatchRefetch,
  } = useQuery(
    'singleMatch',
    async () => {
      const { data } = await xoomBackendUrl.get(
        `/api/admin/matches/${match_id}`
      );

      const matchData = data?.data;

      const updatedData = {
        ...matchData,
        team_one_image_type: 'url',
        team_two_image_type: 'url',
        streaming_sources: matchData?.streaming_sources?.map((source) => ({
          ...source,
          headers: Object.entries(JSON.parse(source?.headers)).map(
            ([key, value]) => ({ key, value })
          ),
        })),
      };

      return updatedData;
    },
    {
      cacheTime: 0,
    }
  );

  return {
    singleMatch,
    singleMatchError,
    singleMatchLoading,
    singleMatchRefetch,
  };
}
