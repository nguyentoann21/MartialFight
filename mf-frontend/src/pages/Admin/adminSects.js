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
import "./adminSects.scss";

const AdminSect = () => {
  const account = JSON.parse(localStorage.getItem("ADMIN_DATA"));
  const history = useNavigate();

  useEffect(() => {
    if (!account) {
      history("/");
    }
  }, [account, history]);

  const SECT_PER_PAGE = 2;
  const [sects, setSects] = useState([]);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [dialogMode, setDialogMode] = useState("create");
  const [currentSects, setCurrentSects] = useState({
    sectName: "",
    sectDescription: "",
    image: null,
  });

  const [message, setMessage] = useState("");
  const [deleteDialogVisible, setDeleteDialogVisible] = useState(false);
  const [sectRemoved, setSectRemoved] = useState(null);
  const [viewDialogVisible, setViewDialogVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [messageSearch, setMessageSearch] = useState("");
  const [originalSect, setOriginalSect] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredSect, setFilteredSect] = useState([]);
  const startIndex = (currentPage - 1) * SECT_PER_PAGE;
  const endIndex = startIndex + SECT_PER_PAGE;
  const currentSectPage = filteredSect.slice(startIndex, endIndex);

  const showDeleteDialog = (sect) => {
    setSectRemoved(sect);
    setDeleteDialogVisible(true);
  };

  const closeDeleteDialog = () => {
    setDeleteDialogVisible(false);
    setSectRemoved(null);
    loadSects();
  };

  useEffect(() => {
    setFilteredSect(sects);
  }, [sects, searchTerm]);

  useEffect(() => {
    return () => {
      if (currentSects.image && currentSects.image[0]) {
        window.URL.revokeObjectURL(currentSects.image[0]);
      }
    };
  }, [currentSects.image]);

  const loadSects = async () => {
    try {
      const response = await axios.get("https://localhost:7052/api/mf/sects");
      setSects(
        response.data.map((sect) => {
          return {
            ...sect,
            image: sect.image ? sect.image : null,
          };
        })
      );
      setOriginalSect(
        response.data.map((sect) => {
          return {
            ...sect,
            image: sect.image ? sect.image : null,
          };
        })
      );
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadSects();
  }, []);

  const actionSects = async () => {
    const formData = new FormData();
    if (!currentSects.sectName || !currentSects.sectDescription) {
      setMessage("Please fill in all the required fields");
      return;
    }

    const original = originalSect.find(
      (sect) => sect.sectID === currentSects.sectID
    );

    if (dialogMode === "update") {
      formData.append("sectID", currentSects.sectID);

      if (
        currentSects.sectName !== original.sectName ||
        currentSects.sectDescription !== original.sectDescription ||
        (currentSects.image && currentSects.image !== original.image)
      ) {
        formData.append("sectName", currentSects.sectName);
        formData.append("sectDescription", currentSects.sectDescription);
        formData.append("image", currentSects.image);
      } else {
        setMessage("Nothing to update");
        return;
      }
    } else {
      if (currentSects.sectName !== originalSect.sectName) {
        formData.append("sectName", currentSects.sectName);
      }
      if (currentSects.sectDescription !== originalSect.sectDescription) {
        formData.append("sectDescription", currentSects.sectDescription);
      }
      if (currentSects.image && currentSects.image !== originalSect.image) {
        formData.append("image", currentSects.image);
      }
    }

    const url =
      dialogMode === "create"
        ? "https://localhost:7052/api/mf/sects"
        : `https://localhost:7052/api/mf/sects/${currentSects.sectID}`;

    try {
      let response;
      if (dialogMode === "create") {
        response = await axios.post(url, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        setMessage("Sect created successfully");
      } else if (dialogMode === "update") {
        response = await axios.put(url, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        setMessage("Sect updated successfully");
      }

      if (response.status === 200 || response.status === 202) {
        setDialogVisible(false);
        loadSects();
      } else {
        setMessage("Failed to save the sect");
      }
    } catch (error) {
      console.error(error);
      setMessage("Failed to save the sect");
    }
  };

  const removeSect = async () => {
    if (sectRemoved) {
      try {
        await axios.delete(
          `https://localhost:7052/api/mf/sects/${sectRemoved.sectID}`
        );
        setMessage("Sect deleted successfully");
        loadSects();
        if (currentSectPage.length === 1 && currentPage > 1) {
          setCurrentPage(currentPage - 1);
        }
      } catch (error) {
        console.error(error);
        if (error.response.status === 409) {
          setMessage(error.response.data);
        } else if (error.response.status === 406) {
          setMessage(error.response.data);
        } else {
          setMessage("Failed to delete the category");
        }
      }
      closeDeleteDialog();
    }
  };

  const handleDialogOpen = (mode, sect) => {
    if (mode === "view") {
      setCurrentSects(sect);
      setViewDialogVisible(true);
    } else {
      setDialogMode(mode);
      if (mode === "create") {
        setCurrentSects({ ...sect, image: null });
      } else if (mode === "update") {
        setCurrentSects({ ...currentSects, ...sect });
      }
      setDialogVisible(true);
    }
  };

  const handleDialogClose = () => {
    setDialogVisible(false);
    setCurrentSects({});
  };

  const closeViewDialog = () => {
    setViewDialogVisible(false);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleSearch = () => {
    if (searchTerm.trim() === "") {
      setMessageSearch("Please enter a valid data for search");
      setSects(originalSect);
      return;
    }
    setMessageSearch("");
    const filteredSect = originalSect.filter(
      (sect) =>
        sect.sectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sect.sectDescription.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSects(filteredSect);
  };

  const handleKey = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleReload = () => {
    setSearchTerm("");
    setMessageSearch("");
    setCurrentPage(1);
    loadSects();
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const renderPage = () => {
    if (filteredSect.length <= SECT_PER_PAGE) {
      return null;
    }

    return (
      <div className="pagination-buttons">
        {filteredSect.length === 0 ? (
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
                  currentPage === Math.ceil(filteredSect.length / SECT_PER_PAGE)
                }
              >
                <FaAngleRight />
              </button>
              <button
                onClick={() =>
                  handlePageChange(
                    Math.ceil(filteredSect.length / SECT_PER_PAGE)
                  )
                }
                disabled={
                  currentPage === Math.ceil(filteredSect.length / SECT_PER_PAGE)
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
    <div className="admin-sect-container">
      <h1>Managing Sect</h1>
      {originalSect.length === 0 ? (
        <div className="admin-sect-nodata">
          <p className="admin-sect-empty">The sect list is empty</p>
          <div className="admin-add-sect-empty">
            <button onClick={() => handleDialogOpen("create")}>
              <FaPlus />
            </button>
          </div>
          {dialogVisible && (
            <div className="dialog-empt-action-container">
              <div className="dialog-empt-action-content">
                <h2>{dialogMode === "create" ? "Create" : "Update"} Sect</h2>
                <div className="dialog-empt-action-main">
                  <div className="dialog-empt-action-image-main">
                    <label className="dialog-empt-action-image-group">
                      <input
                        type="file"
                        id="images"
                        accept="image/*"
                        onChange={(e) =>
                          setCurrentSects({
                            ...currentSects,
                            image: e.target.files[0],
                          })
                        }
                        hidden
                        required={!currentSects.sectID}
                      />
                      {currentSects.image ? (
                        <img
                          src={
                            currentSects.image instanceof File
                              ? window.URL.createObjectURL(currentSects.image)
                              : `https://localhost:7052/${currentSects.image}`
                          }
                          alt="sect-img"
                        />
                      ) : (
                        <img src="/assets/images/map.png" alt="sect-img" />
                      )}
                    </label>
                  </div>
                  <div className="dialog-empt-action-content-main">
                    <div className="dialog-empt-action-group">
                      <label htmlFor="sectName">Sect Name:</label>
                      <input
                        className="sect_name"
                        type="text"
                        id="sectName"
                        value={currentSects.sectName || ""}
                        onChange={(e) =>
                          setCurrentSects({
                            ...currentSects,
                            sectName: e.target.value,
                          })
                        }
                        placeholder="Please enter sect name"
                      />
                    </div>
                    <div className="dialog-empt-action-group">
                      <label htmlFor="sectDescription">Description:</label>
                      <textarea
                        id="sectDescription"
                        value={currentSects.sectDescription || ""}
                        onChange={(e) =>
                          setCurrentSects({
                            ...currentSects,
                            sectDescription: e.target.value,
                          })
                        }
                        placeholder="Please enter the sect description"
                      />
                    </div>
                    <div className="dialog-empt-action-handle">
                      <button onClick={actionSects} id="actions-empt">
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
          <div className="admin-sects-top">
            <div className="admin-search-bar">
              <input
                type="text"
                placeholder="Search by name or description..."
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
            <div className="admin-add-sects">
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
              {currentSectPage.length === 0 ? (
                <div className="error-message">No data was found</div>
              ) : (
                <div
                  className="none-display"
                  id={currentSectPage.length === 0 ? "none" : ""}
                >
                  {sects.length} {sects.length === 1 ? "sect" : "sects"} found
                </div>
              )}
            </>
          )}
          {currentSectPage.length === 0 ? (
            <div className="table-nodata-display"></div>
          ) : (
            <div className="admin-sects-table">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentSectPage.map((sects) => (
                    <tr key={sects.sectID}>
                      <td className="admin-sects-images">
                        <div className="image-container">
                          {sects.image && (
                            <img
                              src={`https://localhost:7052/${sects.image}`}
                              alt="sect-img"
                            />
                          )}
                        </div>
                      </td>
                      <td className="admin-sect-name">
                        <span>{sects.sectName}</span>
                      </td>
                      <td className="admin-sect-description">
                        <span>{sects.sectDescription}</span>
                      </td>
                      <td className="admin-sects-actions">
                        <button onClick={() => handleDialogOpen("view", sects)}>
                          <FaEye />
                        </button>
                        <button
                          onClick={() => handleDialogOpen("update", sects)}
                        >
                          <FaEdit />
                        </button>
                        <button onClick={() => showDeleteDialog(sects)}>
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
                <p>Are you sure you want to delete this sect?</p>
                <small>
                  If you delete that sect, all characters and items in this sect
                  will be removed as well.
                </small>
                <div className="dialog-remove-buttons">
                  <button onClick={removeSect} id="removed">
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
                <h2>{dialogMode === "create" ? "Create" : "Update"} Sect</h2>
                <div className="dialog-action-main">
                  <div className="dialog-action-image-main">
                    <label className="dialog-action-image-group">
                      <input
                        type="file"
                        id="images"
                        accept="image/*"
                        onChange={(e) =>
                          setCurrentSects({
                            ...currentSects,
                            image: e.target.files[0],
                          })
                        }
                        hidden
                        required={!currentSects.sectID}
                      />
                      {currentSects.image ? (
                        <img
                          src={
                            currentSects.image instanceof File
                              ? window.URL.createObjectURL(currentSects.image)
                              : `https://localhost:7052/${currentSects.image}`
                          }
                          alt="sect-img"
                        />
                      ) : (
                        <img src="/assets/images/map.png" alt="sect-img" />
                      )}
                    </label>
                  </div>
                  <div className="dialog-action-content-main">
                    <div className="dialog-action-group">
                      <label htmlFor="sectName">Sect Name:</label>
                      <input
                        className="sect_name"
                        type="text"
                        id="sectName"
                        value={currentSects.sectName || ""}
                        onChange={(e) =>
                          setCurrentSects({
                            ...currentSects,
                            sectName: e.target.value,
                          })
                        }
                        placeholder="Please enter sect name"
                      />
                    </div>
                    <div className="dialog-action-group">
                      <label htmlFor="sectDescription">Description:</label>
                      <textarea
                        id="sectDescription"
                        value={currentSects.sectDescription || ""}
                        onChange={(e) =>
                          setCurrentSects({
                            ...currentSects,
                            sectDescription: e.target.value,
                          })
                        }
                        placeholder="Please enter the sect description"
                      />
                    </div>
                    <div className="dialog-action-handle">
                      <button onClick={actionSects} id="actions">
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
                  <h3>View {currentSects.sectName}</h3>
                  <div className="dialog-view-images">
                    {currentSects.image && (
                      <img
                        src={`https://localhost:7052/${currentSects.image}`}
                        alt="sect-img"
                        className="image-view-dialog"
                      />
                    )}
                  </div>
                  <div className="dialog-view-main">
                    <p>
                      Sect Name: <span>{currentSects.sectName}</span>
                    </p>
                    <p>
                      Description:<span> {currentSects.sectDescription}</span>
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

export default AdminSect;
