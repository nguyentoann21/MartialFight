import React, { useState, useEffect } from 'react';
import {
  FaEdit,
  FaTrash,
  FaAngleDoubleLeft,
  FaAngleLeft,
  FaAngleRight,
  FaAngleDoubleRight,
  FaPlusCircle,
  FaSearch,
} from 'react-icons/fa';
import './adminplayer.scss';

const AdminPlayer = () => {
  const PLAYERS_PER_PAGE = 10;

  const [players, setPlayer] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [filteredPlayers, setFilteredPlayers] = useState([]);
  const [isEmptyInput, setIsEmptyInput] = useState(true);

  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    const filteredPlayers = players.filter((player) =>
      player.name.toLowerCase().includes(query)
    );
    setFilteredPlayers(filteredPlayers);
    setIsEmptyInput(event.target.value === '');
    setCurrentPage(1);
  };

  const handlePlayerClick = (player) => {
    setSelectedPlayer(player);
  };

  const handleCloseDialog = () => {
    setSelectedPlayer(null);
  };

  useEffect(() => {
    const data = [
      {
        id: 1,
        image: '/assets/images/player.png',
        username: 'nguyentoann21',
        name: 'Toan 1',
        gender: 'Male',
        level: '50',
        rank: 'Golden',
      },
      {
        id: 1,
        image: '/assets/images/player.png',
        username: 'nguyentoann21',
        name: 'Toan 1',
        gender: 'Male',
        level: '50',
        rank: 'Golden',
      },
      {
        id: 1,
        image: '/assets/images/player.png',
        username: 'nguyentoann21',
        name: 'Toan 1',
        gender: 'Male',
        level: '50',
        rank: 'Golden',
      },
      {
        id: 1,
        image: '/assets/images/player.png',
        username: 'nguyentoann21',
        name: 'Toan 1',
        gender: 'Male',
        level: '50',
        rank: 'Golden',
      },
      {
        id: 1,
        image: '/assets/images/player.png',
        username: 'nguyentoann21',
        name: 'Toan 1',
        gender: 'Male',
        level: '50',
        rank: 'Golden',
      },
      {
        id: 1,
        image: '/assets/images/player.png',
        username: 'nguyentoann21',
        name: 'Toan 1',
        gender: 'Male',
        level: '50',
        rank: 'Golden',
      },
      {
        id: 1,
        image: '/assets/images/player.png',
        username: 'nguyentoann21',
        name: 'Toan 1',
        gender: 'Male',
        level: '50',
        rank: 'Golden',
      },
      {
        id: 1,
        image: '/assets/images/player.png',
        username: 'nguyentoann21',
        name: 'Toan 1',
        gender: 'Male',
        level: '50',
        rank: 'Golden',
      },
      {
        id: 1,
        image: '/assets/images/player.png',
        username: 'nguyentoann21',
        name: 'Toan 1',
        gender: 'Male',
        level: '50',
        rank: 'Golden',
      },
      {
        id: 1,
        image: '/assets/images/player.png',
        username: 'nguyentoann21',
        name: 'S Chat Key',
        gender: 'Male',
        level: '50',
        rank: 'Golden',
      },
      {
        id: 1,
        image: '/assets/images/player.png',
        username: 'nguyentoann21',
        name: 'Toan 1',
        gender: 'Male',
        level: '50',
        rank: 'Golden',
      },
      {
        id: 1,
        image: '/assets/images/player.png',
        username: 'nguyentoann21',
        name: 'Toan 1',
        gender: 'Male',
        level: '50',
        rank: 'Golden',
      },
      {
        id: 1,
        image: '/assets/images/player.png',
        username: 'nguyentoann21',
        name: 'S Chat Key',
        gender: 'Male',
        level: '50',
        rank: 'Golden',
      },
      {
        id: 1,
        image: '/assets/images/player.png',
        username: 'nguyentoann21',
        name: 'S Chat Key',
        gender: 'Male',
        level: '50',
        rank: 'Golden',
      },
      {
        id: 1,
        image: '/assets/images/player.png',
        username: 'nguyentoann21',
        name: 'S Chat Key',
        gender: 'Male',
        level: '50',
        rank: 'Golden',
      },
      {
        id: 1,
        image: '/assets/images/player.png',
        username: 'nguyentoann21',
        name: 'S Chat Key',
        gender: 'Male',
        level: '50',
        rank: 'Golden',
      },
      {
        id: 1,
        image: '/assets/images/player.png',
        username: 'nguyentoann21',
        name: 'S Chat Key',
        gender: 'Male',
        level: '50',
        rank: 'Golden',
      },
      {
        id: 1,
        image: '/assets/images/player.png',
        username: 'nguyentoann21',
        name: 'S Chat Key',
        gender: 'Male',
        level: '50',
        rank: 'Golden',
      },
      {
        id: 1,
        image: '/assets/images/player.png',
        username: 'nguyentoann21',
        name: 'S Chat Key',
        gender: 'Male',
        level: '50',
        rank: 'Golden',
      },
      {
        id: 1,
        image: '/assets/images/player.png',
        username: 'nguyentoann21',
        name: 'S Chat Key',
        gender: 'Male',
        level: '50',
        rank: 'Golden',
      },
      {
        id: 1,
        image: '/assets/images/player.png',
        username: 'nguyentoann21',
        name: 'S Chat Key',
        gender: 'Male',
        level: '50',
        rank: 'Golden',
      },
      {
        id: 1,
        image: '/assets/images/player.png',
        username: 'nguyentoann21',
        name: 'S Chat Key',
        gender: 'Male',
        level: '50',
        rank: 'Golden',
      },
      {
        id: 1,
        image: '/assets/images/player.png',
        username: 'nguyentoann21',
        name: 'S Chat Key',
        gender: 'Male',
        level: '50',
        rank: 'Golden',
      },
      {
        id: 1,
        image: '/assets/images/player.png',
        username: 'nguyentoann21',
        name: 'S Chat Key',
        gender: 'Male',
        level: '50',
        rank: 'Golden',
      },
      {
        id: 1,
        image: '/assets/images/player.png',
        username: 'nguyentoann21',
        name: 'S Chat Key',
        gender: 'Male',
        level: '50',
        rank: 'Golden',
      },
      {
        id: 1,
        image: '/assets/images/player.png',
        username: 'nguyentoann21',
        name: 'S Chat Key',
        gender: 'Male',
        level: '50',
        rank: 'Golden',
      },
      {
        id: 1,
        image: '/assets/images/player.png',
        username: 'nguyentoann21',
        name: 'S Chat Key',
        gender: 'Male',
        level: '50',
        rank: 'Golden',
      },
      {
        id: 1,
        image: '/assets/images/player.png',
        username: 'nguyentoann21',
        name: 'S Chat Key',
        gender: 'Male',
        level: '50',
        rank: 'Golden',
      },
      {
        id: 1,
        image: '/assets/images/player.png',
        username: 'nguyentoann21',
        name: 'S Chat Key',
        gender: 'Male',
        level: '50',
        rank: 'Golden',
      },
      {
        id: 1,
        image: '/assets/images/player.png',
        username: 'nguyentoann21',
        name: 'S Chat Key',
        gender: 'Male',
        level: '50',
        rank: 'Golden',
      },
      {
        id: 1,
        image: '/assets/images/player.png',
        username: 'nguyentoann21',
        name: 'S Chat Key',
        gender: 'Male',
        level: '50',
        rank: 'Golden',
      },
    ];
    setPlayer(data);
    setFilteredPlayers(data);
  }, []);

  const totalPages = Math.ceil(filteredPlayers.length / PLAYERS_PER_PAGE);
  const startIndex = (currentPage - 1) * PLAYERS_PER_PAGE;
  const endIndex = startIndex + PLAYERS_PER_PAGE;
  const currentPlayers = filteredPlayers.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const renderPaginationButtons = () => {
    return (
      <div className='pagination-buttons'>
        {filteredPlayers.length === 0 ? (
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
                  currentPage === Math.ceil(players.length / PLAYERS_PER_PAGE)
                }
              >
                <FaAngleRight />
              </button>
              <button
                onClick={() =>
                  handlePageChange(Math.ceil(players.length / PLAYERS_PER_PAGE))
                }
                disabled={
                  currentPage === Math.ceil(players.length / PLAYERS_PER_PAGE)
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
    <div className='admin-player-page'>
      <h1>Managing Player</h1>
      <div className='admin-player-top'>
        <div className='admin-player-search'>
          <input
            type='text'
            placeholder='Search by name'
            onChange={handleSearch}
          />
          <div className='admin-search-icons'>
            {isEmptyInput ? <FaSearch /> : null}
          </div>
        </div>
        <div className='admin-add-players'>
          <button>
            Add&nbsp;
            <FaPlusCircle />
          </button>
        </div>
      </div>
      {filteredPlayers.length === 0 ? (
        <p className='admin-no-data'>No data was found.</p>
      ) : (
        <ul className='admin-player-main-container'>
          {currentPlayers.map((player) => (
            <li key={player.id}>
              <img
                src={player.image}
                alt={player.name}
                onClick={() => handlePlayerClick(player)}
              />
              <div className='admin-player-content'>
                <p onClick={() => handlePlayerClick(player)}>
                  Username: {player.username} - Full-name: {player.name} -
                  Gender: {player.gender} - Level: {player.level} - Rank:{' '}
                  {player.rank}
                </p>
              </div>
              <div className='admin-player-button-container'>
                <button>
                  <FaEdit />
                </button>
                <button>
                  <FaTrash />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
      {totalPages > 1 && renderPaginationButtons()}
      {selectedPlayer && (
        <div className='admin-player-dialog'>
          <div className='admin-player-dialog-content'>
            <div className='admin-player-dialog-main'>
              <img src={selectedPlayer.image} alt={selectedPlayer.name} />
              <div className='admin-player-dialog-details'>
                <p>
                  Username: <span>{selectedPlayer.username}</span>
                </p>
                <p>
                  Full-name: <span>{selectedPlayer.name}</span>
                </p>
                <p>
                  Gender: <span>{selectedPlayer.gender}</span>
                </p>
                <p>
                  Level: <span>{selectedPlayer.level}</span>
                </p>
                <p>
                  Rank: <span>{selectedPlayer.rank}</span>
                </p>
              </div>
            </div>
            <div className='admin-player-dialog-buttons'>
              <button onClick={handleCloseDialog}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPlayer;
