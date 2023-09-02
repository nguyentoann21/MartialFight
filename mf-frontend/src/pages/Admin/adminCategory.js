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
import "./adminCategory.scss";

const AdminCategory = () => {
  const account = JSON.parse(localStorage.getItem("ADMIN_DATA"));
  const history = useNavigate();

  useEffect(() => {
    if (!account) {
      history("/");
    }
  }, [account, history]);

  const CATEGORY_PER_PAGE = 10;
  const [categories, setCategories] = useState([]);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [dialogMode, setDialogMode] = useState("create");
  const [currentCategory, setCurrentCategory] = useState({
    categoryName: "",
    description: "",
    imagePath: null,
  });

  const [message, setMessage] = useState("");
  const [deleteDialogVisible, setDeleteDialogVisible] = useState(false);
  const [categoryRemoved, setCategoryRemoved] = useState(null);
  const [viewDialogVisible, setViewDialogVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [messageSearch, setMessageSearch] = useState("");
  const [originalCategory, setOriginalCategory] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredCategory, setFilteredCategory] = useState([]);
  const startIndex = (currentPage - 1) * CATEGORY_PER_PAGE;
  const endIndex = startIndex + CATEGORY_PER_PAGE;
  const currentCategoryPage = filteredCategory.slice(startIndex, endIndex);

  const showDeleteDialog = (category) => {
    setCategoryRemoved(category);
    setDeleteDialogVisible(true);
  };

  const closeDeleteDialog = () => {
    setDeleteDialogVisible(false);
    setCategoryRemoved(null);
    loadCategory();
  };

  useEffect(() => {
    setFilteredCategory(categories);
  }, [categories, searchTerm]);

  useEffect(() => {
    return () => {
      if (currentCategory.imagePath && currentCategory.imagePath[0]) {
        window.URL.revokeObjectURL(currentCategory.imagePath[0]);
      }
    };
  }, [currentCategory.imagePath]);

  const loadCategory = async () => {
    try {
      const response = await axios.get(
        "https://localhost:7052/api/mf/categories"
      );
      setCategories(
        response.data.map((category) => {
          return {
            ...category,
            imagePath: category.imagePath ? category.imagePath : null,
          };
        })
      );
      setOriginalCategory(
        response.data.map((category) => {
          return {
            ...category,
            imagePath: category.imagePath ? category.imagePath : null,
          };
        })
      );
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadCategory();
  }, []);

  const actionCategory = async () => {
    const formData = new FormData();
    if (
      !currentCategory.categoryName ||
      !currentCategory.description ||
      currentCategory.imagePath === null
    ) {
      setMessage("Please fill in all the required fields");
      return;
    }

    const original = originalCategory.find(
      (category) => category.categoryId === currentCategory.categoryId
    );

    if (dialogMode === "update") {
      formData.append("categoryId", currentCategory.categoryId);

      if (
        currentCategory.categoryName !== original.categoryName ||
        currentCategory.description !== original.description ||
        (currentCategory.imagePath &&
          currentCategory.imagePath !== original.imagePath)
      ) {
        formData.append("categoryName", currentCategory.categoryName);
        formData.append("description", currentCategory.description);
        formData.append("imagePath", currentCategory.imagePath);
      } else {
        setMessage("Nothing to update");
        return;
      }
    } else {
      if (currentCategory.categoryName !== originalCategory.categoryName) {
        formData.append("categoryName", currentCategory.categoryName);
      }
      if (currentCategory.description !== originalCategory.description) {
        formData.append("description", currentCategory.description);
      }
      if (
        currentCategory.imagePath &&
        currentCategory.imagePath !== originalCategory.imagePath
      ) {
        formData.append("imagePath", currentCategory.imagePath);
      }
    }

    const url =
      dialogMode === "create"
        ? "https://localhost:7052/api/mf/categories"
        : `https://localhost:7052/api/mf/categories/${currentCategory.categoryId}`;

    try {
      let response;
      if (dialogMode === "create") {
        response = await axios.post(url, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        setMessage("Category created successfully");
      } else if (dialogMode === "update") {
        response = await axios.put(url, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        setMessage("Category updated successfully");
      }

      if (response.status === 200 || response.status === 202) {
        setDialogVisible(false);
        loadCategory();
      } else {
        setMessage("Failed to save the category");
      }
    } catch (error) {
      console.error(error);
      if (error.response.status === 405) {
        setMessage(error.response.data);
      } else {
        setMessage("Failed to save the category");
      }
    }
  };

  const removeCategory = async () => {
    if (categoryRemoved) {
      try {
        await axios.delete(
          `https://localhost:7052/api/mf/categories/${categoryRemoved.categoryId}`
        );
        setMessage("Category deleted successfully");
        loadCategory();
        if (currentCategoryPage.length === 1 && currentPage > 1) {
          setCurrentPage(currentPage - 1);
        }
      } catch (error) {
        console.error(error);
        if (error.response.status === 409) {
          setMessage(error.response.data);
        } else {
          setMessage("Failed to delete the category");
        }
      }
      closeDeleteDialog();
    }
  };

  const handleDialogOpen = (mode, category) => {
    if (mode === "view") {
      setCurrentCategory(category);
      setViewDialogVisible(true);
    } else {
      setDialogMode(mode);
      if (mode === "create") {
        setCurrentCategory({ ...category, imagePath: null });
      } else if (mode === "update") {
        setCurrentCategory({ ...currentCategory, ...category });
      }
      setDialogVisible(true);
    }
  };

  const handleDialogClose = () => {
    setDialogVisible(false);
    setCurrentCategory({});
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
      setCategories(originalCategory);
      return;
    }
    setMessageSearch("");
    const filteredCategory = originalCategory.filter((category) =>
      category.categoryName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setCategories(filteredCategory);
  };

  const handleKey = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleReload = () => {
    setSearchTerm("");
    setMessageSearch("");
    loadCategory();
    setCurrentPage(1);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const renderPage = () => {
    if (filteredCategory.length <= CATEGORY_PER_PAGE) {
      return null;
    }

    return (
      <div className="pagination-buttons">
        {filteredCategory.length === 0 ? (
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
                  Math.ceil(filteredCategory.length / CATEGORY_PER_PAGE)
                }
              >
                <FaAngleRight />
              </button>
              <button
                onClick={() =>
                  handlePageChange(
                    Math.ceil(filteredCategory.length / CATEGORY_PER_PAGE)
                  )
                }
                disabled={
                  currentPage ===
                  Math.ceil(filteredCategory.length / CATEGORY_PER_PAGE)
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
    <div className="admin-category-container">
      <h1>Managing Category</h1>
      {originalCategory.length === 0 ? (
        <div className="admin-category-nodata">
          <p className="admin-category-empty">The category list is empty</p>
          <div className="admin-add-category-empty">
            <button onClick={() => handleDialogOpen("create")}>
              <FaPlus />
            </button>
          </div>
          {dialogVisible && (
            <div className="dialog-empt-action-container">
              <div className="dialog-empt-action-content">
                <h2>
                  {dialogMode === "create" ? "Create" : "Update"} Category
                </h2>
                <div className="dialog-empt-action-main">
                  <div className="dialog-empt-action-image-main">
                    <label className="dialog-empt-action-image-group">
                      <input
                        type="file"
                        id="images"
                        accept="image/*"
                        onChange={(e) =>
                          setCurrentCategory({
                            ...currentCategory,
                            imagePath: e.target.files[0],
                          })
                        }
                        hidden
                        required={!currentCategory.categoryID}
                      />
                      {currentCategory.imagePath ? (
                        <img
                          src={
                            currentCategory.imagePath instanceof File
                              ? window.URL.createObjectURL(
                                  currentCategory.imagePath
                                )
                              : `https://localhost:7052/Images/${currentCategory.imagePath}`
                          }
                          alt="category-img"
                        />
                      ) : (
                        <img src="/assets/images/map.jpg" alt="category-img" />
                      )}
                    </label>
                  </div>
                  <div className="dialog-empt-action-content-main">
                    <div className="dialog-empt-action-group">
                      <label htmlFor="categoryName">Category Name:</label>
                      <input
                        className="category_name"
                        type="text"
                        id="categoryName"
                        value={currentCategory.categoryName || ""}
                        onChange={(e) =>
                          setCurrentCategory({
                            ...currentCategory,
                            categoryName: e.target.value,
                          })
                        }
                        placeholder="Please enter category name"
                      />
                    </div>
                    <div className="dialog-empt-action-group">
                      <label htmlFor="description">Description:</label>
                      <textarea
                        id="description"
                        value={currentCategory.description || ""}
                        onChange={(e) =>
                          setCurrentCategory({
                            ...currentCategory,
                            description: e.target.value,
                          })
                        }
                        placeholder="Please enter the category description"
                      />
                    </div>
                    <div className="dialog-empt-action-handle">
                      <button onClick={actionCategory} id="actions-empt">
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
          <div className="admin-categories-top">
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
            <div className="admin-add-categories">
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
              {currentCategoryPage.length === 0 ? (
                <div className="error-message">No data was found</div>
              ) : (
                <div
                  className="none-display"
                  id={currentCategoryPage.length === 0 ? "none" : ""}
                >
                  {categories.length}{" "}
                  {categories.length === 1 ? "category" : "categories"} found
                </div>
              )}
            </>
          )}
          {currentCategoryPage.length === 0 ? (
            <div className="table-nodata-display"></div>
          ) : (
            <div className="admin-categories-table">
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
                  {currentCategoryPage.map((category) => (
                    <tr key={category.categoryId}>
                      <td className="admin-categories-images">
                        <div className="image-container">
                          {category.imagePath && (
                            <img
                              src={`https://localhost:7052/Images/${category.imagePath}`}
                              alt="category-img"
                            />
                          )}
                        </div>
                      </td>
                      <td className="admin-category-name">
                        <span>{category.categoryName}</span>
                      </td>
                      <td className="admin-category-description">
                        <span>{category.description}</span>
                      </td>
                      <td className="admin-categories-actions">
                        <button
                          onClick={() => handleDialogOpen("view", category)}
                        >
                          <FaEye />
                        </button>
                        <button
                          onClick={() => handleDialogOpen("update", category)}
                        >
                          <FaEdit />
                        </button>
                        <button onClick={() => showDeleteDialog(category)}>
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
                <p>Are you sure you want to delete this category?</p>
                <small>
                  If you delete that category, all items in this category will
                  be removed as well.
                </small>
                <div className="dialog-remove-buttons">
                  <button onClick={removeCategory} id="removed">
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
                <h2>
                  {dialogMode === "create" ? "Create" : "Update"} Category
                </h2>
                <div className="dialog-action-main">
                  <div className="dialog-action-image-main">
                    <label className="dialog-action-image-group">
                      <input
                        type="file"
                        id="images"
                        accept="image/*"
                        onChange={(e) =>
                          setCurrentCategory({
                            ...currentCategory,
                            imagePath: e.target.files[0],
                          })
                        }
                        hidden
                        required={!currentCategory.categoryID}
                      />
                      {currentCategory.imagePath ? (
                        <img
                          src={
                            currentCategory.imagePath instanceof File
                              ? window.URL.createObjectURL(
                                  currentCategory.imagePath
                                )
                              : `https://localhost:7052/Images/${currentCategory.imagePath}`
                          }
                          alt="category-img"
                        />
                      ) : (
                        <img src="/assets/images/map.jpg" alt="category-img" />
                      )}
                    </label>
                  </div>
                  <div className="dialog-action-content-main">
                    <div className="dialog-action-group">
                      <label htmlFor="categoryName">Category Name:</label>
                      <input
                        className="category_name"
                        type="text"
                        id="categoryName"
                        value={currentCategory.categoryName || ""}
                        onChange={(e) =>
                          setCurrentCategory({
                            ...currentCategory,
                            categoryName: e.target.value,
                          })
                        }
                        placeholder="Please enter category name"
                      />
                    </div>
                    <div className="dialog-action-group">
                      <label htmlFor="description">Description:</label>
                      <textarea
                        id="description"
                        value={currentCategory.description || ""}
                        onChange={(e) =>
                          setCurrentCategory({
                            ...currentCategory,
                            description: e.target.value,
                          })
                        }
                        placeholder="Please enter the category description"
                      />
                    </div>
                    <div className="dialog-action-handle">
                      <button onClick={actionCategory} id="actions">
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
                    {currentCategory.imagePath && (
                      <img
                        src={`https://localhost:7052/Images/${currentCategory.imagePath}`}
                        alt="category-img"
                        className="image-view-dialog"
                      />
                    )}
                  </div>
                  <div className="dialog-view-main">
                    <p>
                      Name: <span>{currentCategory.categoryName}</span>
                    </p>
                    <p>
                      Description:
                      <span> {currentCategory.description}</span>
                    </p>
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

export default AdminCategory;
