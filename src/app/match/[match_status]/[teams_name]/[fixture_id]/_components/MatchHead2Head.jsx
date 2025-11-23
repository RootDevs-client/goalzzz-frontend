import GlobalLoading from '@/components/Global/GlobalLoading';
import NoDataFound from '@/components/Global/NoDataFound';
import { getCurrentGoals } from '@/lib/helpers/getCurrentGoals';
import useFetchHeadToHead from '@/lib/hooks/useFetchHeadToHead';
import MatchCardH2H from './Head2Head/MatchCardH2H';

export default function MatchHead2Head({ matchData }) {
  const { headToHeadLoading, headToHeadData } = useFetchHeadToHead(
    matchData?.participants.find((team) => team.meta.location === 'home')?.id,
    matchData?.participants.find((team) => team.meta.location === 'away')?.id
  );

  if (headToHeadLoading) {
    return (
      <>
        <GlobalLoading />{' '}
      </>
    );
  }

  function getPreviousEncounters(counters) {
    const previousEncounters = [];

    counters?.forEach((match) => {
      const fixtureId = match?.id;
      const leagueName = match.name;
      const matchTime = match.starting_at;
      const homeTeamName = match.participants[0].name;
      const scores = getCurrentGoals(match?.scores);
      const homeTeamImage = match.participants[0].image_path;
      const awayTeamName = match.participants[1].name;
      const awayTeamImage = match.participants[1].image_path;
      const matchState = match.state.state;

      const encounter = {
        id: fixtureId,
        league_name: leagueName,
        match_time: matchTime,
        home_team_name: homeTeamName,
        home_team_image: homeTeamImage,
        away_team_name: awayTeamName,
        away_team_image: awayTeamImage,
        match_state: matchState,
        score: scores,
      };

      previousEncounters.push(encounter);
    });

    return previousEncounters;
  }

  const previousEncounters = getPreviousEncounters(headToHeadData);

  return (
    <div className="max-w-3xl mx-auto">
      {previousEncounters.length === 0 ? (
        <>
          <NoDataFound />
         
        </>
      ) : (
        <>
          <h4 className="font-semibold text-lg skew-y-[0.5deg] my-4">
            Recent Encounters
          </h4>
          {previousEncounters.map((encounter) => (
            <MatchCardH2H key={encounter.id} encounter={encounter} />
          ))}
        </>
      )}
    </div>
  );
  
}
