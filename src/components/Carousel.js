import React, { useState } from 'react';
import "../styles/Carousel.css";

const Carousel = ({ media }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const changeImage = (direction) => 
    {
        setCurrentIndex((prevIndex) => 
        {
            const totalMedia = media.length;
            return (prevIndex + direction + totalMedia) % totalMedia; // Loop index
        });
    };
    

    return (
        <>
            {/* Container */}
            <div className="carouselContainer">
                {/* Left Button */}
                <button onClick={() => changeImage(-1)} className="carouselButton">◀</button>
                {/* Media Item Swaps based on img or embed */}
                <div className="carouselMedia">
                    {media[currentIndex].type === 'image' ? (
                        <img
                            className="carouselImage"
                            src={media[currentIndex].url}
                            alt={`Carousel Media ${currentIndex}`}
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
                </div>
                {/* Right Button */}
                <button onClick={() => changeImage(1)} className="carouselButton">▶</button>
            </div>
            
            {/* Thumbnail icon media buttons */}
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
                                {/* Embedded YouTube Thumbnail Setup */}
                                <img
                                    src={`https://img.youtube.com/vi/${item.url
                                        .split('/')
                                        .pop()
                                        .split('?')[0]}/hqdefault.jpg`}
                                    alt={`Video Thumbnail ${index}`}
                                    className="mediaIcon"
                                />
                                {/* Video Play Overlay Icon */}
                                <span className="playButton">▶️</span>
                            </div>
                        )}
                    </button>
                ))}
            </div>
        </>
    );
};


export default Carousel;