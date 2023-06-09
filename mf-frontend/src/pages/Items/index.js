import React, { useState } from 'react';
import './item.css';

const itemsData = [
  {
    id: 1,
    image: 'item1.png',
    name: 'Item 1',
    description: 'This is item 1',
    type: 'Helmet',
    guide: 'Item 1 guide',
    attack: 10,
    defend: 5,
    speed: 3,
    hp: 20
  },
  {
    id: 2,
    image: 'item1.png',
    name: 'Item 2',
    description: 'This is item 3',
    type: 'Armor',
    guide: 'Item 2 guide',
    attack: 10,
    defend: 25,
    speed: 3,
    hp: 20
  },
  {
    id: 3,
    image: 'item1.png',
    name: 'Item 3',
    description: 'This is item 3',
    type: 'Shoe',
    guide: 'Item 3 guide',
    attack: 10,
    defend: 5,
    speed: 30,
    hp: 20
  },
  {
    id: 4,
    image: 'item1.png',
    name: 'Item 4',
    description: 'This is item 4',
    type: 'Heal',
    guide: 'Item 4 guide',
    attack: 10,
    defend: 5,
    speed: 3,
    hp: 20
  },
  {
    id: 5,
    image: 'item1.png',
    name: 'Item 5',
    description: 'This is item 5',
    type: 'Helmet',
    guide: 'Item 5 guide',
    attack: 10,
    defend: 35,
    speed: 3,
    hp: 20
  },
  {
    id: 6,
    image: 'item1.png',
    name: 'Item 6',
    description: 'This is item 6',
    type: 'Weapon',
    guide: 'Item 6 guide',
    attack: 100,
    defend: 5,
    speed: 3,
    hp: 20
  },
];

const Items = () => {
  const [filterType, setFilterType] = useState('All');

  const handleFilterChange = (event) => {
    setFilterType(event.target.value);
  };

  const filteredItems = filterType === 'All'
    ? itemsData
    : itemsData.filter(item => item.type === filterType);

  return (
    <div>
      <select value={filterType} onChange={handleFilterChange}>
        <option value="All">All</option>
        <option value="Weapon">Weapon</option>
        <option value="Helmet">Helmet</option>
        <option value="Armor">Armor</option>
        <option value="Shoe">Shoe</option>
        <option value="Heal">Heal</option>
      </select>

      <div className="item-container">
        {filteredItems.map(item => (
          <div key={item.id} className="item-card">
            <img src={item.image} alt={item.name} className="item-image" />
            <div className="item-info">
              <h3>{item.name}</h3>
              <p>{item.description}</p>
              <p>Type: {item.type}</p>
              <p>Guide: {item.guide}</p>
              <p>Attack: {item.attack}</p>
              <p>Defend: {item.defend}</p>
              <p>Speed: {item.speed}</p>
              <p>HP: {item.hp}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Items;
