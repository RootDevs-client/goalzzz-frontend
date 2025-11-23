import LastFiveMatchCard from './TeamOverview/LastFiveMatchCard';
import NextMatch from './TeamOverview/NextMatch';
import TeamStandingOnPointTable from './TeamOverview/TeamStandingOnPointTable';

export default function TeamOverview({ teamDetails, teamId }) {

  const nextMatch = teamDetails?.upcoming[0];
  const lastFiveMatches = teamDetails?.latest?.slice(0, 5);
  const seasonId = nextMatch?.season_id ? nextMatch?.season_id : null;
  const leagueInfo = nextMatch?.league;

  return (
    <div>
      {/* Match Overview Next match */}
      <NextMatch nextMatch={nextMatch} />
      {/* Last 5 matches */}

      <div className="skew-y-[0.5deg] mt-10">
        <h4 className="text-xl font-semibold">Last 5 Matches</h4>
        <div className="flex items-center gap-1 sm:gap-10 px-1 sm:px-5 mt-3 justify-between sm:justify-start">
          {lastFiveMatches?.map((match, index) => (
            <LastFiveMatchCard
              key={match?.id + index}
              match={match}
              teamId={teamId}
            />
          ))}
        </div>
      </div>

      {/* Match point table */}

      <TeamStandingOnPointTable
        seasonId={seasonId}
        teamId={teamId}
        leagueInfo={leagueInfo}
      />
    </div>
  );
}
