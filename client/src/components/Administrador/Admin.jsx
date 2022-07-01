import { Link } from "react-router-dom";
import { ComponentError } from "./componentError";


export function Admin() {

  const id_user_admin = localStorage.getItem('type')

  if (id_user_admin) {
    if (id_user_admin === "adm") {
      return (
        <div>
          <h2>Admin page</h2>
          <Link to="/admin/publishVideogame">
            <button className="publish">Publish a new videogame</button>
          </Link>
          <Link to="/admin/statistics">
            <button className="stats">View sale statistics</button>
          </Link>
          <Link to="/admin/editVideogame">
            <button className="edit">Edit videogame</button>
          </Link>
          <Link to="/admin/users">
            <button className="users">Users administration</button>
          </Link>
        </div>
      )
    }
  }else
   return(
    <ComponentError></ComponentError>
  )
 
}