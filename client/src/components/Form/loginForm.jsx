import React from 'react';
import { Link } from 'react-router-dom';
import './loginForm.css'

// const signUpBtn = document.getElementById('signUp'),
// signInBtn = document.getElementById('signIn'),
// container = document.getElementById('container')

// signUpBtn.addEventListener('click', () => {
//   container.classList.add('right-panel-active')
// }) 

// signInBtn.addEventListener('click', () => {
//   container.classList.remove('right-panel-active')
// }) 

// export default function LoginForm(){
//   return (
    // <div className="lf-body-login">


    //   <div className='lf-login-component'>

    //     {/* LEFT */}
    //     <div className="lf-left-container">
    //       <h1 className='lf-h1'>Welcome Back!</h1>
    //       <br/>
    //       <p className='lf-p'>
    //         Please login to your <strong>Henry Games</strong> account with your
    //         personal info
    //       </p>
    //       <p className='lf-p'>Don't have an account yet? <Link to='/sign_up'><button className='lf-button-redside'>Sign Up</button></Link></p>
    //     </div>

    //     {/* RIGHT */}
    //     <div className="lf-right-container">
    //       <form className='lf-form' onSubmit={onSubmit}>
    //         <h1 className='lf-h1'>Sign In</h1>
    //         <br/>
    //         {/* <span className='lf-span'>Or use your account</span> */}
    //         <input className='lf-input' type="text" name='username' value={input.username} onChange={handleChange} placeholder="Username" />
    //         <input className='lf-input' type='password' name='password' value={input.password} onChange={handleChange} placeholder="Password" />            
    //         <br/>
    //         <button className='lf-button' type="submit">Log In</button>
    //       </form>
    //     </div>

    //   </div>


    // </div>
//   )
// }