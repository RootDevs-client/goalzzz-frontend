'use client';

import { useAppContext } from '@/contexts/XoomAppContent';
import Link from 'next/link';
import { BiStar } from 'react-icons/bi';
import { FiChevronRight } from 'react-icons/fi';
import MatchCard from './MatchCard';

export default function FixtureList() {
  const {
    checkLive,
    fixturesData,
    isLoadingFixtures,
    isRefetching,
    refetchFixtures,
  } = useAppContext();

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

  // Filter live matches based on the isLive status
  const liveMatches = (fixturesData || []).flatMap((league) =>
    (league?.fixtures || []).filter((match) =>
      liveStatus.includes(match?.state?.state)
    )
  );

  function filterLiveFixturesAndRemoveEmpty(leagues, liveStatus) {
    return leagues
      ?.map((league) => {
        const liveFixtures = league.fixtures.filter((fixture) =>
          liveStatus.includes(fixture.state?.state)
        );
        return { ...league, fixtures: liveFixtures };
      })
      .filter((league) => league.fixtures.length > 0);
  }

  const leaguesWithLiveFixtures = filterLiveFixturesAndRemoveEmpty(
    fixturesData,
    liveStatus
  );

  const finalFixtures = fixturesData?.sort((a, b) => a.id - b.id);

  const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  if (isLoadingFixtures || isRefetching) {
    return (
      <div className="mt-3 mb-2">
        {arr.map((item) => (
          <div key={item} className="grid grid-cols-12 gap-5 mt-4">
            <div className="col-span-1 h-10 w-12 bg-[#F0F0F0] animate-pulse rounded-md"></div>
            <div className="col-span-4 h-10 w-full bg-[#F0F0F0] animate-pulse rounded-md"></div>
            <div className="col-span-1 h-10 w-10 bg-[#F0F0F0] animate-pulse rounded-full m-auto"></div>
            <div className="col-span-4 h-10 w-full bg-[#F0F0F0] animate-pulse rounded-md"></div>
            <div className="col-span-2 h-10 w-full animate-pulse rounded-md flex items-center justify-center">
              <BiStar className="text-2xl text-gray-300" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <>
      {checkLive ? (
        <>
          {liveMatches.length === 0 && (
            <div className="p-10">
              <div className="px-20">
                <img
                  src="/vector_matches_fav.png"
                  alt="team one"
                  className="w-full"
                />
              </div>
              <p className="text-center font-semibold text-[14px]">
                UNFORTUNATELY, THERE ARE NO LIVE MATCHES HAPPENING AT THE
                MOMENT. PLEASE CHECK BACK LATER. SEE YOU SOON!
              </p>
            </div>
          )}

          {leaguesWithLiveFixtures?.map((league) => (
            <div key={league.id} className="flex flex-col items-center">
              <div className="bg-white h-12 w-full -skew-y-[0.5deg]">
                <div className="skew-y-[0.5deg] ">
                  <Link
                    className="flex items-center justify-between h-full p-2 px-4 hover:text-secondary"
                    href={`/league/details/${league?.id}`}
                  >
                    <h4 className="text-gray-900 text-[16px] font-semibold uppercase">
                      {league?.name}
                    </h4>
                    <FiChevronRight className="text-xl" />
                  </Link>
                </div>
              </div>

              {league?.fixtures?.map((match) => (
                <MatchCard
                  key={match.id}
                  match={match}
                  refetchFixtures={refetchFixtures}
                />
              ))}
            </div>
          ))}
        </>
      ) : (
        <>
          {finalFixtures?.map((league) => (
            <div key={league.id} className="flex flex-col items-center">
              <div className="bg-white h-12 w-full -skew-y-[0.5deg]">
                <div className="skew-y-[0.5deg] ">
                  <Link
                    className="flex items-center justify-between h-full p-2 px-4 hover:text-secondary"
                    href={`/league/details/${league?.id}`}
                  >
                    <h4 className="text-gray-900 text-[16px] font-semibold uppercase">
                      {league?.name}
                    </h4>
                    <FiChevronRight className="text-xl" />
                  </Link>
                </div>
              </div>

              {league?.fixtures?.map((match) => (
                <MatchCard
                  key={match.id}
                  match={match}
                  refetchFixtures={refetchFixtures}
                />
              ))}
            </div>
          ))}
        </>
      )}
    </>
  );
}
