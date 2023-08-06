import React, { useEffect, useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import axios from "axios";
import "./character.scss";

const MainCharacter = () => {
  const [characters, setCharacters] = useState([]);
  const [sects, setSects] = useState([]);
  const [characterSkill, setCharacterSkill] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [selectedCharacter, setSelectedCharacter] = useState(null);

  const handlePrevClick = () => {
    setCurrentIndex((prevIndex) => prevIndex - 1);
  };

  const handleNextClick = () => {
    setCurrentIndex((prevIndex) => prevIndex + 1);
  };

  const loadCharacter = async () => {
    try {
      const response = await axios.get(
        "https://localhost:7052/api/mf/characters"
      );

      setCharacters(
        response.data.map((character) => {
          return {
            ...character,
            image: character.image ? character.image : null,
          };
        })
      );
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadCharacter();
  }, []);

  useEffect(() => {
    const fetchSects = async () => {
      try {
        const response = await axios.get("https://localhost:7052/api/mf/sects");
        setSects(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchSects();
  }, []);

  const handleDialogOpen = (character) => {
    setSelectedCharacter(character);
    setDialogOpen(true);
  };

  useEffect(() => {
    const fetchCharacterSkill = async () => {
      try {
        if (
          characters.length > 0 &&
          currentIndex >= 0 &&
          currentIndex < characters.length
        ) {
          const currentCharacterID = characters[currentIndex].characterID;
          const response = await axios.get(
            `https://localhost:7052/api/mf/character-skill/${currentCharacterID}/skills`
          );
          setCharacterSkill(response.data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchCharacterSkill();
  }, [characters, currentIndex]);

  return (
    <>
      {characters.length === 0 ? (
        <div className="character-empty">
          <span>No character was found</span>
        </div>
      ) : (
        <>
          <div className="character-container">
            <div className="character-main">
              <div className="character-content">
                {characters.length > 11 ? (
                  <div className="hidden-inner"></div>
                ) : (
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
                )}

                {characters.length > 1 && (
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
                )}

                <div className="content-wrapper">
                  <div className="content-main active">
                    <h1 className="character-name">
                      {characters[currentIndex]?.characterName}
                    </h1>
                    <div className="character-description">
                      <p>{characters[currentIndex]?.characterDescription}</p>
                    </div>
                    <ul className="properties">
                      {characterSkill.map((skill) => (
                        <li key={skill.skillID} className="character-skill">
                          <span className="character-icon">
                            <img
                              src={`https://localhost:7052/${skill.image}`}
                              alt="skill-img"
                            />
                          </span>
                          <span>{skill.skillName}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="character-button-details">
                      <button
                        onClick={() =>
                          handleDialogOpen(characters[currentIndex])
                        }
                      >
                        More Details
                      </button>
                    </div>
                  </div>
                  <div className="slide-container">
                    {characters.map((character, index) => (
                      <div
                        key={index}
                        className={`slide-content-wrapper ${
                          index === currentIndex ? "active" : ""
                        }`}
                        style={{ "--bg": character.bgColor }}
                      >
                        <div className="item-image">
                          <img
                            src={`https://localhost:7052/${character.image}`}
                            alt={character.characterName}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {isDialogOpen && selectedCharacter && (
            <div className="dialog-view-container">
              <div className="dialog-view-main-content">
                <div className="dialog-view-content">
                  <h3>View {selectedCharacter.characterName}</h3>
                  <div className="dialog-view-main">
                    <div className="dialog-main-top">
                      <div className="dialog-view-images">
                        {selectedCharacter.image && (
                          <img
                            src={`https://localhost:7052/${selectedCharacter.image}`}
                            alt="character-img"
                          />
                        )}
                      </div>
                      <div className="dialog-view-main">
                        <h4>
                          <span>{selectedCharacter.characterName}</span>
                        </h4>
                        <p>
                          Sect -{" "}
                          {selectedCharacter.sectID && (
                            <span>
                              {sects.find(
                                (sect) =>
                                  sect.sectID === selectedCharacter.sectID
                              )?.sectName || ""}
                            </span>
                          )}
                        </p>
                        <h5>
                          <span> {selectedCharacter.characterDescription}</span>
                        </h5>
                      </div>
                    </div>
                    <div className="dialog-main-bottom">
                      {characterSkill.map((skill) => (
                        <div className="dialog-main-skill" key={skill.skillID}>
                          <img
                            src={`https://localhost:7052/${skill.image}`}
                            alt="skill-img"
                          />
                          <div className="skill-main">
                            <h6>{skill.skillName}</h6>
                            <span>{skill.skillDescription}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="dialog-view-button">
                    <button onClick={() => setDialogOpen(false)}>Close</button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default MainCharacter;
