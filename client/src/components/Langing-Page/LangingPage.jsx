import React from "react";
import { Link } from "react-router-dom";
import "./landing.css";
import GoogleButton from 'react-google-button'

export default function LandingPage() {
  // falta ternario para saber si ya estas registrado o no. y dependiendo de ahi va a mostrar el registrarse
  // o el login.

  const google = () => {
    window.location.href = 'http://localhost:3001/auth/google'
  }

  return (
    <div className="landing">
      <div className="landing_content">
        <h1 className="landingH1">WELCOME TO HENRYGAMES</h1>
        <p className="textLanding">The best games from PC</p>
        <Link to="/home">
          <button className="btn_gold">VIEW STORE</button>
        </Link>
        <div>
          <Link to="/log_in">
            <button className="btn_log_in">LOG IN</button>
          </Link>
          <Link to="/sign_up">
            <button class="btn_sign_up">SIGN UP</button>
          </Link>
        </div>
        <div>
          <GoogleButton
            type="dark"
            label='Log in with Google'
            onClick={() => {google()}}
          />
        </div>
      </div>
    </div>
  );
}