import { React, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
/* import Card from "../Card/card";
import VideogameCreate from "../VideogameForm/CreateVideogame"; */
import { deleteVideogame, getCardStatistics/* , getFilteredVideogames */ } from "../../redux/actions";
import swal from "sweetalert";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { ComponentError } from "./componentError";
import NavBar from "../NavBar/navbar";

export default function Edit() {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [edit, setEdit] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const videogame = useSelector((state) => state.videogames);


  useEffect(() => {
    dispatch(getCardStatistics(name));
  }, [dispatch, name]);

  const handleEdit = (e) => {
    e.preventDefault();
    setEdit(true)
  }

  const handleInputChange = (e) => {
    e.preventDefault();
    setName(e.target.value);
  };

  const handleDelete = (e) => {
    e.preventDefault();
    setDeleted(true);
  }

  const handleOnClickDelete = (e) => {
    swal({
      title: "Delete Videogame",
      text: "Are you sure you want to delete this videogame?",
      icon: "alert",
      buttons: ["No", "Yes"]
    }).then(response => {
      if (response) {
        dispatch(deleteVideogame(e));
        swal({
          title: "Confirmed",
          text: "The videogame was deleted",
          icon: "success",
        });
        navigate('/admin');
      }
    })
  }

  const id_user_admin = localStorage.getItem('type')
  if (id_user_admin) {
    if (id_user_admin === "adm") {

      return (
        <div>
          <NavBar />
          <h2>Edit videogame</h2>
          <button onClick={(e) => handleEdit(e)}>Search game to edit</button>
          {
            edit == true &&
            <div>
              <input
                placeholder="Search Videogame..."
                value={name}
                type="text"
                id="inputName"
                onChange={(e) => handleInputChange(e)}
              />
              {
                name ? videogame.map((e) => (
                  <div>
                    <h3>{e.name}</h3>
                    <Link to={`/admin/editVideogame/formEdit/${e.id}`}>
                      <button>Edit</button>
                    </Link>
                  </div>
                )) : null
              }
            </div>
          }
          <h2>Delete videogame</h2>

          <button onClick={(e) => handleDelete(e)}>Search game to delete</button>
          {
            deleted == true &&
            <div>
              <input
                placeholder="Search Videogame..."
                value={name}
                type="text"
                id="inputName"
                onChange={(e) => handleInputChange(e)}
              />
              {
                name ? videogame.map((e) => (
                  <div>
                    <h3>{e.name}</h3>
                    <button onClick={() => handleOnClickDelete(e.id)}>Delete</button>
                  </div>
                )) : null
              }
            </div>
          }
        </div>
      )
    }else{      
      return (
        <ComponentError></ComponentError>
      )
    }
  } else
    return (
      <ComponentError></ComponentError>
    )




}