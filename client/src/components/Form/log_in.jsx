import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
// import LogOut from '../LogOut/LogOut';
import { addManyToCart } from "../../redux/actions";
import { useDispatch } from "react-redux";
import "./loginForm.css";
import GoogleBtn from '../Google/GoogleButton.jsx'

export default function LogIn() {
  let navigate = useNavigate();
  const dispatch = useDispatch();

  const [input, setInput] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState("");

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  }

  async function onSubmit(e) {
    e.preventDefault();

    if (input.username && input.password) {
      let is_authorized = await axios.get("http://localhost:3001/is_online");

      if (is_authorized.data) {
        setError("You are already register");
      } else {
        const login = await axios({
          method: "post",
          url: "http://localhost:3001/authentication/login",
          data: input,
          headers: { "X-Requested-With": "XMLHttpRequest" },
          withCredentials: true,
        })
        .then((res) => {
          return res;
        })
        .catch((error) => console.log(error));

        let {log_in, id, name, lastname, type, profile_pic, user} = login.data
              
        if(log_in){
          let carrito = localStorage.getItem('cart')
          localStorage.setItem("id", id)
          localStorage.setItem('name', name)
          localStorage.setItem('lastname', lastname)
          localStorage.setItem('type', type)
          localStorage.setItem('profile_pic', profile_pic)
          localStorage.setItem('user', user)
          carrito = JSON.parse(carrito)

          if(typeof carrito !== 'object'){   
          }else{
            dispatch(addManyToCart(id, {'games':carrito}))
          }
          localStorage.setItem("cart", JSON.stringify([]));
          navigate("/home");
        }
        if (typeof login.data === "string") {
          setError(login.data);
        }
      }
    } else {
      setError("Missing data");
    }
  }
  
  return (
    <div className="lf-body-login">
      <div className="lf-login-component">
        {/* LEFT */}
        <div className="lf-left-container">
          <h1 className="lf-h1">Welcome!</h1>
          <br />
          <p className="lf-p">Log in to your Henry Games account</p>
          <br />
          <p className="lf-p">Don't have an account yet?</p>
          <Link to="/sign_up">
            <button className="lf-button-leftside">Sign Up</button>
          </Link>
          <br />
          <Link to="/home">
            <button className="lf-button-guest">Or enter as a guest</button>
          </Link>
          
        </div>

        {/* RIGHT */}
        <div className="lf-right-container">
          <form className="lf-form" onSubmit={onSubmit}>
            <h1 className="lf-h1">Sign In</h1>
            <br />
            <input
              className="lf-input"
              type="text"
              name="username"
              value={input.username}
              onChange={handleChange}
              placeholder="Username"
            />
            <input
              className="lf-input"
              type="password"
              name="password"
              value={input.password}
              onChange={handleChange}
              placeholder="Password"
            />
            <button className="lf-button" type="submit">
              Log In
            </button>
            <Link to='/recoverPass'>
              <button className="lf-button-recovery">I forgot my password</button>
            </Link>
            <div className="GoogleButton">
              <GoogleBtn type='light'/>
            </div>
            {error ? <p className="errorsLog">{error}</p> : <></>}
          </form>
        </div>
      </div>
    </div>
  );
}

