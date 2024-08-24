// Home.jsx
import React from 'react';
import logo from './Images/logo.png';
import './Home.css';
import homebg2 from './Images/homebg2.jpg';
import homeimg1 from './Images/home-img1.png';
import homeimg2 from './Images/home-img2.png';
import footicon1 from './Images/footer-icon1.png';
import footicon2 from './Images/footer-icon2.png';
import footicon3 from './Images/footer-icon3.png';
import footicon4 from './Images/footer-icon4.png';


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
            <p>This is a description text that appears on the right side of the image.
              Lorem Ipsum is simply dummy text of the printing and typesetting industry.
               Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                 It has survived not only five centuries, but also the leap into electronic typesetting.</p>
          </div>
        </div>
        <div className="section-content reverse">
        <div className="image-containerR">
            <img src={homeimg1} alt="Right Img" />
          </div>
          <div className="text-box">
            <h2>Text on the Left</h2>
            <p>This is a description text that appears on the left side of the image.
            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
              Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                It has survived not only five centuries, but also the leap into electronic typesetting
            </p>
          </div>
        </div>
      </section>
      {/* --------------------------------------------------footer--------------------------------------------- */}
      <div className='footer'>
      <div className="footer-container">
            <div className="address">
                <p>Address lane,<br/>
                Building number,<br/>
                Street/road name,<br/>
                City,<br/>
                Country - 641 004.</p>
            </div>
            <div className="social-icons">
                <a href="#"><img src={footicon1} alt="Instagram"/></a>
                <a href="#"><img src={footicon2} alt="Threads"/></a>
                <a href="#"><img src={footicon3} alt="LinkedIn"/></a>
                <a href="#"><img src={footicon4} alt="Email"/></a>
            </div>
            <div className="links">
                <a href="#">&gt; Home</a><br/>
                <a href="#">&gt; Services</a><br/>
                <a href="#">&gt; About</a><br/>
                <a href="#">&gt; FAQs</a><br/>
                <a href="#">&gt; Contact Us</a>
            </div>
        </div>
        <div className="footer-bottom">
            <p>&copy; Prompt-pie - 2024</p>
        </div>
        </div>
  </div>

  );
}

export default Home;
