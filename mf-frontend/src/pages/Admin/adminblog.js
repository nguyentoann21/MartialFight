import React, { useState, useEffect } from 'react';
import {
  FaAngleLeft,
  FaAngleRight,
  FaAngleDoubleLeft,
  FaAngleDoubleRight,
  FaTrashAlt,
  FaPlusCircle,
  FaSearch,
} from 'react-icons/fa';
import './adminblog.scss';

const AdminBlog = () => {
  const BLOGS_PER_PAGE = 15;

  const [blogs, setBlogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [isEmptyInput, setIsEmptyInput] = useState(true);

  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    const filteredBlogs = blogs.filter((blog) =>
      blog.name.toLowerCase().includes(query)
    );
    setFilteredBlogs(filteredBlogs);
    setIsEmptyInput(event.target.value === '');
    setCurrentPage(1);
  };

  const handleBlogClick = (blog) => {
    setSelectedBlog(blog);
  };

  const handleCloseDialog = () => {
    setSelectedBlog(null);
  };

  useEffect(() => {
    const data = [
      {
        id: 1,
        name: 'Blog 1',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus ac lectus ut nunc varius pulvinar. Nullam non lectus ut nisi lacinia aliquam. Suspendisse potenti. Pellentesque euismod volutpat sem, id consequat dolor commodo vitae. Nunc dapibus, arcu id posuere sollicitudin, nunc urna ullamcorper erat, ut malesuada lorem metus ut enim.',
      },
      {
        id: 2,
        name: 'Blog 2',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus ac lectus ut nunc varius pulvinar. Nullam non lectus ut nisi lacinia aliquam. Suspendisse potenti. Pellentesque euismod volutpat sem, id consequat dolor commodo vitae. Nunc dapibus, arcu id posuere sollicitudin, nunc urna ullamcorper erat, ut malesuada lorem metus ut enim.',
      },
      {
        id: 3,
        name: 'Blog 3',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus ac lectus ut nunc varius pulvinar. Nullam non lectus ut nisi lacinia aliquam. Suspendisse potenti. Pellentesque euismod volutpat sem, id consequat dolor commodo vitae. Nunc dapibus, arcu id posuere sollicitudin, nunc urna ullamcorper erat, ut malesuada lorem metus ut enim.',
      },
      {
        id: 4,
        name: 'Blog 4',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus ac lectus ut nunc varius pulvinar. Nullam non lectus ut nisi lacinia aliquam. Suspendisse potenti. Pellentesque euismod volutpat sem, id consequat dolor commodo vitae. Nunc dapibus, arcu id posuere sollicitudin, nunc urna ullamcorper erat, ut malesuada lorem metus ut enim.',
      },
      {
        id: 5,
        name: 'Blog 5',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus ac lectus ut nunc varius pulvinar. Nullam non lectus ut nisi lacinia aliquam. Suspendisse potenti. Pellentesque euismod volutpat sem, id consequat dolor commodo vitae. Nunc dapibus, arcu id posuere sollicitudin, nunc urna ullamcorper erat, ut malesuada lorem metus ut enim.',
      },
      {
        id: 6,
        name: 'Blog 6',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus ac lectus ut nunc varius pulvinar. Nullam non lectus ut nisi lacinia aliquam. Suspendisse potenti. Pellentesque euismod volutpat sem, id consequat dolor commodo vitae. Nunc dapibus, arcu id posuere sollicitudin, nunc urna ullamcorper erat, ut malesuada lorem metus ut enim.',
      },
      {
        id: 7,
        name: 'Blog 7',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus ac lectus ut nunc varius pulvinar. Nullam non lectus ut nisi lacinia aliquam. Suspendisse potenti. Pellentesque euismod volutpat sem, id consequat dolor commodo vitae. Nunc dapibus, arcu id posuere sollicitudin, nunc urna ullamcorper erat, ut malesuada lorem metus ut enim.',
      },
      {
        id: 8,
        name: 'Blog 8',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus ac lectus ut nunc varius pulvinar. Nullam non lectus ut nisi lacinia aliquam. Suspendisse potenti. Pellentesque euismod volutpat sem, id consequat dolor commodo vitae. Nunc dapibus, arcu id posuere sollicitudin, nunc urna ullamcorper erat, ut malesuada lorem metus ut enim.',
      },
      {
        id: 9,
        name: 'Blog 9',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus ac lectus ut nunc varius pulvinar. Nullam non lectus ut nisi lacinia aliquam. Suspendisse potenti. Pellentesque euismod volutpat sem, id consequat dolor commodo vitae. Nunc dapibus, arcu id posuere sollicitudin, nunc urna ullamcorper erat, ut malesuada lorem metus ut enim.',
      },
      {
        id: 10,
        name: 'Blog 10',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus ac lectus ut nunc varius pulvinar. Nullam non lectus ut nisi lacinia aliquam. Suspendisse potenti. Pellentesque euismod volutpat sem, id consequat dolor commodo vitae. Nunc dapibus, arcu id posuere sollicitudin, nunc urna ullamcorper erat, ut malesuada lorem metus ut enim.',
      },
      {
        id: 11,
        name: 'Blog 11',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus ac lectus ut nunc varius pulvinar. Nullam non lectus ut nisi lacinia aliquam. Suspendisse potenti. Pellentesque euismod volutpat sem, id consequat dolor commodo vitae. Nunc dapibus, arcu id posuere sollicitudin, nunc urna ullamcorper erat, ut malesuada lorem metus ut enim.',
      },
      {
        id: 12,
        name: 'Blog 12',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus ac lectus ut nunc varius pulvinar. Nullam non lectus ut nisi lacinia aliquam. Suspendisse potenti. Pellentesque euismod volutpat sem, id consequat dolor commodo vitae. Nunc dapibus, arcu id posuere sollicitudin, nunc urna ullamcorper erat, ut malesuada lorem metus ut enim.',
      },
      {
        id: 13,
        name: 'Blog 13',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus ac lectus ut nunc varius pulvinar. Nullam non lectus ut nisi lacinia aliquam. Suspendisse potenti. Pellentesque euismod volutpat sem, id consequat dolor commodo vitae. Nunc dapibus, arcu id posuere sollicitudin, nunc urna ullamcorper erat, ut malesuada lorem metus ut enim.',
      },
      {
        id: 14,
        name: 'Blog 14',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus ac lectus ut nunc varius pulvinar. Nullam non lectus ut nisi lacinia aliquam. Suspendisse potenti. Pellentesque euismod volutpat sem, id consequat dolor commodo vitae. Nunc dapibus, arcu id posuere sollicitudin, nunc urna ullamcorper erat, ut malesuada lorem metus ut enim.',
      },
      {
        id: 15,
        name: 'Blog 15',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus ac lectus ut nunc varius pulvinar. Nullam non lectus ut nisi lacinia aliquam. Suspendisse potenti. Pellentesque euismod volutpat sem, id consequat dolor commodo vitae. Nunc dapibus, arcu id posuere sollicitudin, nunc urna ullamcorper erat, ut malesuada lorem metus ut enim.',
      },
      {
        id: 16,
        name: 'Blog 16',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus ac lectus ut nunc varius pulvinar. Nullam non lectus ut nisi lacinia aliquam. Suspendisse potenti. Pellentesque euismod volutpat sem, id consequat dolor commodo vitae. Nunc dapibus, arcu id posuere sollicitudin, nunc urna ullamcorper erat, ut malesuada lorem metus ut enim.',
      },
      {
        id: 17,
        name: 'Blog 17',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus ac lectus ut nunc varius pulvinar. Nullam non lectus ut nisi lacinia aliquam. Suspendisse potenti. Pellentesque euismod volutpat sem, id consequat dolor commodo vitae. Nunc dapibus, arcu id posuere sollicitudin, nunc urna ullamcorper erat, ut malesuada lorem metus ut enim.',
      },
      {
        id: 18,
        name: 'Blog 18',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus ac lectus ut nunc varius pulvinar. Nullam non lectus ut nisi lacinia aliquam. Suspendisse potenti. Pellentesque euismod volutpat sem, id consequat dolor commodo vitae. Nunc dapibus, arcu id posuere sollicitudin, nunc urna ullamcorper erat, ut malesuada lorem metus ut enim.',
      },
      {
        id: 19,
        name: 'Blog 19',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus ac lectus ut nunc varius pulvinar. Nullam non lectus ut nisi lacinia aliquam. Suspendisse potenti. Pellentesque euismod volutpat sem, id consequat dolor commodo vitae. Nunc dapibus, arcu id posuere sollicitudin, nunc urna ullamcorper erat, ut malesuada lorem metus ut enim.',
      },
      {
        id: 20,
        name: 'Blog 20',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus ac lectus ut nunc varius pulvinar. Nullam non lectus ut nisi lacinia aliquam. Suspendisse potenti. Pellentesque euismod volutpat sem, id consequat dolor commodo vitae. Nunc dapibus, arcu id posuere sollicitudin, nunc urna ullamcorper erat, ut malesuada lorem metus ut enim.',
      },
      {
        id: 21,
        name: 'Blog 21',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus ac lectus ut nunc varius pulvinar. Nullam non lectus ut nisi lacinia aliquam. Suspendisse potenti. Pellentesque euismod volutpat sem, id consequat dolor commodo vitae. Nunc dapibus, arcu id posuere sollicitudin, nunc urna ullamcorper erat, ut malesuada lorem metus ut enim.',
      },
      {
        id: 22,
        name: 'Blog 22',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus ac lectus ut nunc varius pulvinar. Nullam non lectus ut nisi lacinia aliquam. Suspendisse potenti. Pellentesque euismod volutpat sem, id consequat dolor commodo vitae. Nunc dapibus, arcu id posuere sollicitudin, nunc urna ullamcorper erat, ut malesuada lorem metus ut enim.',
      },
      {
        id: 23,
        name: 'Blog 23',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus ac lectus ut nunc varius pulvinar. Nullam non lectus ut nisi lacinia aliquam. Suspendisse potenti. Pellentesque euismod volutpat sem, id consequat dolor commodo vitae. Nunc dapibus, arcu id posuere sollicitudin, nunc urna ullamcorper erat, ut malesuada lorem metus ut enim.',
      },
      {
        id: 24,
        name: 'Blog 24',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus ac lectus ut nunc varius pulvinar. Nullam non lectus ut nisi lacinia aliquam. Suspendisse potenti. Pellentesque euismod volutpat sem, id consequat dolor commodo vitae. Nunc dapibus, arcu id posuere sollicitudin, nunc urna ullamcorper erat, ut malesuada lorem metus ut enim.',
      },
      {
        id: 25,
        name: 'Blog 25',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus ac lectus ut nunc varius pulvinar. Nullam non lectus ut nisi lacinia aliquam. Suspendisse potenti. Pellentesque euismod volutpat sem, id consequat dolor commodo vitae. Nunc dapibus, arcu id posuere sollicitudin, nunc urna ullamcorper erat, ut malesuada lorem metus ut enim.',
      },
      {
        id: 26,
        name: 'Blog 26',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus ac lectus ut nunc varius pulvinar. Nullam non lectus ut nisi lacinia aliquam. Suspendisse potenti. Pellentesque euismod volutpat sem, id consequat dolor commodo vitae. Nunc dapibus, arcu id posuere sollicitudin, nunc urna ullamcorper erat, ut malesuada lorem metus ut enim.',
      },
      {
        id: 27,
        name: 'Blog 27',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus ac lectus ut nunc varius pulvinar. Nullam non lectus ut nisi lacinia aliquam. Suspendisse potenti. Pellentesque euismod volutpat sem, id consequat dolor commodo vitae. Nunc dapibus, arcu id posuere sollicitudin, nunc urna ullamcorper erat, ut malesuada lorem metus ut enim.',
      },
      {
        id: 28,
        name: 'Blog 28',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus ac lectus ut nunc varius pulvinar. Nullam non lectus ut nisi lacinia aliquam. Suspendisse potenti. Pellentesque euismod volutpat sem, id consequat dolor commodo vitae. Nunc dapibus, arcu id posuere sollicitudin, nunc urna ullamcorper erat, ut malesuada lorem metus ut enim.',
      },
      {
        id: 29,
        name: 'Blog 29',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus ac lectus ut nunc varius pulvinar. Nullam non lectus ut nisi lacinia aliquam. Suspendisse potenti. Pellentesque euismod volutpat sem, id consequat dolor commodo vitae. Nunc dapibus, arcu id posuere sollicitudin, nunc urna ullamcorper erat, ut malesuada lorem metus ut enim.',
      },
      {
        id: 30,
        name: 'Blog 30',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus ac lectus ut nunc varius pulvinar. Nullam non lectus ut nisi lacinia aliquam. Suspendisse potenti. Pellentesque euismod volutpat sem, id consequat dolor commodo vitae. Nunc dapibus, arcu id posuere sollicitudin, nunc urna ullamcorper erat, ut malesuada lorem metus ut enim.',
      },
    ];
    setBlogs(data);
    setFilteredBlogs(data);
  }, []);

  const totalPages = Math.ceil(filteredBlogs.length / BLOGS_PER_PAGE);
  const startIndex = (currentPage - 1) * BLOGS_PER_PAGE;
  const endIndex = startIndex + BLOGS_PER_PAGE;
  const currentBlogs = filteredBlogs.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const renderPaginationButtons = () => {
    return (
      <div className='pagination-buttons'>
        {filteredBlogs.length === 0 ? (
          <div></div>
        ) : (
          <div className='pagination'>
            <div className='footer-page'>
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
              <div className='page-number'>Page {currentPage}</div>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={
                  currentPage === Math.ceil(blogs.length / BLOGS_PER_PAGE)
                }
              >
                <FaAngleRight />
              </button>
              <button
                onClick={() =>
                  handlePageChange(Math.ceil(blogs.length / BLOGS_PER_PAGE))
                }
                disabled={
                  currentPage === Math.ceil(blogs.length / BLOGS_PER_PAGE)
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
    <div className='admin-blog-container'>
      <h1>Managing Blog</h1>
      <div className='admin-blog-top'>
        <div className='admin-search-bar'>
          <input
            type='text'
            placeholder='Search by name'
            onChange={handleSearch}
          />
          <div className='admin-search-icons'>
            {isEmptyInput ? <FaSearch /> : null}
          </div>
        </div>
        <div className='admin-add-blog'>
          <button>
            Add&nbsp;
            <FaPlusCircle />
          </button>
        </div>
      </div>
      {filteredBlogs.length === 0 ? (
        <p className='admin-blogs-no-data-found'>No data was found</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th className='column-one'>Name</th>
              <th className='column-two'>Content</th>
              <th className='column-three'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentBlogs.map((blog) => (
              <tr key={blog.id}>
                <td>
                  <h4 onClick={() => handleBlogClick(blog)}>{blog.name}</h4>
                </td>
                <td>
                  <p onClick={() => handleBlogClick(blog)}>{blog.description}</p>
                </td>
                <td className='actions-column-three'>
                  <button>
                    <FaTrashAlt />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {totalPages > 1 && renderPaginationButtons()}
      {selectedBlog && (
        <div className='admin-blog-dialog'>
          <div className='admin-blog-dialog-content'>
            <div className='admin-blog-dialog-main'>
              <img src={selectedBlog.image} alt={selectedBlog.name} />
              <div className='admin-blog-dialog-details'>
                <p>
                  Name: <span>{selectedBlog.name}</span>
                </p>
                <p>
                  Description: <span>{selectedBlog.description}</span>
                </p>
              </div>
            </div>
            <div className='admin-blog-dialog-buttons'>
              <button onClick={handleCloseDialog}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminBlog;
