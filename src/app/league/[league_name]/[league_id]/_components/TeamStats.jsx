import NoDataFound from '@/components/Global/NoDataFound';
import getSlugify from '@/lib/helpers/getSlugify';
import useFetchLeagueTeamStates from '@/lib/hooks/useFetchLeagueTeamStates';
import Link from 'next/link';

export default function TeamStats({ seasonId }) {
  const { leagueTeamStatesLoading, leagueTeamStatesData } =
    useFetchLeagueTeamStates(seasonId);

  const arr = Array(10).fill(0);

  if (leagueTeamStatesLoading) {
    return (
      <div className="space-y-4 mt-8 mb-2 skew-y-[0.5deg]">
        <div className="grid grid-cols-12 gap-5">
          <div className="col-span-12 md:col-span-4">
            <div className="col-span-12 h-10 w-full bg-gray-300 animate-pulse rounded-md mb-4"></div>
            <div className="grid grid-cols-12 col-span-12 gap-3 space-y-4">
              {arr.map((shimmer, index) => (
                <div
                  key={index}
                  className="col-span-12 md:col-span-12 h-6 w-full animate-pulse rounded-md grid grid-cols-12 gap-3"
                >
                  <div className="col-span-1 h-8 w-8 bg-gray-300 animate-pulse rounded-full"></div>
                  <div className="col-span-10 h-8 w-full bg-gray-300 animate-pulse rounded-md"></div>
                  <div className="col-span-1 h-8 w-8 bg-gray-300 animate-pulse rounded-full"></div>
                </div>
              ))}
            </div>
          </div>
          <div className="col-span-12 md:col-span-4">
            <div className="col-span-12 h-10 w-full bg-gray-300 animate-pulse rounded-md mb-4"></div>
            <div className="grid grid-cols-12 col-span-12 gap-3 space-y-4">
              {arr.map((shimmer, index) => (
                <div
                  key={index}
                  className="col-span-12 md:col-span-12 h-6 w-full animate-pulse rounded-md grid grid-cols-12 gap-3"
                >
                  <div className="col-span-1 h-8 w-8 bg-gray-300 animate-pulse rounded-full"></div>
                  <div className="col-span-10 h-8 w-full bg-gray-300 animate-pulse rounded-md"></div>
                  <div className="col-span-1 h-8 w-8 bg-gray-300 animate-pulse rounded-full"></div>
                </div>
              ))}
            </div>
          </div>
          <div className="col-span-12 md:col-span-4">
            <div className="col-span-12 h-10 w-full bg-gray-300 animate-pulse rounded-md mb-4"></div>
            <div className="grid grid-cols-12 col-span-12 gap-3 space-y-4">
              {arr.map((shimmer, index) => (
                <div
                  key={index}
                  className="col-span-12 md:col-span-12 h-6 w-full animate-pulse rounded-md grid grid-cols-12 gap-3"
                >
                  <div className="col-span-1 h-8 w-8 bg-gray-300 animate-pulse rounded-full"></div>
                  <div className="col-span-10 h-8 w-full bg-gray-300 animate-pulse rounded-md"></div>
                  <div className="col-span-1 h-8 w-8 bg-gray-300 animate-pulse rounded-full"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    // Define a sorting function to sort teams by a specific statistics type
    const sortTeamsByStat = (teams, statTypeId) => {
      return teams?.slice().sort((teamA, teamB) => {
        const statA =
          teamA.statistics[0]?.details.find(
            (item) => item.type_id === statTypeId
          )?.value.all.count || 0;
        const statB =
          teamB.statistics[0]?.details.find(
            (item) => item.type_id === statTypeId
          )?.value.all.count || 0;
        return statB - statA;
      });
    };

    const topGoalsTeams = sortTeamsByStat(leagueTeamStatesData?.teams, 52); // Sort by goals count
    const goalsPerMatchTeams = sortTeamsByStat(leagueTeamStatesData?.teams, 52); // Sort by average goals per match
    const cleanSheetsTeams = sortTeamsByStat(leagueTeamStatesData?.teams, 194); // Sort by clean sheets count

    return (
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Top Goals */}
        <div className="bg-base-100 p-4">
          <div className="skew-y-[0.5deg]">
            <h4 className="text-lg uppercase font-bold border-b py-2 border-black">
              Top Goals
            </h4>
            {topGoalsTeams?.length > 0 ? (
              topGoalsTeams.slice(0, 20).map((team) => (
                <Link
                  key={team.id}
                  href={`/team/${getSlugify(team?.name)}/${team?.id}`}
                >
                  <div className="flex items-center justify-between py-2">
                    <div className="flex items-center gap-2">
                      <img
                        src={team?.image_path}
                        alt="Team Image"
                        className="w-8 h-8 rounded-full ring-1 ring-black"
                      />
                      <h4 className="font-semibold">{team?.name}</h4>
                    </div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold">
                        {
                          team.statistics[0]?.details.find(
                            (item) => item.type_id === 52
                          )?.value.all.count
                        }
                      </h4>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <NoDataFound />
            )}
          </div>
        </div>

        {/* Goals Per Match */}
        <div className="bg-base-100 p-4">
          <div className="skew-y-[0.5deg]">
            <h4 className="text-lg uppercase font-bold border-b py-2 border-black mt-1">
              Goals Per Match
            </h4>
            {goalsPerMatchTeams?.length > 0 ? (
              goalsPerMatchTeams.slice(0, 20).map((team) => (
                <Link
                  key={team?.id}
                  href={`/team/${getSlugify(team?.name)}/${team?.id}`}
                >
                  <div className="flex items-center justify-between py-2">
                    <div className="flex items-center gap-2">
                      <img
                        src={team?.image_path}
                        alt="Team Image"
                        className="w-8 h-8 rounded-full ring-1 ring-black"
                      />
                      <h4 className="font-semibold">{team?.name}</h4>
                    </div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold">
                        {
                          team.statistics[0]?.details.find(
                            (item) => item.type_id === 52
                          )?.value.all.average
                        }
                      </h4>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <NoDataFound />
            )}
          </div>
        </div>

        {/* Most Clean Sheets */}
        <div className="bg-base-100 p-4">
          <div className="skew-y-[0.5deg]">
            <h4 className="text-lg uppercase font-bold border-b py-2 border-black mt-2">
              Most Clean Sheets
            </h4>
            {cleanSheetsTeams?.length > 0 ? (
              cleanSheetsTeams.slice(0, 20).map((team) => (
                <Link
                  key={team?.id}
                  href={`/team/${getSlugify(team?.name)}/${team?.id}`}
                >
                  <div className="flex items-center justify-between py-2">
                    <div className="flex items-center gap-2">
                      <img
                        src={team?.image_path}
                        alt="Team Image"
                        className="w-8 h-8 rounded-full ring-1 ring-black"
                      />
                      <h4 className="font-semibold">{team?.name}</h4>
                    </div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold">
                        {
                          team.statistics[0]?.details.find(
                            (item) => item.type_id === 194
                          )?.value.all.count
                        }
                      </h4>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <NoDataFound />
            )}
          </div>
        </div>
      </div>
    );
  }
}
