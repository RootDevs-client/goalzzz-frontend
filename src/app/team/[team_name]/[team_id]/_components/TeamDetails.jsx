'use client';

import TabItem from '@/components/Global/TabItem';
import TabPanel from '@/components/Global/TabPanel';
import { useAuthStore } from '@/lib/auth-store';
import { xoomBackendUrl } from '@/lib/axios/getAxios';
import useGetUserProfile from '@/lib/hooks/useGetUserProfile';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { BiSolidBell } from 'react-icons/bi';
import TeamMatches from './TeamMatches';
import TeamOverview from './TeamOverview';
import TeamPointTable from './TeamPointTable';
import SelectSeasonModal from './TeamPointTable/SelectSeasonModal';
import TeamSquad from './TeamSquad';
import TeamStats from './TeamStats';
import TeamTrophies from './TeamTrophies';

export default function TeamDetails({ teamDetails, teamId }) {
  const activeSeasons = teamDetails?.activeseasons;
  const [currentTab, setCurrentTab] = useState(0);

  const { token, isAdmin, user } = useAuthStore();

  const { userProfile, refetchProfile } = useGetUserProfile(
    token,
    isAdmin,
    user
  );

  const isFavorite = userProfile?.favorites?.teams.some(
    (item) => parseInt(item.id) === parseInt(teamId)
  )
    ? true
    : false;

  const [isStarClicked, setIsStarClicked] = useState(isFavorite);

  useEffect(() => {
    if (userProfile) {
      setIsStarClicked(isFavorite);
    }
  }, [isFavorite, userProfile]);

  const tabs = ['Overview', 'Matches', 'Table', 'Stats', 'Trophies', 'Squad'];

  const tabContents = [
    <TeamOverview
      key={'team_details_tab_001'}
      teamDetails={teamDetails}
      teamId={teamId}
    />,
    <TeamMatches
      key={'team_details_tab_002'}
      teamDetails={teamDetails}
      teamId={teamId}
    />,
    <TeamPointTable
      key={'team_details_tab_003'}
      activeSeasons={activeSeasons}
    />,
    <TeamStats
      key={'team_details_tab_004'}
      teamDetails={teamDetails}
      teamId={teamId}
      activeSeasons={activeSeasons}
    />,
    <TeamTrophies
      key={'team_details_tab_005'}
      teamDetails={teamDetails}
      teamId={teamId}
    />,
    <TeamSquad
      key={'team_details_tab_006'}
      teamDetails={teamDetails}
      teamId={teamId}
    />,
  ];

  const handleTabChange = (tab) => {
    setCurrentTab(tab);
  };

  const handleFavoriteClick = async (event, teamDetails) => {
    event.preventDefault();

    if (user) {
      setIsStarClicked(true);

      // Check if the user is an admin
      if (isAdmin) {
        toast.error('Please log in as a user to add teams to favorites');
        setIsStarClicked(false);
        return;
      }

      const favoriteData = {
        email: user?.phone,
        key: 'teams',
        item: {
          id: teamDetails?.id,
          name: teamDetails?.name,
          image: teamDetails?.image_path,
          country: teamDetails?.country?.name,
        },
      };

      try {
        const { data } = await xoomBackendUrl.put(
          '/api/user/favorites',
          favoriteData
        );

        if (data.status) {
          refetchProfile();
          toast.success('Team added to favorites');
        } else {
          setIsStarClicked(false);
          toast.error('Failed to add Team to favorites');
        }
      } catch (error) {
        console.error('Error while adding team to favorites:', error);
        setIsStarClicked(false);
        toast.error('An error occurred while adding team to favorites');
      }
    } else {
      setIsStarClicked(false);
      toast.error('Please login first');
    }
  };

  const handleRemoveFavorite = async (event, teamDetails) => {
    event.preventDefault();

    if (user) {
      setIsStarClicked(false);
      const favoriteData = {
        email: user?.phone,
        key: 'teams',
        item: {
          id: teamDetails?.id,
          name: teamDetails?.name,
          image: teamDetails?.image_path,
        },
      };

      const { data } = await xoomBackendUrl.put(
        '/api/user/favorites/remove',
        favoriteData
      );

      if (data.status) {
        refetchProfile();
        toast.success('Team removed from favorite');
      } else {
        setIsStarClicked(false);
        toast.error('Failed to remove Team from favorite');
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
                  src={teamDetails?.image_path}
                  alt="team-logo"
                  className="w-10 h-10 ring-1 ring-gray-100 mr-4 rounded-full bg-white"
                />

                <div className="text-white">
                  <p className="text-sm uppercase">{teamDetails?.name}</p>
                  <p className="text-xs font-thin uppercase">
                    {teamDetails?.country?.name}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-5">
                <button
                  onClick={(event) =>
                    isStarClicked
                      ? handleRemoveFavorite(event, teamDetails)
                      : handleFavoriteClick(event, teamDetails)
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

                <BiSolidBell className="text-white text-2xl cursor-pointer" />
              </div>
            </div>
            <div className="flex items-center justify-start gap-5 mt-3 overflow-auto scrollbar-hidden">
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
      {/* Select Season Modal */}
      <SelectSeasonModal activeSeasons={activeSeasons} />
    </div>
  );
}
