import React, { useState } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import './monster.scss';

const monsters = [
  {
    title: 'Monster One',
    description:
      'Lorem ipsum dolor sit amet, consectetur adip e partur de sort aliquet et just sed diam non pro',
    image: '/assets/images/i1.png',
    bgColor: '#6ce3f2',
    target: 'Oneshopee',
    housing: 'Oneshopee',
    movement: 'Oneshopee',
    attack: 'Oneshopee',
    training: '6m',
  },
  {
    title: 'Monster Two',
    description:
      'Lorem ipsum dolor sit amet, consectetur adip e partur de sort aliquet et just sed diam non pro',
    image: '/assets/images/i2.png',
    bgColor: '#7b5ed4',
    target: 'TwoShopee',
    housing: 'TwoShopee',
    movement: 'TwoShopee',
    attack: 'TwoShopee',
    training: '6m',
  },
  {
    title: 'Monster Three',
    description:
      'Lorem ipsum dolor sit amet, consectetur adip e partur de sort aliquet et just sed diam non pro',
    image: '/assets/images/i3.png',
    bgColor: '#6ce3f2',
    target: 'Threeshopee',
    housing: 'Threeshopee',
    movement: 'Threeshopee',
    attack: 'Threeshopee',
    training: '6m',
  },
  {
    title: 'Monster Four',
    description:
      'Lorem ipsum dolor sit amet, consectetur adip e partur de sort aliquet et just sed diam non pro',
    image: '/assets/images/i4.png',
    bgColor: '#7b5ed4',
    target: 'FourShopee',
    housing: 'FourShopee',
    movement: 'FourShopee',
    attack: 'FourShopee',
    training: '6m',
  },
  {
    title: 'Monster Five',
    description:
      'Lorem ipsum dolor sit amet, consectetur adip e partur de sort aliquet et just sed diam non pro',
    image: '/assets/images/i5.png',
    bgColor: '#6ce3f2',
    target: 'Fiveshopee',
    housing: 'Fiveshopee',
    movement: 'Fiveshopee',
    attack: 'Fiveshopee',
    training: 'Fiveshopee',
  },
  {
    title: 'Monster Six',
    description:
      'Lorem ipsum dolor sit amet, consectetur adip e partur de sort aliquet et just sed diam non pro',
    image: '/assets/images/i3.png',
    bgColor: '#7b5ed4',
    target: 'Sixshopee',
    housing: 'Sixshopee',
    movement: 'Sixshopee',
    attack: 'Sixshopee',
    training: '6m',
  },
  {
    title: 'Monster Seven',
    description:
      'Lorem ipsum dolor sit amet, consectetur adip e partur de sort aliquet et just sed diam non pro',
    image: '/assets/images/i3.png',
    bgColor: '#6ce3f2',
    target: 'Sevenshopee',
    housing: 'Sevenshopee',
    movement: 'Sevenshopee',
    attack: 'Sevenshopee',
    training: '6m',
  },
  {
    title: 'Monster Eight',
    description:
      'Lorem ipsum dolor sit amet, consectetur adip e partur de sort aliquet et just sed diam non pro',
    image: '/assets/images/i4.png',
    bgColor: '#7b5ed4',
    target: 'EightShopee',
    housing: 'EightShopee',
    movement: 'EightShopee',
    attack: 'EightShopee',
    training: '6m',
  },
  {
    title: 'Monster Nine',
    description:
      'Lorem ipsum dolor sit amet, consectetur adip e partur de sort aliquet et just sed diam non pro',
    image: '/assets/images/i5.png',
    bgColor: '#6ce3f2',
    target: 'Nineshopee',
    housing: 'Nineshopee',
    movement: 'Nineshopee',
    attack: 'Nineshopee',
    training: 'Nineshopee',
  },
  {
    title: 'Monster Ten',
    description:
      'Lorem ipsum dolor sit amet, consectetur adip e partur de sort aliquet et just sed diam non pro',
    image: '/assets/images/i3.png',
    bgColor: '#7b5ed4',
    target: 'Tenshopee',
    housing: 'Tenshopee',
    movement: 'Tenshopee',
    attack: 'Tenshopee',
    training: '6m',
  }
];

const Monster = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrevClick = () => {
    setCurrentIndex((prevIndex) => prevIndex - 1);
  };

  const handleNextClick = () => {
    setCurrentIndex((prevIndex) => prevIndex + 1);
  };

  const activemonster = monsters[currentIndex];

  return (
    <div className='monster-container'>
      <div className='monster-main'>
        <div className='monster-bg-wrapper'>
          {monsters.map((monster, index) => (
            <img
              key={index}
              src={monster.image}
              alt='1'
              className={`monster-bg ${index === currentIndex ? 'active' : ''}`}
            />
          ))}
        </div>
        <div className='monster-content'>
          {monsters.length > 11 ? (
            <div className='hidden-inner'></div>
          ) : (
            <div className='monster-inner'>
              <span className='monster-line'></span>
              {monsters.map((_, index) => (
                <span
                  key={index}
                  className={`monster-number ${
                    index === currentIndex ? 'active' : ''
                  }`}
                ></span>
              ))}
            </div>
          )}

          <div className='monster-control'>
            <button
              className='prev'
              onClick={handlePrevClick}
              disabled={currentIndex === 0}
            >
              <FaArrowLeft />
            </button>
            <button
              className='next'
              onClick={handleNextClick}
              disabled={currentIndex === monsters.length - 1}
            >
              <FaArrowRight />
            </button>
          </div>

          <div className='content-wrapper'>
            <div className='content-main active'>
              <h1 className='monster-name'>{activemonster.title}</h1>
              <div className='monster-description'>
                <p>{activemonster.description}</p>
              </div>
              <ul className='properties'>
                <li className="monster-skill">
                  <span>{activemonster.target}</span>
                  <span className='monster-icon'>
                    <img src='/assets/images/logo.jpg' alt='1' />
                  </span>
                </li>
                <li className="monster-skill">
                  <span>{activemonster.housing}</span>
                  <span class='monster-icon'>
                    <img src='/assets/images/logo.jpg' alt='1' />
                  </span>
                </li>
                <li className="monster-skill">
                  <span>{activemonster.movement}</span>
                  <span class='monster-icon'>
                    <img src='/assets/images/logo.jpg' alt='1' />
                  </span>
                </li>
                <li className="monster-skill">
                  <span>{activemonster.attack}</span>
                  <span class='monster-icon'>
                    <img src='/assets/images/logo.jpg' alt='1' />
                  </span>
                </li>
              </ul>
              <div className='monster-button-details'>
                <button>More Details</button>
              </div>
            </div>

            <div className='slide-container'>
              {monsters.map((monster, index) => (
                <div
                  key={index}
                  className={`slide-content-wrapper ${
                    index === currentIndex ? 'active' : ''
                  }`}
                  style={{ '--bg': monster.bgColor }}
                >
                  <div className='item-image'>
                    <img src={monster.image} alt={monster.image} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Monster;
