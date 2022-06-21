import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
//import { getNameVideogames } from "../actions/actions";


function validate(input){
  let error = '';
  if(input === ''){
    error = 'Por favor ingresa un nombre';
  }
  return error;
}


export default function SearchBar() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    e.preventDefault();
    setName(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(name !== ""){
     await dispatch(/* action */(name));
      setName("")
    }
    setError(validate(name))
  };
  

  return (
    <div className="search">

      <input
        value={name}
        type="text"
        placeholder="Buscar juegos..."
        onChange={(e) => handleInputChange(e)}
        className="input"
      />

      <button
        className="botonBuscar"
        type="search"
        onClick={(e) => handleSubmit(e)}
      />
      {error && (
        <p className="errorSearch">{error}</p>
      )
      }
    </div>
  );
}