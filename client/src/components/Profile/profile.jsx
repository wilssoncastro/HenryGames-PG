import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import swal from "sweetalert";
import { getWishList, deleteWishList, getUserById } from '../../redux/actions/index';
import ErrorLogin from "../ErrorLogin.jsx/ErrorLogin";
import NavBar from "../NavBar/navbar";
import "./profile.css"
export default function Profile() {

  const id_user = localStorage.getItem('id')
  const dispatch = useDispatch();
  let list = useSelector((state) => state.wishList);
  let user = useSelector((state) => state.my_user);

  useEffect(() => {
    if (id_user) {
      dispatch(getUserById(id_user))
      dispatch(getWishList(id_user));
    }
  }, [dispatch, id_user])

  const handleOnClickDelete = (idGame) => {
    let id = localStorage.getItem("id");
    dispatch(deleteWishList(id, idGame));
    swal({
      title: "Confirmed",
      text: "Videogame was deleted from your wish list",
      icon: "success",
    });
    dispatch(getWishList(id));
  };



  if (user.name) {
    return (
      <div className="profile_container">
        <div className="profile">
          <div>
            <NavBar />
          </div>
          <div>
            <div className="User_container">
              <div className="profile_box">
                <img className="img_profile" src={user.profile_pic} alt="" />
                <div className="text_profile">
                  <h3>{user.user}</h3>
                  <p>{user.name} {user.lastname}</p>
                  <p>{user.email}</p>

                  {user.date_of_birth &&
                    <div>
                      <label>Date of Birth:</label>
                      <p> {user.date_of_birth}</p>
                    </div>}

                  {user.phone &&
                    <div>
                      <label>Phone:
                      </label> <p> {user.phone}</p>
                    </div>}

                  {user.adress &&
                    <div>
                      <label>adress: </label>
                      <p> {user.adress}</p>
                    </div>}


                  <Link to={`/profile/${id_user}/editprofile`}>
                    <button className="btn_profile">Edit Profile</button>
                  </Link>
                </div>
              </div>
              <div className="wish_list_container">
                <label>Wish List :</label>
                {list.length ? list?.map((e) =>
                  <div>
                    <p>{e.name}</p>
                    <img className="img_profile" src={e.image} alt='' />

                    <p>{e.price}</p>
                    <button className="btn_profile" onClick={() => handleOnClickDelete(e.id)}>Delete from Wish List</button>
                  </div>
                ) : <p>You have no games in your wishlist</p>}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  } else {
    return (
      <ErrorLogin></ErrorLogin>
    )

  }
}
