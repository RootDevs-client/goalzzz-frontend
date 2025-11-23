'use client';

import GlobalLoading from '@/components/Global/GlobalLoading';
import TabItem from '@/components/Global/TabItem';
import TabPanel from '@/components/Global/TabPanel';
import { useAuthStore } from '@/lib/auth-store';
import useGetAllHighlights from '@/lib/hooks/admin/useGetAllHighlights';
import { useState } from 'react';
import { ImSpinner } from 'react-icons/im';
import HighlightsTab from './HighlightsTab';

export default function WatchHome() {
  const [currentTab, setCurrentTab] = useState(0);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [isLoadMore, setIsLoadMore] = useState(false);

  const { token, } = useAuthStore();

  const { highlights, highlightsLoading, highlightsRefetch } =
    useGetAllHighlights({
      token,
      page,
      limit,
    });

  if (highlightsLoading || !highlights?.data) {
    return <GlobalLoading />;
  }

  const tabs = ['Videos'];

  const tabContents = [
    // <LiveMatchTab key={'watch_tab_001'} liveMatches={allMatches} />,
    <HighlightsTab key={'watch_tab_001'} highlightsData={highlights?.data} />,
  ];

  const handleTabChange = (tab) => {
    setCurrentTab(tab);
  };

  const handleLoadMore = async () => {
    setIsLoadMore(true);
    setLimit((prev) => prev + 10);
    await highlightsRefetch();
    setIsLoadMore(false);
  };

  return (
    <div>
      <div className="flex flex-col items-center">
        <div className="bg-primary h-20 w-full -skew-y-[0.5deg] relative">
          <div className="bg-white text-primary z-30 w-fit ml-10 px-2 absolute -top-2 left-5 font-semibold uppercase shadow-md">
            <span className="">Watch</span>
          </div>
          <div className="skew-y-[0.5deg] grid grid-cols-12 items-center h-full p-2 px-5 mt-2 m-3 lg:m-0">
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

        {highlights?.pagination?.totalDocs > highlights?.data?.length && (
          <div className="flex justify-center mb-5">
            <button
              onClick={handleLoadMore}
              className="btn btn-error btn-outline btn-sm rounded-md"
              disabled={isLoadMore}
            >
              {isLoadMore ? <ImSpinner className="ml-2 animate-spin" /> : ''}{' '}
              Load More
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
