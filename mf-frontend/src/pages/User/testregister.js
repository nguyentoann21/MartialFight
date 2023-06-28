import React, { useState } from "react";
import axios from "axios";

const TestRegister = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [fullname, setFullname] = useState("");
  const [gender, setGender] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("Username", username);
    formData.append("Password", password);
    formData.append("Email", email);
    formData.append("Fullname", fullname);
    formData.append("Gender", gender);
    formData.append("AvatarUrl", avatar);

    axios
      .post("https://localhost:7052/api/mf/sign-up", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        // Handle successful registration
        console.log(response.data);

        // Assuming the API response includes the image filename
        const avatarFileName = response.data.avatarUrl;
        console.log(avatarFileName);

        // Create a URL object from the image file
        const imageUrl = URL.createObjectURL(avatar);
        console.log(imageUrl)
      })
      .catch((error) => {
        // Handle registration error
        if (error.response) {
          setErrorMessage(error.response.data);
        } else {
          setErrorMessage("An error occurred during registration.");
        }
      });
  };

  return (
    <div>
      <h2>Registration Form</h2>
      {errorMessage && <p>{errorMessage}</p>}
      
      <form onSubmit={handleFormSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Full Name:</label>
          <input
            type="text"
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
          />
        </div>
        <div>
          <label>Gender:</label>
          <select value={gender} onChange={(e) => setGender(e.target.value)}>
            <option value="">Select</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div>
          <label>Avatar:</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setAvatar(e.target.files[0])}
          />
        </div>
        {avatar && (
          <img
            src={URL.createObjectURL(avatar)}
            alt="Selected Avatar"
            width={100}
            height={100}
          />
        )}
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default TestRegister;
