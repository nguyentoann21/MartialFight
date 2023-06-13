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

const BlogManagement = () => {
  const [blogs, setBlogs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [blogsPerPage] = useState(10);

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
  }, []);

  const deleteBlog = (id) => {
    setBlogs(blogs.filter((blog) => blog.id !== id));
  };

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const [showDialog, setShowDialog] = useState(false);

  const handleAddButton = () => {
    setShowDialog(true);
  };

  const addBlog = () => {
    const newBlog = { id: blogs.length + 1, name: name, description: description };
    setBlogs([...blogs, newBlog]);
    setName('');
    setDescription('');
    setShowDialog(false);
  };

  const closeAdd = () => {
    setShowDialog(false);
  }

  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = blogs.slice(indexOfFirstBlog, indexOfLastBlog);

  const filteredBlogs = currentBlogs.filter((blog) =>
    blog.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const [isEmptyInput, setIsEmptyInput] = useState(true);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setIsEmptyInput(e.target.value === '');
  };

  return (
    <div className='admin-blog-container'>
      <h1>Managing Blog</h1>
      <div className='admin-blog-top'>
        <div className='admin-search-bar'>
          <input
            type='text'
            placeholder='Search by name'
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <div className='admin-search-icons'>
            {isEmptyInput ? <FaSearch /> : null}
          </div>
        </div>
        <div className='admin-add-blog'>
          <button onClick={handleAddButton}>
            Add&nbsp;
            <FaPlusCircle />
          </button>
          {showDialog && (
            <div className='dialog'>
              <h1>Add Blog</h1>
              <input
                type='text'
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder='Name'
              />
              <textarea
                type='text'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder='Content'
              />
              <div className='dialog-add-button-form'>
                <button className='close-add' onClick={closeAdd}>Close</button>
                <button className='handle-add' onClick={addBlog}>Add</button>
              </div>
            </div>
          )}
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
            {filteredBlogs.map((blog) => (
              <tr key={blog.id}>
                <td>
                  <h4>{blog.name}</h4>
                </td>
                <td>
                  <p>{blog.description}</p>
                </td>
                <td className='actions-column-three'>
                  <button onClick={() => deleteBlog(blog.id)}>
                    <FaTrashAlt />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {filteredBlogs.length === 0 ? <div></div> : (
        <div className='pagination'>
          <div className='footer-page'>
            <button onClick={() => paginate(1)} disabled={currentPage === 1}>
              <FaAngleDoubleLeft />
            </button>
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <FaAngleLeft />
            </button>
            <div className='page-number'>Page {currentPage}</div>
            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === Math.ceil(blogs.length / blogsPerPage)}
            >
              <FaAngleRight />
            </button>
            <button
              onClick={() => paginate(Math.ceil(blogs.length / blogsPerPage))}
              disabled={currentPage === Math.ceil(blogs.length / blogsPerPage)}
            >
              <FaAngleDoubleRight />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogManagement;
