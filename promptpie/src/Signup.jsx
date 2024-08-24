import React from 'react'
import './Signup.css';
import logo from "../../promptpie/src/Images/logo1.png"
import googleicon from"./Images/googleicon.png"
import signup from"./Images/signup.png"



const Signup =()=>
  {
    return(
      <html>
      <head>
        <meta charset="UTF-8"></meta>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
        <link rel="stylesheet" href="styles.css"></link>
        <title>Signup Page</title>
      </head>
      
      <body>
        <div class="container">
          <div class="header">Signup</div>
          <div class="content">
            <div class="image-container">
              <img src={signup} ></img>
            </div>
      
            <div class="form-container">
              <img src={logo} className='robo-icon'></img>
           
              <div class="title">PROMPTPIE</div>
      
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
      
              <button class="google-signin-btn">
              <img src={googleicon} class="google-logo"></img>
                Sign in with Google
                
              </button>
            </div>
          </div>
          <div class="footer">promptpie</div>
        </div>
      </body>
      
      </html>
      
    )
}
export default Signup