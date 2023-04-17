import React, { useState } from "react";
import { Link } from "react-router-dom";
import './registration.css';

const Registration = () => {
  const [avatar, setAvatar] = useState("");
  const [email, setEmail] = useState("");
  const [fullname, setFullname] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  const handleInputChange = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;

    switch (name) {
      case "avatar":
        setAvatar(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "fullname":
        setFullname(value);
        break;
      case "password":
        setPassword(value);
        break;
      case "rePassword":
        setRePassword(value);
        break;
      case "gender":
        setGender(value);
        break;
      case "address":
        setAddress(value);
        break;
      case "phone":
        setPhone(value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // handle form submission here
  };

  return (
    <div className="register">
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="avatar">Avatar:</label>
          <input
            type="text"
            name="avatar"
            id="avatar"
            value={avatar}
            onChange={handleInputChange}
            className="animate-on-hover"
          />
        </div>

        <div className="input-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={handleInputChange}
            className="animate-on-hover"
          />
        </div>

        <div className="input-group">
          <label htmlFor="fullname">Full Name:</label>
          <input
            type="text"
            name="fullname"
            id="fullname"
            value={fullname}
            onChange={handleInputChange}
            className="animate-on-hover"
          />
        </div>

        <div className="input-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={handleInputChange}
            className="animate-on-hover"
          />
        </div>

        <div className="input-group">
          <label htmlFor="rePassword">Re-Enter Password:</label>
          <input
            type="password"
            name="rePassword"
            id="rePassword"
            value={rePassword}
            onChange={handleInputChange}
            className="animate-on-hover"
          />
        </div>

        <div className="input-group">
          <label htmlFor="gender">Gender:</label>
          <div className="gender-radio-group">
            <label>
              <input
                type="radio"
                name="gender"
                id="gender-male"
                value="male"
                checked={gender === "male"}
                onChange={handleInputChange}
                className="animate-on-click"
              />
              Male
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                id="gender-female"
                value="female"
            checked={gender === "female"}
            onChange={handleInputChange}
            className="animate-on-click"
          />
          Female
        </label>
      </div>
    </div>

    <div className="input-group">
      <label htmlFor="address">Address:</label>
      <select
        name="address"
        id="address"
        value={address}
        onChange={handleInputChange}
        className="animate-on-hover"
      >
        <option value="">Choose an address</option>
        <option value="Ha Noi">Ha Noi</option>
        <option value="Ho Chi Minh">Ho Chi Minh</option>
        {/* add more options here */}
      </select>
    </div>

    <div className="input-group">
      <label htmlFor="phone">Phone:</label>
      <input
        type="tel"
        name="phone"
        id="phone"
        value={phone}
        onChange={handleInputChange}
        className="animate-on-hover"
      />
    </div>

    <button type="submit" className="register-btn animate-on-click">
      Register
    </button>
  </form>

  <div className="sign-in-link">
    Already have an account? <Link to="/sign-in">Sign in</Link>
  </div>
</div>
);
};

export default Registration;