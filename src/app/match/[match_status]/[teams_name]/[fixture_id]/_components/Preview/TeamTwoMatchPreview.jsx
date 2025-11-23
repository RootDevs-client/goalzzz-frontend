import GlobalLoading from '@/components/Global/GlobalLoading';
import { calculateTeamResults } from '@/lib/helpers/calculateTeamResults';
import getSlugify from '@/lib/helpers/getSlugify';
import { last7MatchesFormattedData } from '@/lib/helpers/last7MatchesFormattedData';
import useFetchTeamInfo from '@/lib/hooks/useFetchTeamInfo';
import Link from 'next/link';
import MatchResultBadge from './MatchResultBadge';

export default function TeamTwoMatchPreview({ matchData }) {
  const awayTeamId = matchData?.participants?.find(
    (team) => team.meta.location === 'away'
  )?.id;

  const { teamInfoLoading: teamInfoLoading2, teamInfoData: teamInfoData2 } =
    useFetchTeamInfo(awayTeamId);

  const teamTwoFinalFormat = last7MatchesFormattedData(teamInfoData2);
  const teamResults = calculateTeamResults(awayTeamId, teamTwoFinalFormat);

  return (
    <div>
      {teamInfoLoading2 ? (
        <div>
          <GlobalLoading />
        </div>
      ) : (
        <div className="skew-y-[0.5deg] mb-3">
          <div className="flex items-center justify-between p-4 mb-4">
            <h4 className="font-bold uppercase">{teamInfoData2?.name}</h4>
            <div className="flex items-center  gap-1 sm:gap-5">
              {teamResults?.map((match, index) => (
                <MatchResultBadge key={index} result={match} />
              ))}
            </div>
          </div>

          <div className="flex grid-cols-3 lg:grid-cols-7 gap-5 px-5 overflow-auto scrollbar-hidden">
            {teamTwoFinalFormat.map((match) => {
              const homeGoals = match?.team_one?.goal;
              const awayGoals = match?.team_two?.goal;

              const teamOneImage = match?.team_one?.image;
              const teamTwoImage = match?.team_two?.image;

              return (
                <div
                  key={match?.fixtureId}
                  className="flex  min-w-[110px]  items-center gap-2 py-2"
                >
                  <Link
                    href={`/match/details/${getSlugify(
                      match?.team_one?.name
                    )}-vs-${getSlugify(match?.team_two?.name)}/${
                      match?.fixtureId
                    }`}
                    key={match?.fixtureId}
                    className="flex justify-between items-center w-full"
                  >
                    <img
                      src={teamOneImage}
                      alt="Team One Image"
                      className="w-8 h-8 rounded-full ring-1 ring-black"
                    />

                    <span>
                      {homeGoals !== undefined && awayGoals !== undefined
                        ? `${homeGoals} - ${awayGoals}`
                        : 'N/A'}
                    </span>

                    <img
                      src={teamTwoImage}
                      alt="Team Two Image"
                      className="w-8 h-8 rounded-full ring-1 ring-black"
                    />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
