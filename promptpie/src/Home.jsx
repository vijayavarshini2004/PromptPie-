// Home.jsx
import React from 'react';
import logo from './Images/logo.png';
import './Home.css';
import homebg2 from './Images/homebg2.jpg'
import homeimg1 from './Images/home-img1.png'
import homeimg2 from './Images/home-img2.png'

const Home = () => {
  return (
    <div>
    <div className='background-image'>
      <nav className="navbar">
        <div className="logo">
          <img src={logo} alt="logo" />
        </div>
        <ul className="nav-links">
          <li><a href="#home">Home</a></li>
          <li><a href="#services">Services</a></li>
          <li><a href="#about">About</a></li>
        </ul>
        <div className="auth-links">
          <a href="#signup">Sign Up</a>
          <a href="#signin">Sign In</a>
        </div>
      </nav>
      <div className="content">
        <div className='center'>Data to</div>
        <div className='center'id='pink'> Insights </div>
        <div>In minutes</div>
        <p>Explore your Data <br/> Build Your Dashboard</p>
        <button>Get Started</button>
      </div>
    </div>
    <section className="image-section" style={{ backgroundImage: `url(${homebg2})`
}}>
        <div className="section-content">
          <div className="image-container">
            <img src={homeimg2} alt="Left Img" />
          </div>
          <div className="text-box">
            <h2>Text on the Right</h2>
            <p>This is a description text that appears on the right side of the image.</p>
          </div>
        </div>
        <div className="section-content reverse">
        <div className="image-container">
            <img src={homeimg1} alt="Right Img" />
          </div>
          <div className="text-box">
            <h2>Text on the Left</h2>
            <p>This is a description text that appears on the left side of the image.</p>
          </div>
        </div>
      </section>
  </div>

  );
}

export default Home;
