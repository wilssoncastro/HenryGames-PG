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
import './EditVideogame.css';

export default function Edit() {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [edit, setEdit] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const videogame = useSelector((state) => state.videogames);
  const [editDelete, setEditDelete] = useState({
    edit: false,
    delete: false
  })



  useEffect(() => {
    dispatch(getCardStatistics(name));
  }, [dispatch, name]);

  const handleEdit = (e) => {
    e.preventDefault();
    setEditDelete({
      edit: true,
      delete: false
    })
    setName("")

  }

  const handleInputChange = (e) => {
    e.preventDefault();
    setName(e.target.value);
  };

  const handleDelete = (e) => {
    e.preventDefault();
    setEditDelete({
      edit: false,
      delete: true
    })
    setName("")
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
        <div className="component_edit_delete_videogame">
          <NavBar />
          <div className="containerEditVideogame">

            <div className="option_edit_delete">
              <div>
                <h2>Edit videogame</h2>
                <button
                className="btn_option_deleted_edit" onClick={(e) => handleEdit(e)}>Search game to edit</button>
              </div>
              <div>
                <h2>Delete videogame</h2>
                <button className="btn_option_deleted_edit" onClick={(e) => handleDelete(e)}>Search game to delete</button>
              </div>
            </div>
            {
              editDelete.edit == true &&
              <div>
                <p>
                  Please Type the game you want to edit</p>
                <input
                  placeholder="Search Videogame..."
                  value={name}
                  type="text"
                  id="inputName"
                  className="input_search_edit_deleted"
                  onChange={(e) => handleInputChange(e)}
                />
                <div className="cards_edit_delete">
                {
               
                  name && videogame.map((e) => (

                    <div className="card_edit_delete">
                    
                      <h3>{e.name}</h3>
                    
                      <Link to={`/admin/editVideogame/formEdit/${e.id}`}>
                        <button className="btn_option_edit">Edit</button>
                      </Link>
                    </div>
                  )) 
                
                  
                }
                </div>
                
              </div>
            }



            {
              editDelete.delete == true &&
              <div>
                 <p>
                  Please Type the game you want to deleted</p>
                <input
                  placeholder="Search Videogame..."
                  value={name}
                  type="text"
                  id="inputName"
                  className="input_search_edit_deleted"
                  onChange={(e) => handleInputChange(e)}
                />
                <div className="cards_edit_delete">
                {
                  name && videogame.map((e) => (
                    <div className="card_edit_delete">
                      <h3>{e.name}</h3>
                      <button className="btn_option_deleted" onClick={() => handleOnClickDelete(e.id)}>Delete</button>
                    </div>
                  )) 
                }
                </div>
              </div>
            }

          </div>
        </div>
      )
    } else {
      return (
        <ComponentError></ComponentError>
      )
    }
  } else
    return (
      <ComponentError></ComponentError>
    )




}