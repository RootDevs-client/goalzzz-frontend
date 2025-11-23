'use client';

import LeagueItem from './LeagueItem';

export default function AllLeaguesList({
  allLeaguesData,
  isLoadingAllLeagues,
}) {
  // const { allLeaguesData, isLoadingAllLeagues } = useGetAllLeagues();
  const arr = [1, 2, 3, 4, 5, 6, 7];

  if (isLoadingAllLeagues) {
    return (
      <div className="space-y-4 mt-2 mb-2">
        {arr.map((shimmer) => (
          <div className="grid grid-cols-12" key={shimmer}>
            <div className="col-span-2 w-7 h-7 bg-white rounded-full animate-pulse"></div>
            <div className="col-span-10 h-7 w-full bg-white animate-pulse rounded-md"></div>
          </div>
        ))}
      </div>
    );
  }

  if (allLeaguesData?.status) {
    return (
      <div className="p-2">
        {allLeaguesData?.data.map((league) => (
          <LeagueItem key={league?.id} league={league} />
        ))}
      </div>
    );
  }

  return (
    <div className="p-2 font-medium">
      No data available right now... Please try again later!
    </div>
  );
}
