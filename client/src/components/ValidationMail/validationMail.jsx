import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import './validationMail.css'
import NavBar from '../NavBar/navbar.jsx'


export default function ValidationMail(){
    const { user_id, token } = useParams();
    let navigate = useNavigate();

    useEffect(() => {
        axios
            .get(`http://localhost:3001/authentication/activation/${user_id}/${token}`)
            .then((response) => {
             return response.data
            })
            .catch((error) => {
              return error
            });
        
        setTimeout(() => {
            navigate('/log_in')
        }, 1000)
      }, [user_id, token]);
      
    return (
        <div className="backgroundLogInValidate">

          <NavBar />

          <div className="ContainerAll">
            <p>You activated your account successfully!</p>
            <div >
              <a href="/login" style={{ textDecoration: "none" }}>
                Log In
              </a>
            </div>
          </div>   
        </div>
    )
}