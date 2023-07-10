import React, { useEffect, useRef } from 'react';
import './Home.css';

const HomePage = () => {
  const playerRef = useRef(null);

  useEffect(() => {
    const player = new window.YT.Player(playerRef.current, {
      videoId: '0L-DGlol05A',
      playerVars: {
        autoplay: 1,
        controls: 0,
        modestbranding: 1,
        loop: 1,
        playlist: '0L-DGlol05A',
      },
      events: {
        onReady: event => {
          event.target.mute();
        },
      },
    });

    return () => {
      player.destroy();
    };
  }, []);

  return (
    <div className="homepage-container">
      <div className="video-player" ref={playerRef}></div>
      {/* Other components */}
    </div>
  );
};

export default HomePage;
