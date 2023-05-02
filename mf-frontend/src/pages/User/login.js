import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram, FaGoogle } from "react-icons/fa";
import "./login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  return (
    <div className="login-page">
      <div className="login-form">
        <h2>Login</h2>
        <div className="form-group-text">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="form-group-text">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Enter your password"
            required
          />
        </div>
        <div className="form-group-text">
          <div className="remember-me">
            <input
              type="checkbox"
              id="remember-me"
              name="remember-me"
              checked={rememberMe}
              onChange={(event) => setRememberMe(event.target.checked)}
            />
            <label htmlFor="remember-me">Remember me</label>
          </div>
          <Link to="/forgot-password" id="forgot-password-link">
            Forgot password?
          </Link>
        </div>
        <div className="form-group-text">
          <button type="submit">Login</button>
        </div>

        <div>
          <p className="social-connections-text">Or Sign in with: </p>
          <div className="social-connections">
            <div className="social">
              <FaGoogle />
              <span>&nbsp;Google</span>
            </div>
            <div className="social">
              <FaFacebook />
              <span>&nbsp;Facebook</span>
            </div>
            <div className="social">
              <FaTwitter />
              <span>&nbsp;Twitter</span>
            </div>
            <div className="social">
              <FaInstagram />
              <span>&nbsp;Instagram</span>
            </div>
          </div>
        </div>
        <p className="line-bottom"></p>
        <div className="link-to-register">
          Don't have an account? <Link to="/register">Register here</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
