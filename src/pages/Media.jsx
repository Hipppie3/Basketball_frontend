import React, { useState } from 'react'
import './Media.css'


function Media() {
const [activeCategory, setActiveCategory] = useState('all')

const handleCategoryClick = (category) => {
  setActiveCategory(category)
}
  return (
    <>
    <div className="categories">
      <section className="category-section">
        <button className={`category ${activeCategory === 'all' ? 'active' : ''}`}
          onClick={() => handleCategoryClick('all')}>
          All
        </button>
        <button className={`category ${activeCategory === 'basketball' ? 'active' : ''}`}
          onClick={() => handleCategoryClick('basketball')}>
          Basketball
        </button>
        <button className={`category ${activeCategory === 'tennis' ? 'active' : ''}`}
          onClick={() => handleCategoryClick('tennis')}>
          Tennis
        </button>
        <button className={`category ${activeCategory === 'volleyball' ? 'active' : ''}`}
          onClick={() => handleCategoryClick('volleyball')}>
          Volleyball
        </button>
      </section>
    </div>
    <div className="media">
    {activeCategory === 'all' ? <>
      <section className="media-section">
          <h2 className="media-section-title" >
          Basketball
          </h2>
        <article className="media-container">
          <a href="#" className="thumbnail" data-duration="12:24">
            <img className="thumbnail-image" src="http://unsplash.it/250/150?gravity=center" />
          </a>
          <div className="media-bottom-section">
            <div className="media-details">
              <a href="#" className='media-title'>Media Title</a>
              <a href="#" className="media-description">Media Description</a>
            </div>
          </div>
        </article>
        <article className="media-container">
          <a href="#" className="thumbnail" data-duration="12:24">
            <img className="thumbnail-image" src="http://unsplash.it/250/150?gravity=center" />
          </a>
          <div className="media-bottom-section">
            <div className="media-details">
              <a href="#" className='media-title'>Media Title</a>
              <a href="#" className="media-description">Media Description</a>
            </div>
          </div>
        </article>
        <article className="media-container">
          <a href="#" className="thumbnail" data-duration="12:24">
            <img className="thumbnail-image" src="http://unsplash.it/250/150?gravity=center" />
          </a>
          <div className="media-bottom-section">
            <div className="media-details">
              <a href="#" className='media-title'>Media Title</a>
              <a href="#" className="media-description">Media Description</a>
            </div>
          </div>
        </article>
        <article className="media-container">
          <a href="#" className="thumbnail" data-duration="12:24">
            <img className="thumbnail-image" src="http://unsplash.it/250/150?gravity=center" />
          </a>
          <div className="media-bottom-section">
            <div className="media-details">
              <a href="#" className='media-title'>Media Title</a>
              <a href="#" className="media-description">Media Description</a>
            </div>
          </div>
        </article>
        <article className="media-container">
          <a href="#" className="thumbnail" data-duration="12:24">
            <img className="thumbnail-image" src="http://unsplash.it/250/150?gravity=center" />
          </a>
          <div className="media-bottom-section">
            <div className="media-details">
              <a href="#" className='media-title'>Media Title</a>
              <a href="#" className="media-description">Media Description</a>
            </div>
          </div>
        </article>
        <article className="media-container">
          <a href="#" className="thumbnail" data-duration="12:24">
            <img className="thumbnail-image" src="http://unsplash.it/250/150?gravity=center" />
          </a>
          <div className="media-bottom-section">
            <div className="media-details">
              <a href="#" className='media-title'>Media Title</a>
              <a href="#" className="media-description">Media Description</a>
            </div>
          </div>
        </article>
      </section>

      <section className="media-section">
        <h2 className="media-section-title">
          Tennis
        </h2>
        <article className="media-container">
          <a href="#" className="thumbnail" data-duration="12:24">
            <img className="thumbnail-image" src="http://unsplash.it/250/150?gravity=center" />
          </a>
          <div className="media-bottom-section">
            <div className="media-details">
              <a href="#" className='media-title'>Media Title</a>
              <a href="#" className="media-description">Media Description</a>
            </div>
          </div>
        </article>
        <article className="media-container">
          <a href="#" className="thumbnail" data-duration="12:24">
            <img className="thumbnail-image" src="http://unsplash.it/250/150?gravity=center" />
          </a>
          <div className="media-bottom-section">
            <div className="media-details">
              <a href="#" className='media-title'>Media Title</a>
              <a href="#" className="media-description">Media Description</a>
            </div>
          </div>
        </article>
        <article className="media-container">
          <a href="#" className="thumbnail" data-duration="12:24">
            <img className="thumbnail-image" src="http://unsplash.it/250/150?gravity=center" />
          </a>
          <div className="media-bottom-section">
            <div className="media-details">
              <a href="#" className='media-title'>Media Title</a>
              <a href="#" className="media-description">Media Description</a>
            </div>
          </div>
        </article>
        <article className="media-container">
          <a href="#" className="thumbnail" data-duration="12:24">
            <img className="thumbnail-image" src="http://unsplash.it/250/150?gravity=center" />
          </a>
          <div className="media-bottom-section">
            <div className="media-details">
              <a href="#" className='media-title'>Media Title</a>
              <a href="#" className="media-description">Media Description</a>
            </div>
          </div>
        </article>
        <article className="media-container">
          <a href="#" className="thumbnail" data-duration="12:24">
            <img className="thumbnail-image" src="http://unsplash.it/250/150?gravity=center" />
          </a>
          <div className="media-bottom-section">
            <div className="media-details">
              <a href="#" className='media-title'>Media Title</a>
              <a href="#" className="media-description">Media Description</a>
            </div>
          </div>
        </article>
        <article className="media-container">
          <a href="#" className="thumbnail" data-duration="12:24">
            <img className="thumbnail-image" src="http://unsplash.it/250/150?gravity=center" />
          </a>
          <div className="media-bottom-section">
            <div className="media-details">
              <a href="#" className='media-title'>Media Title</a>
              <a href="#" className="media-description">Media Description</a>
            </div>
          </div>
        </article>
      </section>

      <section className="media-section">
        <h2 className="media-section-title" >
          Volleyball
          </h2>
        <article className="media-container">
          <a href="#" className="thumbnail" data-duration="12:24">
            <img className="thumbnail-image" src="http://unsplash.it/250/150?gravity=center" />
          </a>
          <div className="media-bottom-section">
            <div className="media-details">
              <a href="#" className='media-title'>Media Title</a>
              <a href="#" className="media-description">Media Description</a>
            </div>
          </div>
        </article>
        <article className="media-container">
          <a href="#" className="thumbnail" data-duration="12:24">
            <img className="thumbnail-image" src="http://unsplash.it/250/150?gravity=center" />
          </a>
          <div className="media-bottom-section">
            <div className="media-details">
              <a href="#" className='media-title'>Media Title</a>
              <a href="#" className="media-description">Media Description</a>
            </div>
          </div>
        </article>
        <article className="media-container">
          <a href="#" className="thumbnail" data-duration="12:24">
            <img className="thumbnail-image" src="http://unsplash.it/250/150?gravity=center" />
          </a>
          <div className="media-bottom-section">
            <div className="media-details">
              <a href="#" className='media-title'>Media Title</a>
              <a href="#" className="media-description">Media Description</a>
            </div>
          </div>
        </article>
        <article className="media-container">
          <a href="#" className="thumbnail" data-duration="12:24">
            <img className="thumbnail-image" src="http://unsplash.it/250/150?gravity=center" />
          </a>
          <div className="media-bottom-section">
            <div className="media-details">
              <a href="#" className='media-title'>Media Title</a>
              <a href="#" className="media-description">Media Description</a>
            </div>
          </div>
        </article>
        <article className="media-container">
          <a href="#" className="thumbnail" data-duration="12:24">
            <img className="thumbnail-image" src="http://unsplash.it/250/150?gravity=center" />
          </a>
          <div className="media-bottom-section">
            <div className="media-details">
              <a href="#" className='media-title'>Media Title</a>
              <a href="#" className="media-description">Media Description</a>
            </div>
          </div>
        </article>
        <article className="media-container">
          <a href="#" className="thumbnail" data-duration="12:24">
            <img className="thumbnail-image" src="http://unsplash.it/250/150?gravity=center" />
          </a>
          <div className="media-bottom-section">
            <div className="media-details">
              <a href="#" className='media-title'>Media Title</a>
              <a href="#" className="media-description">Media Description</a>
            </div>
          </div>
        </article>
      </section>
      
      </> : <>

      <section className="media-section">
          <h2 className={`media-section-title ${activeCategory !== 'basketball' ? 'hidden' : ''}`}>
          Basketball
          </h2>
        {activeCategory === 'basketball' && (
          <>
        <article className="media-container">
          <a href="#" className="thumbnail" data-duration="12:24">
            <img className="thumbnail-image" src="http://unsplash.it/250/150?gravity=center" />
          </a>
          <div className="media-bottom-section">
            <div className="media-details">
              <a href="#" className='media-title'>Media Title</a>
              <a href="#" className="media-description">Media Description</a>
            </div>
          </div>
        </article>
        <article className="media-container">
          <a href="#" className="thumbnail" data-duration="12:24">
            <img className="thumbnail-image" src="http://unsplash.it/250/150?gravity=center" />
          </a>
          <div className="media-bottom-section">
            <div className="media-details">
              <a href="#" className='media-title'>Media Title</a>
              <a href="#" className="media-description">Media Description</a>
            </div>
          </div>
        </article>
        <article className="media-container">
          <a href="#" className="thumbnail" data-duration="12:24">
            <img className="thumbnail-image" src="http://unsplash.it/250/150?gravity=center" />
          </a>
          <div className="media-bottom-section">
            <div className="media-details">
              <a href="#" className='media-title'>Media Title</a>
              <a href="#" className="media-description">Media Description</a>
            </div>
          </div>
        </article>
        <article className="media-container">
          <a href="#" className="thumbnail" data-duration="12:24">
            <img className="thumbnail-image" src="http://unsplash.it/250/150?gravity=center" />
          </a>
          <div className="media-bottom-section">
            <div className="media-details">
              <a href="#" className='media-title'>Media Title</a>
              <a href="#" className="media-description">Media Description</a>
            </div>
          </div>
        </article>
        <article className="media-container">
          <a href="#" className="thumbnail" data-duration="12:24">
            <img className="thumbnail-image" src="http://unsplash.it/250/150?gravity=center" />
          </a>
          <div className="media-bottom-section">
            <div className="media-details">
              <a href="#" className='media-title'>Media Title</a>
              <a href="#" className="media-description">Media Description</a>
            </div>
          </div>
        </article>
        <article className="media-container">
          <a href="#" className="thumbnail" data-duration="12:24">
            <img className="thumbnail-image" src="http://unsplash.it/250/150?gravity=center" />
          </a>
          <div className="media-bottom-section">
            <div className="media-details">
              <a href="#" className='media-title'>Media Title</a>
              <a href="#" className="media-description">Media Description</a>
            </div>
          </div>
        </article>
        </> )}
      </section>

      <section className="media-section">
        <h2 className={`media-section-title ${activeCategory !== 'tennis' ? 'hidden' : ''}`}>
          Tennis
        </h2>
        {activeCategory === 'tennis' && (
        <>
        <article className="media-container">
          <a href="#" className="thumbnail" data-duration="12:24">
            <img className="thumbnail-image" src="http://unsplash.it/250/150?gravity=center" />
          </a>
          <div className="media-bottom-section">
            <div className="media-details">
              <a href="#" className='media-title'>Media Title</a>
              <a href="#" className="media-description">Media Description</a>
            </div>
          </div>
        </article>
        <article className="media-container">
          <a href="#" className="thumbnail" data-duration="12:24">
            <img className="thumbnail-image" src="http://unsplash.it/250/150?gravity=center" />
          </a>
          <div className="media-bottom-section">
            <div className="media-details">
              <a href="#" className='media-title'>Media Title</a>
              <a href="#" className="media-description">Media Description</a>
            </div>
          </div>
        </article>
        <article className="media-container">
          <a href="#" className="thumbnail" data-duration="12:24">
            <img className="thumbnail-image" src="http://unsplash.it/250/150?gravity=center" />
          </a>
          <div className="media-bottom-section">
            <div className="media-details">
              <a href="#" className='media-title'>Media Title</a>
              <a href="#" className="media-description">Media Description</a>
            </div>
          </div>
        </article>
        <article className="media-container">
          <a href="#" className="thumbnail" data-duration="12:24">
            <img className="thumbnail-image" src="http://unsplash.it/250/150?gravity=center" />
          </a>
          <div className="media-bottom-section">
            <div className="media-details">
              <a href="#" className='media-title'>Media Title</a>
              <a href="#" className="media-description">Media Description</a>
            </div>
          </div>
        </article>
        <article className="media-container">
          <a href="#" className="thumbnail" data-duration="12:24">
            <img className="thumbnail-image" src="http://unsplash.it/250/150?gravity=center" />
          </a>
          <div className="media-bottom-section">
            <div className="media-details">
              <a href="#" className='media-title'>Media Title</a>
              <a href="#" className="media-description">Media Description</a>
            </div>
          </div>
        </article>
        <article className="media-container">
          <a href="#" className="thumbnail" data-duration="12:24">
            <img className="thumbnail-image" src="http://unsplash.it/250/150?gravity=center" />
          </a>
          <div className="media-bottom-section">
            <div className="media-details">
              <a href="#" className='media-title'>Media Title</a>
              <a href="#" className="media-description">Media Description</a>
            </div>
          </div>
        </article>
        </>
        )}
      </section>

      <section className="media-section">
        <h2 className={`media-section-title ${activeCategory !== 'volleyball' ? 'hidden' : ''}`}>
          Volleyball
          </h2>
          {activeCategory === 'volleyball' && (
            <>
        <article className="media-container">
          <a href="#" className="thumbnail" data-duration="12:24">
            <img className="thumbnail-image" src="http://unsplash.it/250/150?gravity=center" />
          </a>
          <div className="media-bottom-section">
            <div className="media-details">
              <a href="#" className='media-title'>Media Title</a>
              <a href="#" className="media-description">Media Description</a>
            </div>
          </div>
        </article>
        <article className="media-container">
          <a href="#" className="thumbnail" data-duration="12:24">
            <img className="thumbnail-image" src="http://unsplash.it/250/150?gravity=center" />
          </a>
          <div className="media-bottom-section">
            <div className="media-details">
              <a href="#" className='media-title'>Media Title</a>
              <a href="#" className="media-description">Media Description</a>
            </div>
          </div>
        </article>
        <article className="media-container">
          <a href="#" className="thumbnail" data-duration="12:24">
            <img className="thumbnail-image" src="http://unsplash.it/250/150?gravity=center" />
          </a>
          <div className="media-bottom-section">
            <div className="media-details">
              <a href="#" className='media-title'>Media Title</a>
              <a href="#" className="media-description">Media Description</a>
            </div>
          </div>
        </article>
        <article className="media-container">
          <a href="#" className="thumbnail" data-duration="12:24">
            <img className="thumbnail-image" src="http://unsplash.it/250/150?gravity=center" />
          </a>
          <div className="media-bottom-section">
            <div className="media-details">
              <a href="#" className='media-title'>Media Title</a>
              <a href="#" className="media-description">Media Description</a>
            </div>
          </div>
        </article>
        <article className="media-container">
          <a href="#" className="thumbnail" data-duration="12:24">
            <img className="thumbnail-image" src="http://unsplash.it/250/150?gravity=center" />
          </a>
          <div className="media-bottom-section">
            <div className="media-details">
              <a href="#" className='media-title'>Media Title</a>
              <a href="#" className="media-description">Media Description</a>
            </div>
          </div>
        </article>
        <article className="media-container">
          <a href="#" className="thumbnail" data-duration="12:24">
            <img className="thumbnail-image" src="http://unsplash.it/250/150?gravity=center" />
          </a>
          <div className="media-bottom-section">
            <div className="media-details">
              <a href="#" className='media-title'>Media Title</a>
              <a href="#" className="media-description">Media Description</a>
            </div>
          </div>
        </article>
          </>
          )}
      </section>
    </>
}
    </div>
    </>
  )
}

export default Media
