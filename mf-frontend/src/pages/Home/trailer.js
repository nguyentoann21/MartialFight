import React, { useState, useRef, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import './trailer.scss';

const Trailer = () => {
    const handleVideoEnd = (event) => {
        event.target.currentTime = 0;
        event.target.play();
    };

    const [currentSlide, setCurrentSlide] = useState(0);
    const slides = [
        {
            trailerUrl: '/assets/videos/trailer1.mp4',
            caption: 'Trailer 1'
        },
        {
            trailerUrl: '/assets/videos/trailer2.mp4',
            caption: 'Trailer 2'
        },
        {
            trailerUrl: '/assets/videos/trailer3.mp4',
            caption: 'Trailer 3'
        }
    ];

    const [preloadSrc, setPreloadSrc] = useState(null);
    const videoRef = useRef(null);

    useEffect(() => {
        if (preloadSrc) {
            videoRef.current.src = preloadSrc;
            videoRef.current.play();
            setPreloadSrc(null);
        }
    }, [preloadSrc]);

    const prevSlide = () => {
        const prevIndex = currentSlide === 0 ? slides.length - 1 : currentSlide - 1;
        setPreloadSrc(slides[prevIndex].trailerUrl);
        setCurrentSlide(prevIndex);
    };
    
    const nextSlide = () => {
        const nextIndex = currentSlide === slides.length - 1 ? 0 : currentSlide + 1;
        setPreloadSrc(slides[nextIndex].trailerUrl);
        setCurrentSlide(nextIndex);
    };
    
    return (
        <div className='trailer-container'>
            <div className='trailer-content'>
                <div className='prev-trailer' onClick={prevSlide}><FaChevronLeft /></div>
                <video ref={videoRef} controls autoPlay muted onEnded={handleVideoEnd} width='100%' height='auto'>
                    <source src={slides[currentSlide].trailerUrl} type='video/mp4'/>
                </video> 
                <div className='next-trailer' onClick={nextSlide}><FaChevronRight /></div>
            </div>
        </div>
    );
}

export default Trailer;
