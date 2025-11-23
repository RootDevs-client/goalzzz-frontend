'use client';

import TabItem from '@/components/Global/TabItem';
import TabPanel from '@/components/Global/TabPanel';
import { useAuthStore } from '@/lib/auth-store';
import { sportMonkUrl } from '@/lib/axios/getAxios';
import useGetUserProfile from '@/lib/hooks/useGetUserProfile';
import { useEffect, useState } from 'react';
import FavoriteLeagues from './FavoriteLeagues';
import FavoritesMatches from './FavoritesMatches';
import FavoritesTeams from './FavoritesTeams';

const FavoriteTabItem = ({ tab, index, onClick, active, isWhite }) => (
  <TabItem
    key={index}
    tab={tab}
    onClick={onClick}
    active={active}
    isWhite={isWhite}
  />
);

export default function FavoritesHome() {
  const { token, isAdmin, user } = useAuthStore();

  const { userProfile } = useGetUserProfile(token, isAdmin, user);
  const [currentTab, setCurrentTab] = useState(0);
  const [favoriteMatchesLoading, setFavoriteMatchesLoading] = useState(true);
  const [favoriteMatchesData, setFavoriteMatchesData] = useState([]);

  const {
    leagues = [],
    matches = [],
    teams = [],
  } = userProfile?.favorites || {};

  const fixtureIds = matches.map((item) => item.id);
  const fetchData = async () => {
    try {
      if (fixtureIds.length > 0) {
        const response = await sportMonkUrl.get(
          `/fixtures/multi/${fixtureIds}?include=league.country;round.stage;participants;state;scores;periods`
        );
        if (response.status === 200) {
          setFavoriteMatchesData(response.data?.data);
        } else {
          throw new Error('Failed to fetch favorite matches data');
        }
      } else {
        setFavoriteMatchesData([]);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setFavoriteMatchesLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userProfile]);

  const tabs = ['Matches', 'Teams', 'Leagues'];
  const tabContents = [
    <FavoritesMatches
      key={'favorites_tab_001'}
      matches={matches}
      userProfile={userProfile}
      notLoggedIn={!userProfile}
      favoriteMatchesData={favoriteMatchesData}
      favoriteMatchesLoading={favoriteMatchesLoading}
    />,
    <FavoritesTeams
      key={'favorites_tab_002'}
      teams={teams}
      userProfile={userProfile}
      notLoggedIn={!userProfile}
      favoriteMatchesLoading={favoriteMatchesLoading}
    />,
    <FavoriteLeagues
      key={'favorites_tab_003'}
      leagues={leagues}
      userProfile={userProfile}
      notLoggedIn={!userProfile}
      favoriteMatchesLoading={favoriteMatchesLoading}
    />,
  ];

  const handleTabChange = (tab) => {
    setCurrentTab(tab);
  };

  return (
    <>
      <div className="flex flex-col items-center">
        <div className="bg-primary h-20 w-full -skew-y-[0.5deg] relative">
          <div className="skew-y-[0.5deg] flex gap-4 items-center h-full p-2 mt-2 mx-4 border-b-2 border-white">
            {tabs.map((tab, index) => (
              <FavoriteTabItem
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
      <div className="bg-white h-auto w-full">
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
    </>
  );
}
