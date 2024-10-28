import React from "react";
import "./contact.css";

const SocialIcons = () => {
  return (
    <ul className="social-icons-list">
      <li className="social-icon-item">
        <a href="#" className="social-icon-link">
          <i className="fab fa-facebook social-icon facebook-icon" aria-hidden="true"></i>
        </a>
      </li>
      <li className="social-icon-item">
        <a href="#" className="social-icon-link">
          <i className="fab fa-twitter social-icon twitter-icon" aria-hidden="true"></i>
        </a>
      </li>
      <li className="social-icon-item">
        <a href="#" className="social-icon-link">
          <i className="fab fa-google-plus-g social-icon google-icon" aria-hidden="true"></i>
        </a>
      </li>
      <li className="social-icon-item">
        <a href="#" className="social-icon-link">
          <i className="fab fa-linkedin social-icon linkedin-icon" aria-hidden="true"></i>
        </a>
      </li>
      <li className="social-icon-item">
        <a href="#" className="social-icon-link">
          <i className="fab fa-instagram social-icon instagram-icon" aria-hidden="true"></i>
        </a>
      </li>
    </ul>
  );
};

export default SocialIcons;
