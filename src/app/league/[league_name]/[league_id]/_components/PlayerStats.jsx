import NoDataFound from '@/components/Global/NoDataFound';
import getSlugify from '@/lib/helpers/getSlugify';
import useFetchPlayerStates from '@/lib/hooks/useFetchPlayerStates';
import Link from 'next/link';
function getTopPlayers(data, typeId) {
  return (
    data?.topscorers
      .filter((scorer) => scorer.type_id === typeId)
      .sort((a, b) => b.total - a.total) || []
  );
}

export default function PlayerStats({ seasonId }) {
  const { leaguePlayerStatesLoading, leaguePlayerStatesData } =
    useFetchPlayerStates(seasonId);
  const arr = Array(10).fill(0);

  if (leaguePlayerStatesLoading) {
    return (
      <div className="space-y-4 mt-8 mb-2 skew-y-[0.5deg]">
        <div className="grid grid-cols-12 gap-3">
          <div className="col-span-12 md:col-span-6">
            <div className="col-span-12 h-10 w-full bg-gray-300 animate-pulse rounded-md mb-4"></div>
            <div className="grid grid-cols-12 col-span-12 gap-3 space-y-4">
              {arr.map((shimmer, index) => (
                <div
                  key={index}
                  className="col-span-12 md:col-span-12 h-6 w-full animate-pulse rounded-md grid grid-cols-12 gap-3"
                >
                  <div className="col-span-1 h-8 w-8 bg-gray-300 animate-pulse rounded-full"></div>
                  <div className="col-span-10 h-8 w-full bg-gray-300 animate-pulse rounded-md"></div>
                  <div className="col-span-1 h-8 w-8 bg-gray-300 animate-pulse rounded-full"></div>
                </div>
              ))}
            </div>
          </div>
          <div className="col-span-12 md:col-span-6">
            <div className="col-span-12 h-10 w-full bg-gray-300 animate-pulse rounded-md mb-4"></div>
            <div className="grid grid-cols-12 col-span-12 gap-3 space-y-4">
              {arr.map((shimmer, index) => (
                <div
                  key={index}
                  className="col-span-12 md:col-span-12 h-6 w-full animate-pulse rounded-md grid grid-cols-12 gap-3"
                >
                  <div className="col-span-1 h-8 w-8 bg-gray-300 animate-pulse rounded-full"></div>
                  <div className="col-span-10 h-8 w-full bg-gray-300 animate-pulse rounded-md"></div>
                  <div className="col-span-1 h-8 w-8 bg-gray-300 animate-pulse rounded-full"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    const topScorer = getTopPlayers(leaguePlayerStatesData, 208).slice(0, 20);
    const topAssist = getTopPlayers(leaguePlayerStatesData, 209).slice(0, 20);

    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="bg-base-100 p-4 h-auto">
          <div className="skew-y-[0.5deg]">
            <h4 className="text-lg uppercase font-bold border-b py-2 border-black">
              Top Scorer
            </h4>
            {topScorer.length > 0 ? (
              topScorer.slice(0, 20).map((scorer) => (
                <Link
                  key={scorer.id}
                  href={`/player/${getSlugify(scorer?.player?.display_name)}/${
                    scorer?.player?.id
                  }`}
                >
                  <div className="flex items-center justify-between py-2">
                    <div className="flex items-center gap-2">
                      <img
                        src={scorer?.player?.image_path}
                        alt="Player Image"
                        className="w-8 h-8 rounded-full ring-1 ring-black"
                      />
                      <h4 className="font-semibold">
                        {scorer?.player?.display_name}
                      </h4>
                    </div>
                    <div className="grid grid-cols-2 items-center gap-2">
                      <img
                        src={scorer?.participant?.image_path}
                        alt="League Image"
                        className="w-8 h-8 rounded-full ring-1 ring-black"
                      />
                      <h4 className="font-semibold text-center">
                        {scorer?.total}
                      </h4>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <NoDataFound width="10/12" />
            )}
          </div>
        </div>

        {/* ....top Assist... */}

        <div className="bg-base-100 p-4 h-auto">
          <div className="skew-y-[0.5deg]">
            <h4 className="text-lg uppercase font-bold border-b py-2 border-black mt-1">
              Top Assist
            </h4>
            {topAssist.length > 0 ? (
              topAssist.slice(0, 20).map((assist) => (
                <Link
                  href={`/player/${getSlugify(assist?.player?.display_name)}/${
                    assist?.player?.id
                  }`}
                  key={assist.id}
                  className="flex items-center justify-between py-2"
                >
                  <div className="flex items-center gap-2">
                    <img
                      src={assist?.player?.image_path}
                      alt="Player Image"
                      className="w-8 h-8 rounded-full ring-1 ring-black"
                    />
                    <h4 className="font-semibold">
                      {assist?.player?.display_name}
                    </h4>
                  </div>
                  <div className="grid grid-cols-2 items-center gap-2">
                    <img
                      src={assist?.participant?.image_path}
                      alt="League Image"
                      className="w-8 h-8 rounded-full ring-1 ring-black"
                    />
                    <h4 className="font-semibold text-center">
                      {assist?.total}
                    </h4>
                  </div>
                </Link>
              ))
            ) : (
              <NoDataFound width="10/12" />
            )}
          </div>
        </div>
      </div>
    );
  }
}
