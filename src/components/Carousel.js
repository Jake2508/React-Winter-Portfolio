import React, { useState } from 'react';
import "../styles/Carousel.css";

const Carousel = ({ media }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const changeImage = (direction) =>
    {
        setCurrentIndex((prevIndex) =>
        {
            const totalMedia = media.length;
            return (prevIndex + direction + totalMedia) % totalMedia;
        });
    };


    return (
        <>
            {/* Main media with overlaid nav arrows */}
            <div className="carouselContainer">
                <div className="carouselMedia">
                    {media[currentIndex].type === 'image' ? (
                        <img
                            className="carouselImage"
                            src={media[currentIndex].url}
                            alt={`Media ${currentIndex}`}
                        />
                    ) : (
                        <iframe
                            className="carouselEmbed"
                            src={media[currentIndex].url}
                            title={`Video ${currentIndex}`}
                            frameBorder="0"
                            allow="autoplay; encrypted-media"
                            allowFullScreen
                        />
                    )}
                    {media.length > 1 && (
                        <>
                            <button className="carouselBtn carouselBtnLeft" onClick={() => changeImage(-1)}>❮</button>
                            <button className="carouselBtn carouselBtnRight" onClick={() => changeImage(1)}>❯</button>
                        </>
                    )}
                </div>
            </div>

            {/* Thumbnail strip */}
            {media.length > 1 && (
                <div className="mediaButtons">
                    {media.map((item, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentIndex(index)}
                            className={`mediaButton ${currentIndex === index ? 'active' : ''}`}
                        >
                            {item.type === 'image' ? (
                                <img
                                    src={item.url}
                                    alt={`Thumbnail ${index}`}
                                    className="mediaIcon"
                                />
                            ) : (
                                <div className="videoThumbnail">
                                    <img
                                        src={`https://img.youtube.com/vi/${item.url.split('/').pop().split('?')[0]}/hqdefault.jpg`}
                                        alt={`Video Thumbnail ${index}`}
                                        className="mediaIcon"
                                    />
                                    <span className="playButton">▶</span>
                                </div>
                            )}
                        </button>
                    ))}
                </div>
            )}
        </>
    );
};


export default Carousel;
