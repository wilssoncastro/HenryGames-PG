import React from "react";
import GoogleButton from 'react-google-button'

export default function GoogleBtn({type}) {

    const google = () => {
        window.location.href = 'http://localhost:3001/auth/google'
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