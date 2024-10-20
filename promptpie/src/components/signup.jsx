import React, { useState } from 'react';
import './signup.css';
import logo from "../Images/logo.png";
import googleicon from "../Images/googleicon.png";
import signup from "../Images/login2.png";
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // To redirect on successful signup

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Backend API URL (Change this to your backend signup API)
    const url = 'http://127.0.0.1:8000/api/signup/';

    // Send the form data to the backend
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          email: email,
          password: password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Redirect to the dashboard after successful signup
        navigate('/dashboard');
      } else {
        // Handle errors
        setError(data.message || 'Something went wrong');
      }
    } catch (err) {
      setError('Error signing up. Please try again.');
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-content">
        <div className="sign-image-container">
          <img src={signup} className="sign-up-man" alt="Sign up" />
        </div>

        <div className="form-container">
          <center><img src={logo} className="robo-icon" alt="Logo" /></center>

          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="first-name" className="input-label">Username</label>
              <input 
                type="text" 
                id="first-name" 
                className="input-field" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            <div className="input-group">
              <label htmlFor="email" className="input-label">Email Address</label>
              <input 
                type="email" 
                id="email" 
                className="input-field" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="input-group">
              <label htmlFor="password" className="input-label">Password</label>
              <input 
                type="password" 
                id="password" 
                className="input-field"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {error && <p className="error">{error}</p>}

            <button className="sign-up-btn" type="submit">Sign Up</button>
          </form>

          <div className="login-option">
            <span>Already Have an Account?</span>
            <Link to="/login" className="login-btn">Login</Link>
          </div>

          <div className="separator"></div>

          <div className="g-b">
            <button className="google-signin-btn">
              <img src={googleicon} className="google-logo" alt="Google sign in" />
              Sign in with Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
