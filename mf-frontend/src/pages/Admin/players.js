import React, { useState } from "react";
import { FaEdit, FaTrash, FaTimes, FaAngleDoubleLeft, FaAngleLeft, FaAngleRight, FaAngleDoubleRight } from "react-icons/fa";
import "./adminplayer.css";

const players = [
    {
        id: 1,
        image: "item1.png",
        username: "nguyentoann21",
        name: "S Chat Key",
        gender: "Male",
        level: "50",
        rank: "Golden"
    },
    {
        id: 1,
        image: "item1.png",
        username: "nguyentoann21",
        name: "S Chat Key",
        gender: "Male",
        level: "50",
        rank: "Golden"
    },
    {
        id: 1,
        image: "item1.png",
        username: "nguyentoann21",
        name: "S Chat Key",
        gender: "Male",
        level: "50",
        rank: "Golden"
    },
    {
        id: 1,
        image: "item1.png",
        username: "nguyentoann21",
        name: "S Chat Key",
        gender: "Male",
        level: "50",
        rank: "Golden"
    },
    {
        id: 1,
        image: "item1.png",
        username: "nguyentoann21",
        name: "S Chat Key",
        gender: "Male",
        level: "50",
        rank: "Golden"
    },
    {
        id: 1,
        image: "item1.png",
        username: "nguyentoann21",
        name: "S Chat Key",
        gender: "Male",
        level: "50",
        rank: "Golden"
    },
    {
        id: 1,
        image: "item1.png",
        username: "nguyentoann21",
        name: "S Chat Key",
        gender: "Male",
        level: "50",
        rank: "Golden"
    },
    {
        id: 1,
        image: "item1.png",
        username: "nguyentoann21",
        name: "S Chat Key",
        gender: "Male",
        level: "50",
        rank: "Golden"
    },
    {
        id: 1,
        image: "item1.png",
        username: "nguyentoann21",
        name: "S Chat Key",
        gender: "Male",
        level: "50",
        rank: "Golden"
    },
    {
        id: 1,
        image: "item1.png",
        username: "nguyentoann21",
        name: "S Chat Key",
        gender: "Male",
        level: "50",
        rank: "Golden"
    },
    {
        id: 1,
        image: "item1.png",
        username: "nguyentoann21",
        name: "S Chat Key",
        gender: "Male",
        level: "50",
        rank: "Golden"
    },
    {
        id: 1,
        image: "item1.png",
        username: "nguyentoann21",
        name: "S Chat Key",
        gender: "Male",
        level: "50",
        rank: "Golden"
    },
    {
        id: 1,
        image: "item1.png",
        username: "nguyentoann21",
        name: "S Chat Key",
        gender: "Male",
        level: "50",
        rank: "Golden"
    },
    {
        id: 1,
        image: "item1.png",
        username: "nguyentoann21",
        name: "S Chat Key",
        gender: "Male",
        level: "50",
        rank: "Golden"
    },
    {
        id: 1,
        image: "item1.png",
        username: "nguyentoann21",
        name: "S Chat Key",
        gender: "Male",
        level: "50",
        rank: "Golden"
    },
    {
        id: 1,
        image: "item1.png",
        username: "nguyentoann21",
        name: "S Chat Key",
        gender: "Male",
        level: "50",
        rank: "Golden"
    },
    {
        id: 1,
        image: "item1.png",
        username: "nguyentoann21",
        name: "S Chat Key",
        gender: "Male",
        level: "50",
        rank: "Golden"
    },
    {
        id: 1,
        image: "item1.png",
        username: "nguyentoann21",
        name: "S Chat Key",
        gender: "Male",
        level: "50",
        rank: "Golden"
    },
    {
        id: 1,
        image: "item1.png",
        username: "nguyentoann21",
        name: "S Chat Key",
        gender: "Male",
        level: "50",
        rank: "Golden"
    },
    {
        id: 1,
        image: "item1.png",
        username: "nguyentoann21",
        name: "S Chat Key",
        gender: "Male",
        level: "50",
        rank: "Golden"
    },
    {
        id: 1,
        image: "item1.png",
        username: "nguyentoann21",
        name: "S Chat Key",
        gender: "Male",
        level: "50",
        rank: "Golden"
    },
    {
        id: 1,
        image: "item1.png",
        username: "nguyentoann21",
        name: "S Chat Key",
        gender: "Male",
        level: "50",
        rank: "Golden"
    },
    {
        id: 1,
        image: "item1.png",
        username: "nguyentoann21",
        name: "S Chat Key",
        gender: "Male",
        level: "50",
        rank: "Golden"
    },
    {
        id: 1,
        image: "item1.png",
        username: "nguyentoann21",
        name: "S Chat Key",
        gender: "Male",
        level: "50",
        rank: "Golden"
    },
    {
        id: 1,
        image: "item1.png",
        username: "nguyentoann21",
        name: "S Chat Key",
        gender: "Male",
        level: "50",
        rank: "Golden"
    },
    {
        id: 1,
        image: "item1.png",
        username: "nguyentoann21",
        name: "S Chat Key",
        gender: "Male",
        level: "50",
        rank: "Golden"
    },
    {
        id: 1,
        image: "item1.png",
        username: "nguyentoann21",
        name: "S Chat Key",
        gender: "Male",
        level: "50",
        rank: "Golden"
    },
    {
        id: 1,
        image: "item1.png",
        username: "nguyentoann21",
        name: "S Chat Key",
        gender: "Male",
        level: "50",
        rank: "Golden"
    },
    {
        id: 1,
        image: "item1.png",
        username: "nguyentoann21",
        name: "S Chat Key",
        gender: "Male",
        level: "50",
        rank: "Golden"
    },
    {
        id: 1,
        image: "item1.png",
        username: "nguyentoann21",
        name: "S Chat Key",
        gender: "Male",
        level: "50",
        rank: "Golden"
    },
    {
        id: 1,
        image: "item1.png",
        username: "nguyentoann21",
        name: "S Chat Key",
        gender: "Male",
        level: "50",
        rank: "Golden"
    },
];

const Player = () => {
  const PLAYERS_PER_PAGE = 15;

  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [filteredPlayers, setFilteredPlayers] = useState(players);

  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    const filteredPlayers = players.filter((player) =>
      player.name.toLowerCase().includes(query)
    );
    setFilteredPlayers(filteredPlayers);
    setCurrentPage(1);
  };

  const handlePlayerClick = (player) => {
    setSelectedPlayer(player);
  };

  const handleCloseDialog = () => {
    setSelectedPlayer(null);
  };

  const totalPages = Math.ceil(filteredPlayers.length / PLAYERS_PER_PAGE);
  const startIndex = (currentPage - 1) * PLAYERS_PER_PAGE;
  const endIndex = startIndex + PLAYERS_PER_PAGE;
  const currentPlayers = filteredPlayers.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const renderPaginationButtons = () => {
    return (
      <div className="pagination-buttons">
        {currentPage > 1 ? (
          <button onClick={() => handlePageChange(1)}>
            <FaAngleDoubleLeft />
          </button>
        ) : (
          <button disabled>
            <FaAngleDoubleLeft />
          </button>
        )}
        {currentPage > 1 ? (
          <button onClick={() => handlePageChange(currentPage - 1)}>
            <FaAngleLeft />
          </button>
        ) : (
          <button disabled>
            <FaAngleLeft />
          </button>
        )}
        <h3>{currentPage}</h3>
        {currentPage < totalPages ? (
          <button onClick={() => handlePageChange(currentPage + 1)}>
            <FaAngleRight />
          </button>
        ) : (
          <button disabled>
            <FaAngleRight />
          </button>
        )}
        {currentPage !== totalPages ? (
          <button onClick={() => handlePageChange(totalPages)}>
            <FaAngleDoubleRight />
          </button>
        ) : (
          <button disabled>
            <FaAngleDoubleRight />
          </button>
        )}
      </div>
    );
  };

  return (
    <div>
      <div>
        <input type="text" placeholder="Search by name" onChange={handleSearch} />
      </div>
      {filteredPlayers.length === 0 ? (
        <p>No data was found.</p>
      ) : (
      <ul>
        {currentPlayers.map((player) => (
          <li key={player.id} onClick={() => handlePlayerClick(player)}>
            <img src={player.image} alt={player.name} />
            <h3>Username: {player.username}</h3>
            <h3>Full-name: {player.name}</h3>
            <p>Gender: {player.gender}</p>
            <p>Level: {player.level}</p>
            <p>Rank: {player.rank}</p>
            <button>
              <FaEdit />
            </button>
            <button>
              <FaTrash />
            </button>
          </li>
        ))}
      </ul>
      )}
      {totalPages > 1 && renderPaginationButtons()}
      {selectedPlayer && (
        <div className="dialog">
          <div className="dialog-content">
            <h2>{selectedPlayer.name}</h2>
            <p>Type: {selectedPlayer.type}</p>
            <p>Description: {selectedPlayer.description}</p>
            <div className="dialog-buttons">
              <button>
                <FaEdit /> Update
              </button>
              <button>
                <FaTrash /> Delete
              </button>
              <button onClick={handleCloseDialog}>
                <FaTimes /> Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Player;
