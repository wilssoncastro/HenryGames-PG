import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./ChangePassword.css"
import NavBar from "../NavBar/navbar";
const Swal = require("sweetalert2");

export default function ChangePassword() {
  const navigate = useNavigate();

  function validate(input) {
    let errors = {};

    if (!input.token) {
      errors.token = "Invalid token";
    }

    if (
      !input.password ||
      !/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/g.test(input.password)
    ) {
      errors.password = "Your password must have numbers and letters";
    }
    if (input.password !== input.repassword) {
      errors.repassword = "The password doesn't match";
    }

    return errors;
  }

  const { id_user } = useParams();

  const [input, setInput] = useState({
    token: "",
    password: "",
    repassword: "",
  });

  const [errors, setErrors] = useState({});
  const [msg, setMsg] = useState("");

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });

    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  }

  async function onSubmit(e) {
    e.preventDefault();
    if (Object.keys(errors).length === 0 && input.token) {
      const info = await axios.post(
        `http://localhost:3001/authentication//changePassword/${id_user}`,
        input
      );

      if (info.data === "Your password has been changed") {
        setMsg("");
        Swal.fire(info.data);
        setTimeout(() => {
          navigate("/log_in");
        }, 2000);
      } else {
        setMsg(info.data);
      }
    } else {
      setMsg(errors.token || errors.password || errors.repassword);
    }
  }

  return (
    <div className="changePasswordBody">
      <NavBar />
      <div className="changePasswordContainer">
        <h1>An email has been sent</h1>
        <form className="changePasswordForm" onSubmit={onSubmit}>
          <label>Insert token</label>
          <input
            type="text"
            name="token"
            placeholder="Insert the token..."
            value={input.token}
            onChange={handleChange}
            className="changePasswordInput"
          />

          <label>Insert new password</label>
          <input
            type="password"
            name="password"
            placeholder="Password..."
            value={input.password}
            onChange={handleChange}
            className="changePasswordInput"
          />

          <label>Repeat password</label>
          <input
            type="password"
            name="repassword"
            placeholder="Password..."
            value={input.repassword}
            onChange={handleChange}
            className="changePasswordInput"
          />

          <input type="submit" className="changePasswordInputSubmit" />
          {msg && msg}
        </form>
      </div>
    </div>
  );
}
