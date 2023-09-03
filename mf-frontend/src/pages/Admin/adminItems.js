import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
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
} from "react-icons/fa";
import "./adminItems.scss";

const AdminItem = () => {
  const account = JSON.parse(localStorage.getItem("ADMIN_DATA"));
  const history = useNavigate();

  useEffect(() => {
    if (!account) {
      history("/");
    }
  }, [account, history]);

  const ITEM_PER_PAGE = 10;
  const [items, setItems] = useState([]);
  const [sects, setSects] = useState([]);
  const [categories, setCategories] = useState([]);
  const [defaultSect, setDefaultSect] = useState(null);
  const [defaultCategory, setDefaultCategory] = useState(null);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [dialogMode, setDialogMode] = useState("create");
  const [nullMode, setNullMode] = useState("");
  const [currentItem, setCurrentItem] = useState({
    itemName: "",
    description: "",
    imagePath: null,
    gold: "",
    silver: "",
    type: "",
    equipped: false,
    sectId: "",
    categoryId: "",
    attackValue: "",
    healthValue: "",
    manaValue: "",
    defenseValue: "",
    speedValue: "",
    intellectValue: "",
    physicalValue: "",
  });

  const [message, setMessage] = useState("");
  const [deleteDialogVisible, setDeleteDialogVisible] = useState(false);
  const [itemRemoved, setItemRemoved] = useState(null);
  const [viewDialogVisible, setViewDialogVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [messageSearch, setMessageSearch] = useState("");
  const [originalItem, setOriginalItem] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredItem, setFilteredItem] = useState([]);
  const startIndex = (currentPage - 1) * ITEM_PER_PAGE;
  const endIndex = startIndex + ITEM_PER_PAGE;
  const currentItemPage = filteredItem.slice(startIndex, endIndex);
  const [sortType, setSortType] = useState("all");
  const [dialogMessage, setDialogMessage] = useState(false);

  const showDeleteDialog = (item) => {
    setItemRemoved(item);
    setDeleteDialogVisible(true);
  };

  const closeDeleteDialog = () => {
    setDeleteDialogVisible(false);
    setItemRemoved(null);
    loadItem();
  };

  useEffect(() => {
    setFilteredItem(items);
  }, [items, searchTerm]);

  useEffect(() => {
    return () => {
      if (currentItem.imagePath && currentItem.imagePath[0]) {
        window.URL.revokeObjectURL(currentItem.imagePath[0]);
      }
    };
  }, [currentItem.imagePath]);

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
        if (response.data.length > 0) {
          setDefaultSect(response.data[0].sectId);
        }
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
        if (response.data.length > 0) {
          setDefaultCategory(response.data[0].categoryId);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchItems();
    fetchSects();
    fetchCategories();
  }, [defaultSect, defaultCategory]);

  const actionItem = async () => {
    const formData = new FormData();
    
    const original = originalItem.find(
      (item) => item.itemId === currentItem.itemId
    );
    if (dialogMode === "update") {
      formData.append("itemId", currentItem.itemId);

      if (
        currentItem.itemName !== original.itemName ||
        currentItem.description !== original.description ||
        currentItem.gold !== original.gold ||
        currentItem.silver !== original.silver ||
        currentItem.attackValue !== original.attackValue ||
        currentItem.healthValue !== original.healthValue ||
        currentItem.manaValue !== original.manaValue ||
        currentItem.defenseValue !== original.defenseValue ||
        currentItem.speedValue !== original.speedValue ||
        currentItem.intellectValue !== original.intellectValue ||
        currentItem.physicalValue !== original.physicalValue ||
        currentItem.type !== original.type ||
        currentItem.equipped !== original.equipped ||
        currentItem.sectId !== original.sectId ||
        currentItem.categoryId !== original.categoryId ||
        (currentItem.imagePath && currentItem.imagePath !== original.imagePath)
      ) {
        formData.append("itemName", currentItem.itemName);
        formData.append("description", currentItem.description);
        formData.append("gold", currentItem.gold);
        formData.append("silver", currentItem.silver);
        formData.append("type", currentItem.type);
        formData.append("attackValue", currentItem.attackValue);
        formData.append("manaValue", currentItem.manaValue);
        formData.append("healthValue", currentItem.healthValue);
        formData.append("defenseValue", currentItem.defenseValue);
        formData.append("speedValue", currentItem.speedValue);
        formData.append("intellectValue", currentItem.intellectValue);
        formData.append("physicalValue", currentItem.physicalValue);
        formData.append("equipped", currentItem.equipped);
        formData.append("sectId", currentItem.sectId);
        formData.append("categoryId", currentItem.categoryId);
        formData.append("imagePath", currentItem.imagePath);
      } else {
        setMessage("Nothing to update");
        return;
      }
    } else {
      if (currentItem.itemName !== originalItem.itemName) {
        formData.append("itemName", currentItem.itemName);
      }
      if (currentItem.description !== originalItem.description) {
        formData.append("description", currentItem.description);
      }
      if (currentItem.gold !== originalItem.gold) {
        formData.append("gold", currentItem.gold);
      }
      if (currentItem.silver !== originalItem.silver) {
        formData.append("silver", currentItem.silver);
      }
      if (currentItem.type !== originalItem.type) {
        formData.append("type", currentItem.type);
      }
      if (currentItem.attackValue !== originalItem.attackValue) {
        formData.append("attackValue", currentItem.attackValue);
      }
      if (currentItem.healthValue !== originalItem.healthValue) {
        formData.append("healthValue", currentItem.healthValue);
      }
      if (currentItem.defenseValue !== originalItem.defenseValue) {
        formData.append("defenseValue", currentItem.defenseValue);
      }
      if (currentItem.manaValue !== originalItem.manaValue) {
        formData.append("manaValue", currentItem.manaValue);
      }
      if (currentItem.speedValue !== originalItem.speedValue) {
        formData.append("speedValue", currentItem.speedValue);
      }
      if (currentItem.intellectValue !== originalItem.intellectValue) {
        formData.append("intellectValue", currentItem.intellectValue);
      }
      if (currentItem.physicalValue !== originalItem.physicalValue) {
        formData.append("physicalValue", currentItem.physicalValue);
      }
      if (currentItem.equipped !== originalItem.equipped) {
        formData.append("equipped", currentItem.equipped);
      }
      if (currentItem.sectId !== originalItem.sectId) {
        formData.append("sectId", currentItem.sectId);
      }
      if (currentItem.categoryId !== originalItem.categoryId) {
        formData.append("categoryId", currentItem.categoryId);
      }
      if (
        currentItem.imagePath &&
        currentItem.imagePath !== originalItem.imagePath
      ) {
        formData.append("imagePath", currentItem.imagePath);
      }
    }

    const url =
      dialogMode === "create"
        ? "https://localhost:7052/api/mf/items"
        : `https://localhost:7052/api/mf/items/${currentItem.itemId}`;

    try {
      let response;
      if (dialogMode === "create") {
        response = await axios.post(url, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        setMessage("Item created successfully");
      } else if (dialogMode === "update") {
        response = await axios.put(url, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        setMessage("Item updated successfully");
      }

      if (response.status === 200 || response.status === 202) {
        setDialogVisible(false);
        loadItem();
      } else {
        setMessage("Failed to save the item");
      }
    } catch (error) {
      console.error(error);
      if (error.response.status === 405 || error.response.status === 409) {
        setMessage(error.response.data);
      } else {
        setMessage("Failed to save the item");
      }
    }
  };

  const removeItem = async () => {
    if (itemRemoved) {
      try {
        await axios.delete(
          `https://localhost:7052/api/mf/items/${itemRemoved.itemId}`
        );
        setMessage("Item deleted successfully");
        loadItem();
        if (currentItemPage.length === 1 && currentPage > 1) {
          setCurrentPage(currentPage - 1);
        }
      } catch (error) {
        console.error(error);

        if (error.response && error.response.status === 409) {
          setMessage("This item is referenced in map(s), cannot be deleted");
        } else {
          setMessage("Failed to delete the item");
        }
      }
      closeDeleteDialog();
    }
  };

  const handleDialogOpen = (mode, item) => {
    if (mode === "view") {
      setCurrentItem(item);
      setViewDialogVisible(true);
    } else if (mode === "create") {
      if (sects.length === 0 || categories.length === 0) {
        setDialogMessage(true);
        if (sects.length === 0) {
          setNullMode("sect");
        } else if (categories.length === 0) {
          setNullMode("categories");
        }
      } else {
        setDialogMode(mode);
        setCurrentItem({
          ...item,
          imagePath: null,
          equipped: false,
          sectId: defaultSect,
          categoryId: defaultCategory,
        });
        setDialogVisible(true);
      }
    } else {
      setDialogMode(mode);
      setCurrentItem({
        ...currentItem,
        ...item,
      });
      setDialogVisible(true);
    }
  };

  const handleDialogClose = () => {
    setDialogVisible(false);
    setCurrentItem({});
  };

  const closeViewDialog = () => {
    setViewDialogVisible(false);
  };

  const handleClose = (mode) => {
    setDialogMessage(false);
    if (mode === "sect") {
      localStorage.setItem("activeItem", "Sects");
      history("/admin-sects");
    } else if (mode === "categories") {
      localStorage.setItem("activeItem", "Categories");
      history("/admin-categories");
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
    setSortType("all");
  };

  const handleSearch = () => {
    if (searchTerm.trim() === "") {
      setMessageSearch("Please enter a valid data for search");
      setItems(originalItem);
      return;
    }
    setMessageSearch("");
    const filteredItem = originalItem.filter((item) =>
      item.itemName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setItems(filteredItem);
  };

  const handleKey = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleReload = () => {
    setSearchTerm("");
    setMessageSearch("");
    setSortType("all");
    setCurrentPage(1);
    loadItem();
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSortChange = (e) => {
    setSortType(e.target.value);
    sortItem(e.target.value);
    setSearchTerm("");
    setMessageSearch("");
    setCurrentPage(1);
  };

  const sortItem = (sortType) => {
    console.log("sortType:", sortType, typeof sortType);
    if (sortType === "all") {
      loadItem();
    } else {
      const sortedItem = originalItem.filter((item) => {
        return item.categoryId === parseInt(sortType, 10);
      });
      setItems(sortedItem);
    }
  };

  const renderPage = () => {
    if (filteredItem.length <= ITEM_PER_PAGE) {
      return null;
    }

    return (
      <div className="pagination-buttons">
        {filteredItem.length === 0 ? (
          <div></div>
        ) : (
          <div className="pagination">
            <div className="footer-page">
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
              <div className="page-number">Page {currentPage}</div>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={
                  currentPage === Math.ceil(filteredItem.length / ITEM_PER_PAGE)
                }
              >
                <FaAngleRight />
              </button>
              <button
                onClick={() =>
                  handlePageChange(
                    Math.ceil(filteredItem.length / ITEM_PER_PAGE)
                  )
                }
                disabled={
                  currentPage === Math.ceil(filteredItem.length / ITEM_PER_PAGE)
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
    <div className="admin-item-container">
      <h1>Managing Item</h1>
      {originalItem.length === 0 ? (
        <div className="admin-item-nodata">
          <p className="admin-item-empty">The item list is empty</p>
          <div className="admin-add-item-empty">
            <button onClick={() => handleDialogOpen("create")}>
              <FaPlus />
            </button>
          </div>
          {dialogMessage && (
            <div className="dialog-no-action-container">
              <div className="dialog-no-action-content">
                <h2>
                  No {nullMode === "sect" ? "Sect" : "Category"} Available
                </h2>
                <p>
                  There are no {nullMode === "sect" ? "sects" : "categories"}{" "}
                  available. Please add a{" "}
                  {nullMode === "sect" ? "sect" : "category"} first.
                </p>
                <div className="dialog-no-action-group">
                  <button
                    onClick={() =>
                      handleClose(nullMode === "sect" ? "sect" : "categories")
                    }
                  >
                    OK
                  </button>
                </div>
              </div>
            </div>
          )}
          {dialogVisible && (
            <div className="dialog-empt-action-container">
              <div className="dialog-empt-action-content">
                <h2>{dialogMode === "create" ? "Create" : "Update"} Item</h2>
                <div className="dialog-empt-action-main">
                  <div className="dialog-empt-action-image-main">
                    <label className="dialog-empt-action-image-group">
                      <input
                        type="file"
                        id="images"
                        accept="image/*"
                        onChange={(e) =>
                          setCurrentItem({
                            ...currentItem,
                            imagePath: e.target.files[0],
                          })
                        }
                        hidden
                        required={!currentItem.itemId}
                      />
                      {currentItem.imagePath ? (
                        <img
                          src={
                            currentItem.imagePath instanceof File
                              ? window.URL.createObjectURL(
                                  currentItem.imagePath
                                )
                              : `https://localhost:7052/Images/${currentItem.imagePath}`
                          }
                          alt="item-img"
                        />
                      ) : (
                        <img src="/assets/images/map.jpg" alt="item-img" />
                      )}
                    </label>
                  </div>
                  <div className="dialog-empt-action-content-main">
                    <div className="main-input">
                      <div className="left-side">
                        <div className="dialog-empt-action-group">
                          <label htmlFor="itemName">Item Name:</label>
                          <input
                            className="item_name"
                            type="text"
                            id="itemName"
                            value={currentItem.itemName || ""}
                            onChange={(e) =>
                              setCurrentItem({
                                ...currentItem,
                                itemName: e.target.value,
                              })
                            }
                            placeholder="Please enter item name"
                          />
                        </div>
                        <div className="dialog-empt-action-group">
                          <label htmlFor="description">Description:</label>
                          <textarea
                            id="description"
                            value={currentItem.description || ""}
                            onChange={(e) =>
                              setCurrentItem({
                                ...currentItem,
                                description: e.target.value,
                              })
                            }
                            placeholder="Please enter the item description"
                          />
                        </div>
                        <div className="dialog-empt-action-group">
                          <label htmlFor="equipped">Equipped:</label>
                          <input
                            type="checkbox"
                            id="equipped"
                            checked={currentItem.equipped}
                            onChange={(e) =>
                              setCurrentItem({
                                ...currentItem,
                                equipped: e.target.checked,
                              })
                            }
                          />
                        </div>
                      </div>
                      <div className="center-side">
                        <div className="dialog-empt-action-group">
                          <label htmlFor="gold">Gold:</label>
                          <input
                            type="number"
                            id="gold"
                            value={
                              currentItem.gold !== undefined
                                ? currentItem.gold
                                : ""
                            }
                            min={0}
                            onChange={(e) =>
                              setCurrentItem({
                                ...currentItem,
                                gold: e.target.value,
                              })
                            }
                            placeholder="Please enter number value"
                          />
                        </div>
                        <div className="dialog-empt-action-group">
                          <label htmlFor="silver">Silver:</label>
                          <input
                            type="number"
                            id="silver"
                            value={
                              currentItem.silver !== undefined
                                ? currentItem.silver
                                : ""
                            }
                            min={0}
                            onChange={(e) =>
                              setCurrentItem({
                                ...currentItem,
                                silver: e.target.value,
                              })
                            }
                            placeholder="Please enter number value"
                          />
                        </div>
                        <div className="dialog-empt-action-group">
                          <label htmlFor="manaValue">Mana:</label>
                          <input
                            type="number"
                            id="manaValue"
                            value={
                              currentItem.manaValue !== undefined
                                ? currentItem.manaValue
                                : ""
                            }
                            min={0}
                            onChange={(e) =>
                              setCurrentItem({
                                ...currentItem,
                                manaValue: e.target.value,
                              })
                            }
                            placeholder="Please enter number value"
                          />
                        </div>
                        <div className="dialog-empt-action-group">
                          <label htmlFor="type">Item Type:</label>
                          <input
                            type="number"
                            id="type"
                            min={0}
                            value={
                              currentItem.type !== undefined
                                ? currentItem.type
                                : ""
                            }
                            onChange={(e) =>
                              setCurrentItem({
                                ...currentItem,
                                type: e.target.value,
                              })
                            }
                            placeholder="Please enter item type (level 1, level 2, etc)"
                          />
                        </div>

                        <div className="dialog-empt-action-group">
                          <label htmlFor="sectId">Sect:</label>
                          <select
                            className="sectId"
                            id="sectId"
                            value={currentItem.sectId || ""}
                            onChange={(e) =>
                              setCurrentItem({
                                ...currentItem,
                                sectId: parseInt(e.target.value, 10),
                              })
                            }
                          >
                            {sects.map((sect) => (
                              <option key={sect.sectId} value={sect.sectId}>
                                {sect.sectName}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="dialog-empt-action-group">
                          <label htmlFor="categoryId">Category:</label>
                          <select
                            className="categoryId"
                            id="categoryId"
                            value={currentItem.categoryId || ""}
                            onChange={(e) =>
                              setCurrentItem({
                                ...currentItem,
                                categoryId: parseInt(e.target.value, 10),
                              })
                            }
                          >
                            {categories.map((category) => (
                              <option
                                key={category.categoryId}
                                value={category.categoryId}
                              >
                                {category.categoryName}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div className="right-side">
                        <div className="dialog-empt-action-group">
                          <label htmlFor="attackValue">Attack:</label>
                          <input
                            type="number"
                            id="attackValue"
                            value={
                              currentItem.attackValue !== undefined
                                ? currentItem.attackValue
                                : ""
                            }
                            min={0}
                            onChange={(e) =>
                              setCurrentItem({
                                ...currentItem,
                                attackValue: e.target.value,
                              })
                            }
                            placeholder="Please enter number value"
                          />
                        </div>
                        <div className="dialog-empt-action-group">
                          <label htmlFor="healthValue">Health:</label>
                          <input
                            type="number"
                            id="healthValue"
                            value={
                              currentItem.healthValue !== undefined
                                ? currentItem.healthValue
                                : ""
                            }
                            min={0}
                            onChange={(e) =>
                              setCurrentItem({
                                ...currentItem,
                                healthValue: e.target.value,
                              })
                            }
                            placeholder="Please enter number value"
                          />
                        </div>
                        <div className="dialog-empt-action-group">
                          <label htmlFor="defenseValue">Defense:</label>
                          <input
                            type="number"
                            id="defenseValue"
                            value={
                              currentItem.defenseValue !== undefined
                                ? currentItem.defenseValue
                                : ""
                            }
                            min={0}
                            onChange={(e) =>
                              setCurrentItem({
                                ...currentItem,
                                defenseValue: e.target.value,
                              })
                            }
                            placeholder="Please enter number value"
                          />
                        </div>
                        <div className="dialog-empt-action-group">
                          <label htmlFor="speedValue">Speed:</label>
                          <input
                            type="number"
                            id="speedValue"
                            min={0}
                            value={
                              currentItem.speedValue !== undefined
                                ? currentItem.speedValue
                                : ""
                            }
                            onChange={(e) =>
                              setCurrentItem({
                                ...currentItem,
                                speedValue: e.target.value,
                              })
                            }
                            placeholder="Please enter number value"
                          />
                        </div>
                        <div className="dialog-empt-action-group">
                          <label htmlFor="intellectValue">Intellect:</label>
                          <input
                            type="number"
                            id="intellectValue"
                            min={0}
                            value={
                              currentItem.intellectValue !== undefined
                                ? currentItem.intellectValue
                                : ""
                            }
                            onChange={(e) =>
                              setCurrentItem({
                                ...currentItem,
                                intellectValue: e.target.value,
                              })
                            }
                            placeholder="Please enter number value"
                          />
                        </div>
                        <div className="dialog-empt-action-group">
                          <label htmlFor="physicalValue">Physical:</label>
                          <input
                            type="number"
                            id="physicalValue"
                            min={0}
                            value={
                              currentItem.physicalValue !== undefined
                                ? currentItem.physicalValue
                                : ""
                            }
                            onChange={(e) =>
                              setCurrentItem({
                                ...currentItem,
                                physicalValue: e.target.value,
                              })
                            }
                            placeholder="Please enter number value"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="dialog-empt-action-handle">
                      <button onClick={actionItem} id="actions-empt">
                        {dialogMode === "create" ? "Create" : "Update"}
                      </button>
                      <button
                        onClick={handleDialogClose}
                        id="cancel-empt-actions"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          {message && (
            <div className="dialog-message-container">
              <div className="dialog-message-content">
                <p>{message}</p>
                <button onClick={() => setMessage("")}>OK</button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <>
          <div className="admin-items-top">
            <div className="admin-search-bar">
              <input
                type="text"
                placeholder="Search by name..."
                value={searchTerm}
                onChange={handleSearchChange}
                onKeyDown={handleKey}
              />
              <button className="admin-search-icons" onClick={handleSearch}>
                <FaSearch />
              </button>
              <button className="admin-search-reload" onClick={handleReload}>
                <FaSyncAlt />
              </button>
            </div>
            <div className="admin-items-filter">
              <select value={sortType} onChange={handleSortChange}>
                <option value="all">All</option>
                {categories.map((category) => (
                  <option key={category.categoryId} value={category.categoryId}>
                    {category.categoryName}
                  </option>
                ))}
              </select>
            </div>
            <div className="admin-add-items">
              <button onClick={() => handleDialogOpen("create")}>
                Create&nbsp;
                <FaPlus />
              </button>
            </div>
          </div>
          {messageSearch ? (
            <div className="error-message">{messageSearch}</div>
          ) : (
            <>
              {currentItemPage.length === 0 ? (
                <div className="error-message">No data was found</div>
              ) : (
                <div
                  className="none-display"
                  id={currentItemPage.length === 0 ? "none" : ""}
                >
                  {items.length} {items.length === 1 ? "item" : "items"} found
                </div>
              )}
            </>
          )}
          {currentItemPage.length === 0 ? (
            <div className="table-nodata-display"></div>
          ) : (
            <div className="admin-items-table">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Gold</th>
                    <th>Silver</th>
                    <th>Sect</th>
                    <th>Category</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentItemPage.map((item) => (
                    <tr key={item.itemId}>
                      <td className="admin-items-images">
                        <div className="image-container">
                          {item.imagePath && (
                            <img
                              src={`https://localhost:7052/Images/${item.imagePath}`}
                              alt="item-img"
                            />
                          )}
                        </div>
                      </td>
                      <td className="admin-item-name">
                        <span>{item.itemName}</span>
                      </td>
                      <td className="admin-item-gold">
                        <span>{item.gold}</span>
                      </td>
                      <td className="admin-item-diamond">
                        <span>{item.silver}</span>
                      </td>
                      <td className="admin-item-sect">
                        {item.sectId && (
                          <span>
                            {sects.find((sect) => sect.sectId === item.sectId)
                              ?.sectName || ""}
                          </span>
                        )}
                      </td>
                      <td className="admin-item-category">
                        {item.categoryId && (
                          <span>
                            {categories.find(
                              (category) =>
                                category.categoryId === item.categoryId
                            )?.categoryName || ""}
                          </span>
                        )}
                      </td>
                      <td className="admin-items-actions">
                        <button onClick={() => handleDialogOpen("view", item)}>
                          <FaEye />
                        </button>
                        <button
                          onClick={() => handleDialogOpen("update", item)}
                        >
                          <FaEdit />
                        </button>
                        <button onClick={() => showDeleteDialog(item)}>
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          {deleteDialogVisible && (
            <div className="dialog-remove-container">
              <div className="dialog-remove-content">
                <h3>Remove Message Confirm</h3>
                <p>Are you sure you want to delete this item?</p>
                <small>
                  If you delete that item, all maps in this item will be removed
                  as well.
                </small>
                <div className="dialog-remove-buttons">
                  <button onClick={removeItem} id="removed">
                    <FaCheck />
                  </button>
                  <button onClick={closeDeleteDialog} id="cancel-removed">
                    <FaTimes />
                  </button>
                </div>
              </div>
            </div>
          )}
          {dialogVisible && (
            <div className="dialog-action-container">
              <div className="dialog-action-content">
                <h2>{dialogMode === "create" ? "Create" : "Update"} Item</h2>
                <div className="dialog-action-main">
                  <div className="dialog-action-image-main">
                    <label className="dialog-action-image-group">
                      <input
                        type="file"
                        id="images"
                        accept="image/*"
                        onChange={(e) =>
                          setCurrentItem({
                            ...currentItem,
                            imagePath: e.target.files[0],
                          })
                        }
                        hidden
                        required={!currentItem.itemId}
                      />
                      {currentItem.imagePath ? (
                        <img
                          src={
                            currentItem.imagePath instanceof File
                              ? window.URL.createObjectURL(
                                  currentItem.imagePath
                                )
                              : `https://localhost:7052/Images/${currentItem.imagePath}`
                          }
                          alt="item-img"
                        />
                      ) : (
                        <img src="/assets/images/map.jpg" alt="item-img" />
                      )}
                    </label>
                  </div>
                  <div className="dialog-action-content-main">
                    <div className="main-input">
                      <div className="left-side">
                        <div className="dialog-action-group">
                          <label htmlFor="itemName">Item Name:</label>
                          <input
                            className="item_name"
                            type="text"
                            id="itemName"
                            value={currentItem.itemName || ""}
                            onChange={(e) =>
                              setCurrentItem({
                                ...currentItem,
                                itemName: e.target.value,
                              })
                            }
                            placeholder="Please enter item name"
                          />
                        </div>
                        <div className="dialog-action-group">
                          <label htmlFor="description">Description:</label>
                          <textarea
                            id="description"
                            value={currentItem.description || ""}
                            onChange={(e) =>
                              setCurrentItem({
                                ...currentItem,
                                description: e.target.value,
                              })
                            }
                            placeholder="Please enter the item description"
                          />
                        </div>
                        <div className="dialog-action-group">
                          <label htmlFor="equipped">Equipped:</label>
                          <input
                            type="checkbox"
                            id="equipped"
                            checked={currentItem.equipped}
                            onChange={(e) =>
                              setCurrentItem({
                                ...currentItem,
                                equipped: e.target.checked,
                              })
                            }
                          />
                        </div>
                      </div>
                      <div className="center-side">
                        <div className="dialog-action-group">
                          <label htmlFor="gold">Gold:</label>
                          <input
                            type="number"
                            id="gold"
                            value={
                              currentItem.gold !== undefined
                                ? currentItem.gold
                                : ""
                            }
                            min={0}
                            onChange={(e) =>
                              setCurrentItem({
                                ...currentItem,
                                gold: e.target.value,
                              })
                            }
                            placeholder="Please enter number value"
                          />
                        </div>
                        <div className="dialog-action-group">
                          <label htmlFor="silver">Silver:</label>
                          <input
                            type="number"
                            id="silver"
                            value={
                              currentItem.silver !== undefined
                                ? currentItem.silver
                                : ""
                            }
                            min={0}
                            onChange={(e) =>
                              setCurrentItem({
                                ...currentItem,
                                silver: e.target.value,
                              })
                            }
                            placeholder="Please enter number value"
                          />
                        </div>
                        <div className="dialog-action-group">
                          <label htmlFor="manaValue">Mana:</label>
                          <input
                            type="number"
                            id="manaValue"
                            value={
                              currentItem.manaValue !== undefined
                                ? currentItem.manaValue
                                : ""
                            }
                            min={0}
                            onChange={(e) =>
                              setCurrentItem({
                                ...currentItem,
                                manaValue: e.target.value,
                              })
                            }
                            placeholder="Please enter number value"
                          />
                        </div>
                        <div className="dialog-action-group">
                          <label htmlFor="type">Item Type:</label>
                          <input
                            type="number"
                            id="type"
                            min={0}
                            value={
                              currentItem.type !== undefined
                                ? currentItem.type
                                : ""
                            }
                            onChange={(e) =>
                              setCurrentItem({
                                ...currentItem,
                                type: e.target.value,
                              })
                            }
                            placeholder="Please enter item type (level 1, level 2, etc)"
                          />
                        </div>

                        <div className="dialog-action-group">
                          <label htmlFor="sectId">Sect:</label>
                          <select
                            className="sectId"
                            id="sectId"
                            value={currentItem.sectId || ""}
                            onChange={(e) =>
                              setCurrentItem({
                                ...currentItem,
                                sectId: parseInt(e.target.value, 10),
                              })
                            }
                          >
                            {sects.map((sect) => (
                              <option key={sect.sectId} value={sect.sectId}>
                                {sect.sectName}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="dialog-action-group">
                          <label htmlFor="categoryId">Category:</label>
                          <select
                            className="categoryId"
                            id="categoryId"
                            value={currentItem.categoryId || ""}
                            onChange={(e) =>
                              setCurrentItem({
                                ...currentItem,
                                categoryId: parseInt(e.target.value, 10),
                              })
                            }
                          >
                            {categories.map((category) => (
                              <option
                                key={category.categoryId}
                                value={category.categoryId}
                              >
                                {category.categoryName}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div className="right-side">
                        <div className="dialog-action-group">
                          <label htmlFor="attackValue">Attack:</label>
                          <input
                            type="number"
                            id="attackValue"
                            value={
                              currentItem.attackValue !== undefined
                                ? currentItem.attackValue
                                : ""
                            }
                            min={0}
                            onChange={(e) =>
                              setCurrentItem({
                                ...currentItem,
                                attackValue: e.target.value,
                              })
                            }
                            placeholder="Please enter number value"
                          />
                        </div>
                        <div className="dialog-action-group">
                          <label htmlFor="healthValue">Health:</label>
                          <input
                            type="number"
                            id="healthValue"
                            value={
                              currentItem.healthValue !== undefined
                                ? currentItem.healthValue
                                : ""
                            }
                            min={0}
                            onChange={(e) =>
                              setCurrentItem({
                                ...currentItem,
                                healthValue: e.target.value,
                              })
                            }
                            placeholder="Please enter number value"
                          />
                        </div>
                        <div className="dialog-action-group">
                          <label htmlFor="defenseValue">Defense:</label>
                          <input
                            type="number"
                            id="defenseValue"
                            value={
                              currentItem.defenseValue !== undefined
                                ? currentItem.defenseValue
                                : ""
                            }
                            min={0}
                            onChange={(e) =>
                              setCurrentItem({
                                ...currentItem,
                                defenseValue: e.target.value,
                              })
                            }
                            placeholder="Please enter number value"
                          />
                        </div>
                        <div className="dialog-action-group">
                          <label htmlFor="speedValue">Speed:</label>
                          <input
                            type="number"
                            id="speedValue"
                            min={0}
                            value={
                              currentItem.speedValue !== undefined
                                ? currentItem.speedValue
                                : ""
                            }
                            onChange={(e) =>
                              setCurrentItem({
                                ...currentItem,
                                speedValue: e.target.value,
                              })
                            }
                            placeholder="Please enter number value"
                          />
                        </div>
                        <div className="dialog-action-group">
                          <label htmlFor="intellectValue">Intellect:</label>
                          <input
                            type="number"
                            id="intellectValue"
                            min={0}
                            value={
                              currentItem.intellectValue !== undefined
                                ? currentItem.intellectValue
                                : ""
                            }
                            onChange={(e) =>
                              setCurrentItem({
                                ...currentItem,
                                intellectValue: e.target.value,
                              })
                            }
                            placeholder="Please enter number value"
                          />
                        </div>
                        <div className="dialog-action-group">
                          <label htmlFor="physicalValue">Physical:</label>
                          <input
                            type="number"
                            id="physicalValue"
                            min={0}
                            value={
                              currentItem.physicalValue !== undefined
                                ? currentItem.physicalValue
                                : ""
                            }
                            onChange={(e) =>
                              setCurrentItem({
                                ...currentItem,
                                physicalValue: e.target.value,
                              })
                            }
                            placeholder="Please enter number value"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="dialog-action-handle">
                      <button onClick={actionItem} id="actions">
                        {dialogMode === "create" ? "Create" : "Update"}
                      </button>
                      <button onClick={handleDialogClose} id="cancel-actions">
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          {viewDialogVisible && (
            <div className="dialog-view-container">
              <div className="dialog-view-main-content">
                <div className="dialog-view-content">
                  <div className="dialog-view-images">
                    {currentItem.imagePath && (
                      <img
                        src={`https://localhost:7052/Images/${currentItem.imagePath}`}
                        alt="item-img"
                        className="image-view-dialog"
                      />
                    )}
                  </div>
                  <div className="dialog-view-main">
                    <div className="left-side-dialog">
                      <label>
                        <p>Name:</p> <span>{currentItem.itemName}</span>
                      </label>
                      <label>
                        <p>Description:</p>
                        <span> {currentItem.description}</span>
                      </label>
                      <label>
                        <p>Gold:</p>
                        <span> {currentItem.gold}</span>
                      </label>
                      <label>
                        <p>Silver:</p>
                        <span> {currentItem.silver}</span>
                      </label>
                    </div>
                    <div className="center-side-dialog">
                      <label>
                        <p>Type:</p>
                        <span>
                          {" "}
                          level {currentItem.type > 0 ? "0" : currentItem.type}
                        </span>
                      </label>
                      {currentItem.manaValue > 0 && (
                        <label>
                          <p>Mana:</p>
                          <span> {currentItem.manaValue}</span>
                        </label>
                      )}
                      <label>
                        <p>isEquipped:</p>
                        <span>
                          {" "}
                          {currentItem.equipped ? "Equipped" : "None"}
                        </span>
                      </label>
                      <label>
                        <p>Sect:</p>
                        {currentItem.sectId && (
                          <span>
                            {sects.find(
                              (sect) => sect.sectId === currentItem.sectId
                            )?.sectName || ""}
                          </span>
                        )}
                      </label>
                      <label>
                        <p>Category:</p>
                        {currentItem.categoryId && (
                          <span>
                            {categories.find(
                              (category) =>
                                category.categoryId === currentItem.categoryId
                            )?.categoryName || ""}
                          </span>
                        )}
                      </label>
                    </div>
                    <div className="right-side-dialog">
                      {currentItem.attackValue > 0 && (
                        <label>
                          <p>Attack:</p>
                          <span> {currentItem.attackValue}</span>
                        </label>
                      )}
                      {currentItem.healthValue > 0 && (
                        <label>
                          <p>Health:</p>
                          <span> {currentItem.healthValue}</span>
                        </label>
                      )}
                      {currentItem.defenseValue > 0 && (
                        <label>
                          <p>Defense:</p>
                          <span> {currentItem.defenseValue}</span>
                        </label>
                      )}
                      {currentItem.speedValue > 0 && (
                        <label>
                          <p>Speed:</p>
                          <span> {currentItem.speedValue}</span>
                        </label>
                      )}
                      {currentItem.intellectValue > 0 && (
                        <label>
                          <p>Intellect:</p>
                          <span> {currentItem.intellectValue}</span>
                        </label>
                      )}
                      {currentItem.physicalValue > 0 && (
                        <label>
                          <p>Physical</p>
                          <span> {currentItem.physicalValue}</span>
                        </label>
                      )}
                    </div>
                  </div>
                </div>
                <div className="dialog-view-button">
                  <button onClick={closeViewDialog}>OK</button>
                </div>
              </div>
            </div>
          )}
          {renderPage()}
          {message && (
            <div className="dialog-message-container">
              <div className="dialog-message-content">
                <p>{message}</p>
                <button onClick={() => setMessage("")}>OK</button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AdminItem;
