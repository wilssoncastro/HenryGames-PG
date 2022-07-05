/* eslint-disable eqeqeq */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useNavigate } from "react-router-dom";
import {
  addWishList,
  getDetailsVideogame,
  deleteVideogame,
  deleteWishList,
  getWishList,
  addToCart,
  getCommentsByGame,
  comment_info,
  getCartById
} from "../../redux/actions";
import NavBar from "../NavBar/navbar";
import "./detail.css";
import Carousel from "react-elastic-carousel";
import swal from "sweetalert";
import Comment from "../Comment/Comment";
import Info_Comment from "../Info_Comment/Info_Comment";
import * as BsIcons from "react-icons/bs";
import * as FiIcons from "react-icons/fi";

export default function Detail() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const id_user = localStorage.getItem("id");

  const cartFromLocalStorage = JSON.parse(localStorage.getItem("cart") || "[]");
  const [cart /* setCart */] = useState(cartFromLocalStorage);

  const videogame = useSelector((state) => state.details);
  const list = useSelector((state) => state.wishList);
  const actual_cart = useSelector((state) => state.cart);
  const currents_comments = useSelector((state) => state.comments);
  //const info_comments = useSelector((state) => state.new_comments)

  let idProfile = localStorage.getItem("id");

  useEffect(() => {
    dispatch(getDetailsVideogame(id));
    dispatch(getCommentsByGame(id));
    dispatch(comment_info(id))
    localStorage.setItem("cart", JSON.stringify(cart));
    if (list) {
      dispatch(getWishList(idProfile));
    }
    dispatch(getCartById(id_user))
  }, [dispatch, idProfile, id, cart]);

  const handleDelete = () => {
    function confirm() {
      var respuesta = window.confirm(
        "Are you sure you want to delete the videogame?"
      );
      console.log(id);
      if (respuesta === true) {
        dispatch(deleteVideogame(id));
        navigate("/home");
      }
    }
    confirm();
  };

  const handleOnClick = (idGame) => {
    let id = localStorage.getItem("id");
    dispatch(addWishList(id, idGame));
    console.log("se agrego el juego de la lista");
    navigate(`/store/${idGame}`);
  };

  const handleOnClickDelete = (idGame) => {
    let id = localStorage.getItem("id");
    dispatch(deleteWishList(id, idGame));
    console.log("se elimino el juego de la lista");
    navigate(`/store/${idGame}`);
  };

  function HandleAddToCart(e) {
    e.preventDefault();
    if (typeof id_user === 'string') {
      dispatch(addToCart(id_user, id));
    }else{
      localStorage.setItem(
        "cart",
        JSON.stringify([...cartFromLocalStorage, videogame])
      );
    }
    
    swal({
      title: "Your game was successfully added to the cart",
      text: "What do you want to do next?",
      icon: "success",
      buttons: {
        cart: {
          text: "Go to cart",
          value: "cart",
        },
        shop: {
          text: "Go to shop",
          value: "shop",
        },
        cancel: "Cancel",
      },
    }).then((value) => {
      switch (value) {
        case "cart":
          navigate("/my_cart");
          swal("Welcome to your cart", "Have a nice buy!", "success");
          break;

        case "shop":
          navigate("/store");
          swal("Welcome to store", "Enjoy!", "success");
          break;

        default:
          break;
      }
    });
  }

  return (
    <div className="allPage">
      <div>
        <NavBar />
      </div>
      <div className="allDetail">
        {videogame.id == id ? (
          <div className="CardDetail">
            <h1 className="name">{videogame.name}</h1>

            <div className="containerImgList">
              <img className="image" src={videogame.image} />

              <div>
                <ul className="listDetail1">
                  <li>
                    <span className="titleList">Price: </span>
                    {videogame.free_to_play === true ? (
                      <span>Free to play</span>
                    ) : (
                      <span>${videogame.price}</span>
                    )}
                  </li>

                  <li className="divsListDetail">
                    <span className="titleList">Rating: </span>
                    <span>{videogame.rating} ⭐</span>
                  </li>

                  <li>
                    <span className="titleList">Release Date: </span>
                    <span>{videogame.release_date}</span>
                  </li>
                </ul>
              </div>
              <div>
                <ul className="listDetail2">
                  <li>
                    <span className="titleList">Genres:</span>
                    {videogame.genres?.map((e) => {
                      if (typeof e === "string") {
                        return (
                          <span className="type" key={e}>
                            {e.replace(e[0], e[0].toUpperCase())} |
                          </span>
                        );
                      } else if (videogame.genres.length > 1) {
                        return <span key={e.name}>{e.name} | </span>;
                      } else {
                        return <span key={e.name}>{e.name}</span>;
                      }
                    })}
                  </li>
                  <li>
                    <span className="titleList">Esrb Rating: </span>
                    <span>{videogame.esrb_rating}</span>
                  </li>

                  {videogame.on_sale === true ? (
                    <li id="onSale" className="titleList">
                      On Sale!
                    </li>
                  ) : null}
                </ul>
              </div>
            </div>

            <div className="buttons">
              <div>
                {!list?.find((e) => e.id == videogame.id) ? (
                  <button
                    className="buttonAddWishList"
                    onClick={() => handleOnClick(videogame.id)}
                  >
                    <BsIcons.BsBookmarkStar />
                  </button>
                ) : (
                  <button
                    className="buttonDeleteWishList"
                    onClick={() => handleOnClickDelete(videogame.id)}
                  >
                    <BsIcons.BsBookmarkStarFill />
                  </button>
                )}
              </div>

              <div>
                {!cartFromLocalStorage.includes(videogame) ? (
                  <button
                    className="buttonCart"
                    onClick={(e) => HandleAddToCart(e)}
                  ><BsIcons.BsCartPlus />
                  </button>
                ) : null}
              </div>

              <div>
                <button 
                  className="buttonBuy"
                ><FiIcons.FiDollarSign />
                </button>
              </div>
            </div>

            <h3 className="tagH4">Tags:</h3>
            <div className="tag">
              {videogame.tags?.map((e) => {
                if (videogame.tags.length > 1) {
                  return <span>{e} |</span>;
                } else {
                  return <span>{e}</span>;
                }
              })}
            </div>

            <h3 className="descriptionH3">Description: </h3>
            <div className="description">
              <p>{videogame.description}</p>
            </div>

            <div>
              <Carousel>
                {videogame.short_screenshots?.map((e) => {
                  return (
                    <img className="screenshots" src={e} alt="Not found" />
                  );
                })}
              </Carousel>
            </div>

              <h3 className="requirementsH3">Requirements: </h3>
            <div className="requirements">
              {videogame.requirements === null ? (
                <span>The videogame has not requirements actually</span>
              ) : (
                <p>{videogame.requirements}</p>
              )}
            </div>

            {videogame.db_created && (
              <button
                className="deleteButtonDetail"
                onClick={(e) => handleDelete(e)}
              >
                Delete Videogame
              </button>
            )}

            <div className="all_comments">
              {currents_comments?.map((e) => (
                <Info_Comment
                  id={e.id}
                  id_user={e.id_user}
                  comment={e.comment}
                  createdAt={e.createdAt}
                  user={e.username}
                />
              ))}
              {/* {info_comments?.map((e) => (
                <Info_Comment
                  id={e.Comment.id}
                  id_user={e.Comment.id_user}
                  comment = {e.Comment.comment}
                  createdAt = {e.Comment.createdAt}
                  user = {e.user}
                />
              ))} */}
            </div>

            <div>
              {typeof id_user === "object" ? null : <Comment id_game={id} />}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
