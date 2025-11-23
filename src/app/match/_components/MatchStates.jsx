import { convertTimestampToFormattedDate } from '@/lib/helpers/convertTimestampToFormattedDate';
import { getCurrentGoals } from '@/lib/helpers/getCurrentGoals';

export default function MatchStates({ match }) {
  const liveStatus = [
    'INPLAY_1ST_HALF',
    'INPLAY_2ND_HALF',
    'HT',
    'INPLAY_ET',
    'INPLAY_ET_2ND_HALF',
    'BREAK',
    'PEN_BREAK',
    'EXTRA_TIME_BREAK',
    'INPLAY_PENALTIES',
  ];
  const finishedStatus = ['FT', 'AET', 'FT_PEN'];
  const upcomingStatus = [
    'TBA',
    'NS',
    'WO',
    'ABANDONED',
    'CANCELLED',
    'AWARDED',
    'INTERRUPTED',
    'POSTPONED',
  ];

  const matchState = match?.state?.state;
  const isLive = liveStatus.includes(matchState);
  const isUpcoming = upcomingStatus.includes(matchState);
  const isFinished = finishedStatus.includes(matchState);

  const totalGoals = getCurrentGoals(match?.scores);
  const formattedDate = convertTimestampToFormattedDate(
    match?.starting_at_timestamp
  );

  return (
    <div className="col-span-3 w-12 h-12 sm:w-16 sm:h-16 bg-primary rounded-full flex flex-col text-xs text-gray-100 items-center justify-center mx-auto ">
      {isLive && (
        <div className="relative flex flex-col items-center">
          <span>{match?.periods?.slice(-1)[0]?.minutes}</span>
          <span className="absolute -top-2 -right-1 text-secondary animate-pulse text-xl">
            {`"`}
          </span>
          <span className="font-semibold">{totalGoals}</span>
        </div>
      )}

      {isFinished && <span className="font-semibold ">{totalGoals}</span>}

      {isUpcoming && (
        <div className="text-center">
          <span className="font-semibold text-[10px] sm:text-[12px]">
            {formattedDate}
          </span>
        </div>
      )}
    </div>
  );
}
