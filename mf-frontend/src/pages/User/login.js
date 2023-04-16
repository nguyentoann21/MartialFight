import React, { useState } from "react";
import { FaEye, FaEyeSlash, FaQuestionCircle } from "react-icons/fa";
import "./login.css";


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Email:", email);
    console.log("Password:", password);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="login-wrapper">
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Login</h2>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <div className="password-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
            {showPassword ? <FaEyeSlash className="password-icon"
              onClick={togglePasswordVisibility} /> : <FaEye className="password-icon"
              onClick={togglePasswordVisibility} />}
              
          </div>
        </div>
        <div className="form-group">
          <button type="submit">Login</button>
        </div>
        <div className="form-group">
          <div className="forgot-password">
            <a href="/">Forgot Password?</a>
            <FaQuestionCircle className="icon" />
          </div>
        </div>
        <div className="form-group">
          <p>
            Don't have an account?{" "}
            <a href="/" className="register-link">
              Register
            </a>
          </p>
        </div>
        <div className="form-group">
          <div className="checkbox">
            <input type="checkbox" id="remember-me" />
            <label htmlFor="remember-me">Remember me</label>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
