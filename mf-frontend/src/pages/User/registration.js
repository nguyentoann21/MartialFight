import React, { useState, useEffect } from "react";
import { FaTimes, FaEye, FaEyeSlash, FaClock } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";
import "./registration.scss";

const Registration = () => {
  const [avatar, setAvatar] = useState(null);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [gender, setGender] = useState("");
  const [username, setUsername] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");
  const [dialogType, setDialogType] = useState("");
  const [remainingSeconds, setRemainingSeconds] = useState(3);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append("Username", username);
    formData.append("Password", password);
    formData.append("Email", email);
    formData.append("Fullname", name);
    formData.append("Gender", gender);
    formData.append("AvatarUrl", avatar);

    axios
      .post("https://localhost:7052/api/mf/sign-up", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log(response.data);

        const avatarFileName = response.data.avatarUrl;
        console.log(avatarFileName);

        const imageUrl = URL.createObjectURL(avatar);
        console.log(imageUrl);
      }).catch((error) => {
        if (error.response && error.response.status === 400) {
          console.log(error.response.data)
          showDialog("error", error.response.data);
        } else {
          showDialog("error", "An error occurred during registration.");
        }
      });
      
  };

  useEffect(() => {
    setGender("male");
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

  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleShowRePassword = () => {
    setShowRePassword((re) => !re);
  };

  const handleAction = (e) => {
    handleFormSubmit(e);
    handleSubmit(e);
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      username.trim() === "" &&
      password.trim() === "" &&
      email.trim() === "" &&
      name.trim() === "" &&
      !avatar
    ) {
      showDialog("error", "All fields are required");
    } else if (password !== rePassword) {
      showDialog("error", "Passwords do not match");
    } else if (!avatar) {
      showDialog("error", "Please select an avatar");
    } else if (username.trim() === "") {
      showDialog("error", "Please enter an username");
    } else if (name.trim() === "") {
      showDialog("error", "Please enter fullname");
    } else if (password.trim() === "") {
      showDialog("error", "Please enter password");
    } else if (email.trim() === "") {
      showDialog("error", "Please enter an email");
    } else if (password.length < 6 || password.length > 32) {
      showDialog("error", "Password must be between 6 and 32 characters");
    }  else {
      showDialog("success", "Registration successful");
    }
  };

  const showDialog = (type, message) => {
    setDialogType(type);
    setDialogMessage(message);
    setDialogVisible(true);
    setRemainingSeconds(3);

    if (type === "error") {
      setTimeout(() => {
        setDialogVisible(false);
      }, 3000);
    } else if (type === "success") {
      setTimeout(() => {
        window.location.href = "sign-in";
      }, 3000);
    }
  };

  const closeDialog = () => {
    setDialogVisible(false);
  };

  return (
    <div className="register-page">
      <form className="register-form" onSubmit={handleFormSubmit}>
        <div className="close-register">
          <Link to="/" className="close-icons">
            <FaTimes />
          </Link>
        </div>
        <h2>Sign Up</h2>
        <div className="avatar">
          <label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setAvatar(e.target.files[0])}
              hidden
            />
            <img
              src={
                avatar == null
                  ? "https://t4.ftcdn.net/jpg/02/37/10/51/360_F_237105136_zFBiEfEg76oa1sOtoHPGDU3PRVqpoWOd.jpg"
                  : window.URL.createObjectURL(avatar)
              }
              alt="avatar"
              width={100}
              height={100}
            />
          </label>
        </div>
        <div className="register-form-input">
          <div className="form-group-register">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="form-group-register">
            <label htmlFor="name">Name</label>
            <input
              type="name"
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              required
            />
          </div>
          <div className="form-group-register">
            <label htmlFor="password">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
            <div
              className="password-icons"
              type="button"
              onClick={handleShowPassword}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </div>
          </div>
          <div className="form-group-register">
            <label htmlFor="rePassword">Re-Password</label>
            <input
              type={showRePassword ? "text" : "password"}
              id="rePassword"
              name="rePassword"
              value={rePassword}
              onChange={(e) => setRePassword(e.target.value)}
              placeholder="Enter your re-password"
              required
            />
            <div
              className="password-icons"
              type="button"
              onClick={handleShowRePassword}
            >
              {showRePassword ? <FaEyeSlash /> : <FaEye />}
            </div>
          </div>
          <div className="form-group-register" id="gender">
            <label>Gender</label>
            <div className="male-female">
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  checked={gender === "male"}
                  onChange={(e) => setGender(e.target.value)}
                />
                Male
              </label>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  checked={gender === "female"}
                  onChange={(e) => setGender(e.target.value)}
                />
                Female
              </label>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="other"
                  checked={gender === "other"}
                  onChange={(e) => setGender(e.target.value)}
                />
                Other
              </label>
            </div>
          </div>
          <div className="form-group-register" id="username-field">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              required
            />
          </div>
        </div>
        <div className="form-group-button">
          <button type="submit" onClick={handleAction}>
            Sign Up
          </button>
        </div>
        <div className="link-to-sign-in">
          Already have an account?&nbsp;<Link to="/sign-in">Sign in here!</Link>
        </div>
      </form>
      {dialogVisible && (
        <div className={`dialog ${dialogType}`}>
          <div className="dialog-content">
            <p>{dialogMessage}</p>
            <FaClock />
            {dialogType === "success" ? (
              <h5>{`Redirect to Sign In page after ${remainingSeconds} seconds`}</h5>
            ) : (
              <h6>{`Closing in ${remainingSeconds} seconds`}</h6>
            )}
            <button className="dialog-close" onClick={closeDialog}>
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Registration;
