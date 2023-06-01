import React, { useState, useEffect } from 'react';
import { FaGlobe } from 'react-icons/fa';
import { ReactComponent as LogoGame } from '../../../../logo.svg';
import { Link, useLocation } from 'react-router-dom';
import './header.scss';

function Header() {
  const location = useLocation();

  const getActiveTabFromPath = (path) => {
    if (path === '/') return 'Home';
    if (path === '/ranking') return 'Ranking';
    if (path === '/items') return 'Items';
    if (path === '/heroes') return 'Heroes';
    if (path === '/blog') return 'Blogs';
    if (path === '/guide') return 'Guide';
    if (path === '/about-us') return 'About us';
    return 'Home';
  }

  useEffect(() => {
    setActiveTab(getActiveTabFromPath(location.pathname));
  }, [location]);

  const [activeTab, setActiveTab] = useState(getActiveTabFromPath(location.pathname));

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  return (
    <div className="header">
      <div className="logo">
        <Link to="/" className='logo-main'>
            <LogoGame className='image-logo' />
            <span className={`logo-text ${activeTab === 'Home' ? 'active' : ''}`} onClick={() => handleTabClick('Home')}>Martial Fight</span>
        </Link>
      </div>
      <ul className="nav">
        <Link to='/' className='nav-link'>
            <li className={`nav-item ${activeTab === 'Home' ? 'active' : ''}`} onClick={() => handleTabClick('Home')}>
                Home
            </li>
        </Link>
        <Link to='/ranking' className='nav-link'>
            <li className={`nav-item ${activeTab === 'Ranking' ? 'active' : ''}`} onClick={() => handleTabClick('Ranking')}>
                Ranking
            </li>
        </Link>
        <Link to='/items' className='nav-link'>
            <li className={`nav-item ${activeTab === 'Items' ? 'active' : ''}`} onClick={() => handleTabClick('Items')}>
                Items
            </li>
        </Link>
        <Link to='/heroes' className='nav-link'>
            <li className={`nav-item ${activeTab === 'Heroes' ? 'active' : ''}`} onClick={() => handleTabClick('Heroes')}>
                Heroes
            </li>
        </Link>
        <Link to='/blog' className='nav-link'>
            <li className={`nav-item ${activeTab === 'Blogs' ? 'active' : ''}`} onClick={() => handleTabClick('Blogs')}>
                Blogs
            </li>
        </Link>
        <Link to='/guide' className='nav-link'>
            <li className={`nav-item ${activeTab === 'Guide' ? 'active' : ''}`} onClick={() => handleTabClick('Guide')}>
                Guide
            </li>
        </Link>
        <Link to='/about-us' className='nav-link'>
            <li className={`nav-item ${activeTab === 'About us' ? 'active' : ''}`} onClick={() => handleTabClick('About us')}>
                About us
            </li>
        </Link>
      </ul>
        {/* <div className="search">
          <input type="text" placeholder="Search hero by name..." />
          <button>
            <FaSearch />
          </button>
        </div> */}
      <div className="auth">
        <button className="btn-sign-in" onClick={() => window.location.href='/sign-in'}>Sign In</button>
        <button className="btn-sign-up" onClick={() => window.location.href='/sign-up'}>Sign Up</button>
        <div className='language'>
          <FaGlobe className='icon-lang' />
          {/* <span>EN/VN</span> */}
        </div>
      </div>
    </div>
  );
};


export default Header;
