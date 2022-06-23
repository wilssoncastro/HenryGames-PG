import React from "react";
import { useState } from 'react'
import { Link } from "react-router-dom";

export default function SignUp() {


    const [input, setInput] = useState({
      name: '',
      lastname: '',
      user:'',
      email: '',
      password: '',
      type:''
  })

    const [errors, setErrors] = useState("");

    function handleChange(e){
      setInput({
        ...input,
        [e.target.name]:e.target.value
      })
      
      

      // setErrors(validate({
      //     ...input,
      //     [e.target.name]:e.target.value
      // }))
  }

  function handleSelect(e){
    setInput({
      ...input,
      type:e.target.value
    })
  }

  function onSubmit(e) {
      e.preventDefault();

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
                        <a href="/login" >
                            Iniciar sesion
                        </a>
                    </div>
                </div>

                {/* Form register */}
            </div>
            <form>
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
                    >
                        <option value="Tipo de cliente" disabled>Tipo de usuario</option>
                        <option name='type' value='user'>Jugador</option>
                        <option name='type' value='dev'>Desarrollador</option>
                        

                    </select>
                </div>
                <input
                    type="submit"
                    value="Registrarse"
                    // disabled={disableSubmit}
                    onClick={(e) => onSubmit(e)}
                />
                <br />
                <br />

                <p>{errors ? errors : null}</p>
                <div></div>
            </form>

        </div>
    );
}

        
        
        
        
        