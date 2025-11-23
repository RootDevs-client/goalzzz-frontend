import NoDataFound from '@/components/Global/NoDataFound';
import StandingTeamItem from '@/components/Global/StandingTeamItem';
import Link from 'next/link';

export default function TeamStandingsPreview({
  matchData,
  leagueStandingsData,
}) {
  const getTeamIdByLocation = (location) => {
    const team = matchData.participants.find(
      (team) => team.meta.location === location
    );
    if (!team) {
      console.error(`Team not found for location: ${location}`);
    }
    return team ? team.id : null;
  };

  if (!leagueStandingsData?.status) {
    return <NoDataFound />;
  }

  const participantOne = getTeamIdByLocation('home');
  const participantTwo = getTeamIdByLocation('away');

  function transformDetailsToObj(details) {
    const result = {};

    details.forEach((detail) => {
      const { type_id, value } = detail;
      result[type_id] = value;
    });

    return result;
  }

  let transformedStandings = leagueStandingsData?.data?.map(
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

  // Filter for participantOne and participantTwo
  transformedStandings = transformedStandings?.filter(
    (standing) =>
      standing.teamId === participantOne || standing.teamId === participantTwo
  );

  return (
    <div className="skew-y-[1deg] mt-5">
      <Link
        href={`/league/details/${matchData?.league?.id}`}
        className="flex items-center w-fit gap-4 my-5 ml-10"
      >
        <img
          src={matchData?.league?.image_path}
          alt="League logo"
          className="w-10 h-10 rounded-full ring-1 ring-black p-0.5"
        />
        <div>
          <h4 className="text-lg font-semibold">{matchData?.league?.name}</h4>
          <h4 className="text-sm">{matchData?.league?.country?.name}</h4>
        </div>
      </Link>

      <>
        <div className="text-gray-400 uppercase w-full">
          {transformedStandings?.length > 0 && (
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
          {transformedStandings?.length > 0 ? (
            transformedStandings?.map((singleStandings) => (
              <StandingTeamItem
                key={singleStandings.position}
                singleStandings={singleStandings}
              />
            ))
          ) : (
            <NoDataFound />
          )}
        </div>
      </>
    </div>
  );
}
