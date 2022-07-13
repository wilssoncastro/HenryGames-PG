import React from "react";
import GoogleButton from 'react-google-button'

export default function GoogleBtn({type}) {

    const BACK_URL = "http://localhost:3001"?"http://localhost:3001":"https://henrygames.herokuapp.com"

    const google = () => {
        window.location.href = `${BACK_URL}/auth/google`
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