import React, { useState, useEffect } from 'react';
import { FaTimes, FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './forgot.scss';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [emailValidated, setEmailValidated] = useState(false);
  const [checkValidate, setCheckValidate] = useState(false);
  const [verificationCodeSent, setVerificationCodeSent] = useState(false);

  const handleForgotInputChange = (e) => {
    setEmail(e.target.value);
    setCheckValidate(false);
  };

  useEffect(() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(email)) {
      setEmailValidated(true);
    } else {
      setEmailValidated(false);
    }
  }, [email]);

  const handleSendVerificationCode = () => {
    if (emailValidated) {
      setCheckValidate(false);
      // send verification code to email address
      setVerificationCodeSent(true);
    } else {
      setCheckValidate(true);
      // send verification code to email address
      setVerificationCodeSent(false);
    }
  };

  return (
    <div className='forgot-password-page'>
      {verificationCodeSent ? (
        <VerificationPage email={email} />
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
          <button onClick={handleSendVerificationCode}>
            Send Verification Code
          </button>
        </div>
      )}
    </div>
  );
};

const VerificationPage = ({ email }) => {
  const [verificationCode, setVerificationCode] = useState('');
  const [verificationError, setVerificationError] = useState(false);
  const [passwordReset, setPasswordReset] = useState(false);

  const handleVerifyCode = () => {
    // verify verification code
    if (verificationCode === '1234') {
      setPasswordReset(true);
    } else {
      setVerificationError(true);
    }
  };

  const handleInputCodeVerify = (e) => {
    setVerificationCode(e.target.value);
    setVerificationError(false);
  };

  return (
    <div className='form-input-code-verify'>
      {passwordReset ? (
        <PasswordResetPage email={email} />
      ) : (
        <div className='input-code-verify'>
          <p className='input-code-verify-text'>
            A verification code has been sent to <span>{email}</span>.
          </p>
          <label htmlFor='verificationCode'>Verification Code:</label>
          <input
            type='text'
            id='verificationCode'
            value={verificationCode}
            placeholder='Enter your verify code'
            onChange={handleInputCodeVerify}
          />
          {verificationError && (
            <span>Incorrect verification code. Please try again.</span>
          )}
          <button onClick={handleVerifyCode}>Verify</button>
        </div>
      )}
    </div>
  );
};

// const PasswordResetPage = ({ email }) => {
//   const [newPassword, setNewPassword] = useState('');
//   const [rePassword, setRePassword] = useState('');
//   const [passwordResetError, setPasswordResetError] = useState(false);
//   const [passwordResetLength, setPasswordResetLength] = useState(false);
//   const [passwordResetErrorAll, setPasswordResetErrorAll] = useState(false);
//   const [passwordResetSuccess, setPasswordResetSuccess] = useState(false);
//   const [showNew, setShowNew] = useState(false);
//   const [showReNew, setShowReNew] = useState(false);

//   const handleShowNew = () => {
//     setShowNew((pwd) => !pwd);
//   };

//   const handleShowReNew = () => {
//     setShowReNew((re) => !re);
//   };

//   const handleResetPassword = () => {
//     // reset user password
//     if (
//       newPassword === rePassword &&
//       newPassword.length >= 6 &&
//       newPassword.length <= 32
//     ) {
//       setPasswordResetSuccess(true);
//       setPasswordResetError(false);
//       setPasswordResetErrorAll(false);
//       setPasswordResetLength(false);
//     } else if (
//       newPassword === rePassword &&
//       (newPassword.length < 6 || newPassword.length > 32)
//     ) {
//       setPasswordResetLength(true);
//       setPasswordResetSuccess(false);
//       setPasswordResetError(false);
//       setPasswordResetErrorAll(false);
//     } else if (
//       newPassword !== rePassword &&
//       (newPassword.length < 6 || newPassword.length > 32)
//     ) {
//       setPasswordResetErrorAll(true);
//       setPasswordResetSuccess(false);
//       setPasswordResetError(false);
//       setPasswordResetLength(false);
//     } else {
//       setPasswordResetError(true);
//       setPasswordResetSuccess(false);
//       setPasswordResetErrorAll(false);
//       setPasswordResetLength(false);
//     }
//   };

//   return (
//     <div className='form-input-reset-password'>
//       {passwordResetSuccess ? (
//         <div className='result-success'>
//             <div className='success-icons'>
//                 <Link to='/sign-in'>
//                     <img src='https://i.pinimg.com/236x/27/40/60/2740604065d73d5bf74a099741fb5a50.jpg' alt='sign-in' />
//                 </Link>
//             </div>
//             <div className='success-text'>
//                 <p>Your password has been successfully reset.</p>
//                 <p>You can now login with your new password.</p>
//                 <Link to='/sign-in'><span>Sign in now!</span></Link>
//             </div>
//         </div>
//       ) : (
//         <div className='form-reset-password'>
//             <span className='error-reset-password'>
//             {passwordResetLength && <p>The passwords must be 6-32 characters.</p>}
//             {passwordResetErrorAll && (
//                 <div>
//                 <p>The passwords must be 6-32 characters.</p>
//                 <p>The passwords do not match. Please try again.</p>
//                 </div>
//             )}
//             {passwordResetError && (
//                 <p>The passwords do not match. Please try again.</p>
//             )}
//             </span>
//             <div className='reset-password-input'>
//                 <h3>Reset Password</h3>
//                 <label htmlFor='new-password'>New Password</label>
//                 <input
//                 type={showNew ? 'text' : 'password'}
//                 id='new-password'
//                 name='new-password'
//                 value={newPassword}
//                 onChange={(event) => setNewPassword(event.target.value)}
//                 placeholder='Enter your new password'
//                 required
//                 />
//                 <div
//                 className='password-icons'
//                 type='button'
//                 onClick={handleShowNew}
//                 >
//                 {showNew ? <FaEyeSlash /> : <FaEye />}
//                 </div>
//             </div>
//             <div className='reset-password-input'>
//                 <label htmlFor='re-password'>Re-Password</label>
//                 <input
//                 type={showReNew ? 'text' : 'password'}
//                 id='re-password'
//                 name='re-password'
//                 value={rePassword}
//                 onChange={(event) => setRePassword(event.target.value)}
//                 placeholder='Enter your re-password'
//                 required
//                 />
//                 <div
//                 className='password-icons'
//                 type='button'
//                 onClick={handleShowReNew}
//                 >
//                 {showReNew ? <FaEyeSlash /> : <FaEye />}
//                 </div>
//             </div>
//             <div className='input-reset-password-button'>
//                 <button onClick={handleResetPassword}>Reset Password</button>
//             </div>
//         </div>
//       )}
//     </div>
//   );
// };

const PasswordResetPage = ({ email }) => {
  const [newPassword, setNewPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const [passwordResetError, setPasswordResetError] = useState(false);
  const [passwordResetLength, setPasswordResetLength] = useState(false);
  const [passwordResetErrorAll, setPasswordResetErrorAll] = useState(false);
  const [passwordResetSuccess, setPasswordResetSuccess] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showReNew, setShowReNew] = useState(false);

  const handleShowNew = () => {
    setShowNew((pwd) => !pwd);
  };

  const handleShowReNew = () => {
    setShowReNew((re) => !re);
  };

  const handleResetPassword = () => {
    // reset user password
    if (
      newPassword === rePassword &&
      newPassword.length >= 6 &&
      newPassword.length <= 32
    ) {
      setPasswordResetSuccess(true);
      setPasswordResetError(false);
      setPasswordResetErrorAll(false);
      setPasswordResetLength(false);
    } else if (
      newPassword === rePassword &&
      (newPassword.length < 6 || newPassword.length > 32)
    ) {
      setPasswordResetLength(true);
      setPasswordResetSuccess(false);
      setPasswordResetError(false);
      setPasswordResetErrorAll(false);
    } else if (
      newPassword !== rePassword &&
      (newPassword.length < 6 || newPassword.length > 32)
    ) {
      setPasswordResetErrorAll(true);
      setPasswordResetSuccess(false);
      setPasswordResetError(false);
      setPasswordResetLength(false);
    } else {
      setPasswordResetError(true);
      setPasswordResetSuccess(false);
      setPasswordResetErrorAll(false);
      setPasswordResetLength(false);
    }
  };

  const handleCloseDialog = () => {
    setPasswordResetSuccess(false);
    setPasswordResetError(false);
    setPasswordResetErrorAll(false);
    setPasswordResetLength(false);
  };

  return (
    <div className='form-input-reset-password'>
      {passwordResetSuccess && (
        <div className='dialog-overlay-s'>
          <div className='dialog-overlay-success'>
            <div className='dialog-overlay-success-header'>
              <h3>Success</h3>
            </div>
            <div className='dialog-overlay-success-content'>
              <div className='success-icons'>
                <Link to='/sign-in'>
                  <img
                    src='/assets/images/forgot-success.jpg'
                    alt='sign-in'
                  />
                </Link>
              </div>
              <div className='success-text'>
                <p>Your password has been successfully reset.</p>
                <p>You can now login with your new password.</p>
                <div className='success-button-s'>
                  <Link to='/sign-in'>
                    <span>Sign in now!</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {passwordResetErrorAll && (
        <div className='dialog-overlay-e'>
          <div className='dialog-overlay-error'>
            <div className='dialog-overlay-error-header'>
              <h3>Error</h3>
            </div>
            <div className='dialog-overlay-error-content'>
              <span className='error-reset-password'>
                <p>The passwords must be 6-32 characters.</p>
                <p>The passwords do not match.</p>
              </span>
            </div>
            <div className='dialog-e-close'>
              <button className='dialog-e-close-button' onClick={handleCloseDialog}>
                Try again
              </button>
            </div>
          </div>
        </div>
      )}

      {passwordResetError && (
        <div className='dialog-overlay-e'>
          <div className='dialog-overlay-error'>
            <div className='dialog-overlay-error-header'>
              <h3>Error</h3>
            </div>
            <div className='dialog-overlay-error-content'>
              <span className='error-reset-password'>
                <p>The passwords do not match. Please try again.</p>
              </span>
            </div>
            <div className='dialog-e-close'>
              <button className='dialog-e-close-button' onClick={handleCloseDialog}>
                Try again
              </button>
            </div>
          </div>
        </div>
      )}

      {passwordResetLength && (
        <div className='dialog-overlay-e'>
          <div className='dialog-overlay-error'>
            <div className='dialog-overlay-error-header'>
              <h3>Error</h3>
            </div>
            <div className='dialog-overlay-error-content'>
              <span className='error-reset-password'>
                <p>The passwords must be 6-32 characters.</p>
              </span>
            </div>
            <div className='dialog-e-close'>
              <button className='dialog-e-close-button' onClick={handleCloseDialog}>
                Try again
              </button>
            </div>
          </div>
        </div>
      )}

      {!passwordResetSuccess && !passwordResetError && !passwordResetErrorAll && !passwordResetLength && (
        <div className='form-reset-password'>
          <div className='reset-password-input'>
            <h3>Reset Password</h3>
            <label htmlFor='new-password'>New Password</label>
            <input
              type={showNew ? 'text' : 'password'}
              id='new-password'
              name='new-password'
              value={newPassword}
              onChange={(event) => setNewPassword(event.target.value)}
              placeholder='Enter your new password'
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
            <button onClick={handleResetPassword}>Reset Password</button>
          </div>
        </div>
      )}
    </div>
  );
};
export default ForgotPassword;
