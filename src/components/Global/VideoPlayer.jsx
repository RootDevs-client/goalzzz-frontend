import { useEffect } from 'react';

const VideoPlayer = ({ video }) => {
  useEffect(() => {
    // Initialize JW Player
    var player = window.jwplayer('XhGm52Nv');

    // Configure JW Player with your JSON settings
    player.setup({
      file: video,
      advertising: {
        autoplayadsmuted: false,
        outstream: false,
      },
      aspectratio: '16:9',
      autoPause: {
        viewability: false,
      },
      autostart: true,
      captions: {
        // Add your caption settings here
      },
      controls: true,
      displayHeading: false,
      displaydescription: true,
      displaytitle: true,
      floating: {
        mode: 'never',
      },
      generateSEOMetadata: false,
      include_compatibility_script: false,
      interactive: false,
      intl: {
        en: {
          sharing: {
            heading: 'Share Video',
          },
        },
      },
      logo: {
        hide: true,
        position: 'top-right',
      },
      mute: true,
      pipIcon: 'disabled',
      playbackRateControls: true,
      preload: 'metadata',
      repeat: true,
      sharing: {
        code: '',
        sites: ['twitter', 'email'],
      },
      skin: {
        // Add your skin settings here
      },
      width: '100%',
    });
  }, [video]);

  return <div id="XhGm52Nv" />;
};

export default VideoPlayer;

