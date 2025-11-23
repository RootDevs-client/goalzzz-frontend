import TabItem from '@/components/Global/TabItem';
import TabPanel from '@/components/Global/TabPanel';
import { useState } from 'react';
import RecentTeamMatches from './TeamMatches/RecentTeamMatches';
import UpcomingTeamMatches from './TeamMatches/UpcomingTeamMatches';

export default function TeamMatches({ teamDetails, teamId }) {
  const upcomingMatches = teamDetails?.upcoming;
  const recentMatches = teamDetails?.latest;

  const [currentTab, setCurrentTab] = useState(0);

  const matchesTabs = ['Upcoming', 'Recent'];

  const matchTabContents = [
    <UpcomingTeamMatches
      key={'team_matches_tab_001'}
      teamId={teamId}
      upcomingMatches={upcomingMatches}
    />,
    <RecentTeamMatches
      key={'team_matches_tab_002'}
      teamId={teamId}
      recentMatches={recentMatches}
    />,
  ];

  const handleTabChange = (tab) => {
    setCurrentTab(tab);
  };

  return (
    <>
      <div className="bg-base-100">
        <div className="flex items-center justify-center gap-5 pt-6 pb-4 skew-y-[0.5deg]">
          {matchesTabs.map((tab, index) => (
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
      <div className="skew-y-[0.5deg] mt-3">
        {matchTabContents.map((content, index) => (
          <TabPanel
            key={index}
            content={content}
            index={index}
            currentTab={currentTab}
          />
        ))}
      </div>
    </>
  );
}
