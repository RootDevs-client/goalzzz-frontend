import MatchCard from '@/app/match/_components/MatchCard';
import NoDataFound from '@/components/Global/NoDataFound';
import { filterSortAndGroupMatches } from '@/lib/helpers/filterSortAndGroupMatches';
import useFetchLeagueFixtures from '@/lib/hooks/useFetchLeagueFixtures';
import { BiStar } from 'react-icons/bi';

export default function LeagueFixture({ seasonId }) {
  const { leagueFixturesLoading, leagueFixturesData } =
    useFetchLeagueFixtures(seasonId);
  const arr = Array(10).fill(0);
  if (leagueFixturesLoading) {
    return (
      <div className="mt-3 mb-2">
        {arr.map((shimmer, index) => (
          <div key={index} className="grid grid-cols-12 gap-5 mb-4">
            <div className="col-span-1 h-10 w-12 bg-gray-300 animate-pulse rounded-md"></div>
            <div className="col-span-4 h-10 w-full bg-gray-300 animate-pulse rounded-md"></div>
            <div className="col-span-1 h-10 w-10 bg-gray-300 animate-pulse rounded-full m-auto"></div>
            <div className="col-span-4 h-10 w-full bg-gray-300 animate-pulse rounded-md"></div>
            <div className="col-span-2 h-10 w-full animate-pulse rounded-md flex items-center justify-center">
              <BiStar className="text-2xl text-gray-300" />
            </div>
          </div>
        ))}
      </div>
    );
  } else {
    if (leagueFixturesData?.status) {
      const filteredSortedGroupedMatches = filterSortAndGroupMatches(
        leagueFixturesData?.data?.fixtures
      );

      return (
        <div>
          {filteredSortedGroupedMatches.length > 0 ? (
            <div>
              {filteredSortedGroupedMatches?.map((league) => (
                <div
                  key={league.date}
                  className="flex flex-col items-center  max-w-3xl mx-auto mt-2"
                >
                  <div className="bg-white h-12 w-full -skew-y-[0.5deg]">
                    <div className="skew-y-[0.5deg] flex items-center justify-between h-full p-2 px-4 hover:text-secondary">
                      <h4 className="text-gray-900 text-[16px] font-semibold uppercase py-3">
                        {league?.date}
                      </h4>
                    </div>
                  </div>

                  {league?.matches?.map((match) => (
                    <MatchCard key={match.id} match={match} large={true} />
                  ))}
                </div>
              ))}
            </div>
          ) : (
            <NoDataFound />
          )}
        </div>
      );
    } else {
      return <NoDataFound />;
    }
  }
}
