import GlobalLoading from '@/components/Global/GlobalLoading';
import { sportMonkUrl } from '@/lib/axios/getAxios';
import { useQuery } from 'react-query';
import PlayerCard from './PlayerCard';

export default function TeamSquad({ teamDetails, teamId }) {
  const seasonId = teamDetails?.activeseasons[0]?.id;

  const activeCoach = teamDetails?.coaches.find((coach) => coach.active);

  const { isLoading: teamSquadLoading, data: teamSquadData } = useQuery(
    `team-squad-${teamId}`,
    async () => {
      const response = await sportMonkUrl.get(
        `/squads/seasons/${seasonId}/teams/${teamId}?include=player.position;player.country`
      );
      if (response.status === 200) {
        return response.data;
      } else {
        throw new Error('Failed to fetch team statistics data!');
      }
    }
  );

  if (teamSquadLoading) {
    return (
      <>
        <GlobalLoading />
      </>
    );
  }

  function groupSquadDataByPosition(squadData) {
    return squadData.reduce((groupedData, player) => {
      const positionCode = player?.player?.position?.code;

      if (!groupedData[positionCode]) {
        groupedData[positionCode] = [];
      }

      groupedData[positionCode].push({
        playerId: player?.player?.id,
        displayName: player?.player?.display_name,
        imagePath: player?.player?.image_path,
        countryName: player?.player?.country?.name,
        countryImagePath: player?.player?.country?.image_path,
      });

      return groupedData;
    }, {});
  }

  const groupedData = groupSquadDataByPosition(teamSquadData?.data);

  return (
    <div className="skew-y-[0.5deg] mt-10">
      <h4 className="text-lg uppercase font-semibold mt-3">Goal-keeper</h4>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-5 justify-center items-center border-b border-gray-600 pb-5">
        {groupedData?.goalkeeper?.map((player) => (
          <PlayerCard key={player.playerId} player={player} />
        ))}
      </div>

      <h4 className="text-lg uppercase font-semibold mt-3">DEFENDER</h4>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-5 justify-center items-center border-b border-gray-600 pb-5">
        {groupedData?.defender?.map((player) => (
          <PlayerCard key={player.playerId} player={player} />
        ))}
      </div>

      <h4 className="text-lg uppercase font-semibold mt-3">MIDFIELDER</h4>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-5 justify-center items-center border-b border-gray-600 pb-5">
        {groupedData?.midfielder?.map((player) => (
          <PlayerCard key={player.playerId} player={player} />
        ))}
      </div>

      <h4 className="text-lg uppercase font-semibold mt-3">ATTACKER</h4>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-5 justify-center items-center border-b border-gray-600 pb-5">
        {groupedData?.attacker?.map((player) => (
          <PlayerCard key={player.playerId} player={player} />
        ))}
      </div>

      <h4 className="text-lg uppercase font-semibold mt-3">COACH</h4>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-5 justify-center items-center ">
        <div className="flex items-center gap-2 my-2">
          <img
            src={activeCoach?.coach?.image_path}
            alt={activeCoach?.coach?.display_name}
            width={50}
            height={50}
            className="w-10 h-10 ring-1 ring-black p-0.5 rounded-full"
          />

          <h4 className="text-sm font-semibold mb-1">
            {activeCoach?.coach?.display_name}
          </h4>
        </div>
      </div>
    </div>
  );
}
