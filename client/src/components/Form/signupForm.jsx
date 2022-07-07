import React from 'react';
import { Link } from 'react-router-dom';
import './loginForm.css'

// export default function SignupForm() {
//     return (
//         <div className="lf-body-login">


//             <div className='lf-login-component'>

//                 {/* LEFT */}
//                 <div className="lf-left-container">
//                     <h1 className='lf-h1'>Hello, Friend!</h1>
//                     <p className='lf-p'>
//                         Enter your details to create a <strong>Henry Games</strong>{" "}
//                         account!
//                     </p>
//                     <p className='lf-p'>Already have an account?</p>
//                     <Link to='/log_in'><button className='lf-button-redside'>Sign In</button></Link>

//                 </div>

//                 {/* RIGHT */}
//                 <div className="lf-right-container">
//                     <form className='lf-form' onSubmit={onSubmit}>
//                         <h1 className='lf-h1'>Create Account</h1>
//                         {/* <span className='lf-span'>Or use you email for registration</span> */}
//                         <input className='lf-input' type="text" placeholder="Name" required value={input.name} onChange={handleChange} />
//                         <input className='lf-input' type="text" placeholder="Lastname" required value={input.lastname} onChange={handleChange} />
//                         <input className='lf-input' type="text" placeholder="Username" value={input.user} onChange={handleChange} />
//                         <input className='lf-input' type="email" placeholder="Email" required value={input.email} onChange={handleChange} />
//                         <input className='lf-input' type="password" placeholder="Password" required value={input.password} onChange={handleChange} />
//                         <input className='lf-input' type="password" placeholder="Repeat password" required value={input.repassword} onChange={handleChange} />
//                         {/* onChange = {e => handleSelect(e)} */}
//                         <select className='lf-select' name="select" defaultValue='User type' onChange={(e) => handleSelect(e)}>
//                             <option disabled>User type</option>
//                             <option name='type' value='user'>Player</option>
//                             <option name='type' value='adm'>Admin</option>
//                         </select>

//                         <button type="submit" className='lf-button'>Sign Up</button>
//                     </form>
//                 </div>

//             </div>
//         </div>
//     )
// }



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
                <form className='lf-form' onSubmit={onSubmit}>
                    <h1 className='lf-h1'>Create Account</h1>
                    {/* <span className='lf-span'>Or use you email for registration</span> */}
                    <input className='lf-input' type="text" name="name" placeholder="Name" required value={input.name} onChange={handleChange} />
                    <input className='lf-input' type="text" name="lastname" placeholder="Lastname" required value={input.lastname} onChange={handleChange} />
                    <input className='lf-input' type="text" name="user" placeholder="Username" value={input.user} onChange={handleChange} />
                    <input className='lf-input' type="email" name="email" placeholder="Email" required value={input.email} onChange={handleChange} />
                    <input className='lf-input' type="password" name="password" placeholder="Password" required value={input.password} onChange={handleChange} />
                    <input className='lf-input' type="password" name="password" placeholder="Repeat password" required value={input.repassword} onChange={handleChange} />
                    {/* onChange = {e => handleSelect(e)} */}
                    <select className='lf-select' name="select" defaultValue='User type' onChange={(e) => handleSelect(e)}>
                        <option disabled>User type</option>
                        <option name='type' value='user'>Player</option>
                        <option name='type' value='adm'>Admin</option>
                    </select>

                    <button type="submit" className='lf-button'>Sign Up</button>
                    <p>{errors ? errors.password : 'Faltan datos obligatorios'}</p>
                </form>
            </div>

        </div>
    </div>

);