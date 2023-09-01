import React, { useState, useEffect } from 'react';
import { FaGlobe, FaSignOutAlt } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './header.scss';

function Header() {
  const location = useLocation();
  const history = useNavigate();

  const getActiveTabFromPath = (path) => {
    if (path === '/') return 'Home';
    if (path === '/ranking') return 'Ranking';
    if (path === '/items') return 'Items';
    if (path === '/character') return 'Character';
    if (path === '/news') return 'News';
    if (path === '/guide') return 'Guide';
    if (path === '/about-us') return 'About us';
    return 'Home';
  };

  useEffect(() => {
    setActiveTab(getActiveTabFromPath(location.pathname));
  }, [location]);

  const [activeTab, setActiveTab] = useState(
    getActiveTabFromPath(location.pathname)
  );
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');

  const handleTab = (tabName) => {
    setActiveTab(tabName);
  };

  useEffect(() => {
    const storedAccountData = localStorage.getItem('ACCOUNT_DATA');
    if (storedAccountData) {
      setIsLoggedIn(true);
      setUsername(JSON.parse(storedAccountData).username);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('ACCOUNT_DATA');
    setIsLoggedIn(false);
    setUsername('');
    history('/');
  };

  return (
    <div className='header'>
      <div className='logo'>
        <Link to='/' className='logo-main'>
        <img src="/assets/images/logo.jpg" alt='' className='image-logo' />
          <span
            className={`logo-text ${activeTab === 'Home' ? 'active' : ''}`}
            onClick={() => handleTab('Home')}
          >
            Martial Fight
          </span>
        </Link>
      </div>
      <ul className='nav'>
        <Link to='/' className='nav-link'>
          <li
            className={`nav-item ${activeTab === 'Home' ? 'active' : ''}`}
            onClick={() => handleTab('Home')}
          >
            Home
          </li>
        </Link>
        <Link to='/ranking' className='nav-link'>
          <li
            className={`nav-item ${activeTab === 'Ranking' ? 'active' : ''}`}
            onClick={() => handleTab('Ranking')}
          >
            Ranking
          </li>
        </Link>
        <Link to='/items' className='nav-link'>
          <li
            className={`nav-item ${activeTab === 'Items' ? 'active' : ''}`}
            onClick={() => handleTab('Items')}
          >
            Items
          </li>
        </Link>
        <Link to='/character' className='nav-link'>
          <li
            className={`nav-item ${activeTab === 'Character' ? 'active' : ''}`}
            onClick={() => handleTab('Heroes')}
          >
            Character
          </li>
        </Link>
        <Link to='/news' className='nav-link'>
          <li
            className={`nav-item ${activeTab === 'News' ? 'active' : ''}`}
            onClick={() => handleTab('News')}
          >
            News
          </li>
        </Link>
        <Link to='/guide' className='nav-link'>
          <li
            className={`nav-item ${activeTab === 'Guide' ? 'active' : ''}`}
            onClick={() => handleTab('Guide')}
          >
            Guide
          </li>
        </Link>
        <Link to='/about-us' className='nav-link'>
          <li
            className={`nav-item ${activeTab === 'About us' ? 'active' : ''}`}
            onClick={() => handleTab('About us')}
          >
            About us
          </li>
        </Link>
      </ul>
      <div className='auth'>
        {isLoggedIn ? (
          <div className='nav-welcome'>
            <Link to='/profile'>
              <p className='nav-welcome-text'>
                Welcome, <span>{username}!</span>
              </p>
            </Link>
            <FaSignOutAlt className='nav-logout' onClick={handleLogout} />
          </div>
        ) : (
          <>
            <button
              className='btn-sign-in'
              onClick={() => (window.location.href = '/sign-in')}
            >
              Sign In
            </button>
            <button
              className='btn-sign-up'
              onClick={() => (window.location.href = '/sign-up')}
            >
              Sign Up
            </button>
          </>
        )}

        <div className='language'>
          <FaGlobe className='icon-lang' />
          {/* <span>EN/VN</span> */}
        </div>
      </div>
    </div>
  );
}

export default Header;
