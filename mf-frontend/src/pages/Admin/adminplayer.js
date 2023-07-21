import React, { useState, useEffect, useRef } from 'react';
import {
  FaAngleDoubleLeft,
  FaAngleLeft,
  FaAngleRight,
  FaAngleDoubleRight,
  FaSyncAlt,
  FaSearch,
  FaEdit,
  FaEye,
} from 'react-icons/fa';
import './adminplayer.scss';

const AdminPlayer = () => {
  const [players, setPlayers] = useState([]);
  const [dialogMessage, setDialogMessage] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const ref = useRef();
  const [searchTerm, setSearchTerm] = useState('');
  const [messageSearch, setMessageSearch] = useState('');
  const [originalPlayers, setOriginalPlayers] = useState([]);
  const PLAYERS_PER_PAGE = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredPlayers, setFilteredPlayers] = useState([]);
  const startIndex = (currentPage - 1) * PLAYERS_PER_PAGE;
  const endIndex = startIndex + PLAYERS_PER_PAGE;
  const currentPlayer = filteredPlayers.slice(startIndex, endIndex);
  const [selectedPlayer, setSelectedPlayer] = useState(null);

  useEffect(() => {
    loadPlayers();
  }, []);

  useEffect(() => {
    setFilteredPlayers(players);
  }, [players, searchTerm]);

  const loadPlayers = async () => {
    try {
      const response = await fetch('https://localhost:7052/api/mf/players');
      const data = await response.json();
      setPlayers(data);
      setOriginalPlayers(data);
    } catch (error) {
      console.error('Error fetching players:', error);
    }
  };

  const playerIsActive = async (id, isActive) => {
    try {
      const response = await fetch(
        `https://localhost:7052/api/mf/${id}/active`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(isActive),
        }
      );
      if (response.status === 200) {
        showDialog(await response.text());
      } else if (response.status === 403) {
        showDialog(await response.text());
      } else {
        showDialog('Error updating status. Please try again later');
      }
    } catch (error) {
      showDialog('Error updating status. Please try again later');
    }
  };

  const showDialog = (message) => {
    setDialogMessage(message);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    loadPlayers();
  };

  const handleKey = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleReload = () => {
    setSearchTerm('');
    setMessageSearch('');
    loadPlayers();
  };

  const handleSearch = () => {
    const trimmedSearchTerm = searchTerm.trim();
    if (trimmedSearchTerm === '') {
      setMessageSearch('Please enter a valid data for search');
      setPlayers(originalPlayers);
      return;
    }
    setMessageSearch('');

    const filteredPlayers = originalPlayers.filter(
      (account) =>
        account.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        account.fullname.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setPlayers(filteredPlayers);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleClosePlayer = () => {
    setSelectedPlayer(null);
  };

  const renderPage = () => {
    if (filteredPlayers.length <= PLAYERS_PER_PAGE) {
      return null;
    }

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
                  currentPage ===
                  Math.ceil(filteredPlayers.length / PLAYERS_PER_PAGE)
                }
              >
                <FaAngleRight />
              </button>
              <button
                onClick={() =>
                  handlePageChange(
                    Math.ceil(filteredPlayers.length / PLAYERS_PER_PAGE)
                  )
                }
                disabled={
                  currentPage ===
                  Math.ceil(filteredPlayers.length / PLAYERS_PER_PAGE)
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
      {originalPlayers.length === 0 ? (
        <p className='admin-no-data'>No player data is empty</p>
      ) : (
        <>
          <div className='admin-player-top'>
            <div className='admin-player-search'>
              <input
                type='text'
                placeholder='Search by name or email...'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={handleKey}
                onClick={() => setMessageSearch('')}
              />
              <button className='admin-search-icons' onClick={handleSearch}>
                <FaSearch />
              </button>
            </div>
            <div className='admin-reload-players'>
              <button onClick={handleReload}>
                <FaSyncAlt />
              </button>
            </div>
          </div>
          {messageSearch ? (
            <div className='error-message'>{messageSearch}</div>
          ) : (
            <>
              {currentPlayer.length === 0 ? (
                <div className='error-message'>No data was found</div>
              ) : (
                <div
                  className='none-display'
                  id={currentPlayer.length === 0 ? 'none' : ''}
                >
                  {players.length}{' '}
                  {players.length === 1 ? 'player' : 'players'} found
                </div>
              )}
            </>
          )}
          {currentPlayer.length === 0 ? (
            <div className='admin-player-table-none'></div>
          ) : (
            <div className='admin-player-table'>
              <table className='table table-bordered'>
                <thead>
                  <tr>
                    <th>Avatar</th>
                    <th>Username</th>
                    <th>Fullname</th>
                    <th>Email</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {currentPlayer.map((account) => (
                    <tr key={account.accountID}>
                      <td className='admin-player-avatar'>
                        <img
                          src={`https://localhost:7052/Images/${account.avatarUrl}`}
                          alt={account.fullname}
                        />
                      </td>
                      <td className='admin-player-username'>
                        <span>{account.username}</span>
                      </td>
                      <td className='admin-player-fullname'>
                        <span>{account.fullname}</span>
                      </td>
                      <td className='admin-player-email'>
                        <span>{account.email}</span>
                      </td>
                      <td className='admin-player-status'>
                        <select
                          id={`accountStatus_${account.accountID}`}
                          className='form-control'
                          defaultValue={account.active ? 'true' : 'false'}
                          ref={ref}
                        >
                          <option value='true'>Active</option>
                          <option value='false'>Banned</option>
                        </select>
                      </td>
                      <td className='admin-player-action'>
                        <button
                          className='admin-player-button'
                          onClick={() => setSelectedPlayer(account)}
                        >
                          <FaEye />
                        </button>
                        <button
                          className='admin-player-button'
                          onClick={() => {
                            const isActive = ref.current.value === 'true';
                            playerIsActive(account.accountID, isActive);
                          }}
                        >
                          <FaEdit />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          {isDialogOpen && (
            <div className='admin-player-status-dialog'>
              <div className='admin-player-status-dialog-container'>
                <div className='admin-player-status-dialog-content'>
                  <div className='admin-player-status-dialog-message'>
                    {dialogMessage}
                  </div>
                  <div className='admin-player-status-dialog-action'>
                    <button
                      className='admin-player-status-dialog-button'
                      onClick={handleCloseDialog}
                    >
                      OK
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
          {renderPage()}
          {selectedPlayer && (
            <div className='admin-player-dialog'>
              <div className='admin-player-dialog-content'>
                <div className='admin-player-dialog-main'>
                  <img
                    src={`https://localhost:7052/Images/${selectedPlayer.avatarUrl}`}
                    alt={selectedPlayer.fullname}
                  />
                  <div className='admin-player-dialog-details'>
                    <p>
                      Username: <span>{selectedPlayer.username}</span>
                    </p>
                    <p>
                      Full-name: <span>{selectedPlayer.fullname}</span>
                    </p>
                    <p>
                      Email: <span>{selectedPlayer.email}</span>
                    </p>
                    <p>
                      Gender: <span>{selectedPlayer.gender}</span>
                    </p>
                    <p>
                      Status:{' '}
                      <span>{selectedPlayer.active ? 'active' : 'banned'}</span>
                    </p>
                  </div>
                </div>
                <div className='admin-player-dialog-buttons'>
                  <button onClick={handleClosePlayer}>Close</button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AdminPlayer;
