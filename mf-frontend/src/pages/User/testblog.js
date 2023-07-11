import React, { useState, useEffect } from "react";
import axios from "axios";

const BlogView = () => {
  const [blogs, setBlogs] = useState([]);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [dialogMode, setDialogMode] = useState("create");
  const [currentBlog, setCurrentBlog] = useState({ images: [] });
  const [message, setMessage] = useState("");
  const [deleteDialogVisible, setDeleteDialogVisible] = useState(false);
  const [blogToDelete, setBlogToDelete] = useState(null);

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
    setDialogMode(mode);
    setCurrentBlog(blog ? { ...blog, images: [] } : { images: [] });
    setDialogVisible(true);
  };

  const handleDialogClose = () => {
    setDialogVisible(false);
    setCurrentBlog({});
  };

  return (
    <div>
      <h1>Blog List</h1>
      <ul>
        {blogs.map((blog) => (
          <li key={blog.blogID}>
            <strong>{blog.blogTitle}</strong> - {blog.blogContent}
            <div>
              {Array.isArray(blog.images) && blog.images.length > 0 ? (
                blog.images.map((image, index) => (
                  <img
                    key={index}
                    src={`https://localhost:7052/${image}`}
                    alt={`img ${index}`}
                  />
                ))
              ) : (
                <span>No images available</span>
              )}
            </div>
            <button onClick={() => handleDialogOpen("update", blog)}>
              Update
            </button>
            <button onClick={() => showDeleteDialog(blog)}>Delete</button>
          </li>
        ))}
        {deleteDialogVisible && (
          <div className="dialog-container">
            <div className="dialog">
              <h3>Deletion</h3>
              <p>Are you sure you want to delete this blog?</p>
              <div className="dialog-buttons">
                <button onClick={confirmDelete}>Confirm</button>
                <button onClick={closeDeleteDialog}>Cancel</button>
              </div>
            </div>
          </div>
        )}
      </ul>

      <button onClick={() => handleDialogOpen("create")}>Create</button>

      {dialogVisible && (
        <div>
          <div>
            <label htmlFor="blogTitle">Title:</label>
            <input
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
          <div>
            <label htmlFor="blogContent">Content:</label>
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
          <div>
            <label htmlFor="images">Images:</label>
            <input
              type="file"
              id="images"
              accept="image/*"
              multiple
              onChange={(e) =>
                setCurrentBlog({ ...currentBlog, images: e.target.files })
              }
              required
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
          <div>
            <button onClick={saveBlog}>
              {dialogMode === "create" ? "Create" : "Update"}
            </button>
            <button onClick={handleDialogClose}>Cancel</button>
          </div>
        </div>
      )}

      {message && (
        <div>
          {message}
          <button onClick={() => setMessage("")}>OK</button>
        </div>
      )}
    </div>
  );
};

export default BlogView;
