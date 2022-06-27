import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getFilteredVideogames } from "../../redux/actions/index";

function validate(input) {
  let error = "";
  if (input === "") {
    error = "Please insert a name";
  }
  return error;
}

export default function SearchBar({name, setName}) {
  const dispatch = useDispatch();
  // const [name, setName] = useState("");
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    e.preventDefault();
    setName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name !== "") {
       dispatch(getFilteredVideogames(name));
      setName("");
    }
    setError(validate(name));
  };

  return (
    <div className="search">
      <input
        value={name}
        type="text"
        placeholder="Search Videogames..."
        onChange={(e) => handleInputChange(e)}
        className="input"
      />

      <button
        className="botonBuscar"
        type="submit"
        onClick={(e) => handleSubmit(e)}
      >Search</button>

      {error && <p className="errorSearch">{error}</p>}
    </div>
  );
}
