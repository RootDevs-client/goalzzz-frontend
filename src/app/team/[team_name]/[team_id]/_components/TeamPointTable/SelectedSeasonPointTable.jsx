import NoDataFound from '@/components/Global/NoDataFound';
import StandingTeamItem from '@/components/Global/StandingTeamItem';

export default function SelectedSeasonPointTable({ leagueStandingsData }) {
  function transformDetailsToObj(details) {
    const result = {};
    details.forEach(({ type_id, value }) => {
      result[type_id] = value;
    });
    return result;
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

  return (
    <>
      {transformedStandings.length > 0 ? (
        <div className="skew-y-[0.5deg] mt-6 text-[12px] sm:text-base">
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
          <div>
            {transformedStandings.map((singleStandings, index) => (
              <StandingTeamItem
                key={singleStandings.position + index}
                singleStandings={singleStandings}
              />
            ))}
          </div>
        </div>
      ) : (
        <NoDataFound />
      )}
    </>
  );
}
