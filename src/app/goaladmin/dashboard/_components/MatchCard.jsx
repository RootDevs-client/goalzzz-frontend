'use client';

import useGetAllMatches from '@/lib/hooks/useGetAllMatches';

export default function MatchCard() {
  const { allMatches, allMatchesLoading } = useGetAllMatches();
  return (
    <div className="flex flex-wrap gap-5">
      <div className="card w-[250px] bg-white text-neutral-content border border-gray-200">
        <div className="card-body items-center text-center">
          {allMatchesLoading ? (
            <div className="h-6 w-6  bg-gray-300 animate-pulse rounded-md"></div>
          ) : (
            <h2 className="card-title text-2xl text-primary">
              {allMatches.length}
            </h2>
          )}
          <p className="text-base text-primary">Total Live Matches</p>
        </div>
      </div>
    </div>
  );
}
