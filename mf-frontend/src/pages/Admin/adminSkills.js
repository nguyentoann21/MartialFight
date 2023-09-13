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
import "./adminSkills.scss";

const AdminSkill = () => {
  const account = JSON.parse(localStorage.getItem("ADMIN_DATA"));
  const history = useNavigate();

  useEffect(() => {
    if (!account) {
      history("/");
    }
  }, [account, history]);

  const SKILL_PER_PAGE = 10;
  const [skills, setSkills] = useState([]);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [dialogMode, setDialogMode] = useState("create");
  const [currentSkills, setCurrentSkills] = useState({
    skillName: "",
    briefDescription: "",
    type: false,
    cooldown: "",
    detailDescription: "",
    imagePath: null,
  });

  const [message, setMessage] = useState("");
  const [deleteDialogVisible, setDeleteDialogVisible] = useState(false);
  const [skillRemoved, setSkillRemoved] = useState(null);
  const [viewDialogVisible, setViewDialogVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [messageSearch, setMessageSearch] = useState("");
  const [originalSkill, setOriginalSkill] = useState([]);
  const [sortType, setSortType] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredSkill, setFilteredSkill] = useState([]);
  const startIndex = (currentPage - 1) * SKILL_PER_PAGE;
  const endIndex = startIndex + SKILL_PER_PAGE;
  const currentSkillPage = filteredSkill.slice(startIndex, endIndex);

  const showDeleteDialog = (skill) => {
    setSkillRemoved(skill);
    setDeleteDialogVisible(true);
  };

  const closeDeleteDialog = () => {
    setDeleteDialogVisible(false);
    setSkillRemoved(null);
    loadSkills();
  };

  useEffect(() => {
    setFilteredSkill(skills);
  }, [skills, searchTerm]);

  useEffect(() => {
    return () => {
      if (currentSkills.imagePath && currentSkills.imagePath[0]) {
        window.URL.revokeObjectURL(currentSkills.imagePath[0]);
      }
    };
  }, [currentSkills.imagePath]);

  const loadSkills = async () => {
    try {
      const response = await axios.get("https://localhost:7052/api/mf/skills");

      setSkills(
        response.data.map((skill) => {
          return {
            ...skill,
            imagePath: skill.imagePath ? skill.imagePath : null,
          };
        })
      );
      setOriginalSkill(
        response.data.map((skill) => {
          return {
            ...skill,
            imagePath: skill.imagePath ? skill.imagePath : null,
          };
        })
      );
      setFilteredSkill(
        response.data.map((skill) => {
          return {
            ...skill,
            imagePath: skill.imagePath ? skill.imagePath : null,
          };
        })
      );
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadSkills();
  }, []);

  const actionSkills = async () => {
    const formData = new FormData();

    const originalK = originalSkill.find(
      (skill) => skill.skillId === currentSkills.skillId
    );

    if (dialogMode === "update") {
      formData.append("skillId", currentSkills.skillId);

      if (
        currentSkills.skillName !== originalK.skillName ||
        currentSkills.briefDescription !== originalK.briefDescription ||
        currentSkills.type !== originalK.type ||
        currentSkills.cooldown !== originalK.cooldown ||
        currentSkills.detailDescription !== originalK.detailDescription ||
        (currentSkills.imagePath &&
          currentSkills.imagePath !== originalK.imagePath)
      ) {
        formData.append("skillName", currentSkills.skillName);
        formData.append("briefDescription", currentSkills.briefDescription);
        formData.append("type", currentSkills.type);
        formData.append("cooldown", currentSkills.cooldown);
        formData.append("detailDescription", currentSkills.detailDescription);
        formData.append("imagePath", currentSkills.imagePath);
      } else {
        setMessage("Nothing to update");
        return;
      }
    } else {
      if (currentSkills.skillName !== originalSkill.skillName) {
        formData.append("skillName", currentSkills.skillName);
      }
      if (currentSkills.briefDescription !== originalSkill.briefDescription) {
        formData.append("briefDescription", currentSkills.briefDescription);
      }
      if (currentSkills.type !== originalSkill.type) {
        formData.append("type", currentSkills.type);
      }
      if (currentSkills.detailDescription !== originalSkill.detailDescription) {
        formData.append("detailDescription", currentSkills.detailDescription);
      }
      if (currentSkills.cooldown !== originalSkill.cooldown) {
        formData.append("cooldown", currentSkills.cooldown);
      }
      if (
        currentSkills.imagePath &&
        currentSkills.imagePath !== originalSkill.imagePath
      ) {
        formData.append("imagePath", currentSkills.imagePath);
      }
    }

    const url =
      dialogMode === "create"
        ? "https://localhost:7052/api/mf/skills"
        : `https://localhost:7052/api/mf/skills/${currentSkills.skillId}`;

    try {
      let response;
      if (dialogMode === "create") {
        response = await axios.post(url, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        setMessage("Skill created successfully");
      } else if (dialogMode === "update") {
        response = await axios.put(url, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        setMessage("Skill updated successfully");
      }

      if (response.status === 200 || response.status === 202) {
        setDialogVisible(false);
        loadSkills();
      } else {
        setMessage("Failed to save the skill");
      }
    } catch (error) {
      console.error(error);
      if (
        error.response.status === 403 ||
        error.response.status === 405 ||
        error.response.status === 409
      ) {
        setMessage(error.response.data);
      } else {
        setMessage("Failed to save the skill");
      }
    }
  };

  const removeSkill = async () => {
    if (skillRemoved) {
      try {
        await axios.delete(
          `https://localhost:7052/api/mf/skills/${skillRemoved.skillId}`
        );
        setMessage("Skill deleted successfully");
        loadSkills();
        if (currentSkillPage.length === 1 && currentPage > 1) {
          setCurrentPage(currentPage - 1);
        }
      } catch (error) {
        console.error(error);
        if (error.response.status === 409) {
          setMessage(error.response.data);
        } else {
          setMessage("Failed to delete the skill");
        }
      }
      closeDeleteDialog();
    }
  };

  const handleDialogOpen = (mode, skill) => {
    if (mode === "view") {
      setCurrentSkills(skill);
      setViewDialogVisible(true);
    } else {
      setDialogMode(mode);
      if (mode === "create") {
        setCurrentSkills({ ...skill, imagePath: null, type: false });
      } else if (mode === "update") {
        setCurrentSkills({ ...currentSkills, ...skill });
      }
      setDialogVisible(true);
    }
  };

  const handleDialogClose = () => {
    setDialogVisible(false);
    setCurrentSkills({});
  };

  const closeViewDialog = () => {
    setViewDialogVisible(false);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
    setSortType("all");
  };

  const handleSearch = () => {
    if (searchTerm.trim() === "") {
      setMessageSearch("Please enter a valid data for search");
      setSkills(originalSkill);
      return;
    }
    setMessageSearch("");
    const filteredSkill = originalSkill.filter((skill) =>
      skill.skillName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSkills(filteredSkill);
    setSortType("all");
  };

  const handleSortChange = (e) => {
    setSortType(e.target.value);
    sortSkill(e.target.value);
    setSearchTerm("");
    setMessageSearch("");
    setCurrentPage(1);
  };

  const sortSkill = (sortType) => {
    if (sortType === "all") {
      loadSkills();
    } else {
      const sortedSkills = originalSkill.filter((skill) => {
        return skill.type === (sortType === "active");
      });
      console.log(sortedSkills);
      setSkills(sortedSkills);
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
    setSortType("all");
    setCurrentPage(1);
    loadSkills();
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const renderPage = () => {
    if (filteredSkill.length <= SKILL_PER_PAGE) {
      return null;
    }

    return (
      <div className="pagination-buttons">
        {filteredSkill.length === 0 ? (
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
                  currentPage ===
                  Math.ceil(filteredSkill.length / SKILL_PER_PAGE)
                }
              >
                <FaAngleRight />
              </button>
              <button
                onClick={() =>
                  handlePageChange(
                    Math.ceil(filteredSkill.length / SKILL_PER_PAGE)
                  )
                }
                disabled={
                  currentPage ===
                  Math.ceil(filteredSkill.length / SKILL_PER_PAGE)
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
    <div className="admin-skill-container">
      <h1>Managing Skill</h1>
      {originalSkill.length === 0 ? (
        <div className="admin-skill-nodata">
          <p className="admin-skill-empty">The skill list is empty</p>
          <div className="admin-add-skill-empty">
            <button onClick={() => handleDialogOpen("create")}>
              <FaPlus />
            </button>
          </div>
          {dialogVisible && (
            <div className="dialog-empt-action-container">
              <div className="dialog-empt-action-content">
                <div className="dialog-empt-action-main">
                  <div className="dialog-empt-action-image-main">
                    <label className="dialog-empt-action-image-group">
                      <input
                        type="file"
                        id="imagePath"
                        accept="image/*"
                        onChange={(e) =>
                          setCurrentSkills({
                            ...currentSkills,
                            imagePath: e.target.files[0],
                          })
                        }
                        hidden
                        required={!currentSkills.skillId}
                      />
                      {currentSkills.imagePath ? (
                        <img
                          src={
                            currentSkills.imagePath instanceof File
                              ? window.URL.createObjectURL(
                                  currentSkills.imagePath
                                )
                              : `https://localhost:7052/Images/${currentSkills.imagePath}`
                          }
                          alt="skill-img"
                        />
                      ) : (
                        <img src="/assets/images/map.jpg" alt="skill-img" />
                      )}
                    </label>
                  </div>
                  <div className="dialog-empt-action-content-main">
                    <h2>
                      {dialogMode === "create" ? "Create a new" : "Update"}{" "}
                      Skill
                    </h2>
                    <div className="main-content-input-empt">
                      <div className="left-side-empt">
                        <div className="dialog-action-group-empt">
                          <label htmlFor="skillName">Name:</label>
                          <input
                            className="skill_name"
                            type="text"
                            id="skillName"
                            value={currentSkills.skillName || ""}
                            onChange={(e) =>
                              setCurrentSkills({
                                ...currentSkills,
                                skillName: e.target.value,
                              })
                            }
                            placeholder="Please enter skill name"
                          />
                        </div>
                        <div className="dialog-action-group-empt">
                          <label htmlFor="briefDescription">
                            Brief Description:
                          </label>
                          <textarea
                            className="briefDescription"
                            type="text"
                            id="briefDescription"
                            value={currentSkills.briefDescription || ""}
                            onChange={(e) =>
                              setCurrentSkills({
                                ...currentSkills,
                                briefDescription: e.target.value,
                              })
                            }
                            placeholder="Please enter skill briefDescription"
                          />
                        </div>
                        <div className="dialog-action-group-empt">
                          <label htmlFor="type">Type:</label>
                          <select
                            className="type"
                            id="type"
                            value={currentSkills.type || ""}
                            onChange={(e) =>
                              setCurrentSkills({
                                ...currentSkills,
                                type: e.target.value,
                              })
                            }
                          >
                            <option value="true">Active</option>
                            <option value="false">Passive</option>
                          </select>
                        </div>
                        <div className="dialog-action-group-empt">
                          <label htmlFor="cooldown">Cooldown:</label>
                          <input
                            type="number"
                            id="cooldown"
                            value={currentSkills.cooldown || ""}
                            min={1}
                            onChange={(e) =>
                              setCurrentSkills({
                                ...currentSkills,
                                cooldown: e.target.value,
                              })
                            }
                            placeholder="Please enter number value"
                          />
                        </div>
                        <div className="dialog-action-group-empt">
                          <label htmlFor="detailDescription">
                            Detail Description:
                          </label>
                          <textarea
                            type="text"
                            id="detailDescription"
                            value={currentSkills.detailDescription || ""}
                            min={1}
                            onChange={(e) =>
                              setCurrentSkills({
                                ...currentSkills,
                                detailDescription: e.target.value,
                              })
                            }
                            placeholder="Please enter number value"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="dialog-action-handle-empt">
                      <button onClick={actionSkills} id="actions-empt">
                        {dialogMode === "create" ? "Create" : "Update"}
                      </button>
                      <button
                        onClick={handleDialogClose}
                        id="cancel-actions-empt"
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
          <div className="admin-skills-top">
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
            <div className="admin-skills-filter">
              <select value={sortType} onChange={handleSortChange}>
                <option value="all">All</option>
                <option value="active">Active</option>
                <option value="passive">Passive</option>
              </select>
            </div>
            <div className="admin-add-skills">
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
              {currentSkillPage.length === 0 ? (
                <div className="error-message">
                  No data was found {currentPage.length}
                </div>
              ) : (
                <div
                  className="none-display"
                  id={currentSkillPage.length === 0 ? "none" : ""}
                >
                  {skills.length} {skills.length === 1 ? "skill" : "skills"}{" "}
                  found
                </div>
              )}
            </>
          )}
          {currentSkillPage.length === 0 ? (
            <>
              <div className="table-nodata-display"></div>
            </>
          ) : (
            <div className="admin-skills-table">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Type</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentSkillPage.map((skills) => (
                    <tr key={skills.skillId}>
                      <td className="admin-skills-images">
                        <div className="image-container">
                          {skills.imagePath && (
                            <img
                              src={`https://localhost:7052/Images/${skills.imagePath}`}
                              alt="skill-img"
                            />
                          )}
                        </div>
                      </td>
                      <td className="admin-skills-name">
                        <span>{skills.skillName}</span>
                      </td>
                      <td className="admin-skills-description">
                        <span>{skills.detailDescription}</span>
                      </td>
                      <td className="admin-skills-type">
                        <span>{skills.type ? "Active" : "Passive"}</span>
                      </td>
                      <td className="admin-skills-actions">
                        <button
                          onClick={() => handleDialogOpen("view", skills)}
                        >
                          <FaEye />
                        </button>
                        <button
                          onClick={() => handleDialogOpen("update", skills)}
                        >
                          <FaEdit />
                        </button>
                        <button onClick={() => showDeleteDialog(skills)}>
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
                <p>Are you sure you want to delete this skill?</p>
                <small>
                  If you delete that skill, all characters in this skill will be
                  affected.
                </small>
                <div className="dialog-remove-buttons">
                  <button onClick={removeSkill} id="removed">
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
                <div className="dialog-action-main">
                  <div className="dialog-action-image-main">
                    <label className="dialog-action-image-group">
                      <input
                        type="file"
                        id="imagePath"
                        accept="image/*"
                        onChange={(e) =>
                          setCurrentSkills({
                            ...currentSkills,
                            imagePath: e.target.files[0],
                          })
                        }
                        hidden
                        required={!currentSkills.skillId}
                      />
                      {currentSkills.imagePath ? (
                        <img
                          src={
                            currentSkills.imagePath instanceof File
                              ? window.URL.createObjectURL(
                                  currentSkills.imagePath
                                )
                              : `https://localhost:7052/Images/${currentSkills.imagePath}`
                          }
                          alt="skill-img"
                        />
                      ) : (
                        <img src="/assets/images/map.jpg" alt="skill-img" />
                      )}
                    </label>
                  </div>
                  <div className="dialog-action-content-main">
                    <h2>
                      {dialogMode === "create" ? "Create a new" : "Update"}{" "}
                      Skill
                    </h2>
                    <div className="main-content-input">
                      <div className="left-side">
                        <div className="dialog-action-group">
                          <label htmlFor="skillName">Name:</label>
                          <input
                            className="skill_name"
                            type="text"
                            id="skillName"
                            value={currentSkills.skillName || ""}
                            onChange={(e) =>
                              setCurrentSkills({
                                ...currentSkills,
                                skillName: e.target.value,
                              })
                            }
                            placeholder="Please enter skill name"
                          />
                        </div>
                        <div className="dialog-action-group">
                          <label htmlFor="briefDescription">
                            Brief Description:
                          </label>
                          <textarea
                            className="briefDescription"
                            type="text"
                            id="briefDescription"
                            value={currentSkills.briefDescription || ""}
                            onChange={(e) =>
                              setCurrentSkills({
                                ...currentSkills,
                                briefDescription: e.target.value,
                              })
                            }
                            placeholder="Please enter skill briefDescription"
                          />
                        </div>
                        <div className="dialog-action-group">
                          <label htmlFor="type">Type:</label>
                          <select
                            className="type"
                            id="type"
                            value={currentSkills.type || ""}
                            onChange={(e) =>
                              setCurrentSkills({
                                ...currentSkills,
                                type: e.target.value,
                              })
                            }
                          >
                            <option value="true">Active</option>
                            <option value="false">Passive</option>
                          </select>
                        </div>
                        <div className="dialog-action-group">
                          <label htmlFor="cooldown">Cooldown:</label>
                          <input
                            type="number"
                            id="cooldown"
                            value={currentSkills.cooldown || ""}
                            min={1}
                            onChange={(e) =>
                              setCurrentSkills({
                                ...currentSkills,
                                cooldown: e.target.value,
                              })
                            }
                            placeholder="Please enter number value"
                          />
                        </div>
                        <div className="dialog-action-group">
                          <label htmlFor="detailDescription">
                            Detail Description:
                          </label>
                          <textarea
                            type="text"
                            id="detailDescription"
                            value={currentSkills.detailDescription || ""}
                            min={1}
                            onChange={(e) =>
                              setCurrentSkills({
                                ...currentSkills,
                                detailDescription: e.target.value,
                              })
                            }
                            placeholder="Please enter number value"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="dialog-action-handle">
                      <button onClick={actionSkills} id="actions">
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
                  <h3>View {currentSkills.skillName}</h3>
                  <div className="dialog-view-images">
                    {currentSkills.imagePath && (
                      <img
                        src={`https://localhost:7052/Images/${currentSkills.imagePath}`}
                        alt="skill-img"
                        className="image-view-dialog"
                      />
                    )}
                  </div>
                  <div className="dialog-view-main">
                    <p>
                      Name: <span>{currentSkills.skillName}</span>
                    </p>
                    <p>
                      Brief Description:{" "}
                      <span> {currentSkills.briefDescription}</span>
                    </p>
                    <p>
                      Type:{" "}
                      <span> {currentSkills.type ? "Active" : "Passive"}</span>
                    </p>
                    <p>
                      Cooldown:<span> {currentSkills.cooldown}</span>
                    </p>
                    <p>
                      Detail Description:
                      <span> {currentSkills.detailDescription}</span>
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

export default AdminSkill;
