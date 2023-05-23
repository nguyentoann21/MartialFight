import React, { useState } from 'react';
import './Blogs.css'; // Import the CSS file for styling

const blogsData = [
  { id: 1, title: 'Blog 1', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
  { id: 2, title: 'Blog 2', content: 'Nulla facilisi. Morbi tempor efficitur quam, et hendrerit neque vestibulum nec.' },
  // Add more blogs here...
];

const Blogs = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBlog, setSelectedBlog] = useState(null);

  // Filter blogs based on search term and sort by id in descending order
  const filteredBlogs = blogsData
    .filter(blog => blog.title.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => b.id - a.id); // Sort in descending order based on blog.id

  // Handle blog click and show the details
  const handleBlogClick = blog => {
    setSelectedBlog(blog);
  };

  // Close the dialog/popup
  const handleCloseDialog = () => {
    setSelectedBlog(null);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search blogs..."
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
      />
      <ul className="blog-list">
        {filteredBlogs.map(blog => (
          <li
            key={blog.id}
            className="blog-item"
            onClick={() => handleBlogClick(blog)}
          >
            {blog.title}
          </li>
        ))}
      </ul>
      {selectedBlog && (
        <div className="dialog">
          <div className="dialog-content">
            <h2>{selectedBlog.title}</h2>
            <p>{selectedBlog.content}</p>
            <button onClick={handleCloseDialog}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Blogs;
