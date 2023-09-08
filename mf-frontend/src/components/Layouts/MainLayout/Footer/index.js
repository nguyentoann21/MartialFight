import React from 'react';
import { FaFacebookSquare, FaYoutube } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { MdEmail, MdPhone, MdHome } from 'react-icons/md';

import './footer.scss';

function Footer() {

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className="footer">
      <div className="footer-container">
        <div className="footer-logo" onClick={scrollToTop}>
          <div className='footer-logo-content'><img src="/assets/images/logo.jpg" alt="Logo"  className='logo-image-footer' /></div>
          <span>Martial Fight</span>
        </div>
        <div className="footer-links">
          <h3>Contact Us</h3>
          <ul>
            <li>
                <MdEmail /> <h5>Email: toannvce150811@fpt.edu.vn</h5>
            </li>
            <li>
                <MdPhone /> <h5>Phone: (+84) 292 730 3636</h5>
            </li>
            <li>
                <MdHome /> <h5>Address: 600 extended Nguyen Van Cu street, An Binh ward, Ninh Kieu district, Can Tho city</h5>
            </li>
          </ul>
        </div>
        <div className="footer-links">
          <h3>Follow Us</h3>
          <ul>
            <li>
                <Link to='/' className='items-to'>
                    <FaYoutube className='youtube-icon' /> <h5>Youtube</h5>
                </Link>
            </li>
            <li>
                <Link to='/' className='items-to'>
                    <FaFacebookSquare className='facebook-icon' /> <h5>Facebook</h5>
                </Link>
            </li>
          </ul>
        </div>
        <div className="footer-links">
          <h3>Legal</h3>
          <ul>
            <li>
                <Link to='/privacy-policy' className='items-to'><h5>Privacy Policy</h5></Link>
            </li>
            <li>
                <Link to='/terms-condition' className='items-to'><h5>Terms &amp; Conditions</h5></Link>
            </li>
          </ul>
        </div>
      </div>
      <div className='footer-mark'>
        <p>&copy;Copyright 2023 Brother of Snake company</p>
      </div>
    </div>
  );
}

export default Footer;





