// TeamPointTable.js
import GlobalLoading from '@/components/Global/GlobalLoading';
import { useAppContext } from '@/contexts/XoomAppContent';
import useFetchLeagueStandings from '@/lib/hooks/useFetchLeagueStandings';
import { useEffect } from 'react';
import { GoChevronDown } from 'react-icons/go';
import SelectedSeasonPointTable from './TeamPointTable/SelectedSeasonPointTable';

export default function TeamPointTable({ activeSeasons }) {
  const { selectedSeasonTeam, setSelectedSeasonTeam } = useAppContext();

  useEffect(() => {
    setSelectedSeasonTeam(activeSeasons[0]);
  }, [activeSeasons, setSelectedSeasonTeam]);

  const { leagueStandingsLoading, leagueStandingsData } =
    useFetchLeagueStandings(selectedSeasonTeam?.id || null);

  if (leagueStandingsLoading) {
    return (
      <>
        <GlobalLoading />
      </>
    );
  }

  if (!leagueStandingsData) {
    return <>Error loading data</>;
  }

  const { league } = selectedSeasonTeam || {};

  return (
    <div>
      <div className="p-5 bg-base-100">
        <div className="flex items-center justify-between skew-y-[0.5deg]">
          <div className="flex items-center gap-2">
            {league && (
              <img
                src={league.image_path}
                alt="league logo"
                width={50}
                height={50}
                className="w-10 h-10 rounded-full ring-1 ring-black p-0.5"
              />
            )}

            <div>
              {selectedSeasonTeam && (
                <>
                  <h4>{league?.name}</h4>
                  <p className="text-sm">{selectedSeasonTeam.name}</p>
                </>
              )}
            </div>
          </div>
          <div>
            <label htmlFor="select_season_modal" className="cursor-pointer">
              <GoChevronDown className="text-2xl" />
            </label>
          </div>
        </div>
      </div>

      <SelectedSeasonPointTable leagueStandingsData={leagueStandingsData} />
    </div>
  );
}
