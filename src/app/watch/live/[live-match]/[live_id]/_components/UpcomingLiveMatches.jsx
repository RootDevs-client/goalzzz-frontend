import UpcomingMatchCard from './UpcomingMatchCard';

const UpcomingLiveMatches = ({ currentLiveMatches, upcomingLiveMatches }) => (
  <div className="mt-5">
    {currentLiveMatches.length > 0 && (
      <>
        <div className="bg-primary mt-5">
          <p className="text-2xl text-white px-5 py-3">Also live</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-5">
          {currentLiveMatches.map((match) => (
            <UpcomingMatchCard key={match.id} match={match} />
          ))}
        </div>
      </>
    )}
    {upcomingLiveMatches.length > 0 && (
      <>
        <div className="bg-primary mt-5">
          <p className="text-2xl text-white px-5 py-3">Upcoming live matches</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-5">
          {upcomingLiveMatches.map((match) => (
            <UpcomingMatchCard key={match.id} match={match} />
          ))}
        </div>
      </>
    )}
  </div>
);

export default UpcomingLiveMatches;
