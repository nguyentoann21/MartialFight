import React from 'react';
import { FaFacebookSquare, FaYoutube } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { MdEmail, MdPhone, MdHome } from 'react-icons/md';
import { ReactComponent as LogoGame } from '../../../../logo.svg';
import './footer.scss';

function Footer() {
  return (
    <div className="footer">
      <div className="footer-container">
        <div className="footer-logo">
          <div className='footer-logo-content'><LogoGame className='logo-image-footer' /></div>
          <span>Martial Fight</span>
        </div>
        <div className="footer-links">
          <h3>Contact Us</h3>
          <ul>
            <li>
                <MdEmail /> Email: mplkingofworld@gmail.com
            </li>
            <li>
                <MdPhone /> Phone: 0762871115
            </li>
            <li>
                <MdHome /> Address: 600 extended Nguyen Van Cu street, An Binh ward, Ninh Kieu district, Can Tho city
            </li>
          </ul>
        </div>
        <div className="footer-links">
          <h3>Follow Us</h3>
          <ul>
            <li>
                <Link to='' className='items-to'>
                    <FaYoutube className='youtube-icon' /> Youtube
                </Link>
            </li>
            <li>
                <Link to='' className='items-to'>
                    <FaFacebookSquare className='facebook-icon' /> Facebook
                </Link>
            </li>
          </ul>
        </div>
        <div className="footer-links">
          <h3>Legal</h3>
          <ul>
            <li>
                <Link to='/private-policy' className='items-to'>Privacy Policy</Link>
            </li>
            <li>
                <Link to='/terms-condition' className='items-to'>Terms &amp; Conditions</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className='footer-mark'>
        <p>&copy;Copyright 2023 That D5 Man Company</p>
      </div>
    </div>
  );
}

export default Footer;





