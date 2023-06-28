// import React, { useState } from 'react';
// import { FaTimes, FaEye, FaEyeSlash } from 'react-icons/fa';
// import { Link } from 'react-router-dom';
// import axios from 'axios';
// import './registration.scss';

// const Registration = () => {
//   const [avatar, setAvatar] = useState(
//     'https://icon-library.com/images/insert-image-icon/insert-image-icon-14.jpg'
//   );
//   const [email, setEmail] = useState('');
//   const [name, setName] = useState('');
//   const [password, setPassword] = useState('');
//   const [rePassword, setRePassword] = useState('');
//   const [gender, setGender] = useState('');
//   const [username, setUsername] = useState('');
//   const [showPassword, setShowPassword] = useState(false);
//   const [showRePassword, setShowRePassword] = useState(false);

//   const handleShowPassword = () => {
//     setShowPassword((prev) => !prev);
//   };

//   const handleShowRePassword = () => {
//     setShowRePassword((re) => !re);
//   };

//   const handleAvatarChange = (event) => {
//     setAvatar(event.target.value);
//   };

//   const handleEmailChange = (event) => {
//     setEmail(event.target.value);
//   };

//   const handleNameChange = (event) => {
//     setName(event.target.value);
//   };

//   const handlePasswordChange = (event) => {
//     setPassword(event.target.value);
//   };

//   const handleRePasswordChange = (event) => {
//     setRePassword(event.target.value);
//   };

//   const handleGenderChange = (event) => {
//     setGender(event.target.value);
//   };

//   const handleUsernameChange = (event) => {
//     setUsername(event.target.value);
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     // Construct the data payload
//     const formData = new FormData();
//     formData.append('email', email);
//     formData.append('fullname', name);
//     formData.append('password', password);
//     formData.append('rePassword', rePassword);
//     formData.append('gender', gender);
//     formData.append('username', username);
//     formData.append('avatarUrl', avatar);

//     try {
//       // Send the POST request to the backend API endpoint
//       const response = await axios.post('https://localhost:7052/api/mf/sign-up', formData);

//       // Registration successful, handle the response as needed
//       console.log(response.data);
//       console.log(1)

//       // Clear the form fields
//       setEmail('');
//       setName('');
//       setPassword('');
//       setRePassword('');
//       setGender('');
//       setUsername('');
//       setAvatar('https://icon-library.com/images/insert-image-icon/insert-image-icon-14.jpg');
//     } catch (error) {
//       // Registration failed, handle the error as needed
//       console.error(error);
//       console.log(0)
//     }
//   };

//   return (
//     <div className='register-page'>
//       <form className='register-form' onSubmit={handleSubmit}>
//         <div className='close-register'>
//           <Link to='/' className='close-icons'>
//             <FaTimes />
//           </Link>
//         </div>
//         <h2>Sign Up</h2>
//         <div className='avatar'>
//           <label>
//             <input
//               type='file'
//               accept='image/*'
//               onChange={handleAvatarChange}
//               hidden
//             />
//             <img src={avatar} alt='avatar' />
//           </label>
//         </div>
//         <div className='register-form-input'>
//           <div className='form-group-register'>
//             <label htmlFor='email'>Email</label>
//             <input
//               type='email'
//               id='email'
//               name='email'
//               value={email}
//               onChange={handleEmailChange}
//               placeholder='Enter your email'
//               required
//             />
//             <span id='email'></span>
//           </div>
//           <div className='form-group-register'>
//             <label htmlFor='name'>Name</label>
//             <input
//               type='name'
//               id='name'
//               name='name'
//               value={name}
//               onChange={handleNameChange}
//               placeholder='Enter your name'
//               required
//             />
//             <span id='name'></span>
//           </div>
//           <div className='form-group-register'>
//             <label htmlFor='password'>Password</label>
//             <input
//               type={showPassword ? 'text' : 'password'}
//               id='password'
//               name='password'
//               value={password}
//               onChange={handlePasswordChange}
//               placeholder='Enter your password'
//               required
//             />
//             <div
//               className='password-icons'
//               type='button'
//               onClick={handleShowPassword}
//             >
//               {showPassword ? <FaEyeSlash /> : <FaEye />}
//             </div>
//             <span id='password'></span>
//           </div>
//           <div className='form-group-register'>
//             <label htmlFor='rePassword'>Re-Password</label>
//             <input
//               type={showRePassword ? 'text' : 'password'}
//               id='rePassword'
//               name='rePassword'
//               value={rePassword}
//               onChange={handleRePasswordChange}
//               placeholder='Enter your re-password'
//               required
//             />
//             <div
//               className='password-icons'
//               type='button'
//               onClick={handleShowRePassword}
//             >
//               {showRePassword ? <FaEyeSlash /> : <FaEye />}
//             </div>
//             <span id='re-password'></span>
//           </div>
//           <div className='form-group-register' id='gender'>
//             <label>Gender</label>
//             <div className='male-female'>
//               <label>
//                 <input
//                   type='radio'
//                   name='gender'
//                   value='male'
//                   checked={gender === 'male'}
//                   onChange={handleGenderChange}
//                 />
//                 Male
//               </label>
//               <label>
//                 <input
//                   type='radio'
//                   name='gender'
//                   value='female'
//                   checked={gender === 'female'}
//                   onChange={handleGenderChange}
//                 />
//                 Female
//               </label>
//               <label>
//                 <input
//                   type='radio'
//                   name='gender'
//                   value='other'
//                   checked={gender === 'other'}
//                   onChange={handleGenderChange}
//                 />
//                 Other
//               </label>
//             </div>
//           </div>
//           <div className='form-group-register' id='username-field'>
//             <label htmlFor='username'>Username</label>
//             <input
//               type='text'
//               id='username'
//               name='username'
//               value={username}
//               onChange={handleUsernameChange}
//               placeholder='Enter your username'
//               required
//             />
//             <span id='username'></span>
//           </div>
//         </div>
//         <div className='form-group-button'>
//           <button type='submit'>Sign Up</button>
//         </div>
//         <div className='link-to-sign-in'>
//           Already have an account?&nbsp;<Link to='/sign-in'>Sign in here!</Link>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default Registration;










import React, { useState } from 'react';
import { FaTimes, FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link } from 'react-router-dom';
// import axios from 'axios';
import './registration.scss';

const Registration = () => {
  const [avatar, setAvatar] = useState(
    'https://icon-library.com/images/insert-image-icon/insert-image-icon-14.jpg'
  );
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const [gender, setGender] = useState('');
  const [username, setUsername] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleShowRePassword = () => {
    setShowRePassword((re) => !re);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    const registerData = {
      fullname: name,
      email: email,
      password: password,
      avatar: avatar,
      gender: gender      
    }

    try {
      const response = await fetch('https://localhost:7052/api/mf/sign-up', {
        method: 'POST',
        headers: {
          accept: 'multipart/form-data',
        },
      });
  
      if (response.ok) {
        console.log(1)
      }else{
        console.log(2)
      }
    } catch (err) {
      console.log(3, err);
    }
  };

  return (
    <div className='register-page'>
      <form className='register-form' onSubmit={handleSubmit}>
        <div className='close-register'>
          <Link to='/' className='close-icons'>
            <FaTimes />
          </Link>
        </div>
        <h2>Sign Up</h2>
        <div className='avatar'>
          <label>
            <input
              type='file'
              accept='image/*'
              onChange={(e) => setAvatar(e.target.value)}
              hidden
            />
            <img src={avatar} alt='avatar' />
          </label>
        </div>
        <div className='register-form-input'>
          <div className='form-group-register'>
            <label htmlFor='email'>Email</label>
            <input
              type='email'
              id='email'
              name='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder='Enter your email'
              required
            />
            <span id='email'></span>
          </div>
          <div className='form-group-register'>
            <label htmlFor='name'>Name</label>
            <input
              type='name'
              id='name'
              name='name'
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder='Enter your name'
              required
            />
            <span id='name'></span>
          </div>
          <div className='form-group-register'>
            <label htmlFor='password'>Password</label>
            <input
              type={showPassword ? 'text' : 'password'}
              id='password'
              name='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder='Enter your password'
              required
            />
            <div
              className='password-icons'
              type='button'
              onClick={handleShowPassword}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </div>
            <span id='password'></span>
          </div>
          <div className='form-group-register'>
            <label htmlFor='rePassword'>Re-Password</label>
            <input
              type={showRePassword ? 'text' : 'password'}
              id='rePassword'
              name='rePassword'
              value={rePassword}
              onChange={(e) => setRePassword(e.target.value)}
              placeholder='Enter your re-password'
              required
            />
            <div
              className='password-icons'
              type='button'
              onClick={handleShowRePassword}
            >
              {showRePassword ? <FaEyeSlash /> : <FaEye />}
            </div>
            <span id='re-password'></span>
          </div>
          <div className='form-group-register' id='gender'>
            <label>Gender</label>
            <div className='male-female'>
              <label>
                <input
                  type='radio'
                  name='gender'
                  value='male'
                  checked={gender === 'male'}
                  onChange={(e) => setGender(e.target.value)}
                />
                Male
              </label>
              <label>
                <input
                  type='radio'
                  name='gender'
                  value='female'
                  checked={gender === 'female'}
                  onChange={(e) => setGender(e.target.value)}
                />
                Female
              </label>
              <label>
                <input
                  type='radio'
                  name='gender'
                  value='other'
                  checked={gender === 'other'}
                  onChange={(e) => setGender(e.target.value)}
                />
                Other
              </label>
            </div>
          </div>
          <div className='form-group-register' id='username-field'>
            <label htmlFor='username'>Username</label>
            <input
              type='text'
              id='username'
              name='username'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder='Enter your username'
              required
            />
            <span id='username'></span>
          </div>
        </div>
        <div className='form-group-button'>
          <button type='submit'>Sign Up</button>
        </div>
        <div className='link-to-sign-in'>
          Already have an account?&nbsp;<Link to='/sign-in'>Sign in here!</Link>
        </div>
      </form>
    </div>
  );
};

export default Registration;
