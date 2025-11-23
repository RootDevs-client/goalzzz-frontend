import moment from 'moment';
import { AiOutlineCalendar } from 'react-icons/ai';
import { HiOutlineUserGroup } from 'react-icons/hi';
import MatchStandingsPreview from './Preview/MatchStandingsPreview';
import TeamOneMatchPreview from './Preview/TeamOneMatchPreview';
import TeamTwoMatchPreview from './Preview/TeamTwoMatchPreview';

export default function MatchPreview({ matchData }) {
  return (
    <>
      <div className="bg-base-100">
        <div className="flex items-center justify-between p-5 skew-y-[0.5deg]">
          <div className="flex items-center gap-2">
            <AiOutlineCalendar className="text-2xl" />
            <span className="text-sm">
              {moment
                .unix(matchData?.starting_at_timestamp)
                .local()
                .format('DD MMMM YYYY, HH:mm')}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <HiOutlineUserGroup className="text-2xl" title="Capacity" />
            <p className="text-sm">{matchData?.venue?.capacity}</p>
          </div>
        </div>
      </div>

      {/* Teams last 7 matches */}
      <TeamOneMatchPreview matchData={matchData} />
      <TeamTwoMatchPreview matchData={matchData} />

      {/* Standings */}
      <MatchStandingsPreview matchData={matchData} />
    </>
  );
}
