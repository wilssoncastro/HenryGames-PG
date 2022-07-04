import { Link } from "react-router-dom";
import { ComponentError } from "./componentError";
import "./admin.css"
import ErrorLogin from "../ErrorLogin.jsx/ErrorLogin";
import NavBar from "../NavBar/navbar";


export function Admin() {

  const id_user_admin = localStorage.getItem('type')
  console.log(id_user_admin)

  if (id_user_admin) {
    if (id_user_admin === "adm") {
      return (
        <div>
          <NavBar/>
          <div className="administration_comp">
            <h2 className="tittle_admin">ADMINISTRATION PAGE</h2>
            <div className="admin_content">
              <div className="admin_option">
                <Link to="/admin/publishVideogame">
                <img src="https://cdn-icons-png.flaticon.com/512/1622/1622508.png" alt="" />
                  <label className="btn_adm">Publish a new videogame</label>
                </Link>
              </div>
              <div className="admin_option">
                <Link to="/admin/statistics">
                <img src="https://cdn-icons-png.flaticon.com/512/2040/2040988.png" alt="" />
                  <label className="btn_adm">View sale statistics</label>
                </Link>
              </div>
              <div className="admin_option">
                <Link to="/admin/editVideogame">
                  <img src="https://cdn-icons-png.flaticon.com/512/4414/4414472.png" alt="" />
                  <label className="btn_adm">Edit videogame</label>
                </Link>
              </div>
              <div className="admin_option">
                <Link to="/admin/users">
                  <img src="https://cdn-icons-png.flaticon.com/512/1622/1622512.png" alt="" />
                  <label className="btn_adm">Users administration</label>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )
    }else{      
      return (
        <ComponentError></ComponentError>
      )
    }
  } else
    return (
      <ErrorLogin></ErrorLogin>
    )

}