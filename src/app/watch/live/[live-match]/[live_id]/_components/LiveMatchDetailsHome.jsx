'use client';

import SelectedLiveMatch from './SelectedLiveMatch';
import UpcomingLiveMatches from './UpcomingLiveMatches';

const formatDate = (timestamp) => new Date(timestamp * 1000);

const LiveMatchDetailsHome = ({ matchData, allLiveMatches }) => {
  // Filter out the selected match
  const filteredLiveMatches = allLiveMatches.filter(
    (match) => match.id !== matchData?.id
  );

  const upcomingLiveMatches = filteredLiveMatches.filter(
    ({ match_time: matchTimestamp }) => isFutureDate(matchTimestamp)
  );

  const currentLiveMatches = filteredLiveMatches.filter(
    ({ match_time: matchTimestamp }) => isPastDate(matchTimestamp)
  );

  return (
    <div className="max-w-screen-xl mx-auto">
      <SelectedLiveMatch match={matchData} />
      <UpcomingLiveMatches
        upcomingLiveMatches={upcomingLiveMatches}
        currentLiveMatches={currentLiveMatches}
      />
    </div>
  );
};

const isFutureDate = (timestamp) => formatDate(timestamp) > new Date();

const isPastDate = (timestamp) => formatDate(timestamp) < new Date();

export default LiveMatchDetailsHome;
