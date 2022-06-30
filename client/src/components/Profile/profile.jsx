import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import swal from "sweetalert";
import { getWishList, deleteWishList } from "../../redux/actions/index";
import NavBar from "../NavBar/navbar";
import "./profile.css";

export default function Profile() {
  const dispatch = useDispatch();
  const { id } = useParams();
  let list = useSelector((state) => state.wishList);

  useEffect(() => {
    dispatch(getWishList(id));
  }, [dispatch, id]);

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


  return (
    <div className="Profile">
      <div>
        <NavBar />
      </div>
      <br />
      <br />
      <br />
      <div>     
      <h3>Wish List :</h3>
      {list[0]?.wishs.length !== 0
        ? list[0]?.wishs.map((e) => (
            <div>
              <h4>{e.name}</h4>
              <img src={e.image} height="100px" width="200px" />
              <h3>{e.price}</h3>
              <button onClick={() => handleOnClickDelete(e.id)}>
                Delete from Wish List
              </button>
            </div>
          ))
        : "Your wish list is empty"}
        </div>
    </div>
  );
}
