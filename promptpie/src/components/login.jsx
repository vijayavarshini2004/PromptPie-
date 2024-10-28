import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './signup.css';
import logo from "../Images/logo.png";
import googleicon from "../Images/googleicon.png";
import signup from "../Images/login2.png";
import { Link} from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState(''); // Change email to username
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://127.0.0.1:8000/api/token/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }) // Send username instead of email
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('access_token', data.access); // Store the JWT token
        localStorage.setItem('refresh_token', data.refresh);
        console.log('Access Token:', data.access);
        navigate('/dashboard'); // Redirect after login
      } else {
        const errorData = await response.json();
        console.error('Error logging in:', errorData); // Log the error response
      }
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  return (
    // <div className="login-container">
    //   <form onSubmit={handleLogin}>
    //     <div className="input-group">
    //       <label>Username</label>
    //       <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} /> {/* Use username input */}
    //     </div>

    //     <div className="input-group">
    //       <label>Password</label>
    //       <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
    //     </div>

    //     <button type="submit">Login</button>
    //   </form>
    // </div>

    <div className="signup-container">
    <div className="signup-content">
      <div className="sign-image-container">
        <img src={signup} className="sign-up-man" alt="Sign up" />
      </div>

      <div className="form-container">
        <center><img src={logo} className="robo-icon" alt="Logo" /></center>

        <form onSubmit={handleLogin}>
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

          <button className="sign-up-btn" type="submit">Login</button>
        </form>

        <div className="login-option">
          <span>Do not have an account?</span>
          <Link to="/signup" className="login-btn">Sign up</Link>
        </div>

        <div className="separator"></div>

      </div>
    </div>
  </div>
  );
};

export default Login;
