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
  getCartById,
  is_authorizated,
  postMercadoPago,
  getLibraryById,
  addGameToLibrary
} from "../../redux/actions";
import NavBar from "../NavBar/navbar";
import "./detail.css";
import Carousel from "react-elastic-carousel";
import swal from "sweetalert";
import Comment from "../Comment/Comment";
import Info_Comment from "../Info_Comment/Info_Comment";
import * as BsIcons from "react-icons/bs";
import * as FiIcons from "react-icons/fi";
import * as MdIcons from "react-icons/md";
import loading from '../../images/loading/Infinity-2.9s-200px.gif'
import Footer from '../Footer/Footer';

export default function Detail() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const id_user = localStorage.getItem("id");

  const cartFromLocalStorage = JSON.parse(localStorage.getItem("cart") || "[]");
  const [cart /* setCart */] = useState(cartFromLocalStorage);
  const library = useSelector((state) => state.my_games);

  const videogame = useSelector((state) => state.details);
  const list = useSelector((state) => state.wishList);
  //const actual_cart = useSelector((state) => state.cart);
  const currents_comments = useSelector((state) => state.comments);
  //const is_online = useSelector((state) => state.is_online)
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
    dispatch(is_authorizated())
    dispatch(getLibraryById(id_user))

  }, [dispatch, idProfile, id, cart, id_user]);

  const handleDelete = () => {
    function confirm() {
      var respuesta = window.confirm(
        "Are you sure you want to delete the videogame?"
      );
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
    navigate(`/store/${idGame}`);
  };

  const handleOnClickDelete = (idGame) => {
    let id = localStorage.getItem("id");
    dispatch(deleteWishList(id, idGame));
    navigate(`/store/${idGame}`);
  };

  function HandleAddToCart() {

    if (id_user) {
      dispatch(addToCart(id_user, id));
    }else{
      if(cartFromLocalStorage.length) {
        localStorage.setItem(
          "cart",
          JSON.stringify([...cartFromLocalStorage, videogame])
        );
      } else {
        localStorage.setItem(
          "cart",
          JSON.stringify([videogame])
        )
      }
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
        cancel: "Stay",
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

  const handleBuyMercadoPago = (videogame) => {
    const carrito = [videogame]
    swal({
      title: "You will buy this game",
      text: "Are you sure?",
      icon: "info",
      buttons: {
        sure: {
          text: 'Yes',
          value: 'sure'
        },
        cancel: 'Cancel'
      }
    }).then((value) => {
      switch (value) {
        case "sure":
        dispatch(postMercadoPago(carrito))
        .then((data) => {
          console.log(data);
          window.open(data.data.init_point);
      })
          break;

        default:
          break;
      }
    });
    };

    const logInToBuy = () => {
      swal({
        title: "You need log in to buy",
        text: "Not registered yet?",
        icon: "error",
        buttons: {
          login: {
            text: "Go to log in",
            value: "log_in",
          },
          signup: {
            text: "Go to sign up",
            value: "sign_up",
          },
          cancel: "Cancel",
        },
      }).then((value) => {
        switch (value) {
          case "log_in":
            navigate("/log_in");
            break;
  
          case "sign_up":
            navigate("/sign_up");
            break;
            
          default:
            break;
        }
      });
    };

    function addToLibrary(){
      dispatch(addGameToLibrary(videogame.id, id_user))
      swal({
      title: 'The game was successfully added to your library',
      text: "What do you want to do next?",
      icon: "success",
      buttons: {
        library: {
          text: "Go to library",
          value: "library",
        },
        shop: {
          text: "Go to shop",
          value: "shop",
        },
        cancel: "Cancel",
      }
    }).then((value) => {
      switch (value) {
        case "library":
          navigate("/library");
          swal("Welcome to your library", "Enjoy!", "success");
          break;

        case "shop":
          navigate("/store");
          swal("Welcome to store", "Enjoy!", "success");
          break;

        default:
          break;
      }
    })
    }

    function logInFirst(){
      swal({
      title: 'You must Log In first to add items to your library',
      text: "What do you want to do next?",
      icon: "info",
      buttons: {
        logIn: {
          text: "Go to Log In",
          value: "log_in",
        },
        signUp: {
          text: "Go to Sign Up",
          value: "sign_up",
        },
        cancel: "Cancel",
      }
    }).then((value) => {
      switch (value) {
        case "log_in":
          navigate("/log_in");
          swal("Welcome to Henry Games", "Enjoy!", "success");
          break;

        case "sign_up":
          navigate("/sign_up");
          swal("Welcome to Henry Games", "Enjoy!", "success");
          break;

        default:
          break;
      }
    })
    }

    return (
      <div className="allPage">
        <div>
          <NavBar />
        </div>
        {videogame.length === 0 ?
          <div className="loadingDetail">
            <img src={loading} alt='' />
          </div>
          :
          <div className="allDetail">
            {videogame.id == id ? (
              <div className="CardDetail">
  
                <div className="title-lists-top-detail">
                  <h1 className="name">{videogame.name}</h1>
  
                  <div className="containerImgList">
  
                    <div className="detail-image-buttons">
                      <img className="image" src={videogame.image} alt='not found' />
  
                      {/* Botones COMPRA WISHLIST Y CART */}
  
                      {/* Identifica que el juego x ID YA EXISTE en la library */}
                      {library?.find(e => e.LibraryPlayer.id_game == videogame.id) ?
                        <Link to='/library' className="button-title-library">
                          <span className="button-in-library">Game in library</span>
                          <MdIcons.MdLibraryAddCheck className="button-library-icon"/>
                        </Link>
                        :
  
                        <div className="buttons">

                          {/* WISHLIST */}
                          {id_user?
                          (<div>
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
                          </div>) : <></>
                          }


                          {/* CART */}
                          <div>
                            {videogame.free_to_play ?
                              null :
                              <button
                                className="buttonCart"
                                onClick={(e) => HandleAddToCart(e)}
                              ><BsIcons.BsCartPlus />
                              </button>
                            }
                          </div>
  
                          {/* BUY */}
                          <div>
                            {videogame.free_to_play ?
                              id_user?
                                <button onClick={addToLibrary} className="buttonCart"><MdIcons.MdLibraryAdd /></button> 
                              : <button onClick={logInFirst} className="buttonCart"><MdIcons.MdLibraryAdd /></button> 
                              
                              :
                              <>
                                <button
                                  className="buttonBuy"
                                  onClick={
                                    typeof idProfile === "string"
                                      ? () => {
                                        handleBuyMercadoPago(videogame);
                                      }
                                      : () => {
                                        logInToBuy();
                                      }
                                  }
                                ><FiIcons.FiDollarSign />
                                </button>
                              </>
                            }
                          </div>
                        </div>
                      }
                    </div>
  
  
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
  
                  </div> {/* Cierra CONTAINER IMG + LISTS */}
  
                </div> {/* Cierra TITULO y CONTAINER */}
  
                {/* <h3 className="tagH4">Tags:</h3> */}
                <br />
                <div className="tag">
                  {videogame.tags?.map((e) => {
                    if (videogame.tags.length > 1) {
                      return <span>|<span>{e}</span></span>
                    } else {
                      return <span>{e}</span>;
                    }
                  })}
                  <span>|</span>
                </div>
  
                {/* <h3 className="descriptionH3">Description: </h3> */}
                <br />
                <div className="description">
                  <p>{videogame.description}</p>
                </div>
  
                <div className="carouselcontainer-detail">
                  <Carousel focusOnSelect={false} itemsToShow={4}>
                    {videogame.short_screenshots?.map((e) => {
                      return (
                        <img className="screenshots" src={e} alt="" />
                      );
                    })}
                  </Carousel>
                </div>
  
                <h3 className="requirementsH3">Requirements: </h3>
                <div className="requirements">
                  {videogame.requirements == '' || videogame.requirements == 'null' ? (
                    <span>The videogame has not specified requirements.</span>
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
  
                </div>
  
                <div>
                  {typeof id_user === "object" ? null : <Comment id_game={id} />}
                </div>
              </div>
            ) : null}
          </div>
        }
      </div>
    );
  }
