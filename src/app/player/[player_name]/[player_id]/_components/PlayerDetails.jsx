'use client';
import TabItem from '@/components/Global/TabItem';
import TabPanel from '@/components/Global/TabPanel';
import { useState } from 'react';
import PlayerMatches from './PlayerMatches';
import PlayerProfile from './PlayerProfile';
import PlayerStats from './PlayerStats';
import PlayerTransfers from './PlayerTransfers';

export default function PlayerDetails({ playerData }) {
  const playerLeague = playerData?.teams?.find(
    (team) => team.team.type === 'domestic'
  );

  const [currentTab, setCurrentTab] = useState(0);

  const tabs = ['Profile', 'Matches', 'Stats', 'Transfers'];
  const tabContents = [
    <PlayerProfile
      key={'player_details_tab_01'}
      playerData={playerData}
      playerLeague={playerLeague}
    />,
    <PlayerMatches key={'player_details_tab_02'} playerData={playerData} />,
    <PlayerStats key={'player_details_tab_03'} playerData={playerData} />,
    <PlayerTransfers
      key={'player_details_tab_03'}
      transfers={playerData?.transfers}
    />,
  ];

  const handleTabChange = (tab) => {
    setCurrentTab(tab);
  };

  return (
    <div className="max-w-screen-xl mx-auto">
      <div className="flex flex-col items-center my-3">
        <div className="bg-primary w-full -skew-y-[0.5deg]">
          <div className="skew-y-[0.5deg] h-full p-2 lg:p-4">
            <div className="flex items-center justify-between w-full py-3 border-b border-gray-200">
              <div className="flex items-center justify-end">
                <img
                  src={playerData?.image_path}
                  alt={playerData?.display_name}
                  className="w-10 h-10 ring-1 ring-gray-100 mr-4 rounded-full bg-white"
                />
                <div>
                  <h4 className="text-white font-semibold uppercase">
                    {playerData?.display_name}
                  </h4>

                  <p className="text-gray-400 text-sm">
                    {playerLeague?.team?.name}
                  </p>
                </div>
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
    </div>
  );
}
