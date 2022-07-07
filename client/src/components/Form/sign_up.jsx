import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import * as GrIcons from 'react-icons/gr';

export default function SignUp() {
  const Swal = require("sweetalert2");

  function validate(input) {
    let errors = {};

    if (input.name.length < 2) {
      errors.name = "The name is invalid";
    } else if(!input.name){
        errors.name = "Please put your name for continue"
    }

    if (input.lastname.length < 2) {
      errors.lastname = "The lastname is invalid";
    } else if(!input.lastname){
        errors.lastname = "Please put your lastname for continue"
    }

    if (!input.user) {
        errors.user = "You need a username"
    } 

    if (!input.email){
        errors.email = "An email is require"
    } else if(!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(input.email))
        errors.email = "The email is invalid";  

    if (
      !input.password ||
      !/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/g.test(input.password)
    ) {
      errors.password =
        "Your password must have numbers and letters";
    }
    if (input.password !== input.repassword) {
      errors.repassword = "The password doesn't match";
    }
    if (!input.type.length) {
      errors.type = "Falta el type";
    }
    return errors;
  }

  const [input, setInput] = useState({
    name: "",
    lastname: "",
    user: "",
    email: "",
    password: "",
    repassword: "",
    type: "user",
  });

  const [errors, setErrors] = useState({});

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });

    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  }

 /*  function handleSelect(e) {
    setInput({
      ...input,
      type: e.target.value,
    });

    setErrors(
      validate({
        ...input,
        type: e.target.value,
      })
    );
  } */

  function onSubmit(e) {
    e.preventDefault();
    let log_error;

    if (Object.keys(errors).length === 0) {
      Swal.fire("Check your email to activate the account!");
      axios.post("http://localhost:3001/authentication/register", input);
    } else { 
      console.log("Entrooooo")
      if (errors.password) {
        log_error = errors.password;
      } else {
        log_error = "Missing data required";
      }
      return log_error;
    }
  }

<<<<<<< HEAD
    return (
        <div >
            <div >
                {/* button navBar */}
                <div>
                    <Link to="/">
                        <div>
                            <div></div>
                        </div>
                    </Link>
                    <div>
                        <a href="/log_in" >
                            Iniciar sesion
                        </a>
                    </div>
                </div>

                {/* Form register */}
            </div>
            <form onSubmit={onSubmit}>
                <div>
                    <input
                        type="text"
                        name="name"
                        placeholder="Escriba su Nombre..."
                        required

                        value={input.name}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <input
                        type="text"
                        name="lastname"
                        value={input.lastname}
                        placeholder="Escriba su apellido..."
                        required
                        onChange={handleChange}
                        
                    />
                </div>
                <div>
                    <input 
                        type='text'
                        name='user'
                        placeholder="Ingrese su usario..."
                        value={input.user}
                        onChange={handleChange}
                    />
                </div>
                <div >
                    <input
                        type="email"
                        name="email"
                        //className={styles.loginInput}
                        placeholder="Escriba un e-mail valido..."
                        required
                        value={input.email}
                        onChange={handleChange}
                        
                    />
                </div>
                <div>
                    <input
                        type="password"

                        name="password"
                        //className={styles.loginInput}
                        placeholder="Contraseña"
                        required
                        value={input.password}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <input
                        type="password"

                        name="repassword"
                        //className={styles.loginInput}
                        placeholder="Ingrese de nuevo su contraseña"
                        required
                        value={input.repassword}
                        onChange={handleChange}
                    />
                </div>
                <br />
                <div>
                    <select
                        name="select"
                        onChange = {e => handleSelect(e)}
                        defaultValue='Tipo de usuario'
                    >
                        <option disabled>Tipo de usuario</option>
                        <option name='type' value='user'>Jugador</option>
                        <option name='type' value='adm'>Administrador</option>
                        

                    </select>
                </div>
                <input
                    type="submit"
                    value="Registrarse"
                    //disabled={disableSubmit}
                    
                />
                <br />
                <br />
                <p>{errors ? errors.password : 'Faltan datos obligatorios'}</p>
                
                <div></div>
            </form>
=======
  return (
    <div className="lf-body-login">
      <div className="lf-login-component"> 

        <div className="lf-left-container">
          <h1 className="lf-h1">Hello, Friend!</h1>
          <p className="lf-p">
            Enter your details to create a <strong>Henry Games</strong> account!
          </p>
          <p className="lf-p">Already have an account?</p>
          <Link to="/log_in">
            <button className="lf-button-leftside">Sign In</button>
          </Link>
          <Link to="/registerAdmin" className="linkAdmin">
            <button className="buttonAdmin"> <GrIcons.GrUserAdmin /> Are you an administrator? Enter here!</button>
          </Link>
        </div>
>>>>>>> dev

     
        <div className="lf-right-container">
          <form className="lf-form" onSubmit={onSubmit}>
            <h1 className="lf-h1">Create Account</h1>
            <input
              className="lf-input"
              type="text"
              name="name"
              placeholder="Name"
              value={input.name}
              onChange={handleChange}
            />
             <p className="errorsLog">{errors ? errors.name : "Missing data required"} </p>

            <input
              className="lf-input"
              type="text"
              name="lastname"
              placeholder="Lastname"
              value={input.lastname}
              onChange={handleChange}
            />
            <p className="errorsLog">{errors ? errors.lastname : "Missing data required"}</p>

            <input
              className="lf-input"
              type="text"
              name="user"
              placeholder="Username"
              value={input.user}
              onChange={handleChange}
            />
            <p className="errorsLog">{errors ? errors.user : "Missing data required"}</p>

            <input
              className="lf-input"
              type="email"
              name="email"
              placeholder="Email"
              value={input.email}
              onChange={handleChange}
            />
            <p className="errorsLog">{errors ? errors.email : "Missing data required"}</p>

            <input
              className="lf-input"
              type="password"
              name="password"
              placeholder="Password"
              value={input.password}
              onChange={handleChange}
            />
           <p className="errorsLog">{errors ? errors.password : "Missing data required"}</p>
           

            <input
              className="lf-input"
              type="password"
              name="repassword"
              placeholder="Confirm password"
              value={input.repassword}
              onChange={handleChange}
              />
              <p className="errorsLog">{errors ? errors.repassword : "Missing data required"}</p>


            <button type="submit" className="lf-button">
              Sign Up
            </button>


          </form>
        </div>
      </div>
    </div>
  );
}
