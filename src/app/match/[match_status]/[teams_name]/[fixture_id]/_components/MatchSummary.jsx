import MainLoading from '@/components/Global/MainLoading';
import TabItem from '@/components/Global/TabItem';
import TabPanel from '@/components/Global/TabPanel';
import useMatchEventsComments from '@/lib/hooks/useMatchEventsComments';
import { useState } from 'react';
import Commentary from './Summary/Commentary';
import Events from './Summary/Events';

export default function MatchSummary({ matchData }) {
  const { matchEventsCommentsLoading, matchEventsCommentsData } =
    useMatchEventsComments(matchData?.id);
  const [currentTab, setCurrentTab] = useState(0);

  if (matchEventsCommentsLoading) {
    return <MainLoading />;
  }

  const tabs = ['Events', 'Commentary'];

  const tabContents = [
    <Events
      key={'match_summary_tab_02'}
      matchData={matchData}
      eventData={matchEventsCommentsData}
    />,
    <Commentary
      key={'match_summary_tab_01'}
      comments={matchEventsCommentsData?.data?.comments}
    />,
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
  );
}
