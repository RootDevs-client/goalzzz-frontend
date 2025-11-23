import MainLoading from '@/components/Global/MainLoading';
import NoDataFound from '@/components/Global/NoDataFound';
import useFetchLeagueStandings from '@/lib/hooks/useFetchLeagueStandings';
import TeamStandingsPreview from './TeamStandingsPreview';

export default function MatchStandingsPreview({ matchData }) {
  const { leagueStandingsLoading, leagueStandingsData } =
    useFetchLeagueStandings(matchData?.season_id);

  if (leagueStandingsLoading) {
    <MainLoading />;
  }

  return (
    <div>
      <div className="bg-base-100 mt-5 ">
        <div className="flex items-center justify-between h-10 skew-y-[0.5deg]">
          <h4 className="text-black font-semibold uppercase px-5 mt-2">
            Standings
          </h4>
        </div>
      </div>
      {!leagueStandingsData?.status ? (
        <NoDataFound />
      ) : (
        <TeamStandingsPreview
          matchData={matchData}
          leagueStandingsData={leagueStandingsData}
          leagueStandingsLoading={leagueStandingsLoading}
        />
      )}
    </div>
  );
}
