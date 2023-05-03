import React, { useState } from "react";
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

  const handleAvatarChange = (event) => {
    setAvatar(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleFullnameChange = (event) => {
    setFullname(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleRePasswordChange = (event) => {
    setRePassword(event.target.value);
  };

  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };

  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };

  const handlePhoneChange = (event) => {
    setPhone(event.target.value);
  };

  return (
    <div className="register-page">
      <div className="register-form">
        <div className="avatar">
          <label>
            <input type="file" accept="image/*" onChange={handleAvatarChange} />
            <img src={avatar} alt="avatar" />
          </label>
        </div>
        <div className="form-groups">
          <label>Email:</label>
          <input type="email" value={email} onChange={handleEmailChange} />
        </div>
        <div className="form-groups">
          <label>Fullname:</label>
          <input type="text" value={fullname} onChange={handleFullnameChange} />
        </div>
        <div className="form-groups">
          <label>Password:</label>
          <input type="password" value={password} onChange={handlePasswordChange} />
        </div>
        <div className="form-groups">
          <label>Re-Password:</label>
          <input type="password" value={rePassword} onChange={handleRePasswordChange      } />
    </div>
    <div className="form-groups">
      <label>Gender:</label>
      <div>
        <label>
          <input type="radio" name="gender" value="male" checked={gender === "male"} onChange={handleGenderChange} />
          Male
        </label>
        <label>
          <input type="radio" name="gender" value="female" checked={gender === "female"} onChange={handleGenderChange} />
          Female
        </label>
      </div>
    </div>
    <div className="form-groups">
      <label>Address:</label>
      <select value={address} onChange={handleAddressChange}>
        <option value="">-- Select a province --</option>
        <option value="Hanoi">Hanoi</option>
        <option value="HoChiMinhCity">Ho Chi Minh City</option>
        <option value="DaNang">Da Nang</option>
        {/* ... */}
      </select>
    </div>
    <div className="form-groups">
      <label>Phone:</label>
      <input type="tel" value={phone} onChange={handlePhoneChange} />
    </div>
    <div className="form-groups">
      <button type="submit">Register</button>
    </div>
    <div className="link-to-signin">
    <a href="/sign-in">Already have an account? Sign in</a>
  </div>
  </div>
</div>
);
};

export default Registration;