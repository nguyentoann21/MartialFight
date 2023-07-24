import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  FaUser,
  FaKey,
  FaSignOutAlt,
  FaNewspaper,
  FaToolbox,
  FaChartLine,
  FaTachometerAlt,
  FaMap,
  FaUsers,
  FaFighterJet,
} from 'react-icons/fa';
import './navbar.scss';

const NavbarAdmin = () => {
  const avatar = '/assets/images/admin-image.avif';
  const [activeItem, setActiveItem] = useState('');
  const admin = JSON.parse(localStorage.getItem('ADMIN_DATA'));
  const history = useNavigate();

  useEffect(() => {
    if (!admin) {
      history('/');
    }
  }, [admin, history]);

  useEffect(() => {
    const storedActiveItem = localStorage.getItem('activeItem');
    if (storedActiveItem) {
      setActiveItem(storedActiveItem);
    } else {
      setActiveItem('Dashboard');
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('ADMIN_DATA');
    localStorage.setItem('activeItem', 'Dashboard');
    history('/');
  };

  const handleAction = (item) => {
    setActiveItem(item);
    localStorage.setItem('activeItem', item);
  };

  return (
    <div className='navbar-container'>
      <div className='navbar-top'>
        <Link to='/dashboard'>
          <h3
            className={`navbar-dashboard ${
              activeItem === 'Dashboard' ? 'active' : ''
            }`}
            onClick={() => handleAction('Dashboard')}
          >
            Admin management
          </h3>
        </Link>
      </div>
      <Link to='/admin-profile'>
        <img
          src={avatar}
          alt='avatar'
          className={`navbar-dashboard ${
            activeItem === 'Profile' ? 'active' : ''
          }`}
          onClick={() => handleAction('Profile')}
        />
      </Link>
      {admin && <h4>Hello, {admin.username}!</h4>}
      <div className='navbar-main'>
        <Link to='/dashboard'>
          <div
            className={`navbar-dashboard ${
              activeItem === 'Dashboard' ? 'active' : ''
            }`}
            onClick={() => handleAction('Dashboard')}
          >
            <FaTachometerAlt />
            <span>Dashboard</span>
          </div>
        </Link>
        <Link to='/chart'>
          <div
            className={`navbar-charts ${
              activeItem === 'Charts' ? 'active' : ''
            }`}
            onClick={() => handleAction('Charts')}
          >
            <FaChartLine />
            <span>Charts</span>
          </div>
        </Link>
        <Link to='/admin-character'>
          <div
            className={`navbar-charts ${
              activeItem === 'Character' ? 'active' : ''
            }`}
            onClick={() => handleAction('Character')}
          >
            <FaFighterJet />
            <span>Character</span>
          </div>
        </Link>
        <Link to='/admin-blogs'>
          <div
            className={`navbar-news ${activeItem === 'News' ? 'active' : ''}`}
            onClick={() => handleAction('News')}
          >
            <FaNewspaper />
            <span>News</span>
          </div>
        </Link>
        <Link to='/admin-maps'>
          <div
            className={`navbar-maps ${activeItem === 'Maps' ? 'active' : ''}`}
            onClick={() => handleAction('Maps')}
          >
            <FaMap />
            <span>Maps</span>
          </div>
        </Link>
        <Link to='/admin-sects'>
          <div
            className={`navbar-sects ${activeItem === 'Sects' ? 'active' : ''}`}
            onClick={() => handleAction('Sects')}
          >
            <FaUsers />
            <span>Sects</span>
          </div>
        </Link>
        <Link to='/admin-items'>
          <div
            className={`navbar-items ${activeItem === 'Items' ? 'active' : ''}`}
            onClick={() => handleAction('Items')}
          >
            <FaToolbox />
            <span>Items</span>
          </div>
        </Link>
        <Link to='/admin-players'>
          <div
            className={`navbar-players ${
              activeItem === 'Players' ? 'active' : ''
            }`}
            onClick={() => handleAction('Players')}
          >
            <FaUser />
            <span>Players</span>
          </div>
        </Link>
        <Link to='/admin-profile'>
          <div
            className={`navbar-profile ${
              activeItem === 'Profile' ? 'active' : ''
            }`}
            onClick={() => handleAction('Profile')}
          >
            <FaKey />
            <span>Change Password</span>
          </div>
        </Link>
        <Link to='/'>
          <div
            className={`navbar-logout ${
              activeItem === 'Logout' ? 'active' : ''
            }`}
            onClick={handleLogout}
          >
            <FaSignOutAlt />
            <span>Logout</span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default NavbarAdmin;
