import React, { useState, useEffect } from 'react';
import { FaBars, FaUser, FaKey, FaSignOutAlt, FaNewspaper, FaToolbox, FaChartLine, FaTachometerAlt } from 'react-icons/fa';
import './navbar.scss';

const NavbarAdmin = () => {

    const avatar = 'https://imglarger.com/Images/before-after/ai-image-enlarger-1-after-2.jpg';
    const [activeItem, setActiveItem] = useState('Dashboard');

    useEffect(() => {
        setActiveItem('Dashboard');
    }, []);

    const handleActionClick = (item) => {
        setActiveItem(item);
    };

    return(
        <div className='navbar-container'>
            <div className='navbar-top'>
                <h3>Administrator Page</h3>
                <div className='top-icon'>
                    <FaBars />
                </div>
            </div>
            <img src={avatar} alt='avatar' />
            <h4>Hello, Admin!</h4>
            <div className='navbar-main'>
                <div className={`navbar-dashboard ${activeItem === 'Dashboard' ? 'active' : ''}`} onClick={() => handleActionClick('Dashboard')}>
                    <FaTachometerAlt  />
                    <span>Dashboard</span>
                </div>
                <div className={`navbar-charts ${activeItem === 'Charts' ? 'active' : ''}`} onClick={() => handleActionClick('Charts')}>
                    <FaChartLine />
                    <span>Charts</span>
                </div>
                <div className={`navbar-blogs ${activeItem === 'Blogs' ? 'active' : ''}`} onClick={() => handleActionClick('Blogs')}>
                    <FaNewspaper />
                    <span>Blogs</span>
                </div>
                <div className={`navbar-items ${activeItem === 'Items' ? 'active' : ''}`} onClick={() => handleActionClick('Items')}>
                    <FaToolbox />
                    <span>Items</span>
                </div>
                <div className={`navbar-players ${activeItem === 'Players' ? 'active' : ''}`} onClick={() => handleActionClick('Players')}>
                    <FaUser />
                    <span>Players</span>
                </div>
                <div className={`navbar-profile ${activeItem === 'Profile' ? 'active' : ''}`} onClick={() => handleActionClick('Profile')}>
                    <FaKey />
                    <span>Profile</span>
                </div>
                <div className={`navbar-logout ${activeItem === 'Logout' ? 'active' : ''}`} onClick={() => handleActionClick('Logout')}>
                    <FaSignOutAlt/>
                    <span>Logout</span>
                </div>
            </div>
        </div>
    );
}

export default NavbarAdmin;