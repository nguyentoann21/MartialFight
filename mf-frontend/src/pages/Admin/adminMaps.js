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
import "./adminMaps.scss";

const AdminMap = () => {
  const account = JSON.parse(localStorage.getItem("ADMIN_DATA"));
  const history = useNavigate();

  useEffect(() => {
    if (!account) {
      history("/");
    }
  }, [account, history]);

  const MAP_PER_PAGE = 10;
  const [maps, setMaps] = useState([]);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [dialogMode, setDialogMode] = useState("create");
  const [defaultItem, setDefaultItem] = useState(null);
  const [currentMaps, setCurrentMaps] = useState({
    mapName: "",
    level: "",
    levelRequirement: "",
    description: "",
    imagePath: null,
    type: "",
    exp: "",
    silver: "",
    amountItem: "",
    itemId: "",
  });

  const [items, setItems] = useState([]);
  const [message, setMessage] = useState("");
  const [deleteDialogVisible, setDeleteDialogVisible] = useState(false);
  const [mapRemoved, setMapRemoved] = useState(null);
  const [viewDialogVisible, setViewDialogVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [messageSearch, setMessageSearch] = useState("");
  const [originalMap, setOriginalMap] = useState([]);
  const [sortType, setSortType] = useState("normal");
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredMap, setFilteredMap] = useState([]);
  const startIndex = (currentPage - 1) * MAP_PER_PAGE;
  const endIndex = startIndex + MAP_PER_PAGE;
  const currentMapPage = filteredMap.slice(startIndex, endIndex);

  const showDeleteDialog = (map) => {
    setMapRemoved(map);
    setDeleteDialogVisible(true);
  };

  const closeDeleteDialog = () => {
    setDeleteDialogVisible(false);
    setMapRemoved(null);
    loadMaps();
  };

  useEffect(() => {
    setFilteredMap(maps);
  }, [maps, searchTerm]);

  useEffect(() => {
    return () => {
      if (currentMaps.imagePath && currentMaps.imagePath[0]) {
        window.URL.revokeObjectURL(currentMaps.imagePath[0]);
      }
    };
  }, [currentMaps.imagePath]);

  const loadMaps = async () => {
    try {
      const response = await axios.get("https://localhost:7052/api/mf/maps");

      setMaps(
        response.data.map((map) => {
          return {
            ...map,
            imagePath: map.imagePath ? map.imagePath : null,
          };
        })
      );
      setOriginalMap(
        response.data.map((map) => {
          return {
            ...map,
            imagePath: map.imagePath ? map.imagePath : null,
          };
        })
      );
      setFilteredMap(
        response.data.map((map) => {
          return {
            ...map,
            imagePath: map.imagePath ? map.imagePath : null,
          };
        })
      );
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadMaps();
  }, []);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get("https://localhost:7052/api/mf/items");
        setItems(response.data);
        if (response.data.length > 0) {
          setDefaultItem(response.data[0].itemId);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchItems();
  }, []);

  const actionMaps = async () => {
    const formData = new FormData();

    const originalM = originalMap.find(
      (map) => map.mapId === currentMaps.mapId
    );

    if (dialogMode === "update") {
      formData.append("mapId", currentMaps.mapId);

      if (
        currentMaps.mapName !== originalM.mapName ||
        currentMaps.level !== originalM.level ||
        currentMaps.levelRequirement !== originalM.levelRequirement ||
        currentMaps.description !== originalM.description ||
        currentMaps.type !== originalM.type ||
        currentMaps.itemId !== originalM.itemId ||
        currentMaps.amountItem !== originalM.amountItem ||
        currentMaps.exp !== originalM.exp ||
        currentMaps.silver !== originalM.silver ||
        (currentMaps.imagePath && currentMaps.imagePath !== originalM.imagePath)
      ) {
        formData.append("mapName", currentMaps.mapName);
        formData.append("level", currentMaps.level);
        formData.append("levelRequirement", currentMaps.levelRequirement);
        formData.append("description", currentMaps.description);
        formData.append("type", currentMaps.type);
        formData.append("exp", currentMaps.exp);
        formData.append("silver", currentMaps.silver);
        formData.append("amountItem", currentMaps.amountItem);
        formData.append("itemId", currentMaps.itemId);
        formData.append("imagePath", currentMaps.imagePath);
      } else {
        setMessage("Nothing to update");
        return;
      }
    } else {
      if (currentMaps.mapName !== originalMap.mapName) {
        formData.append("mapName", currentMaps.mapName);
      }
      if (currentMaps.level !== originalMap.level) {
        formData.append("level", currentMaps.level);
      }
      if (currentMaps.levelRequirement !== originalMap.levelRequirement) {
        formData.append("levelRequirement", currentMaps.levelRequirement);
      }
      if (currentMaps.description !== originalMap.description) {
        formData.append("description", currentMaps.description);
      }
      if (currentMaps.type !== originalMap.type) {
        formData.append("type", currentMaps.type);
      }
      if (currentMaps.exp !== originalMap.exp) {
        formData.append("exp", currentMaps.exp);
      }
      if (currentMaps.silver !== originalMap.silver) {
        formData.append("silver", currentMaps.silver);
      }
      if (currentMaps.amountItem !== originalMap.amountItem) {
        formData.append("amountItem", currentMaps.amountItem);
      }
      if (currentMaps.itemId !== originalMap.itemId) {
        formData.append("itemId", currentMaps.itemId);
      }
      if (
        currentMaps.imagePath &&
        currentMaps.imagePath !== originalMap.imagePath
      ) {
        formData.append("imagePath", currentMaps.imagePath);
      }
    }

    const url =
      dialogMode === "create"
        ? "https://localhost:7052/api/mf/maps"
        : `https://localhost:7052/api/mf/maps/${currentMaps.mapId}`;

    try {
      let response;
      if (dialogMode === "create") {
        response = await axios.post(url, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        setMessage("Map created successfully");
      } else if (dialogMode === "update") {
        response = await axios.put(url, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        setMessage("Map updated successfully");
      }

      if (response.status === 200 || response.status === 202) {
        setDialogVisible(false);
        loadMaps();
      } else {
        setMessage("Failed to save the map");
      }
    } catch (error) {
      if (
        error.response.status === 403 ||
        error.response.status === 405 ||
        error.response.status === 409
      ) {
        setMessage(error.response.data);
      } else {
        setMessage("Failed to save the map");
      }
    }
  };

  const removeMap = async () => {
    if (mapRemoved) {
      try {
        await axios.delete(
          `https://localhost:7052/api/mf/maps/${mapRemoved.mapId}`
        );
        setMessage("Map deleted successfully");
        loadMaps();
        if (currentMapPage.length === 1 && currentPage > 1) {
          setCurrentPage(currentPage - 1);
        }
      } catch (error) {
        console.error(error);
        setMessage("Failed to delete the map");
      }
      closeDeleteDialog();
    }
  };

  const handleDialogOpen = (mode, map) => {
    if (mode === "view") {
      setCurrentMaps(map);
      setViewDialogVisible(true);
    } else {
      setDialogMode(mode);
      if (mode === "create") {
        setCurrentMaps({ ...map, imagePath: null, itemId: defaultItem });
      } else if (mode === "update") {
        setCurrentMaps({ ...currentMaps, ...map });
      }
      setDialogVisible(true);
    }
  };

  const handleDialogClose = () => {
    setDialogVisible(false);
    setCurrentMaps({});
  };

  const closeViewDialog = () => {
    setViewDialogVisible(false);
  };

  const handleSearch = () => {
    if (searchTerm.trim() === "") {
      setMessageSearch("Please enter a valid data for search");
      setMaps(originalMap);
      return;
    }
    setMessageSearch("");
    const filteredMap = originalMap.filter((map) =>
      map.mapName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setMaps(filteredMap);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
    setSortType("none");
  };

  const handleSortChange = (e) => {
    setSortType(e.target.value);
    sortMap(e.target.value);
    setSearchTerm("");
    setMessageSearch("");
    setCurrentPage(1);
  };

  const sortMap = (sortType) => {
    if (sortType === "none") {
      loadMaps();
    } else {
      const sortedMaps = [...maps];
      sortedMaps.sort((x, y) => {
        const numberOne = x.level;
        const numberTwo = y.level;
        if (sortType === "ascending") {
          return numberOne - numberTwo;
        } else {
          return numberTwo - numberOne;
        }
      });
      setMaps(sortedMaps);
    }
  };

  const handleKey = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleReload = () => {
    setSearchTerm("");
    setMessageSearch("");
    setSortType("none");
    setCurrentPage(1);
    loadMaps();
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const renderPage = () => {
    if (filteredMap.length <= MAP_PER_PAGE) {
      return null;
    }

    return (
      <div className="pagination-buttons">
        {filteredMap.length === 0 ? (
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
                  currentPage === Math.ceil(filteredMap.length / MAP_PER_PAGE)
                }
              >
                <FaAngleRight />
              </button>
              <button
                onClick={() =>
                  handlePageChange(Math.ceil(filteredMap.length / MAP_PER_PAGE))
                }
                disabled={
                  currentPage === Math.ceil(filteredMap.length / MAP_PER_PAGE)
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
    <div className="admin-map-container">
      <h1>Managing Map</h1>
      {originalMap.length === 0 ? (
        <div className="admin-map-nodata">
          <p className="admin-map-empty">The map list is empty</p>
          <div className="admin-add-map-empty">
            <button onClick={() => handleDialogOpen("create")}>
              <FaPlus />
            </button>
          </div>
          {dialogVisible && (
            <div className="dialog-action-container">
              <div className="dialog-action-content">
                <h2>{dialogMode === "create" ? "Create" : "Update"} Map</h2>
                <div className="dialog-action-main">
                  <div className="dialog-action-image-main">
                    <label className="dialog-action-image-group">
                      <input
                        type="file"
                        id="images"
                        accept="image/*"
                        onChange={(e) =>
                          setCurrentMaps({
                            ...currentMaps,
                            imagePath: e.target.files[0],
                          })
                        }
                        hidden
                        required={!currentMaps.mapId}
                      />
                      {currentMaps.imagePath ? (
                        <img
                          src={
                            currentMaps.imagePath instanceof File
                              ? window.URL.createObjectURL(
                                  currentMaps.imagePath
                                )
                              : `https://localhost:7052/Images/${currentMaps.imagePath}`
                          }
                          alt="map-img"
                        />
                      ) : (
                        <img src="/assets/images/map.jpg" alt="map-img" />
                      )}
                    </label>
                  </div>
                  <div className="dialog-action-content-main">
                    <div className="main-input">
                      <div className="left-side">
                        <div className="dialog-action-group">
                          <label htmlFor="mapName">Map Name:</label>
                          <input
                            className="map_name"
                            type="text"
                            id="mapName"
                            value={currentMaps.mapName || ""}
                            onChange={(e) =>
                              setCurrentMaps({
                                ...currentMaps,
                                mapName: e.target.value,
                              })
                            }
                            placeholder="Please enter map name"
                          />
                        </div>
                        <div className="dialog-action-group">
                          <label htmlFor="level">Level:</label>
                          <input
                            className="level"
                            type="number"
                            id="level"
                            value={currentMaps.level || ""}
                            min={1}
                            onChange={(e) =>
                              setCurrentMaps({
                                ...currentMaps,
                                level: e.target.value,
                              })
                            }
                            placeholder="Please enter number value"
                          />
                        </div>
                        <div className="dialog-action-group">
                          <label htmlFor="levelRequirement">
                            Level Requirement:
                          </label>
                          <input
                            className="levelRequirement"
                            type="text"
                            id="levelRequirement"
                            value={currentMaps.levelRequirement || ""}
                            onChange={(e) =>
                              setCurrentMaps({
                                ...currentMaps,
                                levelRequirement: e.target.value,
                              })
                            }
                            placeholder="Please enter the level requirement"
                          />
                        </div>
                        <div className="dialog-action-group">
                          <label htmlFor="description">Description:</label>
                          <textarea
                            id="description"
                            value={currentMaps.description || ""}
                            onChange={(e) =>
                              setCurrentMaps({
                                ...currentMaps,
                                description: e.target.value,
                              })
                            }
                            placeholder="Please enter the map description"
                          />
                        </div>
                      </div>
                      <div className="right-side">
                        <div className="dialog-action-group">
                          <label htmlFor="type">Area:</label>
                          <input
                            className="type"
                            type="number"
                            id="type"
                            value={currentMaps.type || ""}
                            min={1}
                            onChange={(e) =>
                              setCurrentMaps({
                                ...currentMaps,
                                type: e.target.value,
                              })
                            }
                            placeholder="Please enter number value"
                          />
                        </div>
                        <div className="dialog-action-group">
                          <label htmlFor="exp">Exp:</label>
                          <input
                            className="exp"
                            type="number"
                            id="exp"
                            value={currentMaps.exp || ""}
                            min={1}
                            onChange={(e) =>
                              setCurrentMaps({
                                ...currentMaps,
                                exp: e.target.value,
                              })
                            }
                            placeholder="Please enter the exp"
                          />
                        </div>
                        <div className="dialog-action-group">
                          <label htmlFor="silver">Silver:</label>
                          <input
                            className="silver"
                            type="number"
                            id="silver"
                            value={currentMaps.silver || ""}
                            min={1}
                            onChange={(e) =>
                              setCurrentMaps({
                                ...currentMaps,
                                silver: e.target.value,
                              })
                            }
                            placeholder="Please enter number value"
                          />
                        </div>
                        <div className="dialog-action-group">
                          <label htmlFor="amountItem">Amount Item</label>
                          <input
                            className="amountItem"
                            type="number"
                            id="amountItem"
                            value={currentMaps.amountItem || ""}
                            onChange={(e) =>
                              setCurrentMaps({
                                ...currentMaps,
                                amountItem: e.target.value,
                              })
                            }
                            placeholder="Please enter the amount item"
                          />
                        </div>
                        <div className="dialog-action-group">
                          <label htmlFor="itemId">Item:</label>
                          <select
                            className="itemId"
                            id="itemId"
                            value={currentMaps.itemId || ""}
                            onChange={(e) =>
                              setCurrentMaps({
                                ...currentMaps,
                                itemId: parseInt(e.target.value, 10),
                              })
                            }
                          >
                            {items.map((item) => (
                              <option key={item.itemId} value={item.itemId}>
                                {item.itemName}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="dialog-action-handle">
                      <button onClick={actionMaps} id="actions">
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
          <div className="admin-maps-top">
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
            <div className="admin-maps-filter">
              <select value={sortType} onChange={handleSortChange}>
                <option value="none">None</option>
                <option value="ascending">Level Ascending</option>
                <option value="descending">Level Descending</option>
              </select>
            </div>
            <div className="admin-add-maps">
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
              {currentMapPage.length === 0 ? (
                <div className="error-message">No data was found</div>
              ) : (
                <div
                  className="none-display"
                  id={currentMapPage.length === 0 ? "none" : ""}
                >
                  {maps.length} {maps.length === 1 ? "map" : "maps"} found
                </div>
              )}
            </>
          )}
          {currentMapPage.length === 0 ? (
            <>
              <div className="table-nodata-display"></div>
            </>
          ) : (
            <div className="admin-maps-table">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Level</th>
                    <th>Description</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentMapPage.map((maps) => (
                    <tr key={maps.mapId}>
                      <td className="admin-maps-images">
                        <div className="image-container">
                          {maps.imagePath && (
                            <img
                              src={`https://localhost:7052/Images/${maps.imagePath}`}
                              alt="map-img"
                            />
                          )}
                        </div>
                      </td>
                      <td className="admin-map-name">
                        <span>{maps.mapName}</span>
                      </td>
                      <td className="admin-maps-level">
                        <span>{maps.level}</span>
                      </td>
                      <td className="admin-map-description">
                        <span>{maps.description}</span>
                      </td>
                      <td className="admin-maps-actions">
                        <button onClick={() => handleDialogOpen("view", maps)}>
                          <FaEye />
                        </button>
                        <button
                          onClick={() => handleDialogOpen("update", maps)}
                        >
                          <FaEdit />
                        </button>
                        <button onClick={() => showDeleteDialog(maps)}>
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
                <p>Are you sure you want to delete this map?</p>
                <div className="dialog-remove-buttons">
                  <button onClick={removeMap} id="removed">
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
                <h2>{dialogMode === "create" ? "Create" : "Update"} Map</h2>
                <div className="dialog-action-main">
                  <div className="dialog-action-image-main">
                    <label className="dialog-action-image-group">
                      <input
                        type="file"
                        id="images"
                        accept="image/*"
                        onChange={(e) =>
                          setCurrentMaps({
                            ...currentMaps,
                            imagePath: e.target.files[0],
                          })
                        }
                        hidden
                        required={!currentMaps.mapId}
                      />
                      {currentMaps.imagePath ? (
                        <img
                          src={
                            currentMaps.imagePath instanceof File
                              ? window.URL.createObjectURL(
                                  currentMaps.imagePath
                                )
                              : `https://localhost:7052/Images/${currentMaps.imagePath}`
                          }
                          alt="map-img"
                        />
                      ) : (
                        <img src="/assets/images/map.jpg" alt="map-img" />
                      )}
                    </label>
                  </div>
                  <div className="dialog-action-content-main">
                    <div className="main-input">
                      <div className="left-side">
                        <div className="dialog-action-group">
                          <label htmlFor="mapName">Map Name:</label>
                          <input
                            className="map_name"
                            type="text"
                            id="mapName"
                            value={currentMaps.mapName || ""}
                            onChange={(e) =>
                              setCurrentMaps({
                                ...currentMaps,
                                mapName: e.target.value,
                              })
                            }
                            placeholder="Please enter map name"
                          />
                        </div>
                        <div className="dialog-action-group">
                          <label htmlFor="level">Level:</label>
                          <input
                            className="level"
                            type="number"
                            id="level"
                            value={currentMaps.level || ""}
                            min={1}
                            onChange={(e) =>
                              setCurrentMaps({
                                ...currentMaps,
                                level: e.target.value,
                              })
                            }
                            placeholder="Please enter number value"
                          />
                        </div>
                        <div className="dialog-action-group">
                          <label htmlFor="levelRequirement">
                            Level Requirement:
                          </label>
                          <input
                            className="levelRequirement"
                            type="text"
                            id="levelRequirement"
                            value={currentMaps.levelRequirement || ""}
                            onChange={(e) =>
                              setCurrentMaps({
                                ...currentMaps,
                                levelRequirement: e.target.value,
                              })
                            }
                            placeholder="Please enter the level requirement"
                          />
                        </div>
                        <div className="dialog-action-group">
                          <label htmlFor="description">Description:</label>
                          <textarea
                            id="description"
                            value={currentMaps.description || ""}
                            onChange={(e) =>
                              setCurrentMaps({
                                ...currentMaps,
                                description: e.target.value,
                              })
                            }
                            placeholder="Please enter the map description"
                          />
                        </div>
                      </div>
                      <div className="right-side">
                        <div className="dialog-action-group">
                          <label htmlFor="type">Area:</label>
                          <input
                            className="type"
                            type="number"
                            id="type"
                            value={currentMaps.type || ""}
                            min={1}
                            onChange={(e) =>
                              setCurrentMaps({
                                ...currentMaps,
                                type: e.target.value,
                              })
                            }
                            placeholder="Please enter number value"
                          />
                        </div>
                        <div className="dialog-action-group">
                          <label htmlFor="exp">Exp:</label>
                          <input
                            className="exp"
                            type="number"
                            id="exp"
                            value={currentMaps.exp || ""}
                            min={1}
                            onChange={(e) =>
                              setCurrentMaps({
                                ...currentMaps,
                                exp: e.target.value,
                              })
                            }
                            placeholder="Please enter the exp"
                          />
                        </div>
                        <div className="dialog-action-group">
                          <label htmlFor="silver">Silver:</label>
                          <input
                            className="silver"
                            type="number"
                            id="silver"
                            value={currentMaps.silver || ""}
                            min={1}
                            onChange={(e) =>
                              setCurrentMaps({
                                ...currentMaps,
                                silver: e.target.value,
                              })
                            }
                            placeholder="Please enter number value"
                          />
                        </div>
                        <div className="dialog-action-group">
                          <label htmlFor="amountItem">Amount Item</label>
                          <input
                            className="amountItem"
                            type="number"
                            id="amountItem"
                            value={currentMaps.amountItem || ""}
                            onChange={(e) =>
                              setCurrentMaps({
                                ...currentMaps,
                                amountItem: e.target.value,
                              })
                            }
                            placeholder="Please enter the amount item"
                          />
                        </div>
                        <div className="dialog-action-group">
                          <label htmlFor="itemId">Item:</label>
                          <select
                            className="itemId"
                            id="itemId"
                            value={currentMaps.itemId || ""}
                            onChange={(e) =>
                              setCurrentMaps({
                                ...currentMaps,
                                itemId: parseInt(e.target.value, 10),
                              })
                            }
                          >
                            {items.map((item) => (
                              <option key={item.itemId} value={item.itemId}>
                                {item.itemName}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="dialog-action-handle">
                      <button onClick={actionMaps} id="actions">
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
                  <h3>View {currentMaps.mapName}</h3>
                  <div className="dialog-view-images">
                    {currentMaps.imagePath && (
                      <img
                        src={`https://localhost:7052/Images/${currentMaps.imagePath}`}
                        alt="map-img"
                        className="image-view-dialog"
                      />
                    )}
                  </div>
                  <div className="dialog-view-main">
                    <label>
                      <p>Map Name:</p>
                      <span>{currentMaps.mapName}</span>
                    </label>
                    <label>
                      <p>Level:</p>
                      <span>{currentMaps.level}</span>
                    </label>
                    <label>
                      <p>Level Requirement:</p>
                      <span>{currentMaps.levelRequirement}</span>
                    </label>
                    <label>
                      <p>Area:</p>
                      <span>{currentMaps.type}</span>
                    </label>
                    <label>
                      <p>Exp:</p>
                      <span>{currentMaps.exp}</span>
                    </label>
                    <label>
                      <p>Silver:</p>
                      <span>{currentMaps.silver}</span>
                    </label>
                    <label>
                      <p>Amount Item:</p>
                      <span>{currentMaps.amountItem}</span>
                    </label>
                    <label>
                      <p>Item:</p>
                      {currentMaps.itemId && (
                        <span>
                          {items.find(
                            (item) => item.itemId === currentMaps.itemId
                          )?.itemName || ""}
                        </span>
                      )}
                    </label>
                    <label>
                      <p>Description:</p>
                      <span>{currentMaps.description}</span>
                    </label>
                  </div>
                  <div className="dialog-view-button">
                    <button onClick={closeViewDialog}>OK</button>
                  </div>
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

export default AdminMap;
