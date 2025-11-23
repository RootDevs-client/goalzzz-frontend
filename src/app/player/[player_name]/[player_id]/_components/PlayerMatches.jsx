import GlobalLoading from '@/components/Global/GlobalLoading';
import { sportMonkUrl } from '@/lib/axios/getAxios';
import { useQuery } from 'react-query';
import PlayerMatchCard from './PlayerMatchCard';

export default function PlayerMatches({ playerData }) {
  function getFixtureIds(latest) {
    return latest.map((fixture) => fixture?.fixture_id);
  }

  const fixtureIds = getFixtureIds(playerData?.latest);

  // Fetch Player's all Matches Data
  const {
    isLoading: isLoadingPlayerMatches,
    data: playerMatchesData,
    refetch: refetchPlayerMatches,
  } = useQuery('playerMatches', async () => {
    const response = await sportMonkUrl.get(
      `/fixtures/multi/${fixtureIds}?include=league;participants;state;scores;events.type;lineups.details.type`
    );
    if (response.status === 200) {
      // setIsRefetching(false);
      return response.data?.data;
    } else {
      throw new Error('Failed to fetch all Leagues data');
    }
  });

  if (isLoadingPlayerMatches) {
    return (
      <>
        <GlobalLoading />
      </>
    );
  }

  return (
    <div>
      {playerMatchesData
        ?.sort((a, b) => new Date(b?.starting_at) - new Date(a?.starting_at))
        .map((match) => (
          <PlayerMatchCard
            key={match?.id}
            match={match}
            playerData={playerData}
            refetchPlayerMatches={refetchPlayerMatches}
          />
        ))}
    </div>
  );
}
