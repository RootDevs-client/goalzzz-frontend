import GlobalLoading from '@/components/Global/GlobalLoading';
import getSlugify from '@/lib/helpers/getSlugify';
import useFetchMatchLineups from '@/lib/hooks/useFetchMatchLineups';
import Link from 'next/link';
import { IoArrowForwardCircleSharp } from 'react-icons/io5';
import PlayerView from './PlayerView';

export default function MatchLineup({ matchData }) {
  const findTeamInfo = (location, participants) => {
    const team = participants.find((team) => team.meta.location === location);
    return {
      id: team?.id,
      name: team?.name,
      image: team?.image_path,
    };
  };

  const homeTeamInfo = findTeamInfo('home', matchData.participants);
  const awayTeamInfo = findTeamInfo('away', matchData.participants);

  const { matchLineupsLoading, matchLineupsData } = useFetchMatchLineups(
    matchData?.id
  );

  if (matchLineupsLoading) {
    return (
      <>
        <GlobalLoading />
      </>
    );
  }

  const getAdjustedLineup = (apiResponse) => {
    const getFormation = (location) =>
      apiResponse.formations.find(
        (formation) => formation.location === location
      )?.formation;

    const addToPosition = (player, team, position, type) => {
      const playerInfo = {
        id: player.player.id,
        jersey: player.jersey_number,
        name: player.player.display_name,
        image: player.player.image_path,
      };

      formattedLineup[team][type][position] =
        formattedLineup[team][type][position] || [];
      formattedLineup[team][type][position].push(playerInfo);
    };

    let formattedLineup = {
      home: {
        id: homeTeamInfo.id,
        name: homeTeamInfo.name,
        image: homeTeamInfo.image,
        formation: getFormation('home'),
        lineup: { goalkeeper: [], defender: [], midfielder: [], attacker: [] },
        bench: { goalkeeper: [], defender: [], midfielder: [], attacker: [] },
      },
      away: {
        id: awayTeamInfo.id,
        name: awayTeamInfo.name,
        image: awayTeamInfo.image,
        formation: getFormation('away'),
        lineup: { goalkeeper: [], defender: [], midfielder: [], attacker: [] },
        bench: { goalkeeper: [], defender: [], midfielder: [], attacker: [] },
      },
    };

    apiResponse?.lineups?.forEach((player) => {
      const team = player?.team_id === homeTeamInfo?.id ? 'home' : 'away';
      const positionCode = player?.position?.code;

      if (player?.type?.code === 'lineup') {
        addToPosition(player, team, positionCode, 'lineup');
      } else if (player?.type?.code === 'bench') {
        addToPosition(player, team, positionCode, 'bench');
      }
    });

    for (const team of ['home', 'away']) {
      const formation = formattedLineup[team].formation;
      const midfielders = formattedLineup[team].lineup.midfielder;

      if (formation?.split('-').length === 4) {
        const splitIndex = Math.floor(midfielders.length / 2);
        formattedLineup[team].lineup.midfielder = midfielders.slice(
          0,
          splitIndex
        );
        formattedLineup[team].lineup.midfielder_second_half =
          midfielders.slice(splitIndex);
      }
    }
    return formattedLineup;
  };

  const adjustedData = getAdjustedLineup(matchLineupsData?.data);

  const benchedPlayers = matchLineupsData?.data?.lineups
    .filter(
      (lineup) => lineup.type.code === 'bench' && lineup.details.length > 0
    )
    .sort((a, b) => {
      const getMinutesPlayed = (player) =>
        player?.details?.find(
          (stat) => stat.type.developer_name === 'MINUTES_PLAYED'
        )?.data?.value || 0;

      return getMinutesPlayed(b) - getMinutesPlayed(a);
    });

  return (
    <div className="grid grid-cols-12 gap-5 skew-y-[0.5deg]">
      <div className="lg:col-span-8 col-span-12 py-5 h-[1200px] ml-2">
        <div className="relative w-fit">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            width="750"
            height="1125"
            viewBox="0 0 74 111"
            className="absolute inset-0"
          >
            <rect width="74" height="111" fill="#27834E" />
            <g
              fill="none"
              stroke="#fff"
              strokeWidth="0.5"
              transform="translate(3 3)"
            >
              <path id="Border" d="M 0 0 h 68 v 105 h -68 Z" />
              <path id="Centre line" d="M 0 52.5 h 68" />
              <circle id="Centre circle" r="9.15" cx="34" cy="52.5" />
              <circle
                id="Centre mark"
                r="0.75"
                cx="34"
                cy="52.5"
                fill="#fff"
                stroke="none"
              />
              <g id="Penalty area">
                <path
                  id="Penalty area line"
                  d="M 13.84 0 v 16.5 h 40.32 v -16.5"
                />
                <path id="Goal area line" d="M 24.84 0 v 5.5 h 18.32 v -5.5" />
                <circle
                  id="Penalty mark"
                  r="0.75"
                  cx="34"
                  cy="10.94"
                  fill="#fff"
                  stroke="none"
                />
                <path
                  id="Penalty arc"
                  d="M 26.733027 16.5 a 9.15 9.15 0 0 0 14.533946 0"
                />
              </g>
              <use xlinkHref="#Penalty area" transform="rotate(180,34,52.5)" />
              <path
                id="Corner arcs"
                d="M 0 2 a 2 2 0 0 0 2 -2M 66 0 a 2 2 0 0 0 2 2M 68 103 a 2 2 0 0 0 -2 2M 2 105 a 2 2 0 0 0 -2 -2"
              />
            </g>
          </svg>

          <div className="absolute inset-0 w-[750px] h-[1125px]">
            <div className="p-6 h-full grid grid-rows-2 gap-2">
              <div className="h-full flex flex-col justify-between p-4 relative">
                {adjustedData?.home?.lineup?.goalkeeper.map((player) => (
                  <PlayerView key={player.id} player={player} />
                ))}
                <div
                  className={`flex gap-5 items-center justify-around mx-auto`}
                >
                  {adjustedData?.home?.lineup?.defender.map((player) => (
                    <PlayerView key={player.id} player={player} />
                  ))}
                </div>
                <div
                  className={`flex gap-5 items-center justify-around mx-auto`}
                >
                  {adjustedData?.home?.lineup?.midfielder.map((player) => (
                    <PlayerView key={player.id} player={player} />
                  ))}
                </div>
                {adjustedData?.home?.lineup?.midfielder_second_half ? (
                  <>
                    <div
                      className={`flex gap-5 items-center justify-around mx-auto`}
                    >
                      {adjustedData?.home?.lineup?.midfielder_second_half?.map(
                        (player) => (
                          <PlayerView key={player.id} player={player} />
                        )
                      )}
                    </div>
                    <div
                      className={`flex gap-5 items-center justify-around mx-auto`}
                    >
                      {adjustedData?.home?.lineup?.attacker.map((player) => (
                        <PlayerView key={player.id} player={player} />
                      ))}
                    </div>
                  </>
                ) : (
                  <>
                    <div
                      className={`flex gap-5 items-center justify-around mx-auto`}
                    >
                      {adjustedData?.home?.lineup?.attacker.map((player) => (
                        <PlayerView key={player.id} player={player} />
                      ))}
                    </div>
                  </>
                )}

                {/* Home Team */}

                <div className="absolute top-5 left-5 ">
                  <Link
                    href={`/team/${getSlugify(homeTeamInfo.name)}/${
                      homeTeamInfo?.id
                    }`}
                    className="flex items-center gap-2"
                  >
                    <img
                      src={homeTeamInfo?.image}
                      alt="Logo"
                      className="w-10 h-10  p-0.5 rounded-full"
                    />
                    <span className="text-white ">{homeTeamInfo?.name}</span>
                  </Link>
                </div>
              </div>
              <div className="h-full flex flex-col justify-between p-4 relative">
                {adjustedData?.away?.lineup?.midfielder_second_half ? (
                  <>
                    <div
                      className={`flex gap-5 items-center justify-around mx-auto`}
                    >
                      {adjustedData?.away?.lineup?.midfielder_second_half?.map(
                        (player) => (
                          <PlayerView key={player.id} player={player} />
                        )
                      )}
                    </div>
                    <div
                      className={`flex gap-5 items-center justify-around mx-auto`}
                    >
                      {adjustedData?.away?.lineup?.attacker.map((player) => (
                        <PlayerView key={player.id} player={player} />
                      ))}
                    </div>
                  </>
                ) : (
                  <>
                    <div
                      className={`flex gap-5 items-center justify-around mx-auto`}
                    >
                      {adjustedData?.away?.lineup?.attacker.map((player) => (
                        <PlayerView key={player.id} player={player} />
                      ))}
                    </div>
                  </>
                )}
                <div
                  className={`flex gap-5 items-center justify-around mx-auto`}
                >
                  {adjustedData?.away?.lineup?.midfielder.map((player) => (
                    <PlayerView key={player.id} player={player} />
                  ))}
                </div>
                <div
                  className={`flex gap-5 items-center justify-around mx-auto`}
                >
                  {adjustedData?.away?.lineup?.defender.map((player) => (
                    <PlayerView key={player.id} player={player} />
                  ))}
                </div>
                {adjustedData?.away?.lineup?.goalkeeper.map((player) => (
                  <PlayerView key={player.id} player={player} />
                ))}

                {/* Away Team */}

                <div className="absolute bottom-5 right-5">
                  <Link
                    href={`/team/${getSlugify(awayTeamInfo.name)}/${
                      awayTeamInfo?.id
                    }`}
                    className="flex items-center gap-2"
                  >
                    <span className="text-white ">{awayTeamInfo?.name}</span>
                    <img
                      src={awayTeamInfo?.image}
                      alt="Logo"
                      className="w-10 h-10  p-0.5 rounded-full"
                    />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="lg:col-span-4 col-span-12 mt-3 rounded-lg p-4 shadow-md border border-gray-200 h-fit m-4">
        <h4 className="font-semibold">Bench</h4>
        <div className="grid grid-cols-2">
          {benchedPlayers?.map((playerData) => {
            const minutesPlayed = playerData?.details?.find(
              (stat) => stat.type.developer_name === 'MINUTES_PLAYED'
            )?.data?.value;

            return (
              <div key={playerData.id}>
                <div className="relative flex flex-col items-center gap-2">
                  <div className="flex items-center absolute top-2 left-10">
                    <span className="text-green-500 text-sm">
                      {minutesPlayed}
                    </span>
                    <IoArrowForwardCircleSharp className="text-green-500" />
                  </div>
                  <img
                    src={playerData?.player?.image_path}
                    alt="Logo"
                    className="w-[40px] rounded-full"
                  />
                  <span className="font-medium ml-2 text-sm">
                    {playerData?.jersey_number}{' '}
                    {playerData?.player?.display_name.slice(0, 14)}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
