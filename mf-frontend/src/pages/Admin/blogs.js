import React, { useState, useEffect } from 'react';
import { FaAngleLeft, FaAngleRight, FaAngleDoubleLeft , FaAngleDoubleRight, FaTrashAlt, FaPlusCircle, FaSearch } from 'react-icons/fa';
import './blog.css';

const BlogManagement = () => {
  const [blogs, setBlogs] = useState([]); // Danh sách các blog
  const [searchTerm, setSearchTerm] = useState(''); // Giá trị từ khóa tìm kiếm
  const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại
  const [blogsPerPage] = useState(10); // Số lượng blog trong mỗi trang

  // Mô phỏng dữ liệu blogs
  useEffect(() => {
    const data = [
      { id: 1, name: 'Blog 1', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus ac lectus ut nunc varius pulvinar. Nullam non lectus ut nisi lacinia aliquam. Suspendisse potenti. Pellentesque euismod volutpat sem, id consequat dolor commodo vitae. Nunc dapibus, arcu id posuere sollicitudin, nunc urna ullamcorper erat, ut malesuada lorem metus ut enim.' },
      { id: 2, name: 'Blog 2', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus ac lectus ut nunc varius pulvinar. Nullam non lectus ut nisi lacinia aliquam. Suspendisse potenti. Pellentesque euismod volutpat sem, id consequat dolor commodo vitae. Nunc dapibus, arcu id posuere sollicitudin, nunc urna ullamcorper erat, ut malesuada lorem metus ut enim.' },
      { id: 3, name: 'Blog 3', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus ac lectus ut nunc varius pulvinar. Nullam non lectus ut nisi lacinia aliquam. Suspendisse potenti. Pellentesque euismod volutpat sem, id consequat dolor commodo vitae. Nunc dapibus, arcu id posuere sollicitudin, nunc urna ullamcorper erat, ut malesuada lorem metus ut enim.' },
      { id: 4, name: 'Blog 4', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus ac lectus ut nunc varius pulvinar. Nullam non lectus ut nisi lacinia aliquam. Suspendisse potenti. Pellentesque euismod volutpat sem, id consequat dolor commodo vitae. Nunc dapibus, arcu id posuere sollicitudin, nunc urna ullamcorper erat, ut malesuada lorem metus ut enim.' },
      { id: 5, name: 'Blog 5', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus ac lectus ut nunc varius pulvinar. Nullam non lectus ut nisi lacinia aliquam. Suspendisse potenti. Pellentesque euismod volutpat sem, id consequat dolor commodo vitae. Nunc dapibus, arcu id posuere sollicitudin, nunc urna ullamcorper erat, ut malesuada lorem metus ut enim.' },
      { id: 6, name: 'Blog 6', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus ac lectus ut nunc varius pulvinar. Nullam non lectus ut nisi lacinia aliquam. Suspendisse potenti. Pellentesque euismod volutpat sem, id consequat dolor commodo vitae. Nunc dapibus, arcu id posuere sollicitudin, nunc urna ullamcorper erat, ut malesuada lorem metus ut enim.' },
      { id: 7, name: 'Blog 7', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus ac lectus ut nunc varius pulvinar. Nullam non lectus ut nisi lacinia aliquam. Suspendisse potenti. Pellentesque euismod volutpat sem, id consequat dolor commodo vitae. Nunc dapibus, arcu id posuere sollicitudin, nunc urna ullamcorper erat, ut malesuada lorem metus ut enim.' },
      { id: 8, name: 'Blog 8', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus ac lectus ut nunc varius pulvinar. Nullam non lectus ut nisi lacinia aliquam. Suspendisse potenti. Pellentesque euismod volutpat sem, id consequat dolor commodo vitae. Nunc dapibus, arcu id posuere sollicitudin, nunc urna ullamcorper erat, ut malesuada lorem metus ut enim.' },
      { id: 9, name: 'Blog 9', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus ac lectus ut nunc varius pulvinar. Nullam non lectus ut nisi lacinia aliquam. Suspendisse potenti. Pellentesque euismod volutpat sem, id consequat dolor commodo vitae. Nunc dapibus, arcu id posuere sollicitudin, nunc urna ullamcorper erat, ut malesuada lorem metus ut enim.' },
      { id: 10, name: 'Blog 10', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus ac lectus ut nunc varius pulvinar. Nullam non lectus ut nisi lacinia aliquam. Suspendisse potenti. Pellentesque euismod volutpat sem, id consequat dolor commodo vitae. Nunc dapibus, arcu id posuere sollicitudin, nunc urna ullamcorper erat, ut malesuada lorem metus ut enim.'  },
      { id: 11, name: 'Blog 11', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus ac lectus ut nunc varius pulvinar. Nullam non lectus ut nisi lacinia aliquam. Suspendisse potenti. Pellentesque euismod volutpat sem, id consequat dolor commodo vitae. Nunc dapibus, arcu id posuere sollicitudin, nunc urna ullamcorper erat, ut malesuada lorem metus ut enim.'  },
      { id: 12, name: 'Blog 12', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus ac lectus ut nunc varius pulvinar. Nullam non lectus ut nisi lacinia aliquam. Suspendisse potenti. Pellentesque euismod volutpat sem, id consequat dolor commodo vitae. Nunc dapibus, arcu id posuere sollicitudin, nunc urna ullamcorper erat, ut malesuada lorem metus ut enim.'  },
      { id: 13, name: 'Blog 13', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus ac lectus ut nunc varius pulvinar. Nullam non lectus ut nisi lacinia aliquam. Suspendisse potenti. Pellentesque euismod volutpat sem, id consequat dolor commodo vitae. Nunc dapibus, arcu id posuere sollicitudin, nunc urna ullamcorper erat, ut malesuada lorem metus ut enim.'  },
      { id: 14, name: 'Blog 14', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus ac lectus ut nunc varius pulvinar. Nullam non lectus ut nisi lacinia aliquam. Suspendisse potenti. Pellentesque euismod volutpat sem, id consequat dolor commodo vitae. Nunc dapibus, arcu id posuere sollicitudin, nunc urna ullamcorper erat, ut malesuada lorem metus ut enim.'  },
      { id: 15, name: 'Blog 15', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus ac lectus ut nunc varius pulvinar. Nullam non lectus ut nisi lacinia aliquam. Suspendisse potenti. Pellentesque euismod volutpat sem, id consequat dolor commodo vitae. Nunc dapibus, arcu id posuere sollicitudin, nunc urna ullamcorper erat, ut malesuada lorem metus ut enim.'  },
      { id: 16, name: 'Blog 16', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus ac lectus ut nunc varius pulvinar. Nullam non lectus ut nisi lacinia aliquam. Suspendisse potenti. Pellentesque euismod volutpat sem, id consequat dolor commodo vitae. Nunc dapibus, arcu id posuere sollicitudin, nunc urna ullamcorper erat, ut malesuada lorem metus ut enim.'  },
      { id: 17, name: 'Blog 17', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus ac lectus ut nunc varius pulvinar. Nullam non lectus ut nisi lacinia aliquam. Suspendisse potenti. Pellentesque euismod volutpat sem, id consequat dolor commodo vitae. Nunc dapibus, arcu id posuere sollicitudin, nunc urna ullamcorper erat, ut malesuada lorem metus ut enim.'  },
      { id: 18, name: 'Blog 18', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus ac lectus ut nunc varius pulvinar. Nullam non lectus ut nisi lacinia aliquam. Suspendisse potenti. Pellentesque euismod volutpat sem, id consequat dolor commodo vitae. Nunc dapibus, arcu id posuere sollicitudin, nunc urna ullamcorper erat, ut malesuada lorem metus ut enim.'  },
      { id: 19, name: 'Blog 19', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus ac lectus ut nunc varius pulvinar. Nullam non lectus ut nisi lacinia aliquam. Suspendisse potenti. Pellentesque euismod volutpat sem, id consequat dolor commodo vitae. Nunc dapibus, arcu id posuere sollicitudin, nunc urna ullamcorper erat, ut malesuada lorem metus ut enim.'  },
      { id: 20, name: 'Blog 20', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus ac lectus ut nunc varius pulvinar. Nullam non lectus ut nisi lacinia aliquam. Suspendisse potenti. Pellentesque euismod volutpat sem, id consequat dolor commodo vitae. Nunc dapibus, arcu id posuere sollicitudin, nunc urna ullamcorper erat, ut malesuada lorem metus ut enim.'  },
      { id: 21, name: 'Blog 21', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus ac lectus ut nunc varius pulvinar. Nullam non lectus ut nisi lacinia aliquam. Suspendisse potenti. Pellentesque euismod volutpat sem, id consequat dolor commodo vitae. Nunc dapibus, arcu id posuere sollicitudin, nunc urna ullamcorper erat, ut malesuada lorem metus ut enim.'  },
      { id: 22, name: 'Blog 22', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus ac lectus ut nunc varius pulvinar. Nullam non lectus ut nisi lacinia aliquam. Suspendisse potenti. Pellentesque euismod volutpat sem, id consequat dolor commodo vitae. Nunc dapibus, arcu id posuere sollicitudin, nunc urna ullamcorper erat, ut malesuada lorem metus ut enim.'  },
      { id: 23, name: 'Blog 23', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus ac lectus ut nunc varius pulvinar. Nullam non lectus ut nisi lacinia aliquam. Suspendisse potenti. Pellentesque euismod volutpat sem, id consequat dolor commodo vitae. Nunc dapibus, arcu id posuere sollicitudin, nunc urna ullamcorper erat, ut malesuada lorem metus ut enim.'  },
      { id: 24, name: 'Blog 24', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus ac lectus ut nunc varius pulvinar. Nullam non lectus ut nisi lacinia aliquam. Suspendisse potenti. Pellentesque euismod volutpat sem, id consequat dolor commodo vitae. Nunc dapibus, arcu id posuere sollicitudin, nunc urna ullamcorper erat, ut malesuada lorem metus ut enim.'  },
      { id: 25, name: 'Blog 25', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus ac lectus ut nunc varius pulvinar. Nullam non lectus ut nisi lacinia aliquam. Suspendisse potenti. Pellentesque euismod volutpat sem, id consequat dolor commodo vitae. Nunc dapibus, arcu id posuere sollicitudin, nunc urna ullamcorper erat, ut malesuada lorem metus ut enim.'  },
      { id: 26, name: 'Blog 26', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus ac lectus ut nunc varius pulvinar. Nullam non lectus ut nisi lacinia aliquam. Suspendisse potenti. Pellentesque euismod volutpat sem, id consequat dolor commodo vitae. Nunc dapibus, arcu id posuere sollicitudin, nunc urna ullamcorper erat, ut malesuada lorem metus ut enim.'  },
      { id: 27, name: 'Blog 27', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus ac lectus ut nunc varius pulvinar. Nullam non lectus ut nisi lacinia aliquam. Suspendisse potenti. Pellentesque euismod volutpat sem, id consequat dolor commodo vitae. Nunc dapibus, arcu id posuere sollicitudin, nunc urna ullamcorper erat, ut malesuada lorem metus ut enim.'  },
      { id: 28, name: 'Blog 28', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus ac lectus ut nunc varius pulvinar. Nullam non lectus ut nisi lacinia aliquam. Suspendisse potenti. Pellentesque euismod volutpat sem, id consequat dolor commodo vitae. Nunc dapibus, arcu id posuere sollicitudin, nunc urna ullamcorper erat, ut malesuada lorem metus ut enim.'  },
      { id: 29, name: 'Blog 29', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus ac lectus ut nunc varius pulvinar. Nullam non lectus ut nisi lacinia aliquam. Suspendisse potenti. Pellentesque euismod volutpat sem, id consequat dolor commodo vitae. Nunc dapibus, arcu id posuere sollicitudin, nunc urna ullamcorper erat, ut malesuada lorem metus ut enim.'  },
      { id: 30, name: 'Blog 30', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus ac lectus ut nunc varius pulvinar. Nullam non lectus ut nisi lacinia aliquam. Suspendisse potenti. Pellentesque euismod volutpat sem, id consequat dolor commodo vitae. Nunc dapibus, arcu id posuere sollicitudin, nunc urna ullamcorper erat, ut malesuada lorem metus ut enim.'  },
    ];
    setBlogs(data);
  }, []);

  // Xóa blog
  const deleteBlog = (id) => {
    setBlogs(blogs.filter((blog) => blog.id !== id));
  };

  // Thêm blog
  const addBlog = () => {
    const newBlog = { id: blogs.length + 1, name: `Blog ${blogs.length + 1}` };
    setBlogs([...blogs, newBlog]);
  };

  // Lấy index bắt đầu của danh sách blog trên trang hiện tại
  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = blogs.slice(indexOfFirstBlog, indexOfLastBlog);

  // Tìm kiếm blog theo tên
  const filteredBlogs = currentBlogs.filter((blog) =>
    blog.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Xử lý chuyển trang
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="blog-table">
      <h1>Blog Table</h1>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <FaSearch />
      </div>
      <div className="add-blog">
        <button onClick={addBlog}>
          Add&nbsp;<FaPlusCircle  />
        </button>
      </div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Content</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredBlogs.map((blog) => (
            <tr key={blog.id}>
              <td>{blog.id}</td>
              <td>{blog.name}</td>
              <td>
                <p>{blog.description}</p>
              </td>
              <td>
                <button onClick={() => deleteBlog(blog.id)}>
                  <FaTrashAlt />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <button onClick={() => paginate(1)} disabled={currentPage === 1}>
          <FaAngleDoubleLeft />
        </button>
        <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>
          <FaAngleLeft />
        </button>
        <button onClick={() => paginate(currentPage + 1)} disabled={currentPage === Math.ceil(blogs.length / blogsPerPage)}>
          <FaAngleRight />
        </button>
        <button onClick={() => paginate(Math.ceil(blogs.length / blogsPerPage))} disabled={currentPage === Math.ceil(blogs.length / blogsPerPage)}>
          <FaAngleDoubleRight />
        </button>
      </div>
    </div>
  );
};

export default BlogManagement;
