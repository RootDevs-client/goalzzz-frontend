import NoDataFound from '@/components/Global/NoDataFound';
import StandingsShimmer from '@/components/Global/Shimmer/StandingsShimmer';
import StandingTeamItem from '@/components/Global/StandingTeamItem';
import useFetchLeagueStandings from '@/lib/hooks/useFetchLeagueStandings';

export default function Standings({ seasonId }) {
  const { leagueStandingsLoading, leagueStandingsData } =
    useFetchLeagueStandings(seasonId);

  if (leagueStandingsLoading) {
    return <StandingsShimmer size={17} />;
  }

  if (!leagueStandingsData.status) {
    return <NoDataFound skew="skew-y-[0.5deg]" />;
  }

  function transformDetailsToObj(details) {
    const result = {};

    details.forEach((detail) => {
      const { type_id, value } = detail;
      result[type_id] = value;
    });

    return result;
  }

  if (leagueStandingsData?.status) {
    const isGrouped = leagueStandingsData?.data[0]?.group ? true : false;
    let groupByGroupName = [];
    let transformedStandings = [];
    let transformedStandings2 = [];

    if (isGrouped) {
      leagueStandingsData?.data.forEach((standings) => {
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
        const groupStandings = singleGroup.standings.map((standing) => {
          const transformedData = transformDetailsToObj(standing?.details);
          return {
            position: standing?.position,
            teamName: standing?.participant?.name,
            teamImage: standing?.participant?.image_path,
            teamId: standing?.participant?.id,
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
      transformedStandings = leagueStandingsData?.data.map(
        (singleStandings) => {
          const transformedData = transformDetailsToObj(
            singleStandings?.details
          );

          return {
            position: singleStandings?.position,
            teamName: singleStandings?.participant?.name,
            teamImage: singleStandings?.participant?.image_path,
            teamId: singleStandings?.participant?.id,
            GP: transformedData['129'],
            W: transformedData['130'],
            D: transformedData['131'],
            L: transformedData['132'],
            GF: transformedData['133'],
            GA: transformedData['134'],
            GD: transformedData['179'],
            PTS: transformedData['187'],
          };
        }
      );
    }

    return (
      <>
        {isGrouped ? (
          transformedStandings2.map((group) => (
            <div
              key={group?.id}
              className="mb-6 font-semibold ml-4 skew-y-[0.5deg] mt-4"
            >
              <h2>{group.groupName}</h2>

              {group.standings?.length > 0 && (
                <div className="text-gray-400 uppercase w-full">
                  <div className="text-xs h-8 font-medium grid grid-cols-12 items-center w-full">
                    <div className="text-center font-semibold">#</div>
                    <div className="col-span-3">Team</div>
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
              )}

              {group.standings?.length > 0 ? (
                <div>
                  {group.standings.map((singleStandings) => (
                    <StandingTeamItem
                      key={singleStandings.position}
                      singleStandings={singleStandings}
                    />
                  ))}
                </div>
              ) : (
                <NoDataFound skew="skew-y-[0.5deg]" />
              )}
            </div>
          ))
        ) : (
          <div className="skew-y-[0.5deg] mt-4">
            {leagueStandingsData?.data?.length > 0 && (
              <div className="text-gray-400 uppercase w-full">
                <div className="text-xs h-8 font-medium grid grid-cols-12 items-center w-full">
                  <div className="text-center font-semibold">#</div>
                  <div className="col-span-3">Team</div>
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
            )}

            {leagueStandingsData?.data?.length > 0 ? (
              <div>
                {transformedStandings.map((singleStandings) => (
                  <StandingTeamItem
                    key={singleStandings.position}
                    singleStandings={singleStandings}
                  />
                ))}
              </div>
            ) : (
              <NoDataFound skew="skew-y-[0.5deg]" />
            )}
          </div>
        )}
      </>
    );
  }
}
