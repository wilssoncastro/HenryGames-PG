import { React, useEffect, useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import Card from "../Card/card";
import VideogameCreate from "../VideogameForm/CreateVideogame";
import { getCardStatistics, getFilteredVideogames } from "../../redux/actions";
import { Link } from "react-router-dom";

export default function Edit() {

  const dispatch = useDispatch()
  const [name, setName] = useState("");
  const [edit, setEdit] = useState(false)
  const videogame = useSelector((state) => state.videogames)
  console.log(videogame)

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

  return (
    <div>
      <h2>Edit videogame</h2>
      <button onClick={(e) => handleEdit(e)}>Search game to edit</button>
        {
          edit==true&&
          <div>
          <input
            placeholder="Search Videogame..."
            value={name}
            type="text"
            id="inputName"
            onChange={(e) => handleInputChange(e)}
          />
          {
            name?videogame.map((e) => (
              <div>
                <h3>{e.name} = ${e.price}</h3>
                <h4>Ventas: {e.contador}</h4>
                <h4>Ganancias del juego: ${(e.contador * e.price).toFixed(2)}</h4>
                <Link to={`/admin/editVideogame/formEdit/${e.id}`}>
                  <button>Edit</button>
                </Link>
              </div>
            )) : null
          }
          </div>
        }
        <h2>Delete videogame</h2>
        <button>Delete</button>
    </div>
  )
}