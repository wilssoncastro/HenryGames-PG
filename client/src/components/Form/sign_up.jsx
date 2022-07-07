import React from "react";
import { useState } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';


export default function SignUp() {
    const Swal = require('sweetalert2');

    function validate(input) {
        let errors = {};

        if (input.name.length < 2) {
            errors.name = 'Ingresaste un nombre invalido!';
        }

        if (input.lastname.length < 2) {
            errors.lastname = 'Ingresaste un apellido invalido!';
        }

        if (input.user.length < 3) {
            errors.user = 'Debes ingresar un user mas largo!';
        }

        if (!(input.email) || !(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(input.email))) {
            errors.email = 'E-Mail invalido!';
        }

        if (!(input.password) || !(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/g.test(input.password))) {
            errors.password = 'Debes ingresar una password con letras y minimo un numero';
        }

        if ((input.password) !== (input.repassword)) {
            errors.repassword = 'No confirmaste tu contraseña';
        }

        if (!input.type.length) {
            errors.type = 'Falta el type';
        }


        return errors;
    }

    const [input, setInput] = useState({
        name: '',
        lastname: '',
        user: '',
        email: '',
        password: '',
        repassword: '',
        type: ''
    });

    const [errors, setErrors] = useState({});

    function handleChange(e) {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        });

        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }));
    }

    function handleSelect(e) {
        setInput({
            ...input,
            type: e.target.value
        });

        setErrors(validate({
            ...input,
            type: e.target.value
        }));
    }

    function onSubmit(e) {
        e.preventDefault();
        let log_error;

        if ((Object.keys(errors).length === 0)) {
            Swal.fire("Verifique su correo para activar la cuenta!");
            axios.post('http://localhost:3001/authentication/register', input);
        } else {
            if (errors.password) {
                log_error = errors.password;
            } else {
                log_error = 'Faltan datos obligatorios';
            }

            return log_error;
        }

    }

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
                    <Link to='/log_in'><button className='lf-button-leftside'>Sign In</button></Link>

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
                    <input className='lf-input' type="password" name="repassword" placeholder="Repeat password" required value={input.repassword} onChange={handleChange} />
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
}

        
        
        
        
        