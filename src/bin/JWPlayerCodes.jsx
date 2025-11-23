import { useEffect, useRef } from 'react';

const VideoPlayer = ({ video }) => {
  const playerRef = useRef(null);

  useEffect(() => {
    const loadJWPlayer = async () => {
      try {
        // Dynamically load JW Player library
        if (typeof window.jwplayer === 'undefined') {
          const script = document.createElement('script');
          script.src = 'https://cdn.jwplayer.com/libraries/XhGm52Nv.js';
          script.async = true;
          script.onload = initializeJWPlayer;
          document.head.appendChild(script);
        } else {
          // If the library is already loaded, initialize immediately
          initializeJWPlayer();
        }
      } catch (error) {
        console.error('Error loading JW Player library:', error);
      }
    };

    const initializeJWPlayer = () => {
      if (playerRef.current && window.jwplayer) {
        const currentPlayerRef = playerRef.current; // Store in a variable

        // Destroy the existing player instance if it exists
        if (window.jwplayer(currentPlayerRef).getState() !== 'IDLE') {
          window.jwplayer(currentPlayerRef).remove();
        }

        // Create a new instance of JW Player with the updated video source
        window.jwplayer(currentPlayerRef).setup({
          file: video,
          width: '100%',
          aspectratio: '16:9', // Correct property name for aspect ratio
          autostart: true,
          mute: false,
          controls: true,
          hlshtml: true,
        });
      }
    };

    loadJWPlayer();

    // Cleanup function to remove the player instance when unmounting
    return () => {
      if (playerRef.current && window.jwplayer) {
        const currentPlayerRef = playerRef.current; // Store in a variable
        window.jwplayer(currentPlayerRef).remove();
      }
    };
  }, [video]);

  return <div ref={playerRef}></div>;
};

export default VideoPlayer;

// // VideoPlayer.jsx

// import { useEffect, useRef } from 'react';

// const VideoPlayer = ({ video }) => {
//   const playerRef = useRef(null);

//   useEffect(() => {
//     const loadJWPlayer = async () => {
//       try {
//         // Dynamically load JW Player library
//         if (typeof window.jwplayer === 'undefined') {
//           const script = document.createElement('script');
//           script.src = 'https://cdn.jwplayer.com/libraries/XhGm52Nv.js';
//           script.async = true;
//           script.onload = initializeJWPlayer;
//           document.head.appendChild(script);
//         } else {
//           // If the library is already loaded, initialize immediately
//           initializeJWPlayer();
//         }
//       } catch (error) {
//         console.error('Error loading JW Player library:', error);
//       }
//     };

//     const initializeJWPlayer = () => {
//       if (playerRef.current && window.jwplayer) {
//         // Destroy the existing player instance if it exists
//         if (window.jwplayer(playerRef.current).getState() !== 'IDLE') {
//           window.jwplayer(playerRef.current).remove();
//         }

//         // Create a new instance of JW Player with the updated video source
//         window.jwplayer(playerRef.current).setup({
//           file: video,
//           width: '100%',
//           aspectratio: '16:9',
//           autostart: true,
//           mute: false,
//           controls: true,
//           hlshtml: true,
//         });
//       }
//     };

//     loadJWPlayer();

//     // Cleanup function to remove the player instance when unmounting
//     return () => {
//       if (playerRef.current && window.jwplayer) {
//         window.jwplayer(playerRef.current).remove();
//       }
//     };
//   }, [video]);

//   return <div ref={playerRef}></div>;
// };

// export default VideoPlayer;

// import { useEffect, useRef } from 'react';

// const VideoPlayer = ({ video }) => {

//   const playerRef = useRef(null);

//   useEffect(() => {
//     const loadJWPlayer = async () => {
//       try {
//         // Dynamically load JW Player library
//         if (typeof window.jwplayer === 'undefined') {
//           const script = document.createElement('script');
//           script.src = 'https://cdn.jwplayer.com/libraries/XhGm52Nv.js';
//           script.async = true;
//           document.head.appendChild(script);

//           // Wait for the script to load before initializing the player
//           // await new Promise((resolve) => {
//           //   script.onload = resolve;
//           // });
//         }

//         // Initialize JW Player
//         if (playerRef.current && window.jwplayer) {
//           window.jwplayer(playerRef.current).setup({
//             file: video, // Assuming video.sourceUrl1 is the M3U8 URL
//             width: '100%',
//             aspectratio: '16:9',
//             autostart: true,
//             mute: false,
//             controls: true,
//             hlshtml: true,
//           });
//         }
//       } catch (error) {
//         console.error('Error loading or initializing JW Player:', error);
//       }
//     };

//     loadJWPlayer();
//   }, [video]);

//   return <div ref={playerRef}></div>;
// };

// export default VideoPlayer;

// // VideoPlayer.jsx
// import { useEffect, useRef } from 'react';
// import videojs from 'video.js';
// import 'video.js/dist/video-js.css';

// const VideoPlayer = ({ options, onReady }) => {
//   const videoRef = useRef(null);
//   const playerRef = useRef(null);

//   useEffect(() => {
//     // Make sure Video.js player is only initialized once
//     if (!playerRef.current) {
//       // The Video.js player needs to be _inside_ the component el for React 18 Strict Mode.
//       const videoElement = document.createElement('video');

//       videoElement.classList.add('video-js');
//       videoRef.current.appendChild(videoElement);

//       const player = (playerRef.current = videojs(videoElement, options, () => {
//         onReady && onReady(player);
//       }));

//       // You could update an existing player in the `else` block here
//       // on prop change, for example:
//     } else {
//       const player = playerRef.current;

//       player.autoplay(options.autoplay);
//       player.src(options.sources);
//     }
//   }, [options, onReady]);

//   useEffect(() => {
//     const player = playerRef.current;

//     return () => {
//       if (player && !player.isDisposed()) {
//         player.dispose();
//         playerRef.current = null;
//       }
//     };
//   }, [playerRef]);

//   return (
//     <div data-vjs-player>
//       <div ref={videoRef}></div>
//     </div>
//   );
// };

// export default VideoPlayer;

// Video player code

// 'use client';

// import VideoPlayer from '@/components/Global/VideoPlayer';

// export default function WatchHome() {
//   const video = {
//     sourceUrl1:
//       'https://qr-u9p0.onrender.com/videos/1701256739295-915511496.mp4',
//     sourceUrl2:
//       'https://nmxlive.akamaized.net/hls/live/529965/Live_1/index.m3u8',
//     sourceUrl3: 'https://dec.plusserial.xyz/cricket1sd/index.m3u8',
//   };

//   return (
//     <>
//       <VideoPlayer video={video} />
//     </>
//   );
// }

// 'use client';

// // WatchHome.jsx
// import VideoPlayer from '@/components/Global/VideoPlayer';
// import { useRef } from 'react';

// export default function WatchHome() {
//   const playerRef = useRef(null);

//   const videoJsOptions = {
//     autoplay: true,
//     controls: true,
//     responsive: true,
//     fluid: true,
//     sources: [
//       {
//         src: 'https://dec.plusserial.xyz/cricket1sd/index.m3u8', // Replace with your M3U8 URL
//         type: 'application/x-mpegURL', // Set the type for M3U8
//       },
//     ],
//   };

//   const handlePlayerReady = (player) => {
//     playerRef.current = player;

//     // You can handle player events here, for example:
//     player.on('waiting', () => {
//     });

//     player.on('dispose', () => {
//     });
//   };

//   return (
//     <>
//       <VideoPlayer options={videoJsOptions} onReady={handlePlayerReady} />
//     </>
//   );
// }

// Version 02

// import { useEffect, useRef } from 'react';

// const VideoPlayer = ({ video }) => {
//   const playerRef = useRef(null);

//   useEffect(() => {
//     const loadJWPlayer = async () => {
//       try {
//         // Dynamically load JW Player library
//         if (typeof window.jwplayer === 'undefined') {
//           const script = document.createElement('script');
//           script.src = 'https://cdn.jwplayer.com/libraries/XhGm52Nv.js';
//           script.async = true;
//           script.onload = initializeJWPlayer;
//           document.head.appendChild(script);
//         } else {
//           // If the library is already loaded, initialize immediately
//           initializeJWPlayer();
//         }
//       } catch (error) {
//         console.error('Error loading JW Player library:', error);
//       }
//     };

//     const initializeJWPlayer = () => {
//       if (playerRef.current && window.jwplayer) {
//         const currentPlayerRef = playerRef.current; // Store in a variable

//         // Destroy the existing player instance if it exists
//         if (window.jwplayer(currentPlayerRef).getState() !== 'IDLE') {
//           window.jwplayer(currentPlayerRef).remove();
//         }

//         // Create a new instance of JW Player with the updated video source
//         window.jwplayer(currentPlayerRef).setup({
//           file: video,
//           width: '100%',
//           aspectratio: '16:9',
//           autostart: true,
//           mute: false,
//           controls: true,
//           hlshtml: true,
//           logo: {
//             file: '/assets/jw-logo-red-46px.png',
//             link: 'https://www.jwplayer.com',
//             hide: true,
//             position: 'top-left',
//           },
//         });
//       }
//     };

//     loadJWPlayer();

//     // Cleanup function to remove the player instance when unmounting
//     return () => {
//       if (playerRef.current && window.jwplayer) {
//         const currentPlayerRef = playerRef.current; // Store in a variable
//         window.jwplayer(currentPlayerRef).remove();
//       }
//     };
//   }, [video]);

//   return <div ref={playerRef}></div>;
// };

// export default VideoPlayer;

// Version 04

// import { useEffect, useRef, useState } from 'react';

// const VideoPlayer = ({ video }) => {
//   const playerRef = useRef(null);
//   const [isJWPLibraryLoaded, setIsJWPLibraryLoaded] = useState(false);

//   useEffect(() => {
//     const loadJWPlayer = async () => {
//       try {
//         // Dynamically load JW Player library
//         if (typeof window.jwplayer === 'undefined') {
//           const script = document.createElement('script');
//           script.src = 'https://cdn.jwplayer.com/libraries/XhGm52Nv.js';
//           script.async = true;
//           script.onload = () => setIsJWPLibraryLoaded(true);
//           document.head.appendChild(script);
//         } else {
//           // If the library is already loaded, set the status to true
//           setIsJWPLibraryLoaded(true);
//         }
//       } catch (error) {
//         console.error('Error loading JW Player library:', error);
//       }
//     };

//     loadJWPlayer();
//   }, []);

//   useEffect(() => {
//     if (isJWPLibraryLoaded && playerRef.current) {
//       // Create a new instance of JW Player with the updated video source
//       window.jwplayer(playerRef.current).setup({
//         file: video,
//         width: '100%',
//         aspectratio: '16:9',
//         autostart: true,
//         mute: false,
//         controls: true,
//         hlshtml: true,
//         logo: {
//           file: '/assets/jw-logo-red-46px.png',
//           link: 'https://www.jwplayer.com',
//           hide: true,
//           position: 'top-left',
//         },
//       });
//     }
//   }, [isJWPLibraryLoaded, video]);

//   return <div ref={playerRef}></div>;
// };

// export default VideoPlayer;

// Version 05

// import { useEffect, useRef, useState } from 'react';

// const VideoPlayer = ({ video }) => {
//   const playerRef = useRef(null);
//   const [isJWPLibraryLoaded, setIsJWPLibraryLoaded] = useState(false);

//   useEffect(() => {
//     const loadJWPlayer = async () => {
//       try {
//         // Check if the JW Player library is already loaded
//         if (typeof window.jwplayer === 'undefined') {
//           const script = document.createElement('script');
//           script.src = 'https://cdn.jwplayer.com/libraries/XhGm52Nv.js';
//           script.async = true;
//           script.onload = () => {
//             // Set the global jwplayer variable
//             window.jwplayer = window.jwplayer || function () { (window.jwplayer.q = window.jwplayer.q || []).push(arguments); };
//             setIsJWPLibraryLoaded(true);
//           };
//           document.head.appendChild(script);
//         } else {
//           // If the library is already loaded, set the status to true
//           setIsJWPLibraryLoaded(true);
//         }
//       } catch (error) {
//         console.error('Error loading JW Player library:', error);
//       }
//     };

//     loadJWPlayer();
//   }, []);

//   useEffect(() => {
//     if (isJWPLibraryLoaded && playerRef.current) {
//       // Create a new instance of JW Player with the updated video source
//       window.jwplayer(playerRef.current).setup({
//         file: video,
//         width: '100%',
//         aspectratio: '16:9',
//         autostart: true,
//         mute: false,
//         controls: true,
//         hlshtml: true,
//         logo: {
//           file: '/assets/jw-logo-red-46px.png',
//           link: 'https://www.jwplayer.com',
//           hide: true,
//           position: 'top-left',
//         },
//       });
//     }
//   }, [isJWPLibraryLoaded, video]);

//   return <div ref={playerRef}></div>;
// };

// export default VideoPlayer;

// Version 07

// import { useEffect, useRef, useState } from 'react';

// const useScript = (url) => {
//   const [isScriptLoaded, setIsScriptLoaded] = useState(false);

//   useEffect(() => {
//     const script = document.createElement('script');
//     script.src = url;
//     script.async = true;

//     script.onload = () => {
//       setIsScriptLoaded(true);
//     };

//     document.head.appendChild(script);

//     return () => {
//       document.head.removeChild(script);
//     };
//   }, [url]);

//   return isScriptLoaded;
// };

// const VideoPlayer = ({ video }) => {
//   const playerRef = useRef(null);
//   const isJWPLibraryLoaded = useScript('https://cdn.jwplayer.com/libraries/XhGm52Nv.js');

//   useEffect(() => {
//     if (isJWPLibraryLoaded && playerRef.current) {
//       window.jwplayer(playerRef.current).setup({
//         file: video,
//         width: '100%',
//         aspectratio: '16:9',
//         autostart: true,
//         mute: false,
//         controls: true,
//         hlshtml: true,
//         logo: {
//           file: '/assets/jw-logo-red-46px.png',
//           link: 'https://www.jwplayer.com',
//           hide: true,
//           position: 'top-left',
//         },
//       });
//     }
//   }, [isJWPLibraryLoaded, video]);

//   return <div ref={playerRef}></div>;
// };

// export default VideoPlayer;

// import dynamic from 'next/dynamic';
// import { useEffect } from 'react';
// const JWPlayer = dynamic(() => import('@jwplayer/react-jwplayer'), {
//   ssr: false,
// });
// const VideoPlayer = ({ video }) => {
//   useEffect(() => {
//     // Initialize JW Player
//     const player = window.jwplayer('XhGm52Nv');
//     // Configure JW Player with your JSON settings
//     player.setup({
//       file: video,
//       advertising: {
//         autoplayadsmuted: false,
//         outstream: false,
//       },
//       aspectratio: '16:9',
//       autoPause: {
//         viewability: false,
//       },
//       autostart: true,
//       captions: {
//         // Add your caption settings here
//       },
//       controls: true,
//       displayHeading: false,
//       displaydescription: true,
//       displaytitle: true,
//       floating: {
//         mode: 'never',
//       },
//       generateSEOMetadata: false,
//       include_compatibility_script: false,
//       interactive: false,
//       intl: {
//         en: {
//           sharing: {
//             heading: 'Share Video',
//           },
//         },
//       },
//       logo: {
//         hide: true,
//         position: 'top-right',
//       },
//       mute: true,
//       pipIcon: 'disabled',
//       playbackRateControls: true,
//       preload: 'metadata',
//       repeat: true,
//       sharing: {
//         code: '',
//         sites: ['twitter', 'email'],
//       },
//       width: '100%',
//     });
//   }, []);
//   return <JWPlayer playerId="XhGm52Nv" />;
// };
// export default VideoPlayer;

// import { useEffect, useRef, useState } from 'react';

// const useScript = (url) => {
//   const [isScriptLoaded, setIsScriptLoaded] = useState(false);

//   useEffect(() => {
//     const script = document.createElement('script');
//     script.src = url;
//     script.async = true;

//     script.onload = () => {
//       setIsScriptLoaded(true);
//     };

//     document.head.appendChild(script);

//     return () => {
//       document.head.removeChild(script);
//     };
//   }, [url]);

//   return isScriptLoaded;
// };

// const VideoPlayer = ({ video }) => {
//   const playerRef = useRef(null);
//   const isJWPLibraryLoaded = useScript(
//     'https://cdn.jwplayer.com/libraries/q40m21Dz.js'
//   );
//   const [hasPlayed, setHasPlayed] = useState(false);

//   useEffect(() => {
//     const initializeJWPlayer = async () => {
//       if (window.jwplayer) {
//         window.jwplayer.key = 'q40m21Dz'; // Replace with your JW Player key

//         const jwplayerConfig = {
//           advertising: {
//             autoplayadsmuted: false,
//             outstream: false,
//           },
//           autoPause: {
//             viewability: true,
//           },
//           autostart: 'viewable',
//           captions: {
//             backgroundColor: '#000000',
//             backgroundOpacity: 75,
//             color: '#FFFFFF',
//             edgeStyle: 'none',
//             fontFamily: 'sans-serif',
//             fontOpacity: 100,
//             fontSize: 15,
//             windowColor: '#000000',
//             windowOpacity: 0,
//           },
//           cast: {},
//           controls: true,
//           displayHeading: false,
//           displaydescription: false,
//           displaytitle: false,
//           floating: {
//             mode: 'never',
//           },
//           generateSEOMetadata: false,
//           height: 270,
//           include_compatibility_script: false,
//           interactive: false,
//           intl: {
//             en: {
//               sharing: {
//                 heading: 'Share Video',
//               },
//             },
//           },
//           logo: {
//             hide: false,
//             position: 'top-right',
//           },
//           mute: true,
//           pipIcon: 'disabled',
//           playbackRateControls: false,
//           preload: 'metadata',
//           repeat: true,
//           sharing: {
//             code: '',
//             sites: ['facebook', 'twitter', 'email', 'tumblr', 'reddit'],
//           },
//           skin: {
//             controlbar: {
//               background: 'rgba(0,0,0,0)',
//               icons: 'rgba(255,255,255,0.8)',
//               iconsActive: '#FFFFFF',
//               text: '#FFFFFF',
//             },
//             menus: {
//               background: '#333333',
//               text: 'rgba(255,255,255,0.8)',
//               textActive: '#FFFFFF',
//             },
//             timeslider: {
//               progress: '#F2F2F2',
//               rail: 'rgba(255,255,255,0.3)',
//             },
//             tooltips: {
//               background: '#FFFFFF',
//               text: '#000000',
//             },
//           },
//           stretching: 'uniform',
//           width: 678,
//         };

//         window.jwplayer(playerRef.current).setup({
//           file: video,
//           width: '100%',
//           aspectratio: '16:9',
//           autostart: true,
//           mute: true,
//           controls: true,
//           hlshtml: true,
//           logo: {
//             file: '/assets/jw-logo-red-46px.png',
//             link: 'https://www.jwplayer.com',
//             hide: true,
//             position: 'top-left',
//           },
//           ...jwplayerConfig,
//         });
//         setHasPlayed(true);
//       } else {
//         console.error('JW Player library not available.');
//       }
//     };

//     if (isJWPLibraryLoaded && playerRef.current && !hasPlayed) {
//       initializeJWPlayer();
//     }
//   }, [isJWPLibraryLoaded, video, hasPlayed]);

//   return <div ref={playerRef}></div>;
// };

// export default VideoPlayer;

// import { useEffect, useRef, useState } from 'react';

// const useScript = (url) => {
//   const [isScriptLoaded, setIsScriptLoaded] = useState(false);

//   useEffect(() => {
//     const script = document.createElement('script');
//     script.src = url;
//     script.async = true;

//     script.onload = () => {
//       setIsScriptLoaded(true);
//     };

//     document.head.appendChild(script);

//     return () => {
//       document.head.removeChild(script);
//     };
//   }, [url]);

//   return isScriptLoaded;
// };

// import { useEffect, useRef, useState } from 'react';

// const VideoPlayer = ({ video }) => {
//   const useScript = (url) => {
//     const [isScriptLoaded, setIsScriptLoaded] = useState(false);

//     useEffect(() => {
//       const script = document.createElement('script');
//       script.src = url;
//       script.async = true;

//       script.onload = () => {
//         setIsScriptLoaded(true);
//       };

//       document.head.appendChild(script);

//       return () => {
//         document.head.removeChild(script);
//       };
//     }, [url]);

//     return isScriptLoaded;
//   };

//   const playerRef = useRef(null);
//   const isJWPLibraryLoaded = useScript(
//     'https://cdn.jwplayer.com/libraries/XhGm52Nv.js'
//   );
//   const [hasPlayed, setHasPlayed] = useState(false);

//   useEffect(() => {
//     if (isJWPLibraryLoaded && playerRef.current && !hasPlayed) {
//       window.jwplayer(playerRef.current).setup({
//         file: video,
//         advertising: {
//           autoplayadsmuted: false,
//           outstream: false,
//         },
//         aspectratio: '16:9',
//         autoPause: {
//           viewability: false,
//         },
//         autostart: true,
//         captions: {
//           // Add your caption settings here
//         },
//         controls: true,
//         displayHeading: false,
//         displaydescription: true,
//         displaytitle: true,
//         floating: {
//           mode: 'never',
//         },
//         generateSEOMetadata: false,
//         include_compatibility_script: false,
//         interactive: false,
//         intl: {
//           en: {
//             sharing: {
//               heading: 'Share Video',
//             },
//           },
//         },
//         logo: {
//           hide: true,
//           position: 'top-right',
//         },
//         mute: true,
//         pipIcon: 'disabled',
//         playbackRateControls: true,
//         preload: 'metadata',
//         repeat: true,
//         sharing: {
//           code: '',
//           sites: ['twitter', 'email'],
//         },
//         skin: {
//           // Add your skin settings here
//         },
//         width: '100%',
//       });
//       setHasPlayed(true);
//     }
//   }, [isJWPLibraryLoaded, video, hasPlayed]);

//   return <div ref={playerRef}></div>;
// };

// export default VideoPlayer;

// 'use client';

// import Countdown from '@/components/Global/Countdown';
// import Image from 'next/image';
// import { useEffect, useRef, useState } from 'react';

// const formatDate = (timestamp) => new Date(timestamp * 1000);
// const isPastDate = (timestamp) => formatDate(timestamp) < new Date();

// export default function SelectedLiveMatch({ match }) {
//   const streamingSources = match?.streaming_sources;

//   let videoUrls = [];
//   streamingSources.forEach((source) => {
//     videoUrls.push(source?.stream_url);
//   });

//   const [currentStreamIndex, setCurrentStreamIndex] = useState(0);
//   const playerRef = useRef(null);

//   const isLive = isPastDate(match?.match_time);

//   const switchStream = (index) => {
//     setCurrentStreamIndex(index);
//   };

//   useEffect(() => {
//     const loadJWPlayer = async () => {
//       try {
//         // Dynamically load JW Player library
//         if (typeof window.jwplayer === 'undefined') {
//           const script = document.createElement('script');
//           script.src = 'https://cdn.jwplayer.com/libraries/XhGm52Nv.js';
//           script.async = true;
//           script.onload = initializeJWPlayer;
//           document.head.appendChild(script);
//         } else {
//           // If the library is already loaded, initialize immediately
//           initializeJWPlayer();
//         }
//       } catch (error) {
//         console.error('Error loading JW Player library:', error);
//       }
//     };

//     const initializeJWPlayer = () => {
//       if (playerRef.current && window.jwplayer) {
//         // Destroy the existing player instance if it exists
//         if (window.jwplayer(playerRef.current).getState() !== 'IDLE') {
//           window.jwplayer(playerRef.current).remove();
//         }

//         // Create a new instance of JW Player with the updated video source
//         window.jwplayer(playerRef.current).setup({
//           file: video,
//           width: '100%',
//           aspectratio: '16:9',
//           autostart: true,
//           mute: false,
//           controls: true,
//           hlshtml: true,
//         });
//       }
//     };

//     loadJWPlayer();

//     // Cleanup function to remove the player instance when unmounting
//     return () => {
//       if (playerRef.current && window.jwplayer) {
//         window.jwplayer(playerRef.current).remove();
//       }
//     };
//   }, [currentStreamIndex]);

//   return (
//     <>
//       {isLive ? (
//         <>
//           <div ref={playerRef}></div>
//           <div className="flex mt-5">
//             {videoUrls.map((url, index) => (
//               <button
//                 key={index}
//                 className={`mr-2 px-4 py-2 ${
//                   currentStreamIndex === index
//                     ? 'bg-blue-500 text-white rounded-lg'
//                     : 'bg-gray-300 rounded-lg'
//                 }`}
//                 onClick={() => switchStream(index)}
//               >
//                 Stream {index + 1}
//               </button>
//             ))}
//           </div>
//         </>
//       ) : (
//         <div className="relative mt-5">
//           <img
//             src="/images/logo.png"
//
//
//             alt="logo"
//
//             className="w-full h-full bg-primary filter grayscale"
//           />
//           <div className="absolute inset-0">
//             <div className="flex flex-col items-center justify-center h-full gap-5">
//               <div className="flex items-center justify-center gap-10">
//                 <div className="flex flex-col items-center gap-1 text-white">
//                   <img
//                     src={match?.team_one_image}
//                     alt="Team One Image"
//
//
//                     className="w-12 h-12 p-0.5 rounded-full"
//
//                   />
//                   <h4>{match?.team_one_name}</h4>
//                 </div>
//                 <div className="w-14 h-14 bg-black rounded-full flex items-center justify-center text-secondary">
//                   vs
//                 </div>
//                 <div className="flex flex-col items-center gap-1 text-white">
//                   <img
//                     src={match?.team_two_image}
//                     alt="Team Two Image"
//
//
//                     className="w-12 h-12 p-0.5 rounded-full"
//
//                   />
//                   <h4>{match?.team_two_name}</h4>
//                 </div>
//               </div>

//               <div className="text-white flex items-center gap-2">
//                 <p> The match will start in </p>
//                 <Countdown date={match?.match_time} />
//               </div>
//               <h4 className="text-white font-medium">
//                 Streaming will start before 15 mins of the match started
//               </h4>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }

// 'use client';
// import { useEffect, useRef, useState } from 'react';

// import Countdown from '@/components/Global/Countdown';
// import Image from 'next/image';

// const formatDate = (timestamp) => new Date(timestamp * 1000);
// const isPastDate = (timestamp) => formatDate(timestamp) < new Date();

// const loadJWPlayer = async () => {
//   try {
//     // Dynamically load JW Player library
//     if (typeof window.jwplayer === 'undefined') {
//       const script = document.createElement('script');
//       script.src = 'https://cdn.jwplayer.com/libraries/XhGm52Nv.js';
//       script.async = true;
//       document.head.appendChild(script);

//       // Wait for the script to load before resolving
//       await new Promise((resolve) => {
//         script.onload = resolve;
//       });
//     }
//   } catch (error) {
//     console.error('Error loading JW Player library:', error);
//   }
// };

// const initializeJWPlayer = (video, playerRef) => {
//   if (playerRef.current && window.jwplayer) {
//     // Destroy the existing player instance if it exists
//     if (window.jwplayer(playerRef.current).getState() !== 'IDLE') {
//       window.jwplayer(playerRef.current).remove();
//     }

//     // Create a new instance of JW Player with the updated video source
//     window.jwplayer(playerRef.current).setup({
//       file: video, // Updated to use the new video URL
//       width: '100%',
//       aspectratio: '16:9',
//       autostart: true,
//       mute: false,
//       controls: true,
//       hlshtml: true,
//     });
//   }
// };

// // working version with raw import
// 'use client';

// import Countdown from '@/components/Global/Countdown';
// import Image from 'next/image';
// import { useEffect, useRef, useState } from 'react';

// const formatDate = (timestamp) => new Date(timestamp * 1000);
// const isPastDate = (timestamp) => formatDate(timestamp) < new Date();

// export default function SelectedLiveMatch({ match }) {
//   const streamingSources = match?.streaming_sources;

//   const videoUrls = streamingSources?.map((source) => source?.stream_url) || [];
//   const [currentStreamIndex, setCurrentStreamIndex] = useState(0);
//   const playerRef = useRef(null);

//   const isLive = isPastDate(match?.match_time);

//   const switchStream = (index) => {
//     setCurrentStreamIndex(index);
//   };

//   useEffect(() => {
//     const loadPlayerAndInitialize = async () => {
//       await loadJWPlayer();
//       initializeJWPlayer(videoUrls[currentStreamIndex], playerRef);
//     };

//     loadPlayerAndInitialize();

//     // Cleanup function to remove the player instance when unmounting
//     return () => {
//       if (playerRef.current && window.jwplayer) {
//         window.jwplayer(playerRef.current).remove();
//       }
//     };
//   }, [currentStreamIndex, videoUrls]);

//   const keyForRerender = `stream-${currentStreamIndex}`;

//   return (
//     <>
//       {isLive ? (
//         <>
//           <div key={keyForRerender} ref={playerRef}></div>
//           <div className="flex mt-5">
//             {videoUrls.map((url, index) => (
//               <button
//                 key={index}
//                 className={`mr-2 px-4 py-2 ${
//                   currentStreamIndex === index
//                     ? 'bg-blue-500 text-white rounded-lg'
//                     : 'bg-gray-300 rounded-lg'
//                 }`}
//                 onClick={() => switchStream(index)}
//               >
//                 Stream {index + 1}
//               </button>
//             ))}
//           </div>
//         </>
//       ) : (
//         <div className="relative mt-5">
//           <img
//             src="/images/logo.png"
//
//
//             alt="logo"
//
//             className="w-full h-full bg-primary filter grayscale"
//           />
//           <div className="absolute inset-0">
//             <div className="flex flex-col items-center justify-center h-full gap-5">
//               <div className="flex items-center justify-center gap-10">
//                 <div className="flex flex-col items-center gap-1 text-white">
//                   <img
//                     src={match?.team_one_image}
//                     alt="Team One Image"
//
//
//                     className="w-12 h-12 p-0.5 rounded-full"
//
//                   />
//                   <h4>{match?.team_one_name}</h4>
//                 </div>
//                 <div className="w-14 h-14 bg-black rounded-full flex items-center justify-center text-secondary">
//                   vs
//                 </div>
//                 <div className="flex flex-col items-center gap-1 text-white">
//                   <img
//                     src={match?.team_two_image}
//                     alt="Team Two Image"
//
//
//                     className="w-12 h-12 p-0.5 rounded-full"
//
//                   />
//                   <h4>{match?.team_two_name}</h4>
//                 </div>
//               </div>

//               <div className="text-white flex items-center gap-2">
//                 <p> The match will start in </p>
//                 <Countdown date={match?.match_time} />
//               </div>
//               <h4 className="text-white font-medium">
//                 Streaming will start before 15 mins of the match started
//               </h4>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }
