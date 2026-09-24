import React, { useState } from 'react';
import "../styles/Carousel.css";

// https://www.youtube.com/embed/<id>?si=... -> <id>
const youTubeId = (url) => url.split('/embed/')[1]?.split('?')[0] ?? '';


const Carousel = ({ media, title = 'project' }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    // Single-item projects render no chrome at all
    const hasChrome = media.length > 1;
    const current = media[currentIndex];
    const isImage = current.type === 'image';

    const changeImage = (direction) =>
    {
        setCurrentIndex((prevIndex) =>
        {
            const totalMedia = media.length;
            return (prevIndex + direction + totalMedia) % totalMedia;
        });
    };


    return (
        <div className="carouselContainer">
            <div className="carouselMedia">
                {/*
                  Only the slide is re-keyed, so the arrows survive a change and
                  keyboard focus stays put while paging.
                */}
                <div
                    key={currentIndex}
                    className="carouselSlide carouselFade"
                    style={isImage ? { backgroundImage: `url(${current.url})` } : undefined}
                    role={isImage ? 'img' : undefined}
                    aria-label={isImage ? `${title} — screenshot ${currentIndex + 1} of ${media.length}` : undefined}
                >
                    {!isImage && <VideoSlide url={current.url} title={title} />}
                </div>

                {hasChrome && (
                    <>
                        <button
                            type="button"
                            className="carouselBtn carouselBtnLeft"
                            onClick={() => changeImage(-1)}
                            aria-label="Previous image"
                        >
                            <svg width="7" height="11" viewBox="0 0 7 11" fill="none" aria-hidden="true">
                                <path d="M6 1L1 5.5L6 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                        <button
                            type="button"
                            className="carouselBtn carouselBtnRight"
                            onClick={() => changeImage(1)}
                            aria-label="Next image"
                        >
                            <svg width="7" height="11" viewBox="0 0 7 11" fill="none" aria-hidden="true">
                                <path d="M1 1L6 5.5L1 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                        <span className="carouselCounter" aria-live="polite">
                            {currentIndex + 1} / {media.length}
                        </span>
                    </>
                )}
            </div>

            {hasChrome && (
                <div className="carouselIndicators">
                    {media.map((item, index) => (
                        <button
                            key={item.url}
                            type="button"
                            onClick={() => setCurrentIndex(index)}
                            className={`carouselIndicator ${currentIndex === index ? 'active' : ''}`}
                            aria-label={`Go to image ${index + 1}`}
                            aria-current={currentIndex === index}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};


/*
  Video slides show YouTube's own poster until asked to play. Embedding the
  iframe up front pulls roughly a megabyte of player script, and since the
  trailer is the first item on every project that has one, it was loading the
  moment a project opened. State resets by itself because the parent slide is
  keyed on the index and remounts on every change.
*/
const VideoSlide = ({ url, title }) => {
    const [playing, setPlaying] = useState(false);
    const id = youTubeId(url);

    if (playing) {
        return (
            <iframe
                className="carouselEmbed"
                src={`${url}${url.includes('?') ? '&' : '?'}autoplay=1`}
                title={`${title} video`}
                frameBorder="0"
                allow="autoplay; encrypted-media"
                allowFullScreen
            />
        );
    }

    return (
        <button
            type="button"
            className="carouselPoster"
            style={{ backgroundImage: `url(https://img.youtube.com/vi/${id}/hqdefault.jpg)` }}
            onClick={() => setPlaying(true)}
            aria-label={`Play the ${title} video`}
        >
            <span className="carouselPlay" aria-hidden="true">
                <svg width="16" height="18" viewBox="0 0 16 18" fill="none">
                    <path d="M2 1.5L14.5 9L2 16.5V1.5Z" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
                </svg>
            </span>
        </button>
    );
};


export default Carousel;
