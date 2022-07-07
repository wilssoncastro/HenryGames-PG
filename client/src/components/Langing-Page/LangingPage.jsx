import React from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import "./landing.css";

export default function LandingPage() {
  // falta ternario para saber si ya estas registrado o no. y dependiendo de ahi va a mostrar el registrarse
  // o el login.

  useEffect(() => {
    const getUser = () =>{
      fetch('http://localhost:3001/auth/google/protected', {
        method: 'GET',
        credentials: 'include',
        header: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Credentials': true,
        },
      }).then((res) => {
        if (res.status===200) return res.json(); 
        else throw new Error('authentication has been failed')
      }).then((resObj) => {
        console.log(resObj.user) //hay que hacer el localStorage aqui
      }).catch((error)=> {
        console.log(error)
      })
    }
    getUser()
  }, [])

  const google = () => {
    window.open('http://localhost:3001/auth/google')
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
          <button onClick={() => google()}>Log in with Google</button>
        </div>
      </div>
    </div>
  );
}