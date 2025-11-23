// Import consistent modules using import statements
'use client';

import Countdown from '@/components/Global/Countdown';
import GlobalLoading from '@/components/Global/GlobalLoading';
import useGetAppSettings from '@/lib/hooks/useGetAppSettings';
import useGetBlackList from '@/lib/hooks/useGetBlackList';
import JWPlayer from '@jwplayer/jwplayer-react';
import { useEffect, useState } from 'react';

const formatDate = (timestamp) => new Date(timestamp * 1000);
const isPastDate = (timestamp) => formatDate(timestamp) < new Date();

const SelectedLiveMatch = ({ match }) => {
  const streamingSources = match?.streaming_sources;
  const videoUrls = streamingSources?.map((source) => source?.stream_url) || [];
  const [currentStreamIndex, setCurrentStreamIndex] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const isLive = isPastDate(match?.match_time);

  const [blockVideoPlayer, setBlockVideoPlayer] = useState(false);
  const { blackList, isLoadingBlackList, refetchBlackList } = useGetBlackList();
  const { appSettings, isLoadingAppSettings } = useGetAppSettings();

  useEffect(() => {
    if (blockVideoPlayer) {
      // If blockVideoPlayer is true, do not execute the popup logic
      return;
    }

    const guestPopupTime = appSettings?.data?.popup.guest_popup_time || 10;
    const guestPopupDuration =
      appSettings?.data?.popup.guest_popup_duration || 3;

    const showPopupInterval = setInterval(
      () => {
        refetchBlackList();
        setShowPopup(true);

        const closePopupTimer = setTimeout(() => {
          setShowPopup(false);
        }, guestPopupDuration * 1000); // Convert seconds to milliseconds

        return () => clearTimeout(closePopupTimer);
      },
      (guestPopupTime + guestPopupDuration) * 1000
    ); // Convert seconds to milliseconds

    const reappearPopupTimer = setTimeout(
      () => {
        refetchBlackList();
        clearInterval(showPopupInterval); // Clear the interval to stop showing popups after 2 minutes
      },
      (guestPopupTime + guestPopupDuration) * 5 * 1000
    ); // Convert seconds to milliseconds

    return () => {
      clearInterval(showPopupInterval);
      clearTimeout(reappearPopupTimer);
    };
  }, [blockVideoPlayer, appSettings, refetchBlackList]);

  useEffect(() => {
    if (!isLoadingBlackList) {
      setBlockVideoPlayer(blackList?.user?.is_blocked);
    }
  }, [isLoadingBlackList, blackList]);

  if (isLoadingBlackList || isLoadingAppSettings) {
    return <GlobalLoading />;
  }

  return (
    <>
      {isLive ? (
        <>
          <div className="relative aspect-video bg-black w-full border border-gray-800 p-0">
            {!blockVideoPlayer ? (
              <JWPlayer
                key={`stream-${currentStreamIndex}-${match?.id}`}
                playerId={`jw-player-${currentStreamIndex}`}
                playerScript="https://cdn.jwplayer.com/libraries/XhGm52Nv.js"
                onBeforePlay={() => {
                  const allPlayers = JWPlayer.players;
                  allPlayers.forEach((otherPlayer) => {
                    if (
                      otherPlayer !==
                      JWPlayer.players[`jw-player-${currentStreamIndex}`]
                    ) {
                      otherPlayer.pause();
                    }
                  });
                }}
                playlist={[
                  { sources: [{ file: videoUrls[currentStreamIndex] }] },
                ]}
                autostart={true}
                logo={null}
              />
            ) : (
              <>
                <img
                  src="/images/soccer-field.jpg"
                  alt="Soccer field"
                  className="w-full aspect-video"
                />{' '}
              </>
            )}

            {(blockVideoPlayer || showPopup) && (
              <div
                className="p-8 absolute z-10 pop-up-modal h-full w-full"
                style={{
                  left: '50%',
                  top: '50%',
                  transform: 'translate(-50%,-50%)',
                }}
              >
                <div className="h-full w-full backdrop-blur-xl bg-gray-800 shadow-lg shadow-gray-500 rounded-[50px] lg:rounded-[100px] flex items-center justify-center p-4">
                  {blockVideoPlayer ? (
                    <div className="flex items-center justify-center flex-col gap-5">
                      <p className="text-white text-center">
                        Free watch time has expired. Please log in to continue
                        enjoying our content
                      </p>

                      <label
                        onClick={() => window.authModal.showModal()}
                        className="btn btn-secondary rounded-md btn-sm"
                      >
                        Login
                      </label>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center flex-col gap-5">
                      <p className="text-white text-center">
                        Please Sign In to watch live matches in full screen
                      </p>
                      <label
                        onClick={() => window.authModal.showModal()}
                        className="btn btn-secondary rounded-md btn-sm"
                      >
                        Login
                      </label>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
          <div className="flex mt-5 px-2">
            {streamingSources?.map((stream, index) => (
              <button
                key={index}
                className={`mr-2 px-4 py-2 ${
                  currentStreamIndex === index
                    ? 'bg-blue-500 text-white rounded-lg shadow-md shadow-blue-300'
                    : 'bg-gray-300 rounded-lg shadow-md shadow-blue-300'
                }`}
                onClick={() => setCurrentStreamIndex(index)}
              >
                {stream?.stream_title}
              </button>
            ))}
          </div>
        </>
      ) : (
        <div className="relative mt-5">
          <img
            src="/images/logo.png"
            alt="logo"
            className="w-full h-full bg-primary filter grayscale"
          />
          <div className="absolute inset-0">
            <div className="flex flex-col items-center justify-center h-full gap-5">
              <div className="flex items-center justify-center gap-10">
                <div className="flex flex-col items-center gap-1 text-white">
                  <img
                    src={match?.team_one_image}
                    alt="Team One Image"
                    className="w-12 h-12 p-0.5 rounded-full"
                  />
                  <h4>{match?.team_one_name}</h4>
                </div>
                <div className="w-14 h-14 bg-black rounded-full flex items-center justify-center text-secondary">
                  vs
                </div>
                <div className="flex flex-col items-center gap-1 text-white">
                  <img
                    src={match?.team_two_image}
                    alt="Team Two Image"
                    className="w-12 h-12 p-0.5 rounded-full"
                  />
                  <h4>{match?.team_two_name}</h4>
                </div>
              </div>

              <div className="text-white flex items-center gap-2">
                <p> The match will start in </p>
                <Countdown date={match?.match_time} />
              </div>
              <h4 className="text-white font-medium">
                Streaming will start before 15 mins of the match started
              </h4>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SelectedLiveMatch;
