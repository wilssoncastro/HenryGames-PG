import React from "react";
import { Link } from "react-router-dom";


export default function LandingPage() {
  return (
    <div className="landingPage">
      <h1 className="landingH1">Welcome to HenryGames</h1>
      <Link to="/home">
        <button className="boton">Press to start</button>
      </Link>
    </div>
  );
}