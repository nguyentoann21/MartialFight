import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './item.scss';

const Items = () => {
  const [items, setItems] = useState([]);
  const [originalItem, setOriginalItem] = useState([]);
  const [sects, setSects] = useState([]);
  const [categories, setCategories] = useState([]);
  const [sortType, setSortType] = useState('all');

  const loadItem = async () => {
    try {
      const response = await axios.get('https://localhost:7052/api/mf/items');
      setItems(
        response.data.map((item) => {
          return {
            ...item,
            image: item.image ? item.image : null,
            sectName: item.itemSect ? item.itemSect.sectName : '',
            categoryName: item.itemCategory
              ? item.itemCategory.categoryName
              : '',
          };
        })
      );
      setOriginalItem(
        response.data.map((item) => {
          return {
            ...item,
            image: item.image ? item.image : null,
            sectName: item.itemSect ? item.itemSect.sectName : '',
            categoryName: item.itemCategory
              ? item.itemCategory.categoryName
              : '',
          };
        })
      );
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadItem();
  }, []);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get('https://localhost:7052/api/mf/items');
        setItems(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchSects = async () => {
      try {
        const response = await axios.get('https://localhost:7052/api/mf/sects');
        setSects(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          'https://localhost:7052/api/mf/categories'
        );
        setCategories(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchItems();
    fetchSects();
    fetchCategories();
  }, []);

  const handleSortChange = (e) => {
    setSortType(e.target.value);
    sortedItems(e.target.value);
  };

  const sortedItems = (sortType) => {
    if (sortType === 'all') {
      loadItem();
    } else {
      const sortedItem = originalItem.filter((item) => {
        return item.categoryID === parseInt(sortType, 10);
      });
      setItems(sortedItem);
    }
  };

  return (
    <div className='item-page'>
      <div className='items-page-container'>
        <h2>Items in game</h2>
        <div className='item-filter'>
          <label htmlFor='category'>Filter by category</label>
          <select id='category' value={sortType} onChange={handleSortChange}>
            <option value='all'>All</option>
            {categories.map((category) => (
              <option key={category.categoryID} value={category.categoryID}>
                {category.categoryName}
              </option>
            ))}
          </select>
        </div>
        <div className='item-container'>
          {items.length === 0 ? (
            <h1>No data was found</h1>
          ) : (
            items.map((item) => (
              <div key={item.itemID} className='item-card'>
                <div className='card-top'>
                  <div className='card-image'>
                    <img
                      src={`https://localhost:7052/${item.image}`}
                      alt={item.itemName}
                    />
                  </div>
                  <div className='card-top-content'>
                    <h3>{item.itemName}</h3>
                    {item.sectID && (
                      <h5>Sect - {' '}
                        {sects.find((sect) => sect.sectID === item.sectID)
                          ?.sectName || ''}
                      </h5>
                    )}
                    {item.categoryID && (
                      <h5>{' '} 
                        {categories.find(
                          (category) => category.categoryID === item.categoryID
                        )?.categoryName || ''}
                      </h5>
                    )}
                  </div>
                </div>
                <div className='card-bottom'>
                  <div className='card-bottom-left'>
                    <label>
                      <p>Gold: </p>
                      <span> {item.gold}</span>
                    </label>
                    <label>
                      <p>Diamond: </p> <span>{item.diamond}</span>
                    </label>
                    <label>
                      <p>Type: </p>
                      <span> Level {item.itemType}</span>
                    </label>
                    <label>
                      <p>isEquipped: </p>
                      <span> {item.equipped ? 'equipped' : 'none'}</span>
                    </label>
                  </div>
                  <div className='card-bottom-right'>
                    <label>
                      <p>Attack: </p>
                      <span> 1000</span>
                    </label>
                    <label>
                      <p>Defense: </p>
                      <span> 1000</span>
                    </label>
                    <label>
                      <p>Speed: </p>
                      <span> 1000</span>
                    </label>
                    <label>
                      <p>Intellect: </p>
                      <span> 1000</span>
                    </label>
                  </div>
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
