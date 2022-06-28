import React from "react";
import { useState } from 'react'
import { Link } from "react-router-dom";
import axios from 'axios'


export default function SignUp() {
    const Swal = require('sweetalert2')

    function validate(input){
        let errors = {}

        if(input.name.length < 2){
            errors.name = 'Ingresaste un nombre invalido!'
        }

        if(input.lastname.length < 2){
            errors.lastname = 'Ingresaste un apellido invalido!'
        }

        if(input.user.length < 3){
            errors.user = 'Debes ingresar un user mas largo!'
        }

        if(!(input.email) || !(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(input.email))){
            errors.email = 'E-Mail invalido!'
        }

        if(!(input.password) || !(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/g.test(input.password))){
            errors.password = 'Debes ingresar una password con letras y minimo un numero'
        }

        if(!input.type.length){
            errors.type = 'Falta el type'
        }


        return errors
    }

    const [input, setInput] = useState({
      name: '',
      lastname: '',
      user:'',
      email: '',
      password: '',
      type:''
  })

    const [errors, setErrors] = useState({});

    function handleChange(e){
      setInput({
        ...input,
        [e.target.name]:e.target.value
      })
      
      

      setErrors(validate({
          ...input,
          [e.target.name]:e.target.value
      }))
  }

  function handleSelect(e){
    setInput({
      ...input,
      type:e.target.value
    })

    setErrors(validate({
        ...input,
        type:e.target.value
    }))
  }

    function onSubmit(e) {
        e.preventDefault();
        let log_error

        if((Object.keys(errors).length === 0)){
            Swal.fire("Verifique su correo para activar la cuenta!")
            axios.post('http://localhost:3001/authentication/register', input)
        }else{
            if(errors.password){
                log_error = errors.password
            }else{
                log_error = 'Faltan datos obligatorios'
            }

            return log_error
        }
        
    }

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
                <br />
                <div>
                    <select
                        name="select"
                        onChange = {e => handleSelect(e)}
                        defaultValue='Tipo de usuario'
                    >
                        <option disabled>Tipo de usuario</option>
                        <option name='type' value='user'>Jugador</option>
                        <option name='type' value='dev'>Desarrollador</option>
                        

                    </select>
                </div>
                <input
                    type="submit"
                    value="Registrarse"
                    // disabled={disableSubmit}
                    
                />
                <br />
                <br />
                <p>{errors ? errors.password : 'Faltan datos obligatorios'}</p>
                
                <div></div>
            </form>

        </div>
    );
}

        
        
        
        
        