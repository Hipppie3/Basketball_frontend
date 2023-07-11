import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import './PlayersMediaPage.css';
import YouTube from 'react-youtube';

function PlayersMediaPage() {
  const { id } = useParams();
  const [player, setPlayer] = useState(null);

   useEffect(() => {
    const fetchPlayerData = async () => {
      try {
        const response = await axios.get(`https://agile-reef-32463-2ad3559c3e00.herokuapp.com/players/${id}`);
        setPlayer(response.data);
      } catch (error) {
        console.error('Something went wrong:', error);
      }
    };

    fetchPlayerData();
  }, [id]);

  if (!player) {
    return <div>Loading...</div>;
  }

  const videoOptions = {
    width: '300', // Adjust the width as desired
    height: '200', // Adjust the height as desired
  };

  const getPlayerVideoId = (url) => {
    const videoId = url.split('v=')[1];
    return videoId;
  };

  console.log(player.video)

  return (
    <div className='players-media'>
      <div className="players-link-left2">
        <ul>
          <li>
            <NavLink className='stats-link'to={`/players/${player.player.id}`}>Profile</NavLink>
          </li>
          <li>
            <NavLink className='stats-link' to={`/players/${player.player.id}/stats`}>Stats</NavLink>
          </li>
          <li>Media</li>
        </ul>
      </div>

      <div className='media-container1'>
        {player.videos.map((video) => (
          <div className="eaVid1" key={`video-${video.id}`}>
            <YouTube videoId={getPlayerVideoId(video.url)} opts={videoOptions} />
            <div className="hi">{video.title}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PlayersMediaPage;
