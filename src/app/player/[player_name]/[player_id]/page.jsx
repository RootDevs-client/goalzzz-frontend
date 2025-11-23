import { sportMonkUrl } from '@/lib/axios/getAxios';
import PlayerDetails from './_components/PlayerDetails';

export const metadata = {
  title: 'Goalzzz | Players',
};

async function getPlayerDetails(id) {
  const res = await sportMonkUrl.get(
    `/players/${id}?include=position;detailedPosition;country;teams.team;statistics.details.type;statistics.season.league;transfers.fromTeam;transfers.toTeam;transfers.type;trophies.league;trophies.season;trophies.trophy;latest.fixture;`
  );
  return res;
}

export default async function page({ params }) {
  const { player_id } = params;
  const playerResponse = await getPlayerDetails(player_id);

  if (!playerResponse.status === 200) {
    return 'Server Error!';
  } else {
    if (playerResponse?.data?.status) {
      return <PlayerDetails playerData={playerResponse.data.data} />;
    } else {
      return 'Server Error!';
    }
  }
}
