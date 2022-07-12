import { React, useEffect /* useState */ } from "react";
import { useSelector, useDispatch } from "react-redux";
import { bannedUser, convertToAdmin, convertToUser, getAllUsers, unbannedUser } from "../../redux/actions";
import { ComponentError } from "./componentError";
import NavBar from "../NavBar/navbar";
import './Users.css';
import swal from "sweetalert";

export function Users() {
  const users = useSelector((state) => state.users);
  const dispatch = useDispatch();
  let id = localStorage.getItem("id");
  console.log(id)

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  const handleClickBan = async function (id) {
    swal({
      title: "Banned this user",
      text: "Are you sure you want to banned this user?",
      icon: "info",
      buttons: ["No", "Yes"]
    }).then(response => {
      if (response) {
        dispatch(bannedUser(id))

        swal({
          title: "Confirmed",
          text: "User Unbanned",
          icon: "success",

        }).then(reponse => {
          dispatch(getAllUsers())
        }

        )
      }
    })

  }

  const handleClickunbanned = async function (id) {
    swal({
      title: "Unbanned this user",
      text: "Are you sure you want to unbanned this user?",
      icon: "info",
      buttons: ["No", "Yes"]
    }).then(response => {
      if (response) {
        dispatch(unbannedUser(id))
        swal({
          title: "Confirmed",
          text: "User Unbanned",
          icon: "success",
        }).then(reponse => {
          dispatch(getAllUsers())
        }

        )
      }
    })

  }

  const handleClickAdmin = async function (id) {
    swal({
      title: "User to admin",
      text: "Are you sure you want convert this user to admin?",
      icon: "info",
      buttons: ["No", "Yes"]
    }).then(response => {
      if (response) {
        dispatch(convertToAdmin(id))

        swal({
          title: "Confirmed",
          text: "This user is admin now",
          icon: "success",

        }).then(reponse => {
          dispatch(getAllUsers())
        }

        )
      }
    })
  }
  const handleClickConvertToUser = async function (id) {
    swal({
      title: "User to admin",
      text: "You want this user to not have administrator permissions",
      icon: "info",
      buttons: ["No", "Yes"]
    }).then(response => {
      if (response) {
        dispatch(convertToUser(id))

        swal({
          title: "Confirmed",
          text: "This user is admin now",
          icon: "success",

        }).then(reponse => {
          dispatch(getAllUsers())
        }

        )
      }
    })

  }
  const id_user_admin = localStorage.getItem('type')
  if (id_user_admin) {
    if (id_user_admin === "adm") {

      console.log(users)
      return (
        <div className="component_users_admin">
          <NavBar />
          <div className="containerUsersAdmin">
            <h3>Users List: </h3>
            <table className="tableUsers">

              <tr>
                <th>ID</th>
                <th>User name</th>
                <th>Name</th>
                <th>Email</th>
                <th>Type</th>
                <th>Active</th>
                <th>Banned</th>
                <th>Options</th>


              </tr>
              {users.map((e) => (

                <tr>
                  <td>{e.id}</td>
                  <td>{e.user}</td>
                  <td>{e.name}</td>
                  <td>{e.email}</td>
                  <td>{e.type}</td>
                  {e.active === true ? <td>✔</td> : <td>X</td>}
                  {e.banned === true ? <td>✔</td> : <td>X</td>}
                  {e.id != id ?
                    <td className="options_buttons">

                      {e.banned === true ?
                        <button className="btn_opn" onClick={() => { handleClickunbanned(e.id) }}>Unbanned</button>
                        : <button className="btn_opn" onClick={() => { handleClickBan(e.id) }}>Ban</button>}
                      {e.type === "user" ?
                        <button className="btn_opn" onClick={() => { handleClickAdmin(e.id) }}>Convert to adim</button>
                        : <button  className="btn_opn" onClick={() => { handleClickConvertToUser(e.id) }}>Convert to user</button>}


                    </td> : <td>No options</td>}

                </tr>


              ))}

            </table>
          </div>
        </div>
      );
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
