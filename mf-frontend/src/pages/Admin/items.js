import React, { useState } from "react";
import { FaEdit, FaTrash, FaTimes, FaAngleDoubleLeft, FaAngleLeft, FaAngleRight, FaAngleDoubleRight } from "react-icons/fa";
import "./adminitem.css";

const items = [
  {
    id: 1,
    image: "item1.png",
    name: "Item 1",
    type: "Weapon",
    description: "Description for Item 1",
  },
  {
    id: 1,
    image: "item1.png",
    name: "Item 1",
    type: "Weapon",
    description: "Description for Item 1",
  },
  {
    id: 1,
    image: "item1.png",
    name: "Item 1",
    type: "Weapon",
    description: "Description for Item 1",
  },
  {
    id: 1,
    image: "item1.png",
    name: "Item 1",
    type: "Weapon",
    description: "Description for Item 1",
  },
  {
    id: 1,
    image: "item1.png",
    name: "Item 1",
    type: "Weapon",
    description: "Description for Item 1",
  },
  {
    id: 1,
    image: "item1.png",
    name: "Item 1",
    type: "Weapon",
    description: "Description for Item 1",
  },
  {
    id: 1,
    image: "item1.png",
    name: "Item 1",
    type: "Weapon",
    description: "Description for Item 1",
  },
  {
    id: 1,
    image: "item1.png",
    name: "Item 1",
    type: "Weapon",
    description: "Description for Item 1",
  },
  {
    id: 1,
    image: "item1.png",
    name: "Item 1",
    type: "Weapon",
    description: "Description for Item 1",
  },
  {
    id: 1,
    image: "item1.png",
    name: "Item 1",
    type: "Weapon",
    description: "Description for Item 1",
  },
  {
    id: 1,
    image: "item1.png",
    name: "Item 1",
    type: "Weapon",
    description: "Description for Item 1",
  },
  {
    id: 1,
    image: "item1.png",
    name: "Item 1",
    type: "Weapon",
    description: "Description for Item 1",
  },
  {
    id: 1,
    image: "item1.png",
    name: "Item 1",
    type: "Weapon",
    description: "Description for Item 1",
  },
  {
    id: 1,
    image: "item1.png",
    name: "Item 1",
    type: "Weapon",
    description: "Description for Item 1",
  },
  {
    id: 1,
    image: "item1.png",
    name: "Item 1",
    type: "Weapon",
    description: "Description for Item 1",
  },
  {
    id: 1,
    image: "item1.png",
    name: "Item 1",
    type: "Weapon",
    description: "Description for Item 1",
  },
  {
    id: 1,
    image: "item1.png",
    name: "Item 1",
    type: "Weapon",
    description: "Description for Item 1",
  },
  {
    id: 1,
    image: "item1.png",
    name: "Item 1",
    type: "Weapon",
    description: "Description for Item 1",
  },
  {
    id: 1,
    image: "item1.png",
    name: "Item 1",
    type: "Weapon",
    description: "Description for Item 1",
  },
  {
    id: 1,
    image: "item1.png",
    name: "Item 1",
    type: "Weapon",
    description: "Description for Item 1",
  },
  {
    id: 1,
    image: "item1.png",
    name: "Item 1",
    type: "Weapon",
    description: "Description for Item 1",
  },
  {
    id: 1,
    image: "item1.png",
    name: "Item 1",
    type: "Weapon",
    description: "Description for Item 1",
  },
  {
    id: 1,
    image: "item1.png",
    name: "Item 1",
    type: "Weapon",
    description: "Description for Item 1",
  },
  {
    id: 1,
    image: "item1.png",
    name: "Item 1",
    type: "Weapon",
    description: "Description for Item 1",
  },
  {
    id: 1,
    image: "item1.png",
    name: "Item 1",
    type: "Weapon",
    description: "Description for Item 1",
  },
  {
    id: 1,
    image: "item1.png",
    name: "Item 1",
    type: "Weapon",
    description: "Description for Item 1",
  },
  {
    id: 1,
    image: "item1.png",
    name: "Item 1",
    type: "Weapon",
    description: "Description for Item 1",
  },
  {
    id: 1,
    image: "item1.png",
    name: "Item 1",
    type: "Weapon",
    description: "Description for Item 1",
  },
  {
    id: 1,
    image: "item1.png",
    name: "Item 1",
    type: "Weapon",
    description: "Description for Item 1",
  },
  {
    id: 1,
    image: "item1.png",
    name: "Item 1",
    type: "Weapon",
    description: "Description for Item 1",
  },
  {
    id: 1,
    image: "item1.png",
    name: "Item 1",
    type: "Weapon",
    description: "Description for Item 1",
  },
  {
    id: 1,
    image: "item1.png",
    name: "Item 1",
    type: "Weapon",
    description: "Description for Item 1",
  },
];

const ItemsManagement = () => {
  const ITEMS_PER_PAGE = 15;

  const [activeTab, setActiveTab] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setCurrentPage(1); // Reset page when changing tabs
  };

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  const handleCloseDialog = () => {
    setSelectedItem(null);
  };

  const filteredItems =
    activeTab === "All"
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
        <button onClick={() => handleTabChange("All")}>All</button>
        <button onClick={() => handleTabChange("Weapon")}>Weapon</button>
        <button onClick={() => handleTabChange("Helmet")}>Helmet</button>
        <button onClick={() => handleTabChange("Armor")}>Armor</button>
        <button onClick={() => handleTabChange("Shoe")}>Shoe</button>
        <button onClick={() => handleTabChange("Heal")}>Heal</button>
      </div>
      <ul>
        {currentItems.map((item) => (
          <li key={item.id} onClick={() => handleItemClick(item)}>
            <img src={item.image} alt={item.name} />
            <h3>{item.name}</h3>
            <p>Type: {item.type}</p>
            <p>Description: {item.description}</p>
            <button>
              <FaEdit />
            </button>
            <button>
              <FaTrash />
            </button>
          </li>
        ))}
      </ul>
      {totalPages > 1 && renderPaginationButtons()}
      {selectedItem && (
        <div className="dialog">
          <div className="dialog-content">
            <h2>{selectedItem.name}</h2>
            <p>Type: {selectedItem.type}</p>
            <p>Description: {selectedItem.description}</p>
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

export default ItemsManagement;
