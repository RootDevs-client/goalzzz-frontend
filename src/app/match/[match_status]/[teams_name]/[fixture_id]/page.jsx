import NoDataFound from '@/components/Global/NoDataFound';
import { sportMonkUrl } from '@/lib/axios/getAxios';
import MatchDetails from './_components/MatchDetails';

async function getSingleMatch(id) {
  const response = await sportMonkUrl.get(
    `fixtures/${id}?include=participants;venue;scores;periods;state;league.country;group;coaches`
  );
  return response;
}

export default async function page({ params }) {
  const { match_status, fixture_id } = params;
  try {
    const matchResponse = await getSingleMatch(fixture_id);

    console.log("matchResponse", matchResponse)

    if (
      !matchResponse ||
      !matchResponse.status === 200 ||
      !matchResponse.data?.status
    ) {
      return (
        <>
          <NoDataFound skew="skew-y-[0.5deg]" />
        </>
      );
    }

    return (
      <MatchDetails status={match_status} matchData={matchResponse.data.data} />
    );
  } catch (error) {
    console.error('Error fetching match data:', error);
    return (
      <>
        <p className="p-10 text-center">Error fetching data</p>
      </>
    );
  }
}
