import React from "react";
import { Link } from "react-router-dom";
import "./landing.css";
import GoogleLogin from 'react-google-login';

export default function LandingPage() {
  // falta ternario para saber si ya estas registrado o no. y dependiendo de ahi va a mostrar el registrarse
  // o el login.

  
const responseGoogle = (response) => {
  console.log(response);
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
          <a href="http://localhost:3001/login/federated/google">Log in with Google</a>
        </div>
      </div>
    </div>
  );
}
