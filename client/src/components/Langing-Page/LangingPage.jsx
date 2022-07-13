import React,{ useEffect, /* useState */ } from "react";
import { /* useSelector */ useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import "./landing.css";
import { getAllVideogames } from "../../redux/actions";

export default function LandingPage() {
  // falta ternario para saber si ya estas registrado o no. y dependiendo de ahi va a mostrar el registrarse
  // o el login.
  const dispatch = useDispatch()
  const id_user = localStorage.getItem("id");

  useEffect(() => {
    dispatch(getAllVideogames())
  }, [dispatch])

  return (
    <div className="landing">
      <div className="landing_content">
        <h1 className="landingH1">WELCOME TO HENRYGAMES</h1>
        <p className="textLanding">Where your favorite PC games meet one place</p>
        {typeof id_user === 'string' ?
            <Link to="/home">
              <button className="button-landingPage">VIEW STORE</button>
            </Link>
          :
          <Link to="/log_in">
            <button className="button-landingPage">Get Started</button>
          </Link>
      }
      </div>
    </div>
  );
}