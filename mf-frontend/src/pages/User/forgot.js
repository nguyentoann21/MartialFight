import React, { useState, useEffect } from 'react';
import { FaTimes, FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './forgot.scss';

const ForgotPassword = () => {
  const [step, setStep] = useState('send-code');
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const [message, setMessage] = useState('');
  const [messageRedirect, setMessageRedirect] = useState('');
  const [emailValidated, setEmailValidated] = useState(false);
  const [checkValidate, setCheckValidate] = useState(false);
  const [verificationCodeSent, setVerificationCodeSent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showReNew, setShowReNew] = useState(false);
  const [showMessageDialog, setShowMessageDialog] = useState(false);

  const openMessageDialog = () => {
    setShowMessageDialog(true);
  };

  const closeMessageDialog = () => {
    setShowMessageDialog(false);
  };

  const handleForgotInputChange = (e) => {
    setEmail(e.target.value);
    setCheckValidate(false);
  };

  const handleShowNew = () => {
    setShowNew((pwd) => !pwd);
  };

  const handleShowReNew = () => {
    setShowReNew((re) => !re);
  };

  useEffect(() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(email)) {
      setEmailValidated(true);
    } else {
      setEmailValidated(false);
    }
  }, [email]);

  const handleSendCode = async () => {
    if (emailValidated) {
      setCheckValidate(false);
      try {
        const response = await fetch(
          `https://localhost:7052/api/mf/send-code?email=${email}`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email }),
          }
        );
        if (response.status === 202) {
          openMessageDialog();
          setStep('verify-code');
          setMessage('Reset password verification code sent successfully');
          setVerificationCodeSent(true);
        } else if (response.status === 404) {
          openMessageDialog();
          setMessage('Email does not found');
        } else {
          openMessageDialog();
          setMessage('Server error');
        }
      } catch (error) {
        openMessageDialog();
        setMessage('Error while send code');
      }
    } else {
      setCheckValidate(true);
    }
  };

  const handleVerifyCode = async () => {
    try {
      const response = await fetch(
        `https://localhost:7052/api/mf/verify-code?email=${email}&code=${code}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, code }),
        }
      );

      if (response.status === 200) {
        openMessageDialog();
        setStep('reset-password');
        setMessage('Verification successful');
      } else if (response.status === 406) {
        openMessageDialog();
        setMessage('Verify code is invalid');
      } else if (response.status === 404) {
        openMessageDialog();
        setMessage('Email does not found');
      } else {
        openMessageDialog();
        setMessage('Verify code is required');
      }
    } catch (error) {
      openMessageDialog();
      setMessage('Error while verify code');
    }
  };

  const handleResetPassword = async () => {
    if (newPassword !== rePassword) {
      openMessageDialog();
      setMessage('Password and re-new password does not match');
    } else {
      try {
        const response = await fetch(
          `https://localhost:7052/api/mf/reset-password?email=${email}&code=${code}&newPassword=${newPassword}`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, code, newPassword }),
          }
        );

        if (response.status === 200) {
          setMessage('Password reset successfully');
          let countdown = 5;
          const countdownInterval = setInterval(() => {
            setMessageRedirect(`Redirecting to sign-in page in ${countdown} seconds`);
            countdown -= 1;
            if (countdown === 0) {
              clearInterval(countdownInterval);
              window.location.href = '/sign-in';
            }
          }, 1000);
          openMessageDialog();
        } else if (response.status === 400) {
          openMessageDialog();
          setMessage('New password must be from 6 to 32 characters');
        } else if (response.status === 404) {
          openMessageDialog();
          setMessage('Email does not found');
        } else if (response.status === 409) {
          openMessageDialog();
          setMessage('Invalid verification code');
        } else {
          openMessageDialog();
          setMessage('Server error');
        }
      } catch (error) {
        openMessageDialog();
        setMessage(error.response.data);
      }
    }
  };

  return (
    <>
      <div className='forgot-password-page'>
        {verificationCodeSent ? (
          <div className='form-input-code-verify'>
            {step === 'verify-code' && (
              <div className='input-code-verify'>
                <div className='input-code-verify-text'>
                  A verification code has been sent to <span>{email}</span>
                </div>
                <label htmlFor='verificationCode'>Verification Code:</label>
                <input
                  id='verificationCode'
                  type='text'
                  placeholder='Enter verification code'
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  required
                />
                <button onClick={handleVerifyCode}>Verify</button>
              </div>
            )}

            {step === 'reset-password' && (
              <div className='form-input-reset-password'>
                <div className='form-reset-password'>
                  <div className='reset-password-input'>
                    <h3>Reset Password</h3>
                    <label htmlFor='new-password'>New Password</label>
                    <input
                      type={showNew ? 'text' : 'password'}
                      id='new-password'
                      placeholder='Enter new password'
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      required
                    />
                    <div
                      className='password-icons'
                      type='button'
                      onClick={handleShowNew}
                    >
                      {showNew ? <FaEyeSlash /> : <FaEye />}
                    </div>
                  </div>
                  <div className='reset-password-input'>
                    <label htmlFor='re-password'>Re-Password</label>
                    <input
                      type={showReNew ? 'text' : 'password'}
                      id='re-password'
                      name='re-password'
                      value={rePassword}
                      onChange={(event) => setRePassword(event.target.value)}
                      placeholder='Enter your re-password'
                      required
                    />
                    <div
                      className='password-icons'
                      type='button'
                      onClick={handleShowReNew}
                    >
                      {showReNew ? <FaEyeSlash /> : <FaEye />}
                    </div>
                  </div>
                  <div className='input-reset-password-button'>
                    <button onClick={handleResetPassword}>
                      Reset Password
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className='form-input-email-verify'>
            <div className='close-forgot'>
              <Link to='/sign-in' className='close-icons'>
                <FaTimes />
              </Link>
            </div>
            <h2>Email Verify</h2>
            <label htmlFor='email'>Email:</label>
            <input
              type='email'
              id='email'
              value={email}
              onChange={handleForgotInputChange}
              placeholder='Enter your email address'
              required
            />
            {checkValidate && <span>Please input correct email</span>}
            <button onClick={handleSendCode}>Send Verification Code</button>
          </div>
        )}
      </div>
      {showMessageDialog && (
        <div className='message-dialog'>
          <div className='message-content'>
            <p>{message}</p>
            {messageRedirect && <h3>{messageRedirect}</h3>}
            <div className='button-handle'>
              <button onClick={closeMessageDialog}>{messageRedirect ? 'OK':'Close'}</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ForgotPassword;
