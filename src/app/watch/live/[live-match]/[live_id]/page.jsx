import Global500Error from '@/components/Global/Global500Error';
import { xoomBackendUrl } from '@/lib/axios/getAxios';
import LiveMatchDetailsHome from './_components/LiveMatchDetailsHome';

async function fetchLiveMatch(id) {
  try {
    const { data } = await xoomBackendUrl.get(`/api/live-matches/${id}`);
    return data;
  } catch (error) {
    console.error('Error fetching live match:', error);
    return null;
  }
}

async function fetchAllLiveMatches() {
  try {
    const { data } = await xoomBackendUrl.get('/api/live-matches');
    return data?.data;
  } catch (error) {
    console.error('Error fetching all live matches:', error);
    return null;
  }
}

export default async function page({ params }) {
  const { live_id } = params;

  try {
    const matchData = await fetchLiveMatch(live_id);
    const allLiveMatches = await fetchAllLiveMatches();

    return (
      <LiveMatchDetailsHome
        matchData={matchData.data}
        allLiveMatches={allLiveMatches}
      />
    );
  } catch (error) {
    console.error('Error in page:', error);
    return (
      <>
        {' '}
        <Global500Error />
      </>
    );
  }
}
