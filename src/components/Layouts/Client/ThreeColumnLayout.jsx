'use client';
import useGetAllLeagues from '@/lib/hooks/useGetAllLeagues';
import useGetSelectedPointTable from '@/lib/hooks/useGetSelectedPointTable';
import useGetTopLeagues from '@/lib/hooks/useGetTopLeagues';
import AllLeaguesList from '../../Global/AllLeaguesList';
import SelectedPointTable from '../../Global/SelectedPointTable';
import SkewCard from '../../Global/SkewCard';
import TopLeaguesList from '../../Global/TopLeaguesList';
import TrendingNewsSlider from '../../Global/TrendingNewsSlider';

export default function ThreeColumnLayout({ children }) {
  const { selectedPointTable } = useGetSelectedPointTable();
  const { allLeaguesData, isLoadingAllLeagues } = useGetAllLeagues();
  const { topLeagues, isLoadingTopLeagues } = useGetTopLeagues();

  return (
    <div className="mx-auto max-w-screen-xl mt-3">
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-3 lg:col-span-3 w-full hidden lg:block">
          <SkewCard title="TOP LEAGUES">
            <TopLeaguesList
              topLeagues={topLeagues}
              isLoadingTopLeagues={isLoadingTopLeagues}
            />
          </SkewCard>

          <SkewCard title="ALL LEAGUES">
            <AllLeaguesList
              allLeaguesData={allLeaguesData}
              isLoadingAllLeagues={isLoadingAllLeagues}
            />
          </SkewCard>
        </div>
        <div className="col-span-12 lg:col-span-6 w-full mt-3">{children}</div>
        <div className="col-span-3 lg:col-span-3 w-full hidden lg:block">
          <div className="relative">
            <SkewCard title="TRENDING NEWS">
              <TrendingNewsSlider />
            </SkewCard>
          </div>
          <SelectedPointTable selectedPointTable={selectedPointTable} />
        </div>
      </div>
    </div>
  );
}
