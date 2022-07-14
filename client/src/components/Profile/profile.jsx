import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import {
  getWishList,
  deleteWishList,
  getUserById,
} from "../../redux/actions/index";
import ErrorLogin from "../ErrorLogin.jsx/ErrorLogin";
import NavBar from "../NavBar/navbar";
import * as FaIcons from "react-icons/fa";
import "./profile.css";

export default function Profile() {
  const id_user = localStorage.getItem("id");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  let list = useSelector((state) => state.wishList);
  let user = useSelector((state) => state.my_user);
  console.log(list);
  useEffect(() => {
    if (id_user) {
      dispatch(getUserById(id_user));
      dispatch(getWishList(id_user));
    }
  }, [dispatch, id_user]);

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

  const handleAccountDelete = () => {
    function alertSubmit() {
      swal({
        title: "Delete Account",
        text: "Are you sure you want to delete your profile?",
        icon: "info",
        buttons: ["No", "Yes"],
      }).then((response) => {
        if (response) {
          swal({
            title: "Confirmed",
            text: "Proceding to delete account",
          });
          navigate(`/profile/${id_user}/delete`);
        }
      });
    }
    alertSubmit();
  };

  if (user.name) {
    return (
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
                <p>
                  {user.name} {user.lastname}
                </p>
                <p>{user.email}</p>

                {user.date_of_birth && (
                  <div>
                    <label>Date of Birth:</label>
                    <p> {user.date_of_birth}</p>
                  </div>
                )}

                {user.phone && (
                  <div>
                    <label>Phone:</label> <p> {user.phone}</p>
                  </div>
                )}

                {user.adress && (
                  <div>
                    <label>adress: </label>
                    <p> {user.adress}</p>
                  </div>
                )}

                <Link to={`/profile/${id_user}/editprofile`}>
                  <button className="btn_profile">Edit Profile</button>
                </Link>
                <Link to={`/friends/${id_user}`}>
                  <button className="btn_profile">Admin Friends</button>
                </Link>
                <button
                  className="btn_delete"
                  onClick={() => handleAccountDelete()}
                >
                  Delete Account
                </button>
              </div>
            </div>
            <div className="wish_list_container">
              <h3 className="h3ProfileWishList">Wish List </h3>
              {list?.length ? (
                list?.map((e) => (
                  <div className="cardWishListProfile">
                    <Link to={`/store/${e.id}`}>
                    <img
                      className="image-wishListProfile"
                      src={e.image}
                      alt=""
                    />
                    </Link>
                    <div className="nameAndPriceProfile">
                    <Link className="linkNameProfile" to={`/store/${e.id}`}>
                      <h2>{e.name}</h2>
                      </Link>
                      <h4>${e.price}</h4>
                      <button
                        className="btn_profileDeleteWishListProfile"
                        onClick={() => handleOnClickDelete(e.id)}
                      >
                        <FaIcons.FaTrashAlt />
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <p>You have no games in your wishlist</p>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return <ErrorLogin></ErrorLogin>;
  }
}
