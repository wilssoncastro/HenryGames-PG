import React from 'react';
import './loginForm.css';

const signUpBtn = document.getElementById('signUp'),
signInBtn = document.getElementById('signIn'),
container = document.getElementById('container')

signUpBtn.addEventListener('click', () => {
container.classList.add('right-panel-active')
}) 

signInBtn.addEventListener('click', () => {
container.classList.remove('right-panel-active')
}) 

export default function Login(){

    return (
        <div className="body">
        <div className="container" id="container">
          <div className="form-container sign-up container">
            <form action="">
              <h1>Create Account</h1>
              <span>Or use you email for registration</span>
              <input type="text" placeholder="Name.." />
              <input type="email" placeholder="Email.." />
              <input type="password" placeholder="Password.." />
              <button>Sign Up</button>
            </form>
          </div>
          <div className="form-container sign-in-container">
            <form action="">
              <h1>Sign In</h1>
              <span>Or use your account</span>
              <input type="text" placeholder="Name.." />
              <input type="email" placeholder="Email.." />
              <input type="password" placeholder="Password.." />
              <button>Sign In</button>
            </form>
          </div>
          <div className="overlay-container">
            <div className="overlay">
              <div className="overlay-panel overlay-left">
                <h1>Welcome Back!</h1>
                <p>
                  Please login to your <strong>Joaco</strong> acount with your
                  personal info
                </p>
                <button className="ghost" id="signIn">
                  Sign In
                </button>
              </div>

              <div className="overlay-panel overlay-right"> 
                <h1>Hello Friend!</h1>
                <p>
                  Enter your personal details to create a <strong>Joaco</strong>{" "}
                  acount
                </p>
                <button className="ghost" id="signUp">
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
}