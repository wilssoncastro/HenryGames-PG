import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";


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
        <div >
      <div >
        <div >
          <div >
            <div >
              {/* <img src={check} alt="" /> */}
            </div>
            <div >
              <p>Mail validado correctamente!</p>
              
              <div >
                <a href="/login" style={{ textDecoration: "none" }}>
                  Iniciar sesión
                </a>
              </div>
            </div>
          </div>
        </div>
        
      </div>
     
    </div>
    )
}