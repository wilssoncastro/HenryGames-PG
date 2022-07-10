import axios from "axios";
import React from "react";
import { useParams } from "react-router-dom";

export default function ReSendMail(){
    let { mail } = useParams()
    const Swal = require("sweetalert2");
    
    function reSend(){
        axios.get(`http://localhost:3001/authentication/email/reSend/${mail}`)
        .then(data => {
            console.log(data)
        })
        .catch(err =>{
            console.log(err)
        })
        console.log('hola')
    }

    return (
        <div>
            <h1>A verification email was sent to your mailbox</h1>

            <p>If you did not receive the email, <button onClick={reSend}>click here</button></p>
        </div>
    )
}