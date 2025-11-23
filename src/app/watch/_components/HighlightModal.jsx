import VideoPlayer2 from '@/components/Global/VideoPlayer2';
import { useEffect, useState } from 'react';
import { RxCross2 } from 'react-icons/rx';

export default function HighlightModal({ highlightData }) {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  const handlePlay = () => {
    // Handle play event if needed
    return false;
  };

  const handlePause = () => {
    // Handle pause event if needed
    return true;
  };

  const handleEnded = () => {
    // Move to the next video when the current one ends
    setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % videoUrls.length);
  };

  useEffect(() => {
    // Reset the video index when the highlightData changes
    setCurrentVideoIndex(0);
  }, [highlightData]);

  useEffect(() => {
    // Pause the video player when the modal is closed
    const videoPlayer = document.getElementById('videoPlayer');
    return () => {
      if (videoPlayer) {
        videoPlayer.pause();
      }
    };
  }, [currentVideoIndex]);

  const handleClose = () => {
    handlePause();
    handlePlay();
    const videoPlayer = document.getElementById('videoPlayer');
    if (videoPlayer) {
      videoPlayer.pause();
    }
  };

  const videoUrls =
    highlightData?.video_type === 'youtube'
      ? [highlightData?.youtube_url]
      : highlightData?.videos || [];

  return (
    <div>
      <dialog
        onClick={() => document.getElementById('highlightModal').showModal()}
        className="modal"
      >
        <div
          id="highlightModal"
          className="modal-box rounded-none -skew-y-[1deg] p-0 w-full h-fit overflow-y-hidden bg-white"
        >
          <form method="dialog">
            <button
              className="absolute cursor-pointer right-2 top-2 outline-none"
              onClick={handleClose}
            >
              <RxCross2 className="text-xl text-secondary" />
            </button>
          </form>
          <div className="skew-y-[1deg] mt-12 p-4 w-full">
            {videoUrls.length > 0 && (
              <VideoPlayer2
                id="videoPlayer"
                key={videoUrls[currentVideoIndex]}
                videoUrl={videoUrls[currentVideoIndex]}
                onPlay={handlePlay}
                onPause={handlePause}
                onEnded={handleEnded}
              />
            )}
          </div>
        </div>
      </dialog>
    </div>
  );
}

// import VideoPlayer2 from '@/components/Global/VideoPlayer2';
// import { useEffect, useState } from 'react';
// import { RxCross2 } from 'react-icons/rx';

// export default function HighlightModal({ highlightData }) {
//   const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

//   const handlePlay = () => {
//     // Handle play event if needed
//   };

//   const handlePause = () => {
//     // Handle pause event if needed
//   };

//   const handleEnded = () => {
//     // Move to the next video when the current one ends
//     setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % videoUrls.length);
//   };

//   useEffect(() => {
//     // Reset the video index when the highlightData changes
//     setCurrentVideoIndex(0);
//   }, [highlightData]);

//   const videoUrls =
//     highlightData?.video_type === 'youtube'
//       ? [highlightData?.youtube_url]
//       : highlightData?.videos || [];

//   return (
//     <dialog className="modal" id="highlightModal">
//       <div className="modal-box rounded-none -skew-y-[1deg] p-0 w-full h-fit overflow-y-hidden bg-white">
//         <form method="dialog">
//           <button className="absolute cursor-pointer right-2 top-2 outline-none">
//             <RxCross2 className="text-xl text-secondary" />
//           </button>
//         </form>
//         <div className="skew-y-[1deg] mt-12 p-4 w-full">
//           {videoUrls.length > 0 && (
//             <VideoPlayer2
//               key={videoUrls[currentVideoIndex]}
//               videoUrl={videoUrls[currentVideoIndex]}
//               onPlay={handlePlay}
//               onPause={handlePause}
//               onEnded={handleEnded}
//             />
//           )}
//         </div>
//       </div>
//     </dialog>
//   );
// }
