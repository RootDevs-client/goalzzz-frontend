import TabItem from '@/components/Global/TabItem';
import TabPanel from '@/components/Global/TabPanel';
import { useState } from 'react';
import AllTeams from './Standings/AllTeams';
import AwayTeams from './Standings/AwayTeams';
import HomeTeams from './Standings/HomeTeams';

export default function MatchStandings({ matchData }) {
  const [currentTab, setCurrentTab] = useState(0);
  const tabs = ['All', 'Home', 'Away'];

  const tabContents = [
    <AllTeams key={'match_standings_tab_01'} matchData={matchData} />,
    <HomeTeams key={'match_standings_tab_02'} matchData={matchData} />,
    <AwayTeams key={'match_standings_tab_02'} matchData={matchData} />,
  ];

  const handleTabChange = (tab) => {
    setCurrentTab(tab);
  };

  return (
    <div>
      <div className="bg-base-100">
        <div className="flex items-center justify-between p-5 skew-y-[0.5deg]">
          <div className="flex items-center justify-start gap-5 mt-3 overflow-auto scrollbar-hidden">
            {tabs.map((tab, index) => (
              <TabItem
                key={index}
                tab={tab}
                onClick={() => handleTabChange(index)}
                active={currentTab === index}
                isWhite={true}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white h-auto w-full -skew-y-[0.5deg]">
        <div className="text-[10px] sm:text-lg font-bold">
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
  );
}
