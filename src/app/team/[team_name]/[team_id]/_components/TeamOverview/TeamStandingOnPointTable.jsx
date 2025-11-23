import GlobalLoading from '@/components/Global/GlobalLoading';
import NoDataFound from '@/components/Global/NoDataFound';
import StandingTeamItem from '@/components/Global/StandingTeamItem';
import useFetchLeagueStandings from '@/lib/hooks/useFetchLeagueStandings';
import Link from 'next/link';

function transformDetailsToObj(details) {
  const result = {};
  details.forEach(({ type_id, value }) => {
    result[type_id] = value;
  });
  return result;
}

function getItemAndNeighbors(array, teamId) {
  const index = array.findIndex(
    (item) => parseInt(item.teamId) === parseInt(teamId)
  );
  if (index === -1) {
    return [];
  }

  const previousItem = index > 0 ? array[index - 1] : null;
  const currentItem = array[index];
  const nextItem = index < array.length - 1 ? array[index + 1] : null;

  const resultArray = [previousItem, currentItem, nextItem].filter(Boolean);
  return resultArray;
}

export default function TeamStandingOnPointTable({
  seasonId,
  teamId,
  leagueInfo,
}) {
  const { leagueStandingsLoading, leagueStandingsData } =
    useFetchLeagueStandings(seasonId);

  if (leagueStandingsLoading) {
    return (
      <>
        <GlobalLoading />
      </>
    );
  }

  const transformedStandings = (leagueStandingsData?.data ?? []).map(
    (singleStandings) => {
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
    }
  );

  transformedStandings.sort((a, b) => b.PTS - a.PTS);

  const desiredList = getItemAndNeighbors(transformedStandings, teamId);

  return (
    <div className="skew-y-[0.5deg] border-t border-gray-800 mt-6 text-[12px] sm:text-base">
      <Link
        href={`/league/details/${leagueInfo?.id}`}
        className="flex items-center w-fit gap-4 my-5 ml-10"
      >
        <img
          src={leagueInfo?.image_path}
          alt="League logo"
          className="w-10 h-10 rounded-full ring-1 ring-black p-0.5"
        />
        <div>
          <h4 className="text-lg font-semibold">{leagueInfo?.name}</h4>
          <h4 className="text-sm">{leagueInfo?.country?.name}</h4>
        </div>
      </Link>

      <div className="text-gray-400 uppercase w-full">
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
      </div>
      <div className=" text-sm/[1rem] text-[12px] sm:text-base">
        {transformedStandings.length > 0 ? (
          desiredList?.map((singleStandings, index) => (
            <StandingTeamItem
              key={singleStandings.position + index}
              singleStandings={singleStandings}
            />
          ))
        ) : (
          <NoDataFound />
        )}
      </div>
    </div>
  );
}
