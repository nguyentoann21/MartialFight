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
  FaArrowLeft,
  FaArrowRight,
} from "react-icons/fa";
import "./adminBlogNews.scss";

const AdminNews = () => {
  const account = JSON.parse(localStorage.getItem("ADMIN_DATA"));
  const history = useNavigate();

  useEffect(() => {
    if (!account) {
      history("/");
    }
  }, [account, history]);

  const NEWS_PER_PAGE = 10;
  const [listNews, setListNews] = useState([]);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [dialogMode, setDialogMode] = useState("create");
  const [currentNews, setCurrentNews] = useState({ imagePath: [] });
  const [message, setMessage] = useState("");
  const [deleteDialogVisible, setDeleteDialogVisible] = useState(false);
  const [newsRemoved, setNewsRemoved] = useState(null);
  const [viewDialogVisible, setViewDialogVisible] = useState(false);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [messageSearch, setMessageSearch] = useState("");
  const [originalNews, setOriginalNews] = useState([]);
  const totalImages = currentNews.imagePath ? currentNews.imagePath.length : 0;
  const totalSlides = Math.ceil(totalImages / 3);
  const [sortType, setSortType] = useState("normal");
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredNews, setFilteredNews] = useState([]);
  const startIndex = (currentPage - 1) * NEWS_PER_PAGE;
  const endIndex = startIndex + NEWS_PER_PAGE;
  const currentNewsPage = filteredNews.slice(startIndex, endIndex);

  const showDeleteDialog = (news) => {
    setNewsRemoved(news);
    setDeleteDialogVisible(true);
  };

  const closeDeleteDialog = () => {
    setDeleteDialogVisible(false);
    setNewsRemoved(null);
  };

  useEffect(() => {
    loadNews();
  }, []);

  useEffect(() => {
    setFilteredNews(listNews);
  }, [listNews, searchTerm]);

  const loadNews = async () => {
    try {
      const response = await axios.get("https://localhost:7052/api/mf/news");
      setListNews(
        response.data.map((news) => {
          return {
            ...news,
            imagePath: news.imagePath ? news.imagePath.split(",") : [],
          };
        })
      );

      setOriginalNews(
        response.data.map((news) => {
          return {
            ...news,
            imagePath: news.imagePath ? news.imagePath.split(",") : [],
          };
        })
      );
    } catch (error) {
      console.error(error);
    }
  };

  const actionNews = async () => {
    const formData = new FormData();
    formData.append("newsTitle", currentNews.newsTitle);
    formData.append("description", currentNews.description);
    for (let i = 0; i < Math.min(currentNews.imagePath.length, 5); i++) {
      formData.append("imagePath", currentNews.imagePath[i]);
    }

    if (currentNews.imagePath.length > 5) {
      setMessage("Please choose a maximum of 5 images");
      return;
    }

    const url =
      dialogMode === "create"
        ? "https://localhost:7052/api/mf/news"
        : `https://localhost:7052/api/mf/news/${currentNews.newsId}`;

    try {
      let response;
      if (dialogMode === "create") {
        response = await axios.post(url, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        setMessage("News created successfully");
      } else if (dialogMode === "update") {
        response = await axios.put(url, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        setMessage("News updated successfully");
      }

      if (response.status === 200 || response.status === 201) {
        setDialogVisible(false);
        loadNews();
      } else {
        setMessage("Failed to save the news");
      }
    } catch (error) {
      if (
        error.response.status === 406 ||
        error.response.status === 405 ||
        error.response.status === 403 ||
        error.response.status === 413
      ) {
        setMessage(error.response.data);
      } else {
        setMessage("Failed to save the news");
      }
    }
  };

  const removeNews = async () => {
    if (newsRemoved) {
      try {
        await axios.delete(
          `https://localhost:7052/api/mf/news/${newsRemoved.newsId}`
        );
        setMessage("News deleted successfully");
        loadNews();
        if (currentNewsPage.length === 1 && currentPage > 1) {
          setCurrentPage(currentPage - 1);
        }
      } catch (error) {
        console.error(error);
        setMessage("Failed to delete the news");
      }
      closeDeleteDialog();
    }
  };

  const handleDialogOpen = (mode, news) => {
    if (mode === "view") {
      setCurrentNews(news);
      setViewDialogVisible(true);
    } else {
      setDialogMode(mode);
      setCurrentNews(news ? { ...news, imagePath: [] } : { imagePath: [] });
      setDialogVisible(true);
    }
  };

  const handleDialogClose = () => {
    setDialogVisible(false);
    setCurrentNews({});
  };

  const closeViewDialog = () => {
    setViewDialogVisible(false);
    setCurrentSlideIndex(0);
  };

  const TimeDisplay = ({ dateTime }) => {
    const date = new Date(dateTime);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")} - ${day
      .toString()
      .padStart(2, "0")}/${month.toString().padStart(2, "0")}/${year}`;
    return <span>{formattedTime}</span>;
  };

  const handlePrevSlide = () => {
    setCurrentSlideIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const handleNextSlide = () => {
    setCurrentSlideIndex((prevIndex) =>
      Math.min(prevIndex + 1, totalSlides - 1)
    );
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
    setSortType("normal");
  };

  const handleSearch = () => {
    if (searchTerm.trim() === "") {
      setMessageSearch("Please enter a valid data for search");
      setListNews(originalNews);
      return;
    }
    setMessageSearch("");

    const filteredNews = originalNews.filter(
      (news) =>
        news.newsTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        news.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setListNews(filteredNews);
  };

  const handleSortChange = (e) => {
    setSortType(e.target.value);
    sortNews(e.target.value);
    setMessageSearch("");
    setSearchTerm("");
    setCurrentPage(1);
  };

  const sortNews = (sortType) => {
    if (sortType === "normal") {
      loadNews();
    } else {
      const sortedNews = [...originalNews];
      sortedNews.sort((a, b) => {
        const dateA = new Date(a.postAt);
        const dateB = new Date(b.postAt);
        if (sortType === "ascending") {
          return dateA - dateB;
        } else {
          return dateB - dateA;
        }
      });
      setListNews(sortedNews);
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
    setCurrentPage(1);
    loadNews();
    setSortType("normal");
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const renderPage = () => {
    if (filteredNews.length <= NEWS_PER_PAGE) {
      return null;
    }

    return (
      <div className="pagination-buttons">
        {filteredNews.length === 0 ? (
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
                  currentPage === Math.ceil(filteredNews.length / NEWS_PER_PAGE)
                }
              >
                <FaAngleRight />
              </button>
              <button
                onClick={() =>
                  handlePageChange(
                    Math.ceil(filteredNews.length / NEWS_PER_PAGE)
                  )
                }
                disabled={
                  currentPage === Math.ceil(filteredNews.length / NEWS_PER_PAGE)
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
    <div className="admin-news-container">
      <h1>Managing News</h1>
      {originalNews.length === 0 ? (
        <div className="admin-news-nodata">
          <p className="admin-news-empty">The news list is empty</p>
          <div className="admin-add-news-empty">
            <button onClick={() => handleDialogOpen("create")}>
              <FaPlus />
            </button>
          </div>
          {dialogVisible && (
            <div className="dialog-empt-action-container">
              <div className="dialog-empt-action-content">
                <h2>{dialogMode === "create" ? "Create" : "Update"} News</h2>
                <div className="dialog-empt-action-main">
                  <div className="dialog-empt-action-group ">
                    <label htmlFor="newsTitle">Title:</label>
                    <input
                      className="news_title"
                      type="text"
                      id="newsTitle"
                      value={currentNews.newsTitle || ""}
                      onChange={(e) =>
                        setCurrentNews({
                          ...currentNews,
                          newsTitle: e.target.value,
                        })
                      }
                      placeholder="Please enter news title"
                    />
                  </div>
                  <div className="dialog-empt-action-group ">
                    <label htmlFor="description">Content:</label>
                    <textarea
                      id="description"
                      value={currentNews.description || ""}
                      onChange={(e) =>
                        setCurrentNews({
                          ...currentNews,
                          description: e.target.value,
                        })
                      }
                      placeholder="Please enter the news content"
                    />
                  </div>
                  <div className="dialog-empt-action-group ">
                    <label htmlFor="imagePath">Images:</label>
                    <input
                      type="file"
                      id="imagePath"
                      accept="image/*"
                      multiple
                      onChange={(e) => {
                        const selectedImages = e.target.files;
                        if (selectedImages.length > 5) {
                          setMessage("Please choose a maximum of 5 images");
                          return;
                        }
                        setCurrentNews({
                          ...currentNews,
                          imagePath: selectedImages,
                        });
                        setMessage("");
                      }}
                      required={!currentNews.newsId}
                    />
                  </div>
                  <div className="dialog-empt-action-group ">
                    {Array.isArray(currentNews.imagePath) &&
                      currentNews.imagePath.map((image, index) => (
                        <img
                          key={index}
                          src={window.URL.createObjectURL(image)}
                          alt={`img ${index}`}
                          style={{ width: "200px" }}
                        />
                      ))}
                  </div>
                  <div className="dialog-empt-action-handle">
                    <button onClick={actionNews} id="actions-empt">
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
          <div className="admin-news-top">
            <div className="admin-search-bar">
              <input
                type="text"
                placeholder="Search by title or content..."
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
            <div className="admin-news-filter">
              <select value={sortType} onChange={handleSortChange}>
                <option value="normal">Normal time</option>
                <option value="ascending">Long time ago</option>
                <option value="descending">Recent time ago</option>
              </select>
            </div>
            <div className="admin-add-news">
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
              {currentNewsPage.length === 0 ? (
                <div className="error-message">No data was found</div>
              ) : (
                <div
                  className="none-display"
                  id={currentNewsPage.length === 0 ? "none" : ""}
                >
                  {listNews.length}{" "}
                  {listNews.length === 1 ? "news was" : "news were"} found
                </div>
              )}
            </>
          )}
          {currentNewsPage.length === 0 ? (
            <div className="table-nodata-display"></div>
          ) : (
            <div className="admin-news-table">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Content</th>
                    <th>Posted At</th>
                    <th>Images</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentNewsPage.map((news) => (
                    <tr key={news.newsId}>
                      <td className="admin-news-title">
                        <span>{news.newsTitle}</span>
                      </td>
                      <td className="admin-news-content">
                        <span>{news.description}</span>
                      </td>
                      <td className="admin-news-date">
                        <TimeDisplay dateTime={news.postAt} />
                      </td>
                      <td className="admin-news-images">
                        <div className="image-container">
                          {Array.isArray(news.imagePath) &&
                          news.imagePath.length > 0 ? (
                            news.imagePath
                              .slice(0, 3)
                              .map((image, index) => (
                                <img
                                  key={index}
                                  src={`https://localhost:7052/Images/${image}`}
                                  alt={`img ${index}`}
                                />
                              ))
                          ) : (
                            <span>No images available</span>
                          )}
                          {news.imagePath.length > 3 && (
                            <span className="more-images">
                              +{news.imagePath.length - 3} more
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="admin-news-actions">
                        <button onClick={() => handleDialogOpen("view", news)}>
                          <FaEye />
                        </button>
                        <button
                          onClick={() => handleDialogOpen("update", news)}
                        >
                          <FaEdit />
                        </button>
                        <button onClick={() => showDeleteDialog(news)}>
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
                <p>Are you sure you want to delete this news?</p>
                <div className="dialog-remove-buttons">
                  <button onClick={removeNews} id="removed">
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
                <h2>{dialogMode === "create" ? "Create" : "Update"} News</h2>
                <div className="dialog-action-main">
                  <div className="dialog-action-group">
                    <label htmlFor="newsTitle">Title:</label>
                    <input
                      className="news_title"
                      type="text"
                      id="newsTitle"
                      value={currentNews.newsTitle || ""}
                      onChange={(e) =>
                        setCurrentNews({
                          ...currentNews,
                          newsTitle: e.target.value,
                        })
                      }
                      placeholder="Please enter news title"
                    />
                  </div>
                  <div className="dialog-action-group">
                    <label htmlFor="description">Content:</label>
                    <textarea
                      id="description"
                      value={currentNews.description || ""}
                      onChange={(e) =>
                        setCurrentNews({
                          ...currentNews,
                          description: e.target.value,
                        })
                      }
                      placeholder="Please enter the news content"
                    />
                  </div>
                  <div className="dialog-action-group">
                    <label htmlFor="imagePath">Images:</label>
                    <input
                      type="file"
                      id="imagePath"
                      accept="image/*"
                      multiple
                      onChange={(e) => {
                        const selectedImages = e.target.files;
                        if (selectedImages.length > 5) {
                          setMessage("Please choose a maximum of 5 images");
                          return;
                        }
                        setCurrentNews({
                          ...currentNews,
                          imagePath: selectedImages,
                        });
                        setMessage("");
                      }}
                      required={!currentNews.newsId}
                    />
                  </div>
                  <div className="dialog-action-group">
                    {Array.isArray(currentNews.imagePath) &&
                      currentNews.imagePath.map((image, index) => (
                        <img
                          key={index}
                          src={window.URL.createObjectURL(image)}
                          alt={`img ${index}`}
                          style={{ width: "200px" }}
                        />
                      ))}
                  </div>
                  <div className="dialog-action-handle">
                    <button onClick={actionNews} id="actions">
                      {dialogMode === "create" ? "Create" : "Update"}
                    </button>
                    <button onClick={handleDialogClose} id="cancel-actions">
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
          {viewDialogVisible && (
            <div className="dialog-view-container">
              <div className="dialog-view-main-content">
                <div className="dialog-view-content">
                  <h3>View News</h3>
                  <div className="dialog-view-main">
                    <p>
                      Title: <span>{currentNews.newsTitle}</span>
                    </p>
                    <p>
                      Content:<span> {currentNews.description}</span>
                    </p>
                    <p>
                      PostAt: <TimeDisplay dateTime={currentNews.postAt} />
                    </p>
                  </div>
                  <div className="dialog-view-images">
                    {Array.isArray(currentNews.imagePath) &&
                    currentNews.imagePath.length > 0 ? (
                      <div className="slideshow-container">
                        <div
                          className={
                            currentNews.imagePath.length >= 3
                              ? "slideshow-slide"
                              : "slideshow-image-none"
                          }
                        >
                          {currentNews.imagePath
                            .slice(
                              currentSlideIndex * 3,
                              currentSlideIndex * 3 + 3
                            )
                            .map((image, index) => (
                              <img
                                key={index}
                                src={`https://localhost:7052/Images/${image}`}
                                alt={`img ${index}`}
                                className={
                                  currentNews.imagePath.length === 2
                                    ? "slideshow-twice"
                                    : "slideshow-image"
                                }
                              />
                            ))}
                        </div>
                        {currentNews.imagePath.length > 3 &&
                          currentSlideIndex !== 0 && (
                            <button
                              onClick={handlePrevSlide}
                              className="prev-button"
                            >
                              <FaArrowLeft />
                            </button>
                          )}
                        {currentNews.imagePath.length > 3 &&
                          currentSlideIndex !== totalSlides - 1 && (
                            <button
                              onClick={handleNextSlide}
                              className="next-button"
                            >
                              <FaArrowRight />
                            </button>
                          )}
                      </div>
                    ) : (
                      <span>No images available</span>
                    )}
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
export default AdminNews;
