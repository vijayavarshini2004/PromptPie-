// Home.jsx
import React from 'react';
import logo from '../Images/logo.png';
import './Home.css';
import homebg2 from '../Images/homebg2.jpg';
import homeimg1 from '../Images/home-img1.png';
import homeimg2 from '../Images/home-img2.png';
import footicon1 from '../Images/footer-icon1.png';
import footicon2 from '../Images/footer-icon2.png';
import footicon3 from '../Images/footer-icon3.png';
import footicon4 from '../Images/footer-icon4.png';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';



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
        <Link to="/Signup">Sign Up</Link>
        <Link to="/Signup">Sign In</Link>
        </div>
      </nav>
      <div className="content">
        <div className='center'>Data to</div>
        <div className='center'id='pink'> Insights </div>
        <div>In minutes</div>
        <p>Explore your Data <br/> Build Your Dashboard</p>
        <Link to="/Signup"><button className='get-started'>Get Started</button></Link>
      </div>
    </div>
    <section className="image-section" style={{ backgroundImage: `url(${homebg2})`
}}>
        <div className="section-content">
          <div className="image-container">
            <img src={homeimg2} alt="Left Img" />
          </div>
          <div className="text-box">
            <h2>About PromptPie : Revolutionizing Data Analysis</h2>
            <p>PromptPie is an innovative AI-powered platform tailored for data analysts looking to streamline their data analysis tasks. 
              By allowing users to upload datasets and pose specific questions in natural language, PromptPie transforms the way analysts interact with their data.
               Users can easily generate detailed insights and visualizations, including graphs and charts, with just a few simple prompts.
                This functionality not only enhances the efficiency of data analysis but also democratizes access to complex analytical processes, making them approachable for users of all skill levels.</p>
          </div>
        </div>
        <div className="section-content reverse">
        <div className="image-containerR">
            <img src={homeimg1} alt="Right Img" />
          </div>
          <div className="text-box">
            <h2>Discover PromptPie : Your AI-Powered Data Analytics Partner</h2>
            <p>At PromptPie, our mission is to empower analysts to focus on what truly matters: deriving actionable insights from their data.
               The platform's user-friendly interface, combined with robust AI capabilities, enables quick responses to inquiries and dynamic visual representations of data trends.
                Whether you’re exploring business metrics or conducting academic research, PromptPie provides the tools necessary to uncover hidden patterns and make data-driven decisions with confidence. Join us in revolutionizing the data analysis experience, where clarity and accessibility meet innovation.
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
            <ul className="links">
                <a href="#"><li>&gt; Home</li></a><br/>
                <a href="#"><li>&gt; Services</li></a><br/>
                <a href="#"><li>&gt; About</li></a><br/>
                <a href="#"><li>&gt; FAQs</li></a><br/>
                <a href="#"><li>&gt; Contact Us</li></a>
            </ul>
        </div>
        <div className="footer-bottom">
            <p>&copy; Prompt-pie - 2024</p>
        </div>
        </div>
  </div>

  );
}

export default Home;
