import React, { useState, useEffect } from 'react';
import { FaEyeSlash, FaEye, FaArrowLeft, FaClock } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './password.scss';


const ChangePassword = () => {
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    reNewPassword: '',
  });

  const [statusMessage, setStatusMessage] = useState('');
  const history = useNavigate();

  const account = JSON.parse(localStorage.getItem('ACCOUNT_DATA'));

  useEffect(() => {
    if(!account) {
      history('/');
    }
  }, [account, history]);

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showReNew, setShowReNew] = useState(false);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [dialogMessage, setDialogMessage] = useState('');
  const [dialogType, setDialogType] = useState('');
  const [remainingSeconds, setRemainingSeconds] = useState(3);

  useEffect(() => {
    let countdownTimer;
    if (dialogVisible && remainingSeconds > 0) {
      countdownTimer = setInterval(() => {
        setRemainingSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);
    }

    return () => {
      clearInterval(countdownTimer);
    };
  }, [dialogVisible, remainingSeconds]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleShowCurrent = () => {
    setShowCurrent((cur) => !cur);
  };

  const handleShowNew = () => {
    setShowNew((pwd) => !pwd);
  };

  const handleShowReNew = () => {
    setShowReNew((re) => !re);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      formData.currentPassword.trim() === '' ||
      formData.newPassword.trim() === '' ||
      formData.reNewPassword.trim() === ''
    ) {
      showDialog('error', 'All fields are required.');
      return;
    }

    if (formData.newPassword !== formData.reNewPassword) {
      showDialog('error', 'New password and re-entered password must match');
      return;
    }

    try {
      const response = await axios.post(
        'https://localhost:7052/api/mf/change-password',
        { ...formData, accountID: account.accountID },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      setStatusMessage(response.data);
      showDialog('success', 'Password successfully changed');
    } catch (error) {
      setStatusMessage(error.response.data);
      showDialog('error', error.response.data);
    }
  };

  const handleChangePasswordBack = () => {
    history('/profile');
  };

  const showDialog = (type, message) => {
    setDialogType(type);
    setDialogMessage(message);
    setDialogVisible(true);
    setRemainingSeconds(3);

    if (type === 'error') {
      setTimeout(() => {
        setDialogVisible(false);
      }, 3000);
    } else if (type === 'success') {
      setTimeout(() => {
        localStorage.removeItem('ACCOUNT_DATA');
        history('/sign-in');
      }, 3000);
    }
  };

  const closeDialog = () => {
    setDialogVisible(false);
  };

  return (
    <div className='change-password-container'>
      <div className='change-password-form'>
        <h2>Change Password</h2>
        {statusMessage && typeof statusMessage === 'string' ? (
          <div>{statusMessage}</div>
        ) : null}
        <form onSubmit={handleSubmit}>
          <div className='input-container'>
            <label htmlFor='currentPassword'>Current Password:</label>
            <input
              type={showCurrent ? 'text' : 'password'}
              id='currentPassword'
              name='currentPassword'
              value={formData.currentPassword}
              onChange={handleChange}
              placeholder='Enter your current password'
            />
            <div
              className='password-icons'
              type='button'
              onClick={handleShowCurrent}
            >
              {showCurrent ? <FaEyeSlash /> : <FaEye />}
            </div>
          </div>
          <div className='input-container'>
            <label htmlFor='newPassword'>New Password:</label>
            <input
              type={showNew ? 'text' : 'password'}
              id='newPassword'
              name='newPassword'
              value={formData.newPassword}
              onChange={handleChange}
              placeholder='Enter your new password'
            />
            <div className='password-icons' type='button' onClick={handleShowNew}>
              {showNew ? <FaEyeSlash /> : <FaEye />}
            </div>
          </div>
          <div className='input-container'>
            <label htmlFor='reNewPassword'>Re-enter New Password:</label>
            <input
              type={showReNew ? 'text' : 'password'}
              id='reNewPassword'
              name='reNewPassword'
              value={formData.reNewPassword}
              onChange={handleChange}
              placeholder='Enter your re-new password'
            />
            <div className='password-icons' type='button' onClick={handleShowReNew}>
              {showReNew ? <FaEyeSlash /> : <FaEye />}
            </div>
          </div>
          <div className='change-password-action'>
            <button type='submit'>Change Password</button>
          </div>
        </form>
        <div className='change-password-back'>
          <button onClick={handleChangePasswordBack}>
            <FaArrowLeft />
          </button>
        </div>
      </div>
      {dialogVisible && (
        <div className={`dialog ${dialogType}`}>
          <div className='dialog-content'>
            <p>{dialogMessage}</p>
            <FaClock />
            {dialogType === 'success' ? (
              <h5>{`Redirect to Sign In page after ${remainingSeconds} seconds`}</h5>
            ) : (
              <h6>{`Closing in ${remainingSeconds} seconds`}</h6>
            )}
            <button className='dialog-close' onClick={closeDialog}>
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChangePassword;

