import React from "react";
import { Link } from "react-router-dom";
import "./landing.css";

export default function LandingPage() {
  // falta ternario para saber si ya estas registrado o no. y dependiendo de ahi va a mostrar el registrarse
  // o el login.
  return (
      <div className="landing">
        <h1 className="landingH1">Welcome to HenryGames</h1>
        <Link to="/home">
          <button className="botonLanging">Press to start</button>
        </Link>
      </div>
  );
}
