import React, { useState } from 'react';
import './item.scss';

const itemsData = [
  {
    id: 1,
    image: '/assets/images/Axe.png',
    name: 'Item 1',
    type: 'Helmet',
    guide: 'Item 1 guide',
    attack: 10,
    defend: 5,
    speed: 3,
    hp: 20,
  },
  {
    id: 2,
    image: '/assets/images/Axe.png',
    name: 'Item 2',
    type: 'Armor',
    guide: 'Item 2 guide',
    attack: 10,
    defend: 25,
    speed: 3,
    hp: 20,
  },
  {
    id: 3,
    image: '/assets/images/Axe.png',
    name: 'Item 3',
    type: 'Shoe1',
    guide: 'Item 3 guide',
    attack: 10,
    defend: 5,
    speed: 30,
    hp: 20,
  },
  {
    id: 4,
    image: '/assets/images/Axe.png',
    name: 'Item 4',
    type: 'Heal',
    guide: 'Item 4 guide',
    attack: 10,
    defend: 5,
    speed: 3,
    hp: 20,
  },
  {
    id: 5,
    image: '/assets/images/Axe.png',
    name: 'Item 5',
    type: 'Helmet',
    guide: 'Item 5 guide',
    attack: 10,
    defend: 35,
    speed: 3,
    hp: 20,
  },
  {
    id: 6,
    image: '/assets/images/Axe.png',
    name: 'Item 6',
    type: 'Weapon',
    guide: 'Item 6 guide',
    attack: 100,
    defend: 5,
    speed: 3,
    hp: 20,
  },
];

const Items = () => {
  const [filterType, setFilterType] = useState('All');

  const handleFilterChange = (event) => {
    setFilterType(event.target.value);
  };

  const filteredItems =
    filterType === 'All'
      ? itemsData
      : itemsData.filter((item) => item.type === filterType);

  return (
    <div className='item-page'>
      <div className='items-page-container'>
        <h2>Items</h2>
        <div className='item-filter'>
          <select value={filterType} onChange={handleFilterChange}>
            <option value='All'>All</option>
            <option value='Weapon'>Weapon</option>
            <option value='Helmet'>Helmet</option>
            <option value='Armor'>Armor</option>
            <option value='Shoe'>Shoe</option>
            <option value='Heal'>Heal</option>
          </select>
        </div>
        <div className='item-container'>
          {filteredItems.length === 0 ? (
            <h1>No data was found</h1>
          ) : (
            filteredItems.map((item) => (
              <div key={item.id} className='item-card'>
                <img src={item.image} alt={item.name} className='item-image' />
                <div className='item-info'>
                  <h3>{item.name}</h3>
                  <h5>Type: {item.type}</h5>
                  <h6>Guide: {item.guide}</h6>
                  <p>Attack: {item.attack}</p>
                  <p>Defend: {item.defend}</p>
                  <p>Speed: {item.speed}</p>
                  <p>HP: {item.hp}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Items;
