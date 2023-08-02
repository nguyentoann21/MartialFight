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
import "./adminMap.scss";

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
  const [currentMaps, setCurrentMaps] = useState({
    mapName: "",
    level: "",
    levelRequirement: "",
    mapDescription: "",
    image: null,
  });

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
      if (currentMaps.image && currentMaps.image[0]) {
        window.URL.revokeObjectURL(currentMaps.image[0]);
      }
    };
  }, [currentMaps.image]);

  const loadMaps = async () => {
    try {
      const response = await axios.get("https://localhost:7052/api/mf/maps");

      setMaps(
        response.data.map((map) => {
          return {
            ...map,
            image: map.image ? map.image : null,
          };
        })
      );
      setOriginalMap(
        response.data.map((map) => {
          return {
            ...map,
            image: map.image ? map.image : null,
          };
        })
      );
      setFilteredMap(
        response.data.map((map) => {
          return {
            ...map,
            image: map.image ? map.image : null,
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

  const actionMaps = async () => {
    const formData = new FormData();

    const originalM = originalMap.find(
      (map) => map.mapID === currentMaps.mapID
    );

    if (dialogMode === "update") {
      formData.append("mapID", currentMaps.mapID);

      if (
        currentMaps.mapName !== originalM.mapName ||
        currentMaps.level !== originalM.level ||
        currentMaps.levelRequirement !== originalM.levelRequirement ||
        currentMaps.mapDescription !== originalM.mapDescription ||
        (currentMaps.image && currentMaps.image !== originalM.image)
      ) {
        formData.append("mapName", currentMaps.mapName);
        formData.append("level", currentMaps.level);
        formData.append("levelRequirement", currentMaps.levelRequirement);
        formData.append("mapDescription", currentMaps.mapDescription);
        formData.append("image", currentMaps.image);
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
      if (currentMaps.mapDescription !== originalMap.mapDescription) {
        formData.append("mapDescription", currentMaps.mapDescription);
      }
      if (currentMaps.image && currentMaps.image !== originalMap.image) {
        formData.append("image", currentMaps.image);
      }
    }

    const url =
      dialogMode === "create"
        ? "https://localhost:7052/api/mf/maps"
        : `https://localhost:7052/api/mf/maps/${currentMaps.mapID}`;

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
      if (error.response.status === 403) {
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
          `https://localhost:7052/api/mf/maps/${mapRemoved.mapID}`
        );
        setMessage("Map deleted successfully");
        loadMaps();
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
        setCurrentMaps({ ...map, image: null });
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

  const handleSortChange = (e) => {
    setSortType(e.target.value);
    sortMap(e.target.value);
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
            <div className="dialog-empt-action-container">
              <div className="dialog-empt-action-content">
                <h2>{dialogMode === "create" ? "Create" : "Update"} Map</h2>
                <div className="dialog-empt-action-main">
                  <div className="dialog-empt-action-image-main">
                    <label className="dialog-empt-action-image-group">
                      <input
                        type="file"
                        id="images"
                        accept="image/*"
                        onChange={(e) =>
                          setCurrentMaps({
                            ...currentMaps,
                            image: e.target.files[0],
                          })
                        }
                        hidden
                        required={!currentMaps.mapID}
                      />
                      {currentMaps.image ? (
                        <img
                          src={
                            currentMaps.image instanceof File
                              ? window.URL.createObjectURL(currentMaps.image)
                              : `https://localhost:7052/${currentMaps.image}`
                          }
                          alt="map-img"
                        />
                      ) : (
                        <img src="/assets/images/map.png" alt="map-img" />
                      )}
                    </label>
                  </div>
                  <div className="dialog-empt-action-content-main">
                    <div className="dialog-empt-action-group">
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
                    <div className="dialog-empt-action-group">
                      <label htmlFor="level">Level:</label>
                      <input
                        className="level"
                        type="text"
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
                    <div className="dialog-empt-action-group">
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
                    <div className="dialog-empt-action-group">
                      <label htmlFor="mapDescription">Description:</label>
                      <textarea
                        id="mapDescription"
                        value={currentMaps.mapDescription || ""}
                        onChange={(e) =>
                          setCurrentMaps({
                            ...currentMaps,
                            mapDescription: e.target.value,
                          })
                        }
                        placeholder="Please enter the map description"
                      />
                    </div>
                    <div className="dialog-empt-action-handle">
                      <button onClick={actionMaps} id="actions-empt">
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
          <div className="admin-maps-top">
            <div className="admin-search-bar">
              <input
                type="text"
                placeholder="Search by name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
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
                <div className="error-message">
                  No data was found
                </div>
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
                    <tr key={maps.mapID}>
                      <td className="admin-maps-images">
                        <div className="image-container">
                          {maps.image && (
                            <img
                              src={`https://localhost:7052/${maps.image}`}
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
                        <span>{maps.mapDescription}</span>
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
                            image: e.target.files[0],
                          })
                        }
                        hidden
                        required={!currentMaps.mapID}
                      />
                      {currentMaps.image ? (
                        <img
                          src={
                            currentMaps.image instanceof File
                              ? window.URL.createObjectURL(currentMaps.image)
                              : `https://localhost:7052/${currentMaps.image}`
                          }
                          alt="map-img"
                        />
                      ) : (
                        <img src="/assets/images/map.png" alt="map-img" />
                      )}
                    </label>
                  </div>
                  <div className="dialog-action-content-main">
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
                        type="text"
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
                      <label htmlFor="mapDescription">Description:</label>
                      <textarea
                        id="mapDescription"
                        value={currentMaps.mapDescription || ""}
                        onChange={(e) =>
                          setCurrentMaps({
                            ...currentMaps,
                            mapDescription: e.target.value,
                          })
                        }
                        placeholder="Please enter the map description"
                      />
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
                    {currentMaps.image && (
                      <img
                        src={`https://localhost:7052/${currentMaps.image}`}
                        alt="map-img"
                        className="image-view-dialog"
                      />
                    )}
                  </div>
                  <div className="dialog-view-main">
                    <p>
                      Map Name: <span>{currentMaps.mapName}</span>
                    </p>
                    <p>
                      Level: <span> {currentMaps.level}</span>
                    </p>
                    <p>
                      Level Requirement:{" "}
                      <span> {currentMaps.levelRequirement}</span>
                    </p>
                    <p>
                      Description:<span> {currentMaps.mapDescription}</span>
                    </p>
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
