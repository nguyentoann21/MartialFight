import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FaEdit,
  FaTrash,
  FaTimes,
  FaAngleDoubleLeft,
  FaAngleLeft,
  FaAngleRight,
  FaAngleDoubleRight,
  FaPlusCircle
} from 'react-icons/fa';
import './adminitem.scss';

const AdminItem = () => {

  const account = JSON.parse(localStorage.getItem('ADMIN_DATA'));
  const history = useNavigate();
  useEffect(() => {
    if(!account) {
      history('/');
    }
  }, [account, history]);

  const ITEMS_PER_PAGE = 6;

  const [items, setItems] = useState([]);
  const [activeTab, setActiveTab] = useState(
    localStorage.getItem('activeTab') || 'All'
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    const data = [
      {
        id: 1,
        image: '/assets/images/Axe.png',
        name: 'Axe',
        type: 'Weapon',
        attack: '100',
        hp: '100',
        defend: '100',
        speed: '50',
      },
      {
        id: 1,
        image: '/assets/images/Axe.png',
        name: 'Axe',
        type: 'Weapon',
        attack: '100',
        hp: '100',
        defend: '100',
        speed: '50',
      },
      {
        id: 1,
        image: '/assets/images/Axe.png',
        name: 'Axe',
        type: 'Weapon',
        attack: '100',
        hp: '100',
        defend: '100',
        speed: '50',
      },
      {
        id: 1,
        image: '/assets/images/Axe.png',
        name: 'Axe',
        type: 'Weapon',
        attack: '100',
        hp: '100',
        defend: '100',
        speed: '50',
      },
      {
        id: 1,
        image: '/assets/images/Axe.png',
        name: 'Axe',
        type: 'Weapon',
        attack: '100',
        hp: '100',
        defend: '100',
        speed: '50',
      },
      {
        id: 1,
        image: '/assets/images/Axe.png',
        name: 'Axe',
        type: 'Weapon',
        attack: '100',
        hp: '100',
        defend: '100',
        speed: '50',
      },
      {
        id: 1,
        image: '/assets/images/Axe.png',
        name: 'Axe',
        type: 'Weapon',
        attack: '100',
        hp: '100',
        defend: '100',
        speed: '50',
      },
      {
        id: 1,
        image: '/assets/images/Axe.png',
        name: 'Axe',
        type: 'Weapon',
        attack: '100',
        hp: '100',
        defend: '100',
        speed: '50',
      },
      {
        id: 1,
        image: '/assets/images/Axe.png',
        name: 'Axe',
        type: 'Weapon',
        attack: '100',
        hp: '100',
        defend: '100',
        speed: '50',
      },
      {
        id: 1,
        image: '/assets/images/Axe.png',
        name: 'Axe',
        type: 'Weapon',
        attack: '100',
        hp: '100',
        defend: '100',
        speed: '50',
      },
      {
        id: 1,
        image: '/assets/images/Axe.png',
        name: 'Axe',
        type: 'Weapon',
        attack: '100',
        hp: '100',
        defend: '100',
        speed: '50',
      },
      {
        id: 1,
        image: '/assets/images/Axe.png',
        name: 'Axe',
        type: 'Weapon',
        attack: '100',
        hp: '100',
        defend: '100',
        speed: '50',
      },
      {
        id: 1,
        image: '/assets/images/Axe.png',
        name: 'Axe',
        type: 'Weapon',
        attack: '100',
        hp: '100',
        defend: '100',
        speed: '50',
      },
      {
        id: 1,
        image: '/assets/images/Axe.png',
        name: 'Axe',
        type: 'Weapon',
        attack: '100',
        hp: '100',
        defend: '100',
        speed: '50',
      },
      {
        id: 1,
        image: '/assets/images/Axe.png',
        name: 'Axe',
        type: 'Weapon',
        attack: '100',
        hp: '100',
        defend: '100',
        speed: '50',
      },
      {
        id: 1,
        image: '/assets/images/Axe.png',
        name: 'Axe',
        type: 'Weapon',
        attack: '100',
        hp: '100',
        defend: '100',
        speed: '50',
      },
      {
        id: 1,
        image: '/assets/images/Axe.png',
        name: 'Axe',
        type: 'Weapon',
        attack: '100',
        hp: '100',
        defend: '100',
        speed: '50',
      },
      {
        id: 1,
        image: '/assets/images/Axe.png',
        name: 'Axe',
        type: 'Weapon',
        attack: '100',
        hp: '100',
        defend: '100',
        speed: '50',
      },
      {
        id: 1,
        image: '/assets/images/Axe.png',
        name: 'Axe',
        type: 'Weapon',
        attack: '100',
        hp: '100',
        defend: '100',
        speed: '50',
      },
      {
        id: 1,
        image: '/assets/images/Axe.png',
        name: 'Axe',
        type: 'Weapon',
        attack: '100',
        hp: '100',
        defend: '100',
        speed: '50',
      },
      {
        id: 1,
        image: '/assets/images/Axe.png',
        name: 'Axe',
        type: 'Weapon',
        attack: '100',
        hp: '100',
        defend: '100',
        speed: '50',
      },
      {
        id: 1,
        image: '/assets/images/Axe.png',
        name: 'Axe',
        type: 'Weapon',
        attack: '100',
        hp: '100',
        defend: '100',
        speed: '50',
      },
      {
        id: 1,
        image: '/assets/images/Axe.png',
        name: 'Axe',
        type: 'Weapon',
        attack: '100',
        hp: '100',
        defend: '100',
        speed: '50',
      },
      {
        id: 1,
        image: '/assets/images/Axe.png',
        name: 'Axe',
        type: 'Weapon',
        attack: '100',
        hp: '100',
        defend: '100',
        speed: '50',
      },
      {
        id: 1,
        image: '/assets/images/Axe.png',
        name: 'Axe',
        type: 'Weapon',
        attack: '100',
        hp: '100',
        defend: '100',
        speed: '50',
      },
      {
        id: 1,
        image: '/assets/images/Axe.png',
        name: 'Axe',
        type: 'Weapon',
        attack: '100',
        hp: '100',
        defend: '100',
        speed: '50',
      },
      {
        id: 1,
        image: '/assets/images/Axe.png',
        name: 'Axe',
        type: 'Weapon',
        attack: '100',
        hp: '100',
        defend: '100',
        speed: '50',
      },
      {
        id: 1,
        image: '/assets/images/Axe.png',
        name: 'Axe',
        type: 'Weapon',
        attack: '100',
        hp: '100',
        defend: '100',
        speed: '50',
      },
      {
        id: 1,
        image: '/assets/images/Axe.png',
        name: 'Axe',
        type: 'Weapon',
        attack: '100',
        hp: '100',
        defend: '100',
        speed: '50',
      },
      {
        id: 1,
        image: '/assets/images/Axe.png',
        name: 'Axe',
        type: 'Weapon',
        attack: '100',
        hp: '100',
        defend: '100',
        speed: '50',
      },
      {
        id: 1,
        image: '/assets/images/Axe.png',
        name: 'Axe',
        type: 'Weapon',
        attack: '100',
        hp: '100',
        defend: '100',
        speed: '50',
      },
      {
        id: 1,
        image: '/assets/images/Axe.png',
        name: 'Axe',
        type: 'Weapon',
        attack: '100',
        hp: '100',
        defend: '100',
        speed: '50',
      },
    ];
    setItems(data);
    localStorage.setItem('activeTab', activeTab);
  }, [activeTab]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setCurrentPage(1);
  };

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  const handleCloseDialog = () => {
    setSelectedItem(null);
  };

  const filteredItems =
    activeTab === 'All'
      ? items
      : items.filter((item) => item.type === activeTab);

  const totalPages = Math.ceil(filteredItems.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentItems = filteredItems.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const renderPaginationButtons = () => {
    return (
      <div className='pagination-buttons'>
        {filteredItems.length === 0 ? (
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
                  currentPage === Math.ceil(items.length / ITEMS_PER_PAGE)
                }
              >
                <FaAngleRight />
              </button>
              <button
                onClick={() =>
                  handlePageChange(Math.ceil(items.length / ITEMS_PER_PAGE))
                }
                disabled={
                  currentPage === Math.ceil(items.length / ITEMS_PER_PAGE)
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
    <div className='admin-item-page'>
      <div className='admin-item-top'>
        <h1>Managing Item</h1>
        <div className='admin-add-items'>
          <button>
            Add&nbsp;
            <FaPlusCircle />
          </button>
        </div>
      </div>
      <div className='admin-item-main-container'>
        <button
          onClick={() => handleTabChange('All')}
          className={activeTab === 'All' ? 'active' : 'tab-item'}
        >
          All
        </button>
        <button
          onClick={() => handleTabChange('Weapon')}
          className={activeTab === 'Weapon' ? 'active' : 'tab-item'}
        >
          Weapon
        </button>
        <button
          onClick={() => handleTabChange('Helmet')}
          className={activeTab === 'Helmet' ? 'active' : 'tab-item'}
        >
          Helmet
        </button>
        <button
          onClick={() => handleTabChange('Armor')}
          className={activeTab === 'Armor' ? 'active' : 'tab-item'}
        >
          Armor
        </button>
        <button
          onClick={() => handleTabChange('Shoes')}
          className={activeTab === 'Shoes' ? 'active' : 'tab-item'}
        >
          Shoes
        </button>
        <button
          onClick={() => handleTabChange('Heal')}
          className={activeTab === 'Heal' ? 'active' : 'tab-item'}
        >
          Heal
        </button>
      </div>
      {filteredItems.length === 0 ? (
        <p className='admin-item-active-no-data'>No data was found</p>
      ) : (
        <ul className='admin-item-main'>
          {currentItems.map((item) => (
            <li key={item.id}>
              <div className='admin-item-content'>
                <div className='admin-item-content-top'>
                  <img
                    src={item.image}
                    alt={item.name}
                    onClick={() => handleItemClick(item)}
                  />
                  <h3>{item.name}</h3>
                </div>
                <h4>{item.type}</h4>
                <div className='admin-item-content-details'>
                  <p>
                    Attack: <span>{item.attack}</span>
                  </p>
                  <p>
                    HP: <span>{item.hp}</span>
                  </p>
                  <p>
                    Defend: <span>{item.defend}</span>
                  </p>
                  <p>
                    Speed: <span>{item.speed}</span>
                  </p>
                </div>
              </div>
              <div className='admin-item-button'>
                <button onClick={() => alert('1')}>
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
      {selectedItem && (
        <div className='admin-item-dialog'>
          <div className='admin-item-dialog-content'>
            <div className='admin-item-dialog-buttons'>
              <button onClick={handleCloseDialog}>
                <FaTimes />
              </button>
            </div>
            <div className='admin-item-dialog-main'>
              <img src={selectedItem.image} alt={selectedItem.name} />
              <div className='admin-item-dialog-main-top'>
                <h2>{selectedItem.name}</h2>
                <h3>{selectedItem.type}</h3>
              </div>
            </div>
            <div className='admin-item-dialog-content-details'>
              <p>
                Attack: <span>{selectedItem.attack}</span>
              </p>
              <p>
                HP: <span>{selectedItem.hp}</span>
              </p>
              <p>
                Defend: <span>{selectedItem.defend}</span>
              </p>
              <p>
                Speed: <span>{selectedItem.speed}</span>
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminItem;
