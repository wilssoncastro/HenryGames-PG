import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function ValidationGame(){
    const { secretCode, id_user, longitude } = useParams();
    let navigate = useNavigate();

    useEffect(() => {
        axios
            .get(`http://localhost:3001/authentication/activation/games/${secretCode}/${id_user}/${longitude}`)
            .then((response) => {
                return response.data
            })
            .catch((error) => {
                return error
            });

            setTimeout(() => {
                navigate('/library')
            }, 3000)
        
    }, [secretCode, id_user, longitude])

    
    return (
        <div>
            <h1>Juegos validados</h1>
            <p>Espere a ser redirigido a la libreria</p>
        </div>
    )
}