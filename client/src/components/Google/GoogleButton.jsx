import React from "react";
import GoogleButton from 'react-google-button'
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();
//const { BACK_URL } = process.env

export default function GoogleBtn({type}) {

    const hk_URL = "https://henrygames.herokuapp.com"
    //const BACK_URL = hk_URL?hk_URL:"http://localhost:3001"
    //const BACK_URL = "http://localhost:3001" || hk_URL
    const BACK_URL = process.env.REACT_APP_API || "http://localhost:3001";
    const google = () => {
        window.location.href = `${BACK_URL}/auth/google`
        //window.location.href = `/auth/google`
        //window.location.href = `http://localhost:3001/auth/google`
    }
    
    return (
        <fragment>
            <GoogleButton
                type={type}
                label='Log in with Google'
                onClick={() => {google()}}
            />
        </fragment>
    )
}