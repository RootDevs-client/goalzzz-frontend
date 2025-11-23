import GlobalLoading from '@/components/Global/GlobalLoading';
import NoDataFound from '@/components/Global/NoDataFound';
import { useAppContext } from '@/contexts/XoomAppContent';
import { sportMonkUrl } from '@/lib/axios/getAxios';
import getSlugify from '@/lib/helpers/getSlugify';
import useFetchLeagueStandings from '@/lib/hooks/useFetchLeagueStandings';
import Link from 'next/link';
import { useEffect } from 'react';
import { GoChevronDown } from 'react-icons/go';
import { useQuery } from 'react-query';

function getTopPlayers(data, typeId) {
  return (
    data?.data?.topscorers
      .filter((scorer) => scorer.type_id === typeId)
      .sort((a, b) => b.total - a.total) || []
  );
}

function transformDetailsToObj(details) {
  const result = {};

  details.forEach((detail) => {
    const { type_id, value } = detail;
    result[type_id] = value;
  });
  return result;
}

export default function TeamStats({ activeSeasons, teamId }) {
  const { selectedSeasonTeam, setSelectedSeasonTeam } = useAppContext();

  useEffect(() => {
    if (activeSeasons && activeSeasons.length > 0) {
      setSelectedSeasonTeam(activeSeasons[0]);
    }
  }, [activeSeasons, setSelectedSeasonTeam]);

  const { leagueStandingsLoading, leagueStandingsData } =
    useFetchLeagueStandings(selectedSeasonTeam?.id);

  const {
    isLoading: topScorerAssistLoading,
    data: topScorerAssistData,
    isError: topScorerAssistError,
  } = useQuery(
    ['top-scorer-assist', selectedSeasonTeam?.id],
    async () => {
      const response = await sportMonkUrl.get(
        `/seasons/${selectedSeasonTeam?.id}?include=topscorers.player;topscorers.participant&filters=seasonTopscorerTypes:208,209`
      );
      if (response.status === 200) {
        return response.data;
      } else {
        throw new Error('Failed to fetch top scorer and assist data!');
      }
    },
    { enabled: !!selectedSeasonTeam?.id } // Enable query only when team ID is available
  );

  if (leagueStandingsLoading || topScorerAssistLoading) {
    return (
      <>
        <GlobalLoading />
      </>
    );
  }

  if (!leagueStandingsData || topScorerAssistError) {
    return <>Error loading data</>;
  }

  // Home and away team standings
  let transformedStandingsHome = [];
  let transformedStandingsAway = [];

  transformedStandingsHome = leagueStandingsData?.data?.map(
    (singleStandings) => {
      const transformedData = transformDetailsToObj(singleStandings?.details);
      return {
        teamId: singleStandings?.participant?.id,
        position: singleStandings?.position,
        teamName: singleStandings?.participant?.name,
        teamImage: singleStandings?.participant?.image_path,
        GP: transformedData['135'],
        W: transformedData['136'],
        D: transformedData['137'],
        L: transformedData['138'],
        GF: transformedData['139'],
        GA: transformedData['140'],
        GD: transformedData['179'],
        PTS: transformedData['185'],
      };
    }
  );

  transformedStandingsAway = leagueStandingsData?.data?.map(
    (singleStandings) => {
      const transformedData = transformDetailsToObj(singleStandings?.details);
      return {
        teamId: singleStandings?.participant?.id,
        position: singleStandings?.position,
        teamName: singleStandings?.participant?.name,
        teamImage: singleStandings?.participant?.image_path,
        GP: transformedData['141'],
        W: transformedData['142'],
        D: transformedData['143'],
        L: transformedData['144'],
        GF: transformedData['145'],
        GA: transformedData['146'],
        GD: transformedData['179'],
        PTS: transformedData['186'],
      };
    }
  );

  // Sort standings by PTS
  transformedStandingsHome?.sort((a, b) => b.PTS - a.PTS);
  transformedStandingsAway?.sort((a, b) => b.PTS - a.PTS);

  const findStandingsWithTeamId = (standings, teamId) =>
    standings?.find((point) => point.teamId === parseInt(teamId));

  const homeStandingsWithTeamId = findStandingsWithTeamId(
    transformedStandingsHome,
    teamId
  );
  const awayStandingsWithTeamId = findStandingsWithTeamId(
    transformedStandingsAway,
    teamId
  );

  const { league } = selectedSeasonTeam || {};

  const topScorer = getTopPlayers(topScorerAssistData, 208).slice(0, 10);
  const topAssist = getTopPlayers(topScorerAssistData, 209).slice(0, 10);

  return (
    <div>
      <div className="p-5 bg-base-100">
        <div className="flex items-center justify-between skew-y-[0.5deg]">
          <div className="flex items-center gap-2">
            {league && (
              <img
                src={league.image_path}
                alt="league logo"
                width={50}
                height={50}
                className="w-10 h-10 rounded-full ring-1 ring-black p-0.5"
              />
            )}

            <div>
              {selectedSeasonTeam && (
                <>
                  <h4>{league?.name}</h4>
                  <p className="text-sm">{selectedSeasonTeam.name}</p>
                </>
              )}
            </div>
          </div>
          <div>
            <label htmlFor="select_season_modal" className="cursor-pointer">
              <GoChevronDown className="text-2xl" />
            </label>
          </div>
        </div>
      </div>
      <div className="skew-y-[0.5deg] mt-6 pb-4">
        {homeStandingsWithTeamId || awayStandingsWithTeamId ? (
          <div className="text-gray-400 uppercase w-full">
            <div className="flex items-center justify-between text-black px-2 py-3">
              <div>
                <h4 className="text-lg font-semibold uppercase">Points</h4>
                <p className="text-xs">
                  Rank {homeStandingsWithTeamId?.position}
                </p>
              </div>
              <div className="font-semibold text-xl ">
                {homeStandingsWithTeamId?.PTS + awayStandingsWithTeamId?.PTS}
              </div>
            </div>
            <div className="text-xs h-8 font-medium grid grid-cols-12 items-center w-full border-t border-gray-600 pt-4">
              <div className="text-center font-semibold"></div>
              <div className="col-span-3"></div>
              <div className="text-center font-semibold">GP</div>
              <div className="text-center font-semibold">W</div>
              <div className="text-center font-semibold">D</div>
              <div className="text-center font-semibold">L</div>
              <div className="text-center font-semibold">GF</div>
              <div className="text-center font-semibold">GA</div>
              <div className="text-center font-semibold">GD</div>
              <div className="text-center font-semibold">PTS</div>
            </div>
          </div>
        ) : (
          <></>
        )}

        {homeStandingsWithTeamId ? (
          <div className="grid grid-cols-12 items-center w-full mt-3">
            <div className="text-center font-semibold"></div>
            <div className="col-span-3">
              <div>
                <Link
                  href={`/team/${getSlugify(
                    homeStandingsWithTeamId.teamName
                  )}/${homeStandingsWithTeamId?.teamId}`}
                  className="flex items-center font-semibold"
                >
                  Home
                </Link>
              </div>
            </div>
            <div className="text-center font-semibold">
              {homeStandingsWithTeamId.GP}
            </div>
            <div className="text-center font-semibold">
              {homeStandingsWithTeamId.W}
            </div>
            <div className="text-center font-semibold">
              {homeStandingsWithTeamId.D}
            </div>
            <div className="text-center font-semibold">
              {homeStandingsWithTeamId.L}
            </div>
            <div className="text-center font-semibold">
              {homeStandingsWithTeamId.GF}
            </div>
            <div className="text-center font-semibold">
              {homeStandingsWithTeamId.GA}
            </div>
            <div className="text-center font-semibold">
              {homeStandingsWithTeamId.GD}
            </div>
            <div className="text-center font-semibold">
              {homeStandingsWithTeamId.PTS}
            </div>
          </div>
        ) : (
          <></>
        )}

        {awayStandingsWithTeamId ? (
          <div className="grid grid-cols-12 items-center w-full mt-3">
            <div className="text-center font-semibold"></div>
            <div className="col-span-3">
              <div>
                <Link
                  href={`/team/${getSlugify(
                    awayStandingsWithTeamId.teamName
                  )}/${awayStandingsWithTeamId?.teamId}`}
                  className="flex items-center font-semibold"
                >
                  Away
                </Link>
              </div>
            </div>
            <div className="text-center font-semibold">
              {awayStandingsWithTeamId.GP}
            </div>
            <div className="text-center font-semibold">
              {awayStandingsWithTeamId.W}
            </div>
            <div className="text-center font-semibold">
              {awayStandingsWithTeamId.D}
            </div>
            <div className="text-center font-semibold">
              {awayStandingsWithTeamId.L}
            </div>
            <div className="text-center font-semibold">
              {awayStandingsWithTeamId.GF}
            </div>
            <div className="text-center font-semibold">
              {awayStandingsWithTeamId.GA}
            </div>
            <div className="text-center font-semibold">
              {awayStandingsWithTeamId.GD}
            </div>
            <div className="text-center font-semibold">
              {awayStandingsWithTeamId.PTS}
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="bg-base-100 p-4 h-auto">
          <div className="skew-y-[0.5deg]">
            <h4 className="text-lg uppercase font-bold border-b py-2 border-black">
              Top Scorer
            </h4>
            {topScorer.length > 0 ? (
              topScorer.slice(0, 20).map((scorer) => (
                <div
                  key={scorer.id}
                  className="flex items-center justify-between py-2"
                >
                  <div className="flex items-center gap-2">
                    <img
                      src={scorer?.player?.image_path}
                      alt="Player Image"
                      className="w-8 h-8 rounded-full ring-1 ring-black"
                    />
                    <h4 className="font-semibold">
                      {scorer?.player?.display_name}
                    </h4>
                  </div>
                  <div className="grid grid-cols-2 items-center gap-2">
                    <img
                      src={scorer?.participant?.image_path}
                      alt="League Image"
                      className="w-8 h-8 rounded-full ring-1 ring-black"
                    />
                    <h4 className="font-semibold text-center">
                      {scorer?.total}
                    </h4>
                  </div>
                </div>
              ))
            ) : (
              <NoDataFound width="10/12" />
            )}
          </div>
        </div>
        <div className="bg-base-100 p-4 h-auto">
          <div className="skew-y-[0.5deg]">
            <h4 className="text-lg uppercase font-bold border-b py-2 border-black mt-1">
              Top Assist
            </h4>
            {topAssist.length > 0 ? (
              topAssist.slice(0, 20).map((assist) => (
                <div
                  key={assist.id}
                  className="flex items-center justify-between py-2"
                >
                  <div className="flex items-center gap-2">
                    <img
                      src={assist?.player?.image_path}
                      alt="Player Image"
                      className="w-8 h-8 rounded-full ring-1 ring-black"
                    />
                    <h4 className="font-semibold">
                      {assist?.player?.display_name}
                    </h4>
                  </div>
                  <div className="grid grid-cols-2 items-center gap-2">
                    <img
                      src={assist?.participant?.image_path}
                      alt="League Image"
                      className="w-8 h-8 rounded-full ring-1 ring-black"
                    />
                    <h4 className="font-semibold text-center">
                      {assist?.total}
                    </h4>
                  </div>
                </div>
              ))
            ) : (
              <NoDataFound width="10/12" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
