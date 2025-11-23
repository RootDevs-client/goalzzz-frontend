import { sportMonkUrl } from '@/lib/axios/getAxios';
import PopularLeagueList from './_components/PopularLeagueList';

async function getAllLeagues() {
  const res = await sportMonkUrl.get(`/leagues?include=country;currentSeason`);
  return res;
}

export const metadata = {
  title: 'Goalzzz Admin | Popular Leagues',
};

export default async function Page() {
  const leagueResponse = await getAllLeagues();

  if (!leagueResponse.status === 200) {
    return 'Server Error!';
  } else {
    if (leagueResponse?.data?.status) {
      return <PopularLeagueList leaguesData={leagueResponse.data.data} />;
    } else {
      return 'Server Error!';
    }
  }
}
