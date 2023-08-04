import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  FaAngleLeft,
  FaAngleRight,
  FaAngleDoubleLeft,
  FaAngleDoubleRight,
  FaPlus,
  FaSearch,
  FaSyncAlt,
  FaTrash,
  FaEdit,
  FaEye,
  FaCheck,
  FaTimes,
} from 'react-icons/fa';
import './adminCharacter.scss';

const AdminCharacter = () => {
  const account = JSON.parse(localStorage.getItem('ADMIN_DATA'));
  const history = useNavigate();

  useEffect(() => {
    if (!account) {
      history('/');
    }
  }, [account, history]);

  const CHARACTERS_PER_PAGE = 10;
  const [characters, setCharacters] = useState([]);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [dialogMode, setDialogMode] = useState('create');
  const [defaultSect, setDefaultSect] = useState(null);
  const [currentCharacter, setCurrentCharacter] = useState({
    characterName: '',
    characterDescription: '',
    image: null,
    attackValue: '',
    healthValue: '',
    defenseValue: '',
    speedValue: '',
    intellectValue: '',
    physicalValue: '',
    sectID: defaultSect,
  });

  const [message, setMessage] = useState('');
  const [deleteDialogVisible, setDeleteDialogVisible] = useState(false);
  const [characterRemoved, setCharacterRemoved] = useState(null);
  const [viewDialogVisible, setViewDialogVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [messageSearch, setMessageSearch] = useState('');
  const [originalCharacter, setOriginalCharacter] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredCharacters, setFilteredCharacters] = useState([]);
  const startIndex = (currentPage - 1) * CHARACTERS_PER_PAGE;
  const endIndex = startIndex + CHARACTERS_PER_PAGE;
  const currentCharacterPage = filteredCharacters.slice(startIndex, endIndex);
  const [sects, setSects] = useState([]);
  const [dialogMessage, setDialogMessage] = useState(false);
  const [sortType, setSortType] = useState('ALL');

  const showDeleteDialog = (character) => {
    setCharacterRemoved(character);
    setDeleteDialogVisible(true);
  };

  const closeDeleteDialog = () => {
    setDeleteDialogVisible(false);
    setCharacterRemoved(null);
    loadCharacters();
  };

  useEffect(() => {
    setFilteredCharacters(characters);
  }, [characters, searchTerm]);

  useEffect(() => {
    return () => {
      if (currentCharacter.image && currentCharacter.image[0]) {
        window.URL.revokeObjectURL(currentCharacter.image[0]);
      }
    };
  }, [currentCharacter.image]);

  const loadCharacters = useCallback(async () => {
    try {
      const response = await axios.get(
        'https://localhost:7052/api/mf/characters'
      );
      const updatedCharacters = response.data.map((character) => {
        return {
          ...character,
          image: character.image ? character.image : null,
          sectName: character.characterSect
            ? character.characterSect.sectName
            : '',
        };
      });
      setCharacters(updatedCharacters);
      setOriginalCharacter(updatedCharacters);
      const lastPage = Math.ceil(
        updatedCharacters.length / CHARACTERS_PER_PAGE
      );
      if (currentPage > lastPage) {
        setCurrentPage(lastPage);
      }
    } catch (error) {
      console.error(error);
    }
  }, [currentPage]);

  useEffect(() => {
    loadCharacters();
  }, [loadCharacters]);

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const response = await axios.get(
          'https://localhost:7052/api/mf/characters'
        );
        setCharacters(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchSects = async () => {
      try {
        const response = await axios.get('https://localhost:7052/api/mf/sects');
        setSects(response.data);
        if (response.data.length > 0) {
          setDefaultSect(response.data[0].sectID);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchCharacters();
    fetchSects();
  }, [defaultSect]);

  const actionCharacters = async () => {
    const formData = new FormData();

    const originalC = originalCharacter.find(
      (character) => character.characterID === currentCharacter.characterID
    );

    if (dialogMode === 'update') {
      formData.append('characterID', currentCharacter.characterID);

      if (
        currentCharacter.characterName !== originalC.characterName ||
        currentCharacter.characterDescription !==
          originalC.characterDescription ||
        (currentCharacter.image &&
          currentCharacter.image !== originalC.image) ||
        currentCharacter.attackValue !== originalC.attackValue ||
        currentCharacter.healthValue !== originalC.healthValue ||
        currentCharacter.defenseValue !== originalC.defenseValue ||
        currentCharacter.speedValue !== originalC.speedValue ||
        currentCharacter.intellectValue !== originalC.intellectValue ||
        currentCharacter.physicalValue !== originalC.physicalValue ||
        currentCharacter.sectID !== originalC.sectID
      ) {
        formData.append('characterName', currentCharacter.characterName);
        formData.append(
          'characterDescription',
          currentCharacter.characterDescription
        );
        formData.append('image', currentCharacter.image);
        formData.append('attackValue', currentCharacter.attackValue);
        formData.append('healthValue', currentCharacter.healthValue);
        formData.append('defenseValue', currentCharacter.defenseValue);
        formData.append('speedValue', currentCharacter.speedValue);
        formData.append('intellectValue', currentCharacter.intellectValue);
        formData.append('physicalValue', currentCharacter.physicalValue);
        formData.append('sectID', currentCharacter.sectID);
      } else {
        setMessage('Nothing to update');
        return;
      }
    } else {
      if (currentCharacter.characterName !== originalCharacter.characterName) {
        formData.append('characterName', currentCharacter.characterName);
      }
      if (
        currentCharacter.characterDescription !==
        originalCharacter.characterDescription
      ) {
        formData.append(
          'characterDescription',
          currentCharacter.characterDescription
        );
      }
      if (
        currentCharacter.image &&
        currentCharacter.image !== originalCharacter.image
      ) {
        formData.append('image', currentCharacter.image);
      }
      if (currentCharacter.attackValue !== originalCharacter.attackValue) {
        formData.append('attackValue', currentCharacter.attackValue);
      }
      if (currentCharacter.healthValue !== originalCharacter.healthValue) {
        formData.append('healthValue', currentCharacter.healthValue);
      }
      if (currentCharacter.defenseValue !== originalCharacter.defenseValue) {
        formData.append('defenseValue', currentCharacter.defenseValue);
      }
      if (currentCharacter.speedValue !== originalCharacter.speedValue) {
        formData.append('speedValue', currentCharacter.speedValue);
      }
      if (
        currentCharacter.intellectValue !== originalCharacter.intellectValue
      ) {
        formData.append('intellectValue', currentCharacter.intellectValue);
      }
      if (currentCharacter.physicalValue !== originalCharacter.physicalValue) {
        formData.append('physicalValue', currentCharacter.physicalValue);
      }
      if (currentCharacter.sectID !== originalCharacter.sectID) {
        formData.append('sectID', currentCharacter.sectID);
      }
    }

    const url =
      dialogMode === 'create'
        ? 'https://localhost:7052/api/mf/characters'
        : `https://localhost:7052/api/mf/characters/${currentCharacter.characterID}`;

    try {
      let response;
      if (dialogMode === 'create') {
        response = await axios.post(url, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        setMessage('Character created successfully');
      } else if (dialogMode === 'update') {
        response = await axios.put(url, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        setMessage('Character updated successfully');
      }

      if (response.status === 200 || response.status === 202) {
        setDialogVisible(false);
        loadCharacters();
      } else {
        setMessage('Failed to save the character');
      }
    } catch (error) {
      console.error(error);
      console.log('Error Status:', error.response?.status);
      console.log('Error Data:', error.response?.data);
      setMessage('Failed to save the character');
    }
  };

  const removeCharacter = async () => {
    if (characterRemoved) {
      try {
        await axios.delete(
          `https://localhost:7052/api/mf/characters/${characterRemoved.characterID}`
        );
        setMessage('Character deleted successfully');
        loadCharacters();
      } catch (error) {
        console.error(error);
        setMessage('Failed to delete the character');
      }
      closeDeleteDialog();
    }
  };

  const handleDialogOpen = (mode, character) => {
    if (mode === 'view') {
      setCurrentCharacter(character);
      console.log(character);
      setViewDialogVisible(true);
    } else if (mode === 'create') {
      if (sects.length === 0) {
        setDialogMessage(true);
      } else {
        setDialogMode(mode);
        setCurrentCharacter({
          ...character,
          image: null,
          sectID: defaultSect,
        });
        setDialogVisible(true);
      }
    } else {
      setDialogMode(mode);
      setCurrentCharacter({
        ...currentCharacter,
        ...character,
        sectID: character.characterSect
          ? character.characterSect.sectID
          : defaultSect,
      });
      setDialogVisible(true);
    }
  };

  const handleDialogClose = () => {
    setDialogVisible(false);
    setCurrentCharacter({});
  };

  const closeViewDialog = () => {
    setViewDialogVisible(false);
  };

  const handleNoSectClose = () => {
    setDialogMessage(false);
    history('/admin-sects');
  };

  const handleSearch = () => {
    if (searchTerm.trim() === '') {
      setMessageSearch('Please enter a valid data for search');
      setCharacters(originalCharacter);
      return;
    }
    setMessageSearch('');
    const filteredCharacters = originalCharacter.filter((character) =>
      character.characterName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setCharacters(filteredCharacters);
  };

  const handleKey = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleReload = () => {
    setSearchTerm('');
    setMessageSearch('');
    loadCharacters();
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSortChange = (e) => {
    setSortType(e.target.value);
    sortCharacter(e.target.value);
  };

  const sortCharacter = (sortType) => {
    console.log('sortType:', sortType, typeof sortType);
    if (sortType === 'ALL') {
      loadCharacters();
    } else {
      console.log('Original Characters:', originalCharacter);
      const sortedCharacters = originalCharacter.filter((character) => {
        console.log(
          'character.sectID:',
          character.sectID,
          typeof character.sectID
        );
        console.log('sortType:', sortType, typeof sortType);
        return character.sectID === parseInt(sortType, 10);
      });
      console.log('sortedCharacters:', sortedCharacters);
      setCharacters(sortedCharacters);
    }
  };

  const renderPage = () => {
    if (filteredCharacters.length <= CHARACTERS_PER_PAGE) {
      return null;
    }

    return (
      <div className='pagination-buttons'>
        {filteredCharacters.length === 0 ? (
          <div></div>
        ) : (
          <div className='pagination'>
            <div className='footer-page'>
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
              <div className='page-number'>Page {currentPage}</div>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={
                  currentPage ===
                  Math.ceil(filteredCharacters.length / CHARACTERS_PER_PAGE)
                }
              >
                <FaAngleRight />
              </button>
              <button
                onClick={() =>
                  handlePageChange(
                    Math.ceil(filteredCharacters.length / CHARACTERS_PER_PAGE)
                  )
                }
                disabled={
                  currentPage ===
                  Math.ceil(filteredCharacters.length / CHARACTERS_PER_PAGE)
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
    <div className='admin-character-container'>
      <h1>Managing Character</h1>
      {originalCharacter.length === 0 ? (
        <div className='admin-character-nodata'>
          <p className='admin-character-empty'>The character list is empty</p>
          <div className='admin-add-character-empty'>
            <button onClick={() => handleDialogOpen('create')}>
              <FaPlus />
            </button>
          </div>
          {dialogMessage && (
            <div className='dialog-no-sect-action-container'>
              <div className='dialog-no-sect-action-content'>
                <h2>No Sect Available</h2>
                <p>There are no sects available. Please add a sect first.</p>
                <div className='dialog-no-sect-action-group'>
                  <button onClick={handleNoSectClose}>OK</button>
                </div>
              </div>
            </div>
          )}
          {dialogVisible && (
            <div className='dialog-empt-action-container'>
              <div className='dialog-empt-action-content'>
                <h2>
                  {dialogMode === 'create' ? 'Create' : 'Update'} Character
                </h2>
                <div className='dialog-empt-action-main'>
                  <div className='dialog-empt-action-image-main'>
                    <label className='dialog-empt-action-image-group'>
                      <input
                        type='file'
                        id='image'
                        accept='image/*'
                        onChange={(e) =>
                          setCurrentCharacter({
                            ...currentCharacter,
                            image: e.target.files[0],
                          })
                        }
                        hidden
                        required={!currentCharacter.characterID}
                      />
                      {currentCharacter.image ? (
                        <img
                          src={
                            currentCharacter.image instanceof File
                              ? window.URL.createObjectURL(
                                  currentCharacter.image
                                )
                              : `https://localhost:7052/${currentCharacter.image}`
                          }
                          alt='character-img'
                        />
                      ) : (
                        <img src='/assets/images/logo.jpg' alt='character-img' />
                      )}
                    </label>
                  </div>
                  <div className='dialog-empt-action-content-main'>
                    <div className='dialog-empt-action-group'>
                      <label htmlFor='characterName'>Character Name:</label>
                      <input
                        className='characterName'
                        type='text'
                        id='characterName'
                        value={currentCharacter.characterName}
                        onChange={(e) =>
                          setCurrentCharacter({
                            ...currentCharacter,
                            characterName: e.target.value,
                          })
                        }
                        required
                      />
                    </div>
                    <div className='dialog-empt-action-group'>
                      <label htmlFor='characterDescription'>
                        Character Description:
                      </label>
                      <textarea
                        className='character_description'
                        id='characterDescription'
                        value={currentCharacter.characterDescription}
                        onChange={(e) =>
                          setCurrentCharacter({
                            ...currentCharacter,
                            characterDescription: e.target.value,
                          })
                        }
                        required
                      />
                    </div>
                    <div className='dialog-empt-action-group'>
                      <label htmlFor='attackValue'>Attack Value:</label>
                      <input
                        type='number'
                        id='attackValue'
                        value={currentCharacter.attackValue}
                        onChange={(e) =>
                          setCurrentCharacter({
                            ...currentCharacter,
                            attackValue: e.target.value,
                          })
                        }
                        required
                      />
                    </div>
                    <div className='dialog-empt-action-group'>
                      <label htmlFor='healthValue'>Health Value:</label>
                      <input
                        type='number'
                        id='healthValue'
                        value={currentCharacter.healthValue}
                        onChange={(e) =>
                          setCurrentCharacter({
                            ...currentCharacter,
                            healthValue: e.target.value,
                          })
                        }
                        required
                      />
                    </div>
                    <div className='dialog-empt-action-group'>
                      <label htmlFor='defenseValue'>Defense Value:</label>
                      <input
                        type='number'
                        id='defenseValue'
                        value={currentCharacter.defenseValue}
                        onChange={(e) =>
                          setCurrentCharacter({
                            ...currentCharacter,
                            defenseValue: e.target.value,
                          })
                        }
                        required
                      />
                    </div>
                    <div className='dialog-empt-action-group'>
                      <label htmlFor='speedValue'>Speed Value:</label>
                      <input
                        type='number'
                        id='speedValue'
                        value={currentCharacter.speedValue}
                        onChange={(e) =>
                          setCurrentCharacter({
                            ...currentCharacter,
                            speedValue: e.target.value,
                          })
                        }
                        required
                      />
                    </div>
                    <div className='dialog-empt-action-group'>
                      <label htmlFor='intellectValue'>Intellect Value:</label>
                      <input
                        type='number'
                        id='intellectValue'
                        value={currentCharacter.intellectValue}
                        onChange={(e) =>
                          setCurrentCharacter({
                            ...currentCharacter,
                            intellectValue: e.target.value,
                          })
                        }
                        required
                      />
                    </div>
                    <div className='dialog-empt-action-group'>
                      <label htmlFor='physicalValue'>Physical Value:</label>
                      <input
                        type='number'
                        id='physicalValue'
                        value={currentCharacter.physicalValue}
                        onChange={(e) =>
                          setCurrentCharacter({
                            ...currentCharacter,
                            physicalValue: e.target.value,
                          })
                        }
                        required
                      />
                    </div>
                    <div className='dialog-empt-action-group'>
                      <label htmlFor='sect'>Sect:</label>
                      <select
                        className='sect'
                        id='sect'
                        value={currentCharacter.sectID || defaultSect}
                        onChange={(e) =>
                          setCurrentCharacter({
                            ...currentCharacter,
                            sectID: parseInt(e.target.value, 10),
                          })
                        }
                      >
                        {sects.map((sect) => (
                          <option key={sect.sectID} value={sect.sectID}>
                            {sect.sectName}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className='dialog-empt-action-group'>
                      <button onClick={actionCharacters}>Save</button>
                      <button onClick={handleDialogClose}>Cancel</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div>
          <div className='admin-character-tools'>
            <div className='admin-search-bar'>
              <input
                type='text'
                placeholder='Search by name...'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={handleKey}
              />
              <button className='admin-search-icons' onClick={handleSearch}>
                <FaSearch />
              </button>
              <button className='admin-search-reload' onClick={handleReload}>
                <FaSyncAlt />
              </button>
            </div>
            <div className='admin-maps-filter'>
              <select value={sortType} onChange={handleSortChange}>
                <option value='ALL'>All</option>
                {sects.map((sect) => (
                  <option key={sect.sectID} value={sect.sectID}>
                    {sect.sectName}
                  </option>
                ))}
              </select>
            </div>
            <div className='admin-add-maps'>
              <button onClick={() => handleDialogOpen('create')}>
                Create&nbsp;
                <FaPlus />
              </button>
            </div>
          </div>

          {messageSearch && (
            <p className='message-error-search'>{messageSearch}</p>
          )}

          {currentCharacterPage.map((character) => (
            <div key={character.characterID} className='admin-character-item'>
              <div className='character-item-left'>
                <div className='character-img'>
                  {character.image && (
                    <img
                      src={`https://localhost:7052/${character.image}`}
                      alt='character-img'
                      className='image-view-dialog'
                    />
                  )}
                </div>
                <div className='character-info'>
                  <p>{character.characterName}</p>
                  <p>{character.sectName}</p>
                </div>
              </div>
              <div className='character-item-right'>
                <button onClick={() => handleDialogOpen('view', character)}>
                  <FaEye />
                </button>
                <button onClick={() => handleDialogOpen('update', character)}>
                  <FaEdit />
                </button>
                <button onClick={() => showDeleteDialog(character)}>
                  <FaTrash />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      {dialogVisible && (
        <div className='dialog-empt-action-container'>
          <div className='dialog-empt-action-content'>
            <h2>{dialogMode === 'create' ? 'Create' : 'Update'} Character</h2>
            <div className='dialog-empt-action-main'>
              <div className='dialog-empt-action-image-main'>
                <label className='dialog-empt-action-image-group'>
                  <input
                    type='file'
                    id='image'
                    accept='image/*'
                    onChange={(e) =>
                      setCurrentCharacter({
                        ...currentCharacter,
                        image: e.target.files[0],
                      })
                    }
                    hidden
                    required={!currentCharacter.characterID}
                  />
                  {currentCharacter.image ? (
                    <img
                      src={
                        currentCharacter.image instanceof File
                          ? window.URL.createObjectURL(currentCharacter.image)
                          : `https://localhost:7052/${currentCharacter.image}`
                      }
                      alt='character-img'
                    />
                  ) : (
                    <img src='/assets/images/logo.jpg' alt='character-img' />
                  )}
                </label>
              </div>
              <div className='dialog-empt-action-content-main'>
                <div className='dialog-empt-action-group'>
                  <label htmlFor='characterName'>Character Name:</label>
                  <input
                    className='characterName'
                    type='text'
                    id='characterName'
                    value={currentCharacter.characterName}
                    onChange={(e) =>
                      setCurrentCharacter({
                        ...currentCharacter,
                        characterName: e.target.value,
                      })
                    }
                    required
                  />
                </div>
                <div className='dialog-empt-action-group'>
                  <label htmlFor='characterDescription'>
                    Character Description:
                  </label>
                  <textarea
                    className='character_description'
                    id='characterDescription'
                    value={currentCharacter.characterDescription}
                    onChange={(e) =>
                      setCurrentCharacter({
                        ...currentCharacter,
                        characterDescription: e.target.value,
                      })
                    }
                    required
                  />
                </div>
                <div className='dialog-empt-action-group'>
                  <label htmlFor='attackValue'>Attack Value:</label>
                  <input
                    type='number'
                    id='attackValue'
                    value={currentCharacter.attackValue}
                    onChange={(e) =>
                      setCurrentCharacter({
                        ...currentCharacter,
                        attackValue: e.target.value,
                      })
                    }
                    required
                  />
                </div>
                <div className='dialog-empt-action-group'>
                  <label htmlFor='healthValue'>Health Value:</label>
                  <input
                    type='number'
                    id='healthValue'
                    value={currentCharacter.healthValue}
                    onChange={(e) =>
                      setCurrentCharacter({
                        ...currentCharacter,
                        healthValue: e.target.value,
                      })
                    }
                    required
                  />
                </div>
                <div className='dialog-empt-action-group'>
                  <label htmlFor='defenseValue'>Defense Value:</label>
                  <input
                    type='number'
                    id='defenseValue'
                    value={currentCharacter.defenseValue}
                    onChange={(e) =>
                      setCurrentCharacter({
                        ...currentCharacter,
                        defenseValue: e.target.value,
                      })
                    }
                    required
                  />
                </div>
                <div className='dialog-empt-action-group'>
                  <label htmlFor='speedValue'>Speed Value:</label>
                  <input
                    type='number'
                    id='speedValue'
                    value={currentCharacter.speedValue}
                    onChange={(e) =>
                      setCurrentCharacter({
                        ...currentCharacter,
                        speedValue: e.target.value,
                      })
                    }
                    required
                  />
                </div>
                <div className='dialog-empt-action-group'>
                  <label htmlFor='intellectValue'>Intellect Value:</label>
                  <input
                    type='number'
                    id='intellectValue'
                    value={currentCharacter.intellectValue}
                    onChange={(e) =>
                      setCurrentCharacter({
                        ...currentCharacter,
                        intellectValue: e.target.value,
                      })
                    }
                    required
                  />
                </div>
                <div className='dialog-empt-action-group'>
                  <label htmlFor='physicalValue'>Physical Value:</label>
                  <input
                    type='number'
                    id='physicalValue'
                    value={currentCharacter.physicalValue}
                    onChange={(e) =>
                      setCurrentCharacter({
                        ...currentCharacter,
                        physicalValue: e.target.value,
                      })
                    }
                    required
                  />
                </div>
                <div className='dialog-empt-action-group'>
                  <label htmlFor='sect'>Sect:</label>
                  <select
                    className='sect'
                    id='sect'
                    value={currentCharacter.sectID || defaultSect}
                    onChange={(e) =>
                      setCurrentCharacter({
                        ...currentCharacter,
                        sectID: parseInt(e.target.value, 10),
                      })
                    }
                  >
                    {sects.map((sect) => (
                      <option key={sect.sectID} value={sect.sectID}>
                        {sect.sectName}
                      </option>
                    ))}
                  </select>
                </div>
                <div className='dialog-empt-action-group'>
                  <button onClick={actionCharacters}>Save</button>
                  <button onClick={handleDialogClose}>Cancel</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {renderPage()}
      {viewDialogVisible && (
        <div className='dialog-view-action-container'>
          <div className='dialog-view-action-content'>
            <h2>View Character</h2>
            <div className='dialog-view-action-main'>
              <div className='dialog-view-action-image-main'>
                {currentCharacter.image && (
                  <img
                    src={`https://localhost:7052/${currentCharacter.image}`}
                    alt='character-img'
                    className='image-view-dialog'
                  />
                )}
              </div>
              <div className='dialog-view-action-content-main'>
                <div className='dialog-view-action-group'>
                  <label>Character Name:</label>
                  <p>{currentCharacter.characterName}</p>
                </div>
                <div className='dialog-view-action-group'>
                  <label>Character Description:</label>
                  <p>{currentCharacter.characterDescription}</p>
                </div>
                <div className='dialog-view-action-group'>
                  <label>Attack Value:</label>
                  <p>{currentCharacter.attackValue}</p>
                </div>
                <div className='dialog-view-action-group'>
                  <label>Health Value:</label>
                  <p>{currentCharacter.healthValue}</p>
                </div>
                <div className='dialog-view-action-group'>
                  <label>Defense Value:</label>
                  <p>{currentCharacter.defenseValue}</p>
                </div>
                <div className='dialog-view-action-group'>
                  <label>Speed Value:</label>
                  <p>{currentCharacter.speedValue}</p>
                </div>
                <div className='dialog-view-action-group'>
                  <label>Intellect Value:</label>
                  <p>{currentCharacter.intellectValue}</p>
                </div>
                <div className='dialog-view-action-group'>
                  <label>Physical Value:</label>
                  <p>{currentCharacter.physicalValue}</p>
                </div>
                <div className='dialog-view-action-group'>
                  <label>Sect:</label>
                  {currentCharacter.sectID ? (
                    <p>
                      {sects.find(
                        (sect) => sect.sectID === currentCharacter.sectID
                      )?.sectName || 'Nothing found...'}
                    </p>
                  ) : (
                    <p>Nothing found...</p>
                  )}
                </div>
                <div className='dialog-view-action-group'>
                  <button onClick={closeViewDialog}>Close</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {deleteDialogVisible && (
        <div className='dialog-delete-action-container'>
          <div className='dialog-delete-action-content'>
            <h2>Delete Character</h2>
            <div className='dialog-delete-action-main'>
              <p>Are you sure you want to delete this character?</p>
              <div className='dialog-delete-action-group'>
                <button onClick={removeCharacter}>
                  <FaCheck />
                </button>
                <button onClick={closeDeleteDialog}>
                  <FaTimes />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {message && <p className='message-info'>{message}</p>}
    </div>
  );
};

export default AdminCharacter;
