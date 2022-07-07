import React from 'react';
import { Link } from 'react-router-dom';
import './loginForm.css'

export default function SignupForm() {
    return (
        <div className="lf-body-login">


            <div className='lf-login-component'>

                {/* LEFT */}
                <div className="lf-left-container">
                    <h1 className='lf-h1'>Hello, Friend!</h1>
                    <p className='lf-p'>
                        Enter your details to create a <strong>Henry Games</strong>{" "}
                        account!
                    </p>
                    <p className='lf-p'>Already have an account?</p>
                    <Link to='/log_in'><button className='lf-button-redside'>Sign In</button></Link>

                </div>

                {/* RIGHT */}
                <div className="lf-right-container">
                    <form className='lf-form' action="">
                        <h1 className='lf-h1'>Create Account</h1>
                        {/* <span className='lf-span'>Or use you email for registration</span> */}
                        <input className='lf-input' type="text" placeholder="Name" />
                        <input className='lf-input' type="text" placeholder="Lastname" />
                        <input className='lf-input' type="text" placeholder="Username" />
                        <input className='lf-input' type="email" placeholder="Email" />
                        <input className='lf-input' type="password" placeholder="Password" />
                        <input className='lf-input' type="password" placeholder="Repeat password" />
                        {/* onChange = {e => handleSelect(e)} */}
                        <select className='lf-select' name="select" defaultValue='User type'>
                            <option disabled>Tipo de usuario</option>
                            <option name='type' value='user'>Player</option>
                            <option name='type' value='adm'>Administrator</option>
                        </select>

                        <button className='lf-button'>Sign Up</button>
                    </form>
                </div>

            </div>
        </div>
    )
}
