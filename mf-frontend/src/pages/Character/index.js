import React, { useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import "./character.scss";

const characters = [
  {
    title: "Character One",
    description:
      "Lorem ipsum dolor sit amet, consectetur adip e partur de sort aliquet et just sed diam non pro",
    image: "/assets/images/character.png",
    bgColor: "#6ce3f2",
    target: "Oneshopee",
    housing: "30",
    movement: "13",
    attack: "3s",
    training: "6m",
  },
  {
    title: "Character Two",
    description:
      "Lorem ipsum dolor sit amet, consectetur adip e partur de sort aliquet et just sed diam non pro",
    image: "/assets/images/logo.jpg",
    bgColor: "#7b5ed4",
    target: "TwoShopee",
    housing: "50",
    movement: "30",
    attack: "1s",
    training: "6m",
  },
  {
    title: "Character Three",
    description:
      "Lorem ipsum dolor sit amet, consectetur adip e partur de sort aliquet et just sed diam non pro",
    image: "/assets/images/cups.png",
    bgColor: "#6ce3f2",
    target: "Oneshopee",
    housing: "30",
    movement: "13",
    attack: "3s",
    training: "6m",
  },
  {
    title: "Character Four",
    description:
      "Lorem ipsum dolor sit amet, consectetur adip e partur de sort aliquet et just sed diam non pro",
    image: "/assets/images/forgot-success.jpg",
    bgColor: "#7b5ed4",
    target: "TwoShopee",
    housing: "50",
    movement: "30",
    attack: "1s",
    training: "6m",
  },
  {
    title: "Character Five",
    description:
      "Lorem ipsum dolor sit amet, consectetur adip e partur de sort aliquet et just sed diam non pro",
    image: "/assets/images/logo.jpg",
    bgColor: "#6ce3f2",
    target: "Oneshopee",
    housing: "Oneshopee",
    movement: "Oneshopee",
    attack: "Oneshopee",
    training: "Oneshopee",
  },
  {
    title: "Character Six",
    description:
      "Lorem ipsum dolor sit amet, consectetur adip e partur de sort aliquet et just sed diam non pro",
    image: "/assets/images/bling.png",
    bgColor: "#7b5ed4",
    target: "TwoShopee",
    housing: "50",
    movement: "30",
    attack: "1s",
    training: "6m",
  },
];

const Character = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrevClick = () => {
    setCurrentIndex((prevIndex) => prevIndex - 1);
  };

  const handleNextClick = () => {
    setCurrentIndex((prevIndex) => prevIndex + 1);
  };

  const activeCharacter = characters[currentIndex];

  return (
    <div className="character-container">
      <div className="character-main">
        <div className="character-bg-wrapper">
          {characters.map((character, index) => (
            <img
              key={index}
              src={character.image}
              alt=""
              className={`character-bg ${
                index === currentIndex ? "active" : ""
              }`}
            />
          ))}
        </div>
        <div className="character-content">
          <div className="character-inner">
            <span className="character-line"></span>
            {characters.map((_, index) => (
              <span
                key={index}
                className={`character-number ${
                  index === currentIndex ? "active" : ""
                }`}
              ></span>
            ))}
          </div>

          <div className="character-control">
            <button
              className="prev"
              onClick={handlePrevClick}
              disabled={currentIndex === 0}
            >
              <FaArrowLeft />
            </button>
            <button
              className="next"
              onClick={handleNextClick}
              disabled={currentIndex === characters.length - 1}
            >
              <FaArrowRight />
            </button>
          </div>

          <div className="content-wrapper">
            <div className="content-main active">
              <h1 className="character-name">{activeCharacter.title}</h1>
              <div className="character-description">
                <p>{activeCharacter.description}</p>
              </div>
              <ul className="properties">
                <li>
                  <span className="character-icon">
                    <img src="/assets/images/logo.jpg" alt="" />
                  </span>
                  <span>{activeCharacter.target}</span>
                </li>
                <li>
                  <span class="character-icon">
                    <img src="/assets/images/logo.jpg" alt="" />
                  </span>
                  <span>{activeCharacter.housing}</span>
                </li>
                <li>
                  <span class="character-icon">
                    <img src="/assets/images/logo.jpg" alt="" />
                  </span>
                  <span>{activeCharacter.movement}</span>
                </li>
                <li>
                  <span class="character-icon">
                    <img src="/assets/images/logo.jpg" alt="" />
                  </span>
                  <span>{activeCharacter.attack}</span>
                </li>
              </ul>
              <div className="character-button-details">
                <button>More Details</button>
              </div>
            </div>
            <div className="slide-container">
              <div className="slide-wrapper">
                <div className="slide">
                  {characters.map((character, index) => (
                    <div
                      key={index}
                      className={`item-wrapper ${
                        index === currentIndex ? "active" : ""
                      }`}
                      style={{ "--bg": character.bgColor }}
                    >
                      <div className="item-content">
                        <img src={character.image} alt="" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Character;
