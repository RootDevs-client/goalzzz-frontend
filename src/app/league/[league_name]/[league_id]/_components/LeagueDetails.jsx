'use client';

import TabItem from '@/components/Global/TabItem';
import TabPanel from '@/components/Global/TabPanel';
import { useAuthStore } from '@/lib/auth-store';
import { xoomBackendUrl } from '@/lib/axios/getAxios';
import useGetUserProfile from '@/lib/hooks/useGetUserProfile';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import LeagueFixture from './LeagueFixture';
import PlayerStats from './PlayerStats';
import Standings from './Standings';
import TeamStats from './TeamStats';

export default function LeagueDetails({ leagueData }) {
  const [seasonId, setSeasonId] = useState(leagueData?.currentseason?.id);
  const [currentTab, setCurrentTab] = useState(0);

  const { token, isAdmin, user } = useAuthStore();

  const { userProfile, refetchProfile } = useGetUserProfile(
    token,
    isAdmin,
    user
  );
  const isFavorite =
    userProfile?.favorites?.leagues.some(
      (item) => item?.id === leagueData?.id
    ) || false;

  const [isStarClicked, setIsStarClicked] = useState(isFavorite);

  useEffect(() => {
    if (userProfile) {
      setIsStarClicked(isFavorite);
    }
  }, [isFavorite, userProfile]);

  const tabs = ['Standings', 'Fixtures', 'Player Stats', 'Teams'];

  const tabContents = [
    <Standings key={'league_tab_01'} seasonId={seasonId} />,
    <LeagueFixture
      key={'league_tab_02'}
      seasonId={leagueData?.currentseason?.id}
    />,
    <PlayerStats key={'league_tab_03'} seasonId={seasonId} />,
    <TeamStats key={'league_tab_04'} seasonId={seasonId} />,
  ];

  const handleTabChange = (tab) => {
    setCurrentTab(tab);
  };

  const handleFavoriteClick = async (event, leagueData) => {
    event.preventDefault();

    if (user) {
      setIsStarClicked(true);

      // Check if the user is an admin
      if (isAdmin) {
        toast.error('Please log in as a user to add leagues to favorite.');
        setIsStarClicked(false);
        return;
      }

      const favoriteData = {
        email: user?.email,
        key: 'leagues',
        item: {
          id: leagueData.id,
          name: leagueData.name,
          image: leagueData.image_path,
          country: leagueData?.country?.name,
        },
      };

      try {
        const { data } = await xoomBackendUrl.put(
          '/api/user/favorites',
          favoriteData
        );

        if (data.status) {
          refetchProfile();
          toast.success('League added to favorites');
        } else {
          setIsStarClicked(false);
          toast.error('Failed to add League to favorites');
        }
      } catch (error) {
        console.error('Error while adding league to favorites:', error);
        setIsStarClicked(false);
        toast.error('An error occurred while adding league to favorites');
      }
    } else {
      setIsStarClicked(false);
      toast.error('Please login first');
    }
  };

  const handleRemoveFavorite = async (event, leagueData) => {
    event.preventDefault();

    if (user) {
      setIsStarClicked(false);
      const favoriteData = {
        email: user?.email,
        key: 'leagues',
        item: {
          id: leagueData.id,
          name: leagueData.name,
          image: leagueData.image_path,
        },
      };

      const { data } = await xoomBackendUrl.put(
        '/api/user/favorites/remove',
        favoriteData
      );

      if (data.status) {
        refetchProfile();
        toast.success('League removed from favorite');
      } else {
        setIsStarClicked(false);
        toast.error('Failed to remove League from favorite');
      }
    } else {
      setIsStarClicked(false);
      toast.error('Please login first');
    }
  };

  return (
    <div className="max-w-screen-xl mx-auto">
      <div className="flex flex-col items-center my-3">
        <div className="bg-primary w-full -skew-y-[0.5deg]">
          <div className="skew-y-[0.5deg] h-full p-2 lg:p-4">
            <div className="flex items-center justify-between w-full py-3 border-b border-gray-200">
              <div className="flex items-center">
                <img
                  src={leagueData?.image_path}
                  alt={leagueData?.name}
                  className="w-10 h-10 ring-1 ring-gray-100 mr-4 rounded-full bg-white"
                />

                <div className="text-white">
                  <p className="text-sm uppercase">{leagueData?.name}</p>
                  <p className="text-xs font-thin uppercase">
                    {leagueData?.country?.name}
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="mr-3">
                  <button
                    onClick={(event) =>
                      isStarClicked
                        ? handleRemoveFavorite(event, leagueData)
                        : handleFavoriteClick(event, leagueData)
                    }
                  >
                    <img
                      src={
                        isStarClicked
                          ? '/icons/star_full_red.png'
                          : '/icons/star_white.png'
                      }
                      alt="Star logo"
                      width={20}
                      height={20}
                      className=""
                    />
                  </button>
                </div>

                <label className="bg-primary text-white mr-2">Season:</label>
                <select
                  id="seasons"
                  name="seasons"
                  className="bg-primary text-white outline-none"
                  onChange={(e) => setSeasonId(e.target.value)}
                >
                  {leagueData?.seasons
                    .sort((a, b) => {
                      const firstYear1 = a?.name.split('/')[0];
                      const firstYear2 = b?.name.split('/')[0];
                      return firstYear2 - firstYear1;
                    })
                    .map((season) => (
                      <option key={season?.id} value={season?.id}>
                        {season?.name}
                      </option>
                    ))}
                </select>
              </div>
            </div>
            <div className="flex items-center justify-start gap-5 mt-3 overflow-auto scrollbar-hidden ">
              {tabs.map((tab, index) => (
                <TabItem
                  key={index}
                  tab={tab}
                  onClick={() => handleTabChange(index)}
                  active={currentTab === index}
                  isWhite={false}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="bg-white h-auto w-full -skew-y-[0.5deg]">
          <div className="">
            {tabContents.map((content, index) => (
              <TabPanel
                key={index}
                content={content}
                index={index}
                currentTab={currentTab}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
