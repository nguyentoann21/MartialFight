import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaStar } from "react-icons/fa";
import "./item.scss";

const Items = () => {
  const [items, setItems] = useState([]);
  const [originalItem, setOriginalItem] = useState([]);
  const [sects, setSects] = useState([]);
  const [categories, setCategories] = useState([]);
  const [sortType, setSortType] = useState("all");

  const loadItem = async () => {
    try {
      const response = await axios.get("https://localhost:7052/api/mf/items");
      setItems(
        response.data.map((item) => {
          return {
            ...item,
            imagePath: item.imagePath ? item.imagePath : null,
            sectName: item.itemSect ? item.itemSect.sectName : "",
            categoryName: item.itemCategory
              ? item.itemCategory.categoryName
              : "",
          };
        })
      );
      setOriginalItem(
        response.data.map((item) => {
          return {
            ...item,
            imagePath: item.imagePath ? item.imagePath : null,
            sectName: item.itemSect ? item.itemSect.sectName : "",
            categoryName: item.itemCategory
              ? item.itemCategory.categoryName
              : "",
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
        const response = await axios.get("https://localhost:7052/api/mf/items");
        setItems(response.data);
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

    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "https://localhost:7052/api/mf/categories"
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
    if (sortType === "all") {
      loadItem();
    } else {
      const sortedItem = originalItem.filter((item) => {
        return item.categoryId === parseInt(sortType, 10);
      });
      setItems(sortedItem);
    }
  };

  return (
    <div className="item-page">
      <div className="items-page-container">
        <h2>Items in game</h2>
        {items.length > 0 && (
          <div className="item-filter">
            <label htmlFor="category">Filter by category</label>
            <select id="category" value={sortType} onChange={handleSortChange}>
              <option value="all">All</option>
              {categories.map((category) => (
                <option key={category.categoryId} value={category.categoryId}>
                  {category.categoryName}
                </option>
              ))}
            </select>
          </div>
        )}
        <div className="item-container">
          {items.length === 0 ? (
            <h1>No data was found</h1>
          ) : (
            items.map((item) => (
              <div key={item.itemId} className="item-card">
                <div className="card-top">
                  <div className="card-image">
                    <img
                      src={`https://localhost:7052/Images/${item.imagePath}`}
                      alt={item.itemName}
                    />
                  </div>
                  <div className="card-top-content">
                    <h3>{item.itemName}</h3>
                    {item.sectId && (
                      <h5>
                        Sect -{" "}
                        {sects.find((sect) => sect.sectId === item.sectId)
                          ?.sectName || ""}
                      </h5>
                    )}
                    {item.categoryId && (
                      <h5>
                        {" "}
                        {categories.find(
                          (category) => category.categoryId === item.categoryId
                        )?.categoryName || ""}
                      </h5>
                    )}
                    <div className="type-item">
                      Level {item.type} <FaStar />
                    </div>
                  </div>
                </div>
                <div className="card-bottom">
                  <div className="card-bottom-left">
                    <label>
                      <p>Gold: </p>
                      <span> {item.gold}</span>
                    </label>
                    <label>
                      <p>Silver: </p> <span>{item.silver}</span>
                    </label>
                    <label>
                      <p>isEquipped: </p>
                      <span> {item.equipped ? "equipped" : "none"}</span>
                    </label>
                    <label>
                      <p>Mana: </p>
                      <span>{item.manaValue}</span>
                    </label>
                  </div>
                  <div className="card-bottom-right">
                    <label>
                      <p>Attack: </p>
                      <span>{item.attackValue}</span>
                    </label>
                    <label>
                      <p>Health: </p>
                      <span>{item.healthValue}</span>
                    </label>
                    <label>
                      <p>Defense: </p>
                      <span>{item.defenseValue}</span>
                    </label>

                    <label>
                      <p>Speed: </p>
                      <span>{item.speedValue}</span>
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
