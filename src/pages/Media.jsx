import React, { useState, useEffect } from 'react';
import axios from 'axios';
import YouTube from 'react-youtube';
import './Media.css';

function Medias() {
  const [sports, setSports] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');

  useEffect(() => {
    fetchSports();
  }, []);

  const fetchSports = async () => {
    try {
      const response = await axios.get('https://agile-reef-32463-2ad3559c3e00.herokuapp.com/sports');
      setSports(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
  };

  const renderSportMediaVideos = (sport) => {
    if (activeCategory === 'all' || activeCategory === sport.name.toLowerCase()) {
      if (sport.sport_media_videos && sport.sport_media_videos.length > 0) {
        return sport.sport_media_videos.map((video) => (
          <article key={video.id} className="media-container">
            <YouTube videoId={getVideoId(video.url)} className="thumbnail"/>
            <div className="media-bottom-section">
              <div className="media-details">
                <a href={video.url} className="media-title">
                  {video.title}
                </a>
                <a href={video.url} className="media-description">
                </a>
              </div>
            </div>
          </article>
        ));
      }
    }
    return null;
  };

  const getVideoId = (url) => {
    const match = url.match(/youtube\.com.*(\?v=|\/embed\/|\/\d\/|\/vi\/|\/v\/|https:\/\/youtu\.be\/|\/e\/|watch\?v=|\&v=|youtu\.be\/|\/v\/|e\/|youtube\.com\/v\/)([^#\&\?\n]*)/);
    if (match && match[2].length === 11) {
      return match[2];
    } else {
      return null;
    }
  };

  return (
    <>
      <div className="categories">
        <section className="category-section">
          <button
            className={`category ${activeCategory === 'all' ? 'active' : ''}`}
            onClick={() => handleCategoryClick('all')}
          >
            All
          </button>
          {sports.map((sport) => (
            <button
              key={sport.id}
              className={`category ${activeCategory === sport.name.toLowerCase() ? 'active' : ''}`}
              onClick={() => handleCategoryClick(sport.name.toLowerCase())}
            >
              {sport.name}
            </button>
          ))}
        </section>
      </div>
      <div className="media">
  {activeCategory === 'all' ? (
    <>
    {sports.map(
      (sport) =>
      <div className="media-section">
        <h2 className="media-section-title">All</h2>
            {renderSportMediaVideos(sport)}
          </div>
        )}
            </>
  ) : (
    <>
      {sports.map(
        (sport) =>
          activeCategory === sport.name.toLowerCase() && (
            <div key={sport.id} className="media-section">
              <h2 className="media-section-title"></h2>
              {renderSportMediaVideos(sport)}
            </div>
          )
            )}
          </>
        )}
      </div>
    </>
  );
}

export default Medias;
