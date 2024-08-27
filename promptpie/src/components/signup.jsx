import React from 'react'
import './signup.css';
import logo from "../Images/logo.png"
import googleicon from"../Images/googleicon.png"
import signup from"../Images/login2.png"

const Signup =()=>
  {
    return(
        <div class="signup-container">
          <div class="signup-content">
            <div class="sign-image-container">
              <img src={signup} class="sign-up-man"></img>
            </div>
     
            <div class="form-container">
              <center><img src={logo} className='robo-icon'></img></center>
           
     
              <div class="input-group">
                <label for="first-name" class="input-label">First name</label>
                <input type="text" id="first-name" class="input-field" autocomplete="given-name"></input>
              </div>
     
              <div class="input-group">
                <label for="email" class="input-label">Email Address</label>
                <input type="email" id="email" class="input-field" autocomplete="email"></input>
              </div>
     
              <div class="input-group">
                <label for="password" class="input-label">Password</label>
                <input type="password" id="password" class="input-field"></input>
              </div>
     
              <button class="sign-up-btn">Sign Up</button>
     
              <div class="login-option">
                <span>Already Have an Account?</span>
                <button class="login-btn">Login</button>
              </div>
     
              <div class="separator"></div>
     
              <div className='g-b'><button class="google-signin-btn">
              <img src={googleicon} class="google-logo"></img>
                Sign in with Google
               
              </button>
            </div></div>
          </div>
       
        </div>
     
    )
}
export default Signup