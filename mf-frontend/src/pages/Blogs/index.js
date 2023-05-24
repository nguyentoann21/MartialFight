import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import './blog.scss';

const Blogs = () => {

  const blogsData = [
    { 
      id: 1, 
      title: 'Update version 1.1', 
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. Morbi tempor efficitur quam, et hendrerit neque vestibulum nec. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. Morbi tempor efficitur quam, et hendrerit neque vestibulum nec 123.',
      date: '2023/05/01'
    },
    { 
      id: 2,
      title: 'Update version 1.2', 
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. Morbi tempor efficitur quam, et hendrerit neque vestibulum nec.',
      date: '2023/06/01'
    },
    { 
      id: 3,
      title: 'Update version 1.3', 
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. Morbi tempor efficitur quam, et hendrerit neque vestibulum nec.',
      date: '2023/06/15'
    },
    { 
      id: 4,
      title: 'Update version 1.4', 
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. Morbi tempor efficitur quam, et hendrerit neque vestibulum nec.',
      date: '2023/07/01'
    },
    { 
      id: 5,
      title: 'Update version 1.5', 
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. Morbi tempor efficitur quam, et hendrerit neque vestibulum nec.',
      date: '2023/07/15'
    },
  ];

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [isEmptyInput, setIsEmptyInput] = useState(true);
  

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

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setIsEmptyInput(e.target.value === '');
  };

  return (
    <div className='blogs-page'>
      <div className='blogs-container'>
        <div className='blogs-content'>
          <h1 className='blogs-title'>Blogs</h1>
          <div className='blogs-search'>
            <input
              type='text'
              placeholder='Search blog(s) by name...'
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <div className='blogs-search-icons'>
              {isEmptyInput ? <FaSearch /> : null}
            </div>
          </div>
          <div className='blogs-main'>
          {filteredBlogs.length === 0 ? (
              // Check if filteredBlogs is empty
              <p className='blogs-no-data-found'>No data was found</p>
            ) : (
              <ul className='blogs-list'>
                {filteredBlogs.map(blog => (
                  <li
                    key={blog.id}
                    className='blogs-item'
                    onClick={() => handleBlogClick(blog)}
                  >
                    <h3>{blog.title}</h3>
                    <h4>{blog.date}</h4>
                    <h5>{blog.content}</h5>
                  </li>
                ))}
              </ul>
            )}
            {selectedBlog && (
              <div className='dialog-show-blog'>
                <div className='dialog-show-container'>
                  <div className='dialog-content'>
                    <div className='dialog-content-main'>
                      <h2>{selectedBlog.title}</h2>
                      <h4>{selectedBlog.date}</h4>
                      <p>{selectedBlog.content}</p>
                    </div>
                    <div className='dialog-content-button'>
                      <button onClick={handleCloseDialog}>Close</button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
  
export default Blogs;
