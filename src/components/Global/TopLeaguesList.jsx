'use client';

import LeagueItem from './LeagueItem';

export default function TopLeaguesList({ topLeagues, isLoadingTopLeagues }) {
  // const { topLeagues, isLoadingTopLeagues } = useGetTopLeagues();
  const shimmerArray = [1, 2, 3, 4, 5, 6, 7];

  if (isLoadingTopLeagues) {
    return (
      <div className="space-y-4 mt-2 mb-2">
        {shimmerArray.map((shimmer) => (
          <div className="grid grid-cols-12" key={shimmer}>
            <div className="col-span-2 w-7 h-7 bg-white rounded-full animate-pulse"></div>
            <div className="col-span-10 h-7 w-full bg-white animate-pulse rounded-md"></div>
          </div>
        ))}
      </div>
    );
  }

  if (topLeagues?.status) {
    return (
      <div className="p-2">
        {topLeagues.data.length === 0 ? (
          <div className="p-4 text-center text-gray-600">
            No popular leagues found.{' '}
            <span className="text-sm text-gray-500 pt-4">
              Discover exciting leagues from All leagues and add them to your
              favorites!
            </span>
          </div>
        ) : (
          topLeagues.data.map((league) => (
            <LeagueItem key={league?.id} league={league} />
          ))
        )}
      </div>
    );
  } else {
    return (
      <div className="p-2 font-medium">
        Failed to fetch data. Please try again later.
      </div>
    );
  }
}
