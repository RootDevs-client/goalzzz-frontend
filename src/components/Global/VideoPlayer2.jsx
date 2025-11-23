import ReactPlayer from 'react-player';

const VideoPlayer2 = ({ videoUrl, onPlay, onPause, onEnded }) => {
  return (
    <div style={{ position: 'relative', width: '100%', paddingTop: '56.25%' }}>
      <ReactPlayer
        stopOnUnmount={true}
        controls={true}
        className="react-player"
        url={videoUrl}
        width="100%"
        height="100%"
        playing={true}
        onPlay={onPlay}
        onPause={onPause}
        onEnded={onEnded}
        style={{ position: 'absolute', top: 0, left: 0 }}
      />
    </div>
  );
};

export default VideoPlayer2;
