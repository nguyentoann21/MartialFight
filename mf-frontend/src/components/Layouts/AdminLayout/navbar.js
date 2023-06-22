import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaUser, FaKey, FaSignOutAlt, FaNewspaper, FaToolbox, FaChartLine, FaTachometerAlt } from 'react-icons/fa';
import './navbar.scss';

const NavbarAdmin = () => {
    const avatar = 'https://imglarger.com/Images/before-after/ai-image-enlarger-1-after-2.jpg';
    const [activeItem, setActiveItem] = useState('Dashboard');

    useEffect(() => {
        const storedActiveItem = localStorage.getItem('activeItem');
        if (storedActiveItem) {
            setActiveItem(storedActiveItem);
        } else {
            setActiveItem('Dashboard');
        }
    }, []);

    const handleActionClick = (item) => {
        setActiveItem(item);
        localStorage.setItem('activeItem', item);
    };

    return (
        <div className='navbar-container'>
            <div className='navbar-top'>
                <Link to='/dashboard'>
                    <h3 className={`navbar-dashboard ${activeItem === 'Dashboard' ? 'active' : ''}`} onClick={() => handleActionClick('Dashboard')}>Admin management</h3>
                </Link>
            </div>
            <Link to='/admin-profile'>
                <img src={avatar} alt='avatar' className={`navbar-dashboard ${activeItem === 'Profile' ? 'active' : ''}`} onClick={() => handleActionClick('Profile')} />
            </Link>
            <h4>Hello, Admin!</h4>
            <div className='navbar-main'>
                <Link to='/dashboard'>
                    <div className={`navbar-dashboard ${activeItem === 'Dashboard' ? 'active' : ''}`} onClick={() => handleActionClick('Dashboard')}>
                        <FaTachometerAlt />
                        <span>Dashboard</span>
                    </div>
                </Link>
                <Link to='/chart'>
                    <div className={`navbar-charts ${activeItem === 'Charts' ? 'active' : ''}`} onClick={() => handleActionClick('Charts')}>
                        <FaChartLine />
                        <span>Charts</span>
                    </div>
                </Link>
                <Link to='/admin-blogs'>
                    <div className={`navbar-blogs ${activeItem === 'Blogs' ? 'active' : ''}`} onClick={() => handleActionClick('Blogs')}>
                        <FaNewspaper />
                        <span>Blogs</span>
                    </div>
                </Link>
                <Link to='/admin-items'>
                    <div className={`navbar-items ${activeItem === 'Items' ? 'active' : ''}`} onClick={() => handleActionClick('Items')}>
                        <FaToolbox />
                        <span>Items</span>
                    </div>
                </Link>
                <Link to='/player'>
                    <div className={`navbar-players ${activeItem === 'Players' ? 'active' : ''}`} onClick={() => handleActionClick('Players')}>
                        <FaUser />
                        <span>Players</span>
                    </div>
                </Link>
                <Link to='/admin-profile'>
                    <div className={`navbar-profile ${activeItem === 'Profile' ? 'active' : ''}`} onClick={() => handleActionClick('Profile')}>
                        <FaKey />
                        <span>Change Password</span>
                    </div>
                </Link>
                <Link to='/'>
                    <div className={`navbar-logout ${activeItem === 'Logout' ? 'active' : ''}`} onClick={() => handleActionClick('Logout')}>
                        <FaSignOutAlt />
                        <span>Logout</span>
                    </div>
                </Link>
            </div>
        </div>
    );
}

export default NavbarAdmin;
