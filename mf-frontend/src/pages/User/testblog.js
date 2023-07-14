import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  FaArrowLeft,
  FaArrowRight,
  FaTrash,
  FaEdit,
  FaEye,
  FaPlus,
  FaCheck,
  FaTimes,
  FaSearch,
} from "react-icons/fa";
import "./testblog.css";

const BlogView = () => {
  const [blogs, setBlogs] = useState([]);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [dialogMode, setDialogMode] = useState("create");
  const [currentBlog, setCurrentBlog] = useState({ images: [] });
  const [message, setMessage] = useState("");
  const [deleteDialogVisible, setDeleteDialogVisible] = useState(false);
  const [blogToDelete, setBlogToDelete] = useState(null);
  const [viewDialogVisible, setViewDialogVisible] = useState(false);

  const totalImages = currentBlog.images ? currentBlog.images.length : 0;
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const totalSlides = Math.ceil(totalImages / 3);

  const [searchTerm, setSearchTerm] = useState("");
  const [messageSearch, setMessageSearch] = useState("");
  const [originalBlogs, setOriginalBlogs] = useState([]);
  const [sortType, setSortType] = useState("normal");

  const showDeleteDialog = (blog) => {
    setBlogToDelete(blog);
    setDeleteDialogVisible(true);
  };

  const closeDeleteDialog = () => {
    setDeleteDialogVisible(false);
    setBlogToDelete(null);
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await axios.get("https://localhost:7052/api/mf/blogs");
      setBlogs(
        response.data.map((blog) => {
          return {
            ...blog,
            images: blog.images ? blog.images.split(",") : [],
          };
        })
      );

      setOriginalBlogs(
        response.data.map((blog) => {
          return {
            ...blog,
            images: blog.images ? blog.images.split(",") : [],
          };
        })
      );
    } catch (error) {
      console.error(error);
    }
  };

  const saveBlog = async () => {
    const formData = new FormData();
    formData.append("blogTitle", currentBlog.blogTitle);
    formData.append("blogContent", currentBlog.blogContent);
    for (let i = 0; i < currentBlog.images.length; i++) {
      formData.append("Images", currentBlog.images[i]);
    }

    const url =
      dialogMode === "create"
        ? "https://localhost:7052/api/mf/blogs"
        : `https://localhost:7052/api/mf/blogs/${currentBlog.blogID}`;

    try {
      let response;
      if (dialogMode === "create") {
        response = await axios.post(url, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        setMessage("Blog created successfully");
      } else if (dialogMode === "update") {
        response = await axios.put(url, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        console.log(url);
        console.log(response.status);
        setMessage("Blog updated successfully");
      }

      if (response.status === 200 || response.status === 201) {
        setDialogVisible(false);
        fetchBlogs();
      } else {
        setMessage("Failed to save the blog");
      }
    } catch (error) {
      console.error(error);
      setMessage("Failed to save the blog");
    }
  };

  const confirmDelete = async () => {
    if (blogToDelete) {
      try {
        await axios.delete(
          `https://localhost:7052/api/mf/blogs/${blogToDelete.blogID}`
        );
        setMessage("Blog deleted successfully");
        fetchBlogs();
      } catch (error) {
        console.error(error);
        setMessage("Failed to delete the blog");
      }
      closeDeleteDialog();
    }
  };

  const handleDialogOpen = (mode, blog) => {
    if (mode === "view") {
      setCurrentBlog(blog);
      setViewDialogVisible(true);
    } else {
      setDialogMode(mode);
      setCurrentBlog(blog ? { ...blog, images: [] } : { images: [] });
      setDialogVisible(true);
    }
  };

  const handleDialogClose = () => {
    setDialogVisible(false);
    setCurrentBlog({});
  };

  const closeViewDialog = () => {
    setViewDialogVisible(false);
    setCurrentSlideIndex(0);
  };

  const TimeDisplay = ({ dateTime }) => {
    const dateObj = new Date(dateTime);

    const hours = dateObj.getHours();
    const minutes = dateObj.getMinutes();
    const seconds = dateObj.getSeconds();
    const day = dateObj.getDate();
    const month = dateObj.getMonth() + 1;
    const year = dateObj.getFullYear();

    const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")} - ${day
      .toString()
      .padStart(2, "0")}/${month.toString().padStart(2, "0")}/${year}`;

    return <div>{formattedTime}</div>;
  };

  const handlePrevSlide = () => {
    setCurrentSlideIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const handleNextSlide = () => {
    setCurrentSlideIndex((prevIndex) =>
      Math.min(prevIndex + 1, totalSlides - 1)
    );
  };

  const handleSearch = () => {
    const trimmedSearchTerm = searchTerm.trim();
    if (trimmedSearchTerm === "") {
      setMessageSearch("Please enter a valid data for search");
      setBlogs(originalBlogs);
      return;
    }
    setMessageSearch("");

    const filteredBlogs = originalBlogs.filter(
      (blog) =>
        blog.blogTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.blogContent.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setBlogs(filteredBlogs);
  };

  const handleSortChange = (e) => {
    setSortType(e.target.value);
    sortBlogs(e.target.value);
  };

  const sortBlogs = (sortType) => {
    if (sortType === "normal") {
      fetchBlogs();
    } else {
      const sortedBlogs = [...blogs];
      sortedBlogs.sort((a, b) => {
        const dateA = new Date(a.postAt);
        const dateB = new Date(b.postAt);

        if (sortType === "ascending") {
          return dateA - dateB;
        } else {
          return dateB - dateA;
        }
      });

      setBlogs(sortedBlogs);
    }
  };

  const handleKey = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div>
      <h1>Blog List</h1>
      {originalBlogs.length === 0 ? (
        <div className="empt-list-news">
          <p className="error-message">The news list empty</p>
          <button
            className="top-btn"
            onClick={() => handleDialogOpen("create")}
          >
            New&nbsp;
            <FaPlus />
          </button>
          {dialogVisible && (
            <div className="dialog-a-visible">
              <div className="dialog-a-container">
                <h2>{dialogMode === "create" ? "Create" : "Update"} Blog</h2>
                <div className="d">
                  <label className="d-ctrl" htmlFor="blogTitle">
                    Title:
                  </label>
                  <input
                    className="bg_title"
                    type="text"
                    id="blogTitle"
                    value={currentBlog.blogTitle || ""}
                    onChange={(e) =>
                      setCurrentBlog({
                        ...currentBlog,
                        blogTitle: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="d">
                  <label className="d-ctrl" htmlFor="blogContent">
                    Content:
                  </label>
                  <textarea
                    id="blogContent"
                    value={currentBlog.blogContent || ""}
                    onChange={(e) =>
                      setCurrentBlog({
                        ...currentBlog,
                        blogContent: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="d">
                  <label className="d-ctrl" htmlFor="images">
                    Images:
                  </label>
                  <input
                    type="file"
                    id="images"
                    accept="image/*"
                    multiple
                    onChange={(e) =>
                      setCurrentBlog({ ...currentBlog, images: e.target.files })
                    }
                    required={!currentBlog.blogID}
                  />
                </div>
                <div>
                  {Array.isArray(currentBlog.images) &&
                    currentBlog.images.map((image, index) => (
                      <img
                        key={index}
                        src={window.URL.createObjectURL(image)}
                        alt={`img ${index}`}
                        style={{ width: "200px" }}
                      />
                    ))}
                </div>
                <div className="d-btn-ctrl">
                  <button className="d-btn" onClick={saveBlog}>
                    {dialogMode === "create" ? "Create" : "Update"}
                  </button>
                  <button className="d-cancel" onClick={handleDialogClose}>
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <>
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search blogs"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={handleKey}
              className="i-search"
              onClick={() => setMessageSearch("")}
            />
            <button onClick={handleSearch} className="btn-s">
              <FaSearch />
            </button>
          </div>
          <div className="top-ctrl">
            <select
              className="top-s"
              value={sortType}
              onChange={handleSortChange}
            >
              <option value="normal">Normal time</option>
              <option value="ascending">Long time ago</option>
              <option value="descending">Recent time ago</option>
            </select>
            <button
              className="top-btn"
              onClick={() => handleDialogOpen("create")}
            >
              New&nbsp;
              <FaPlus />
            </button>
          </div>

          {messageSearch ? (
            <div className="error-message">{messageSearch}</div>
          ) : (
            <div className="none-display" id={blogs.length === 0 ? "none" : ""}>
              {blogs.length} {blogs.length === 1 ? "blog" : "blogs"} found
            </div>
          )}

          {blogs.length === 0 ? (
            <p className="error-message">No data was found</p>
          ) : (
            <table>
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
                {blogs.map((blog) => (
                  <tr key={blog.blogID}>
                    <td>{blog.blogTitle}</td>
                    <td>{blog.blogContent}</td>
                    <td>
                      <TimeDisplay dateTime={blog.postAt} />
                    </td>
                    <td>
                      <div className="image-container">
                        {Array.isArray(blog.images) &&
                        blog.images.length > 0 ? (
                          blog.images
                            .slice(0, 3)
                            .map((image, index) => (
                              <img
                                key={index}
                                src={`https://localhost:7052/${image}`}
                                alt={`img ${index}`}
                                className="thumbnail"
                              />
                            ))
                        ) : (
                          <span>No images available</span>
                        )}
                        {blog.images.length > 3 && (
                          <span className="more-images">
                            +{blog.images.length - 3} more
                          </span>
                        )}
                      </div>
                    </td>
                    <td>
                      <button onClick={() => handleDialogOpen("view", blog)}>
                        <FaEye />
                      </button>

                      <button onClick={() => handleDialogOpen("update", blog)}>
                        <FaEdit />
                      </button>
                      <button onClick={() => showDeleteDialog(blog)}>
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {deleteDialogVisible && (
            <div className="dialog-container">
              <div className="dialog">
                <h3>Deletion</h3>
                <p>Are you sure you want to delete this blog?</p>
                <div className="dialog-buttons">
                  <button onClick={confirmDelete}>
                    <FaCheck />
                  </button>
                  <button onClick={closeDeleteDialog}>
                    <FaTimes />
                  </button>
                </div>
              </div>
            </div>
          )}

          {dialogVisible && (
            <div className="dialog-a-visible">
              <div className="dialog-a-container">
                <h2>{dialogMode === "create" ? "Create" : "Update"} Blog</h2>
                <div className="d">
                  <label className="d-ctrl" htmlFor="blogTitle">
                    Title:
                  </label>
                  <input
                    className="bg_title"
                    type="text"
                    id="blogTitle"
                    value={currentBlog.blogTitle || ""}
                    onChange={(e) =>
                      setCurrentBlog({
                        ...currentBlog,
                        blogTitle: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="d">
                  <label className="d-ctrl" htmlFor="blogContent">
                    Content:
                  </label>
                  <textarea
                    id="blogContent"
                    value={currentBlog.blogContent || ""}
                    onChange={(e) =>
                      setCurrentBlog({
                        ...currentBlog,
                        blogContent: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="d">
                  <label className="d-ctrl" htmlFor="images">
                    Images:
                  </label>
                  <input
                    type="file"
                    id="images"
                    accept="image/*"
                    multiple
                    onChange={(e) =>
                      setCurrentBlog({ ...currentBlog, images: e.target.files })
                    }
                    required={!currentBlog.blogID}
                  />
                </div>
                <div>
                  {Array.isArray(currentBlog.images) &&
                    currentBlog.images.map((image, index) => (
                      <img
                        key={index}
                        src={window.URL.createObjectURL(image)}
                        alt={`img ${index}`}
                        style={{ width: "200px" }}
                      />
                    ))}
                </div>
                <div className="d-btn-ctrl">
                  <button className="d-btn" onClick={saveBlog}>
                    {dialogMode === "create" ? "Create" : "Update"}
                  </button>
                  <button className="d-cancel" onClick={handleDialogClose}>
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          {viewDialogVisible && (
            <div className="dialog-container">
              <div className="dialog">
                <h3>View Blog</h3>
                <p className="t-ctrl">
                  Title: <span>{currentBlog.blogTitle}</span>
                </p>
                <p className="c-ctrl">
                  Content:<span> {currentBlog.blogContent}</span>
                </p>
                <p className="time-ctrl">
                  PostAt:{" "}
                  <span id="time-ctrl">
                    {" "}
                    <TimeDisplay dateTime={currentBlog.postAt} />
                  </span>
                </p>
                <div className="img-ctrl">
                  {Array.isArray(currentBlog.images) &&
                  currentBlog.images.length > 0 ? (
                    <div className="slideshow-container">
                      <div className="slideshow-slide">
                        {currentBlog.images
                          .slice(
                            currentSlideIndex,
                            currentSlideIndex * 3 + 3
                          )
                          .map((image, index) => (
                            <img
                              key={index}
                              src={`https://localhost:7052/${image}`}
                              alt={`img ${index}`}
                              className="slideshow-image"
                            />
                          ))}
                      </div>
                      {totalImages > 3 && currentSlideIndex !== 0 && (
                        <button
                          onClick={handlePrevSlide}
                          className="prev-button"
                        >
                          <FaArrowLeft />
                        </button>
                      )}
                      {totalImages > 3 &&
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
                <div className="dialog-buttons">
                  <button onClick={closeViewDialog}>OK</button>
                </div>
              </div>
            </div>
          )}

          {message && (
            <div className="dialog-m-visible">
              <div className="m-ctrl">
                {message}
                <button className="m-btn" onClick={() => setMessage("")}>
                  OK
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default BlogView;
