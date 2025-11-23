import NoDataFound from '@/components/Global/NoDataFound';
import StandingsShimmer from '@/components/Global/Shimmer/StandingsShimmer';
import StandingTeamItem from '@/components/Global/StandingTeamItem';
import useFetchLeagueStandings from '@/lib/hooks/useFetchLeagueStandings';

export default function AllTeams({ matchData }) {
  const { leagueStandingsLoading, leagueStandingsData } =
    useFetchLeagueStandings(matchData?.season_id);

  if (leagueStandingsLoading) {
    return <StandingsShimmer size={17} />;
  }

  if (!leagueStandingsData.status) {
    return <NoDataFound />;
  }

  function transformDetailsToObj(details) {
    const result = {};

    details.forEach((detail) => {
      const { type_id, value } = detail;
      result[type_id] = value;
    });
    return result;
  }

  const isGrouped = leagueStandingsData?.data[0]?.group ? true : false;
  let groupByGroupName = [];
  let transformedStandings = [];
  let transformedStandings2 = [];

  if (isGrouped) {
    leagueStandingsData?.data?.forEach((standings) => {
      const groupIndex = groupByGroupName.findIndex(
        (group) => group.name === standings.group.name
      );

      if (groupIndex !== -1) {
        groupByGroupName[groupIndex].standings.push(standings);
      } else {
        groupByGroupName.push({
          name: standings.group.name,
          standings: [standings],
        });
      }
    });

    transformedStandings2 = groupByGroupName.map((singleGroup) => {
      const groupStandings = singleGroup.standings.map((singleStanding) => {
        const transformedData = transformDetailsToObj(singleStanding?.details);

        return {
          teamId: singleStanding?.participant?.id,
          position: singleStanding?.position,
          teamName: singleStanding?.participant?.name,
          teamImage: singleStanding?.participant?.image_path,
          GP: transformedData['129'],
          W: transformedData['130'],
          D: transformedData['131'],
          L: transformedData['132'],
          GF: transformedData['133'],
          GA: transformedData['134'],
          GD: transformedData['179'],
          PTS: transformedData['187'],
        };
      });

      return {
        id: singleGroup.id,
        groupName: singleGroup.name,
        standings: groupStandings,
      };
    });

    transformedStandings2.sort((a, b) => {
      const partA = a.groupName.split(' ')[1];
      const partB = b.groupName.split(' ')[1];

      return partA > partB ? 1 : -1;
    });
  } else {
    transformedStandings = leagueStandingsData?.data?.map((singleStandings) => {
      const transformedData = transformDetailsToObj(singleStandings?.details);
      return {
        teamId: singleStandings?.participant?.id,
        position: singleStandings?.position,
        teamName: singleStandings?.participant?.name,
        teamImage: singleStandings?.participant?.image_path,
        GP: transformedData['129'],
        W: transformedData['130'],
        D: transformedData['131'],
        L: transformedData['132'],
        GF: transformedData['133'],
        GA: transformedData['134'],
        GD: transformedData['179'],
        PTS: transformedData['187'],
      };
    });
  }

  return (
    <>

      {isGrouped ? (
        transformedStandings2.map((group) => (
          <div
            key={group?.id}
            className="mb-6 font-semibold ml-4 skew-y-[1deg] "
          >

            <h2>{group.groupName}</h2>
            <div className=" text-gray-400 uppercase w-full">
              {group.standings?.length > 0 && (
                <div className="text-xs h-8 font-medium grid grid-cols-12 items-center w-full">
                  <div className="text-center font-semibold">#</div>
                  <div className="col-span-3">Team</div>
                  <div className="text-end font-semibold">GP</div>
                  <div className="text-end font-semibold">W</div>
                  <div className="text-end font-semibold">D</div>
                  <div className="text-end font-semibold">L</div>
                  <div className="text-end font-semibold">GF</div>
                  <div className="text-end font-semibold">GA</div>
                  <div className="text-end font-semibold">GD</div>
                  <div className="text-center font-semibold">PTS</div>
                </div>
              )}
            </div>
            <div>
              {group.standings?.length > 0 ? (
                group.standings.map((singleStandings) => (
                  <StandingTeamItem
                    key={singleStandings.position}
                    singleStandings={singleStandings}
                  />
                ))
              ) : (
                <NoDataFound />
              )}
            </div>
          </div>
        ))
      ) : (
        <div className="skew-y-[1deg]">
          <div className="text-gray-400 uppercase w-full">
            {leagueStandingsData?.data?.length > 0 && (
              <div className="text-xs h-8 font-medium grid grid-cols-12 items-center w-full">
                <div className="text-center font-semibold">#</div>
                <div className="col-span-3">Team</div>
                <div className="text-end font-semibold">GP</div>
                <div className="text-end font-semibold">W</div>
                <div className="text-end font-semibold">D</div>
                <div className="text-end font-semibold">L</div>
                <div className="text-end font-semibold">GF</div>
                <div className="text-end font-semibold">GA</div>
                <div className="text-end font-semibold">GD</div>
                <div className="text-center font-semibold">PTS</div>
              </div>
            )}
          </div>
          <div>
            {leagueStandingsData?.data?.length > 0 ? (
              transformedStandings.map((singleStandings) => (
                <StandingTeamItem
                  key={singleStandings.position}
                  singleStandings={singleStandings}
                />
              ))
            ) : (
              <NoDataFound />
            )}
          </div>
        </div>
      )}
    </>
  );
}
