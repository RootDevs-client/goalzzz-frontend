import GlobalLoading from '@/components/Global/GlobalLoading';
import { calculateTeamResults } from '@/lib/helpers/calculateTeamResults';
import getSlugify from '@/lib/helpers/getSlugify';
import { last7MatchesFormattedData } from '@/lib/helpers/last7MatchesFormattedData';
import useFetchTeamInfo from '@/lib/hooks/useFetchTeamInfo';
import Link from 'next/link';
import MatchResultBadge from './MatchResultBadge';

export default function TeamOneMatchPreview({ matchData }) {
  const homeTeamId = matchData?.participants?.find(
    (team) => team.meta.location === 'home'
  )?.id;

  const { teamInfoLoading: teamInfoLoading1, teamInfoData: teamInfoData1 } =
    useFetchTeamInfo(homeTeamId);

  const teamOneFinalFormat = last7MatchesFormattedData(teamInfoData1);

  const teamResults = calculateTeamResults(homeTeamId, teamOneFinalFormat);

  return (
    <div>
      {teamInfoLoading1 ? (
        <div>
          <GlobalLoading />
        </div>
      ) : (
        <div className="skew-y-[0.5deg] mb-3">
          <div className="flex items-center justify-between p-4 mb-4">
            <h4 className="font-bold uppercase">{teamInfoData1?.name}</h4>
            <div className="flex items-center gap-1 sm:gap-5">
              {teamResults?.map((match, index) => (
                <MatchResultBadge key={index} result={match} />
              ))}
            </div>
          </div>

          <div className="flex gap-4 p-3 pt-0 overflow-auto scrollbar-hidden">
            {teamOneFinalFormat.map((match) => {
              const homeGoals = match?.team_one?.goal;
              const awayGoals = match?.team_two?.goal;
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
                    className="flex justify-between items-center w-full"
                  >
                    <img
                      src={match?.team_one?.image}
                      alt="Demo Image"
                      className="w-8 h-8 rounded-full ring-1 ring-black"
                    />

                    <p className="flex">
                      <span>{homeGoals}</span>
                      <span> - </span>
                      <span>{awayGoals}</span>
                    </p>

                    <img
                      src={match?.team_two?.image}
                      alt="Demo Image"
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
