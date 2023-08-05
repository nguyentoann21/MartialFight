import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  FaAngleLeft,
  FaAngleRight,
  FaAngleDoubleLeft,
  FaAngleDoubleRight,
  FaSearch,
  FaSyncAlt,
  FaEye,
} from "react-icons/fa";
import "./adminCharacters.scss";

const AdminCharacter = () => {
  const account = JSON.parse(localStorage.getItem("ADMIN_DATA"));
  const history = useNavigate();

  useEffect(() => {
    if (!account) {
      history("/");
    }
  }, [account, history]);

  const CHARACTER_PER_PAGE = 10;
  const [characters, setCharacters] = useState([]);
  const [characterSkill, setCharacterSkill] = useState([]);
  const [sects, setSects] = useState([]);
  const [currentCharacter, setCurrentCharacter] = useState({
    characterName: "",
    description: "",
    gender: "",
    image: null,
    attackValue: "",
    defenseValue: "",
    speedValue: "",
    intellectValue: "",
    physicalValue: "",
    sectID: "",
  });

  const [viewDialogVisible, setViewDialogVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [messageSearch, setMessageSearch] = useState("");
  const [originalCharacter, setOriginalCharacter] = useState([]);
  const [sortType, setSortType] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredCharacter, setFilteredCharacter] = useState([]);
  const startIndex = (currentPage - 1) * CHARACTER_PER_PAGE;
  const endIndex = startIndex + CHARACTER_PER_PAGE;
  const currentCharacterPage = filteredCharacter.slice(startIndex, endIndex);

  useEffect(() => {
    setFilteredCharacter(characters);
  }, [characters, searchTerm]);

  useEffect(() => {
    return () => {
      if (currentCharacter.image && currentCharacter.image[0]) {
        window.URL.revokeObjectURL(currentCharacter.image[0]);
      }
    };
  }, [currentCharacter.image]);

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
      setOriginalCharacter(
        response.data.map((character) => {
          return {
            ...character,
            image: character.image ? character.image : null,
          };
        })
      );
      setFilteredCharacter(
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
    const fetchCharacters = async () => {
      try {
        const response = await axios.get(
          "https://localhost:7052/api/mf/characters"
        );
        setCharacters(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchSects = async () => {
      try {
        const response = await axios.get("https://localhost:7052/api/mf/sects");
        setSects(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCharacters();
    fetchSects();
  }, []);

  const handleDialogOpen = async (character) => {
    setCurrentCharacter(character);
    setViewDialogVisible(true);

    try {
      const response = await axios.get(
        `https://localhost:7052/api/mf/character-skill/${character.characterID}/skills`
      );
      setCharacterSkill(response.data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const closeViewDialog = () => {
    setViewDialogVisible(false);
  };

  const handleSearch = () => {
    if (searchTerm.trim() === "") {
      setMessageSearch("Please enter a valid data for search");
      setCharacters(originalCharacter);
      return;
    }
    setMessageSearch("");
    const filteredCharacter = originalCharacter.filter((character) =>
      character.characterName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setCharacters(filteredCharacter);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
    setSortType("all");
  };

  const handleSortChange = (e) => {
    setSortType(e.target.value);
    sortCharacter(e.target.value);
    setSearchTerm("");
    setMessageSearch("");
    setCurrentPage(1);
  };

  const sortCharacter = (sortType) => {
    if (sortType === "all") {
      loadCharacter();
    } else {
      const sortedCharacter = originalCharacter.filter((character) => {
        return character.sectID === parseInt(sortType, 10);
      });
      setCharacters(sortedCharacter);
    }
  };

  const handleKey = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleReload = () => {
    setSearchTerm("");
    setMessageSearch("");
    setSortType("none");
    setCurrentPage(1);
    loadCharacter();
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const renderPage = () => {
    if (filteredCharacter.length <= CHARACTER_PER_PAGE) {
      return null;
    }

    return (
      <div className="pagination-buttons">
        {filteredCharacter.length === 0 ? (
          <div></div>
        ) : (
          <div className="pagination">
            <div className="footer-page">
              <button
                onClick={() => handlePageChange(1)}
                disabled={currentPage === 1}
              >
                <FaAngleDoubleLeft />
              </button>
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                <FaAngleLeft />
              </button>
              <div className="page-number">Page {currentPage}</div>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={
                  currentPage ===
                  Math.ceil(filteredCharacter.length / CHARACTER_PER_PAGE)
                }
              >
                <FaAngleRight />
              </button>
              <button
                onClick={() =>
                  handlePageChange(
                    Math.ceil(filteredCharacter.length / CHARACTER_PER_PAGE)
                  )
                }
                disabled={
                  currentPage ===
                  Math.ceil(filteredCharacter.length / CHARACTER_PER_PAGE)
                }
              >
                <FaAngleDoubleRight />
              </button>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="admin-character-container">
      <h1>Managing Character</h1>
      {originalCharacter.length === 0 ? (
        <div className="admin-character-nodata">
          <p className="admin-character-empty">The character list is empty</p>
        </div>
      ) : (
        <>
          <div className="admin-characters-top">
            <div className="admin-search-bar">
              <input
                type="text"
                placeholder="Search by name..."
                value={searchTerm}
                onChange={handleSearchChange}
                onKeyDown={handleKey}
              />
              <button className="admin-search-icons" onClick={handleSearch}>
                <FaSearch />
              </button>
              <button className="admin-search-reload" onClick={handleReload}>
                <FaSyncAlt />
              </button>
            </div>
            <div className="admin-characters-filter">
              <select value={sortType} onChange={handleSortChange}>
                <option value="all">All</option>
                {sects.map((sect) => (
                  <option key={sect.sectID} value={sect.sectID}>
                    {sect.sectName}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {messageSearch ? (
            <div className="error-message">{messageSearch}</div>
          ) : (
            <>
              {currentCharacterPage.length === 0 ? (
                <div className="error-message">No data was found</div>
              ) : (
                <div
                  className="none-display"
                  id={currentCharacterPage.length === 0 ? "none" : ""}
                >
                  {characters.length}{" "}
                  {characters.length === 1 ? "character" : "characters"} found
                </div>
              )}
            </>
          )}
          {currentCharacterPage.length === 0 ? (
            <>
              <div className="table-nodata-display"></div>
            </>
          ) : (
            <div className="admin-characters-table">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Sect</th>
                    <th>Description</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentCharacterPage.map((characters) => (
                    <tr key={characters.characterID}>
                      <td className="admin-characters-images">
                        <div className="image-container">
                          {characters.image && (
                            <img
                              src={`https://localhost:7052/${characters.image}`}
                              alt="character-img"
                            />
                          )}
                        </div>
                      </td>
                      <td className="admin-character-name">
                        <span>{characters.characterName}</span>
                      </td>
                      <td className="admin-characters-sect">
                        {characters.sectID && (
                          <span>
                            {sects.find(
                              (sect) => sect.sectID === characters.sectID
                            )?.sectName || ""}
                          </span>
                        )}
                      </td>
                      <td className="admin-character-description">
                        <span>{characters.characterDescription}</span>
                      </td>
                      <td className="admin-characters-actions">
                        <button onClick={() => handleDialogOpen(characters)}>
                          <FaEye />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          {viewDialogVisible && (
            <div className="dialog-view-container">
              <div className="dialog-view-main-content">
                <div className="dialog-view-content">
                  <h3>View {currentCharacter.characterName}</h3>
                  <div className="dialog-view-main">
                    <div className="dialog-main-top">
                      <div className="dialog-view-images">
                        {currentCharacter.image && (
                          <img
                            src={`https://localhost:7052/${currentCharacter.image}`}
                            alt="character-img"
                          />
                        )}
                      </div>
                      <div className="dialog-view-main">
                        <h4>
                          <span>{currentCharacter.characterName}</span>
                        </h4>
                        <p>
                          Sect -{" "}
                          {currentCharacter.sectID && (
                            <span>
                              {sects.find(
                                (sect) =>
                                  sect.sectID === currentCharacter.sectID
                              )?.sectName || ""}
                            </span>
                          )}
                        </p>
                        <h5>
                          <span> {currentCharacter.characterDescription}</span>
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
                    <button onClick={closeViewDialog}>OK</button>
                  </div>
                </div>
              </div>
            </div>
          )}
          {renderPage()}
        </>
      )}
    </div>
  );
};

export default AdminCharacter;
