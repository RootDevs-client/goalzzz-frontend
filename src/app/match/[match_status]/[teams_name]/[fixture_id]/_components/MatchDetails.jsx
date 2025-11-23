'use client';

import TabItem from '@/components/Global/TabItem';
import TabPanel from '@/components/Global/TabPanel';
import { xoomBackendUrl } from '@/lib/axios/getAxios';
import { convertTimestampToFormattedDate } from '@/lib/helpers/convertTimestampToFormattedDate';
import { getCurrentGoals } from '@/lib/helpers/getCurrentGoals';
import getSlugify from '@/lib/helpers/getSlugify';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';
import toast from 'react-hot-toast';
// import { HiOutlineVideoCamera } from 'react-icons/hi';
// import { TbSoccerField } from 'react-icons/tb';
import MatchFieldView from './MatchFieldView';
import MatchHead2Head from './MatchHead2Head';
import MatchHighlightView from './MatchHighlightView';
import MatchLineup from './MatchLineup';
import MatchPreview from './MatchPreview';
import MatchStandings from './MatchStandings';
import MatchStats from './MatchStats';
import MatchSummary from './MatchSummary';

export default function MatchDetails({ status, matchData }) {
  const [currentTab, setCurrentTab] = useState(0);
  const [isShowField, setIsShowField] = useState(false);
  const [isShowHighligh, setIsShowHighligh] = useState(false);

  const [isHighligh, setIsHighligh] = useState(false);
  const [videoList, setVideoList] = useState([]);

  const handleShowField = () => {
    setIsShowHighligh(false);
    setIsShowField(!isShowField);
  };

  const handleShowHighlight = () => {
    fetchHighlights(matchData);
    setIsShowField(false);
    setIsShowHighligh(!isShowHighligh);
  };

  const liveStatus = [
    'INPLAY_1ST_HALF',
    'INPLAY_2ND_HALF',
    'HT',
    'INPLAY_ET',
    'INPLAY_ET_2ND_HALF',
    'BREAK',
    'PEN_BREAK',
    'EXTRA_TIME_BREAK',
    'INPLAY_PENALTIES',
  ];
  const finishedStatus = ['FT', 'AET', 'FT_PEN'];
  const upcomingStatus = [
    'TBA',
    'NS',
    'WO',
    'ABANDONED',
    'CANCELLED',
    'AWARDED',
    'INTERRUPTED',
    'POSTPONED',
  ];
  const matchState = matchData.state?.state;
  const isLive = liveStatus.includes(matchState);
  const isUpcoming = upcomingStatus.includes(matchState);
  const isFinished = finishedStatus.includes(matchState);
  const totalGoals = getCurrentGoals(matchData?.scores);
  const formattedDate = convertTimestampToFormattedDate(
    matchData?.starting_at_timestamp
  );

  const homeTeam = matchData?.participants?.find(
    (team) => team.meta.location === 'home'
  );

  const awayTeam = matchData?.participants?.find(
    (team) => team.meta.location === 'away'
  );

  const homeTeamCoach = matchData?.coaches?.find(
    (coach) => coach.meta.participant_id === homeTeam.id
  );

  const awayTeamCoach = matchData?.coaches?.find(
    (coach) => coach.meta.participant_id === awayTeam.id
  );

  const fetchHighlights = async (matchData) => {
    try {
      const { data } = await xoomBackendUrl.post(
        `/api/admin/fixtures/highlights`,
        {
          fixture_id: matchData?.id,
        }
      );

      if (data.status) {
        if (data?.data.length === 0) {
          toast.error('No highlights available');
          setIsHighligh(false);
        } else {
          setIsHighligh(true);
          let videos = data.data.map((video) => video.location);
          setVideoList(videos);
        }
      } else {
        toast.error('No highlights available');
      }
    } catch (error) {
      console.error('Error fetching highlights:', error.message);
      toast.error('Error fetching highlights');
    }
  };

  const tabs =
    status === 'preview'
      ? ['Preview', 'Standings', 'Head-2-Head']
      : ['Info', 'Summary', 'Stats', 'Line-up', 'Standings', 'Head-2-Head'];

  const tabContents =
    status === 'preview'
      ? [
          <MatchPreview key={'match_details_tab_01'} matchData={matchData} />,
          <MatchStandings key={'match_details_tab_02'} matchData={matchData} />,
          <MatchHead2Head key={'match_details_tab_03'} matchData={matchData} />,
        ]
      : [
          <MatchPreview key={'match_details_tab_04'} matchData={matchData} />,
          <MatchSummary key={'match_details_tab_05'} matchData={matchData} />,
          <MatchStats key={'match_details_tab_06'} matchData={matchData} />,
          <MatchLineup key={'match_details_tab_07'} matchData={matchData} />,
          <MatchStandings key={'match_details_tab_08'} matchData={matchData} />,
          <MatchHead2Head key={'match_details_tab_09'} matchData={matchData} />,
        ];

  const handleTabChange = (tab) => {
    setCurrentTab(tab);
  };

  return (
    <div className="max-w-screen-xl mx-auto">
      <AnimatePresence>
        {isShowField && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <MatchFieldView
              isUpcoming={isUpcoming}
              isFinished={isFinished}
              totalGoals={totalGoals}
              homeTeamCoach={homeTeamCoach}
              awayTeamCoach={awayTeamCoach}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex flex-col items-center mb-3">
        {isShowHighligh && isHighligh && (
          <MatchHighlightView videos={videoList} />
        )}

        <div className="bg-primary w-full -skew-y-[0.5deg]">
          <div className="skew-y-[0.5deg] h-full p-2 lg:p-4">
            <div className="flex items-center justify-between w-full py-3 border-b border-gray-200">
              <div className="flex justify-between items-center w-full text-xs sm:text-base">
                <Link
                  href={`/team/${getSlugify(homeTeam.name)}/${homeTeam?.id}`}
                  className="flex items-center justify-end"
                >
                  <img
                    src={homeTeam?.image_path}
                    alt={homeTeam?.name}
                    className="w-10 h-10 ring-1 ring-gray-100 mr-4 rounded-full bg-white"
                  />
                  <h4 className="text-white font-semibold uppercase">
                    {homeTeam?.name}
                  </h4>
                </Link>

                <div className="flex items-center justify-center text-sm">
                  <div className="h-16 w-16 rounded-full p-2 mr-3 text-center bg-white mx-auto lex flex items-center justify-center">
                    {isLive && (
                      <div className="relative flex flex-col items-center">
                        <span>{matchData?.periods?.slice(-1)[0]?.minutes}</span>
                        <span className="absolute -top-2 -right-1 text-secondary animate-pulse text-xl">
                          {`"`}
                        </span>
                        <span className="font-semibold">{totalGoals}</span>
                      </div>
                    )}

                    {isFinished && (
                      <span className="font-semibold text-base">
                        {totalGoals}
                      </span>
                    )}

                    {isUpcoming && (
                      <div className="text-center">
                        <span className="font-semibold">{formattedDate}</span>
                      </div>
                    )}
                  </div>
                </div>

                <Link
                  href={`/team/${getSlugify(awayTeam.name)}/${awayTeam?.id}`}
                  className="flex items-center"
                >
                  <img
                    src={awayTeam?.image_path}
                    alt={awayTeam?.name}
                    className="w-10 h-10 ring-1 ring-gray-100 mr-4 rounded-full bg-white"
                  />
                  <h4 className="text-white font-semibold uppercase">
                    {awayTeam?.name}
                  </h4>
                </Link>
              </div>

              {/* <div className="flex items-center gap-5 px-2">
                <HiOutlineVideoCamera
                  onClick={handleShowHighlight}
                  className="text-3xl text-gray-300 cursor-pointer"
                />

                <TbSoccerField
                  onClick={handleShowField}
                  className="text-3xl text-gray-300 cursor-pointer"
                />
              </div> */}
            </div>
            <div className="flex items-center justify-start gap-5 mt-3 scrollbar-hidden overflow-auto scrollbar-hidden">
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
