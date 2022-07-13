import axios from "axios";
import React from "react";
import { useParams } from "react-router-dom";
import NavBar from "../NavBar/navbar";
import './ReSendMail.css';

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
        <div className="containerReSendMail">
            <NavBar />
            <div className="containerTextReSend">
                <h1 className="h1ResendMail">A verification email was sent to your mailbox</h1>
                <p className="pResendMail">Haven't received our email yet? <button className="btnResendMail" onClick={reSend}>Click Here</button></p>
            </div>
        </div>
    )
}