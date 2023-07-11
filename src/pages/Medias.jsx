import React, { useState, useEffect } from 'react';
import axios from 'axios';
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
    } catch (error) {
      console.log(error);
    }
  };

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
  };

  const renderSportMediaVideos = (sport) => {
    if (sport.sport_media_videos && sport.sport_media_videos.length > 0) {
      return sport.sport_media_videos.map((video) => (
        <article key={video.id} className="media-container">
          <a href={video.url} className="thumbnail" data-duration="12:24">
            <img className="thumbnail-image" src="http://unsplash.it/250/150?gravity=center" alt="Thumbnail" />
          </a>
          <div className="media-bottom-section">
            <div className="media-details">
              <a href={video.url} className="media-title">{video.title}</a>
              <a href={video.url} className="media-description">Media Description</a>
            </div>
          </div>
        </article>
      ));
    }
    return null;
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
            {sports.map((sport) => (
              <section key={sport.id} className="media-section">
                <h2 className="media-section-title">{sport.name}</h2>
                <div className="media-container">
                  {renderSportMediaVideos(sport)}
                </div>
              </section>
            ))}
          </>
        ) : (
          <>
            {sports.map((sport) => (
              activeCategory === sport.name.toLowerCase() && (
                <section key={sport.id} className="media-section">
                  <h2 className="media-section-title">{sport.name}</h2>
                  <div className="media-container">
                    {renderSportMediaVideos(sport)}
                  </div>
                </section>
              )
            ))}
          </>
        )}
      </div>
    </>
  );
}

export default Medias;
