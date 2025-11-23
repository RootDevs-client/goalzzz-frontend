import VideoPlayer2 from '@/components/Global/VideoPlayer2';
import { useEffect, useState } from 'react';

export default function MatchHighlightView({ videos }) {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const handlePlay = () => {
    // Handle play event if needed
  };

  const handlePause = () => {
    // Handle pause event if needed
  };

  const handleEnded = () => {
    // Move to the next video when the current one ends
    setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % videos.length);
  };

  useEffect(() => {
    // Reset the video index when the highlightData changes
    setCurrentVideoIndex(0);
  }, [videos]);

  return (
    <div className="w-full bg-black -skew-y-[0.5deg]">
      {videos.length > 0 && (
        <div className='skew-y-[0.5deg'>
        <VideoPlayer2
          key={videos[currentVideoIndex]}
          videoUrl={videos[currentVideoIndex]}
          onPlay={handlePlay}
          onPause={handlePause}
          onEnded={handleEnded}
          />
          </div>
      )}
    </div>
  );
}
