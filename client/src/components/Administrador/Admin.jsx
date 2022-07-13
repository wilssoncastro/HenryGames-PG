import { Link } from "react-router-dom";
import { ComponentError } from "./componentError";
import "./admin.css"
import ErrorLogin from "../ErrorLogin.jsx/ErrorLogin";
import NavBar from "../NavBar/navbar";


export function Admin() {

  const id_user_admin = localStorage.getItem('type')
  //console.log(id_user_admin)

  if (id_user_admin) {
    if (id_user_admin === "adm") {
      return (
        <div className="administration_comp">
          <NavBar />
          <div className="admin_cont">
            <h2 className="tittle_admin">ADMINISTRATION PAGE</h2>
            <div className="admin_content">

              <Link to="/admin/publishVideogame" style={{ textDecoration: 'none' }}>
                <div className="admin_option">
                  <img src="https://cdn.iconscout.com/icon/free/png-256/game-publishing-1467902-1244384.png" alt="" />
                  <p className="btn_adm">Publish a new videogame</p>
                </div>
              </Link>

              <Link to="/admin/statistics"  style={{ textDecoration: 'none' }}>
                <div className="admin_option">
                  <img src="https://cdn-icons-png.flaticon.com/512/2040/2040988.png" alt="" />
                  <p className="btn_adm">View sale statistics</p>
                </div>
              </Link>
                <Link to="/admin/editVideogame"  style={{ textDecoration: 'none' }}>
              <div className="admin_option">
                  <img src="https://cdn-icons-png.flaticon.com/512/4414/4414472.png" alt="" />
                  <p className="btn_adm">Edit videogame</p>
              </div>
                </Link>
              <Link to="/admin/users"  style={{ textDecoration: 'none' }}>
                <div className="admin_option">
                  <img src="https://cdn-icons-png.flaticon.com/512/4919/4919646.png" alt="" />
                  <p className="btn_adm">Users administration</p>
                </div>
              </Link>
              <Link to="/blog/editArticles"  style={{ textDecoration: 'none' }}>
                <div className="admin_option">
                  <img src="https://icon-library.com/images/publication-icon/publication-icon-0.jpg" alt="" />
                  <p className="btn_adm">Publish Article</p>
                  </div> 
                </Link>
              <Link to='/admin/comments' style={{ textDecoration: 'none' }}>
                <div className="admin_option">
                  <img src="https://icones.pro/wp-content/uploads/2022/01/icone-de-commentaires-orange.png" alt='' />
                  <p className="btn_adm">Comment administration</p>
                </div>
              </Link>
            </div>
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
      <ErrorLogin></ErrorLogin>
    )

}