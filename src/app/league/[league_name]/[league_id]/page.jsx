import { sportMonkUrl } from '@/lib/axios/getAxios';
import LeagueDetails from './_components/LeagueDetails';

export const metadata = {
  title: 'Goalzzz | Leagues',
};

async function getSingleLeague(id) {
  const response = await sportMonkUrl.get(
    `/leagues/${id}?include=country;currentSeason;seasons`
  );
  return response;
}

export default async function Page({ params }) {
  const leagueId = params.league_id;

  const leagueResponse = await getSingleLeague(leagueId);

  return <LeagueDetails leagueData={leagueResponse.data.data} />;
}
