import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
const Swal = require("sweetalert2");

export default function ChangePassword(){
    const navigate = useNavigate()

    function validate(input) {
        let errors = {};
    
        if(!input.token){
            errors.token = 'You dont write a tokken'
        }
        
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
        
        return errors;
      }

    const {id_user} = useParams()

    const [input, setInput] = useState({
        token: '',
        password: "",
        repassword: ""
    })

    const [errors, setErrors] = useState({})
    const [msg, setMsg] = useState('')

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
    
    async function onSubmit(e){
        e.preventDefault()
        if (Object.keys(errors).length === 0 && input.token){
            const info = await axios.post(`http://localhost:3001/authentication//changePassword/${id_user}`,input)

            if(info.data === 'Su contraseña fue modificada'){
                setMsg('')
                Swal.fire(info.data)
                setTimeout(() =>{
                    navigate('/log_in')
                },2000)
            }else{
                setMsg(info.data)
            }
        }else{
            setMsg(errors.token || errors.password || errors.repassword)
        }
    }



    return (
        <div>
            <h1>Has recibido un codigo via Mail:</h1>
            <form onSubmit={onSubmit}>
                <label>Ingrese el codigo:</label>
                <input
                    type="text"
                    name="token"
                    placeholder="Insert the token..."
                    value={input.token}
                    onChange={handleChange}
                />

                <label>Ingrese la nueva contraseña: </label>
                <input
                    type="password"
                    name="password"
                    placeholder="Password..."
                    value={input.password}
                    onChange={handleChange}
                />

                <label>Reingrese la nueva contraseña</label>
                <input
                    type="password"
                    name="repassword"
                    placeholder="Password..."
                    value={input.repassword}
                    onChange={handleChange}
                />

                <input type='submit' />
                {msg && msg}
            </form>
        </div>
    )
}