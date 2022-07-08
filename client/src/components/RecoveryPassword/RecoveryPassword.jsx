import React, { useState } from "react";
import axios from "axios";

export default function RecoveryPassword(){

    function validate(input) {
        let error = '';
    
        if (!input.mail){
            error = "An email is require"
        } else if(!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(input.mail)){
            error = "The email is invalid";
        }else{
            error=''
        }  
    
        
        return error;
      }

    const [input, setInput] = useState({
        mail: ""
      });

    const [error, setError] = useState('')

    function handleChange(e){
        setInput({
            ...input,
            [e.target.name]: e.target.value,
        });

        setError(
            validate({
              ...input,
              [e.target.name]: e.target.value,
            })
          );
    }

    function onSubmit(e){
        e.preventDefault()
        if(error.length || !input.mail){
            console.log('No se pudo enviar')
        }else{
            console.log('envio')
            axios.post(`http://localhost:3001/authentication/recovery_password`, input)
            .then(data => {
                console.log(data)
            })
            .catch(err => console.log(err))
            setInput({
                mail: ""
            })
        }
    }

    return (
        <div>
            <form onSubmit={onSubmit}>
                <label>
                    Ingrese su correo electronico:
                </label>
                <input
                    name='mail'
                    value={input.mail}
                    onChange={handleChange}
                    placeholder="ejemplo@gmail.com"
                />

                <input type='submit' />
            </form>
        </div>
    )
}