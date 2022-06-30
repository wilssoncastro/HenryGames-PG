/* eslint-disable eqeqeq */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useNavigate } from "react-router-dom";
import {
  addWishList,
  getDetailsVideogame,
  deleteVideogame,
  deleteWishList,
  getWishList
} from "../../redux/actions";
import NavBar from "../NavBar/navbar";
import './detail.css'
import Carousel from 'react-elastic-carousel'
import swal from 'sweetalert'

export default function Detail() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const cartFromLocalStorage = JSON.parse(localStorage.getItem('cart') || '[]')
  const [cart, /* setCart */] = useState(cartFromLocalStorage)

  const videogame = useSelector((state) => state.details);
  const list = useSelector((state) => state.wishList);
  let idProfile = localStorage.getItem("id");
  
  
  useEffect(() => {
    dispatch(getDetailsVideogame(id));
    localStorage.setItem('cart', JSON.stringify(cart))
    if(list) {
      dispatch(getWishList(idProfile))
    };
  }, [dispatch, idProfile, id, cart]);
  
  // const gameWish = list[0] ? list[0].wishs.find(e => e.name == videogame.name) : 'HIJO DE MIL PUTA';
  

  const handleDelete = () => {
    function confirm() {
      var respuesta = window.confirm(
        "Are you sure you want to delete the videogame?"
      );
      console.log(id)
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
      console.log('se agrego el juego de la lista');
      navigate(`/store/${idGame}`)
  }

  const handleOnClickDelete = (idGame) => {
    let id = localStorage.getItem("id");
    dispatch(deleteWishList(id, idGame));
    console.log('se elimino el juego de la lista');
    navigate(`/store/${idGame}`)
  }

   function HandleAddToCart(e) {
    e.preventDefault();
    localStorage.setItem('cart', JSON.stringify([...cartFromLocalStorage, videogame]))
    swal({
      title: 'Your game was successfully added to the cart',
      text: 'What do you want to do next?',
      icon: "success",
      buttons: {
        cart: {
          text: 'Go to cart',
          value: 'cart'
        },
        shop: {
          text: 'Go to shop',
          value: 'shop'
        },
        cancel: 'Cancel'
      }
    })
    .then((value) =>{
      switch (value) {
        case 'cart':
          navigate('/my_cart')
          swal('Welcome to your cart', 'Have a nice buy!', "success")
          break;
        
        case 'shop':
          navigate('/store')
          swal('Welcome to store', 'Enjoy!', "success")
          break;

        default:
          break;
      }
    })
  }

  return (
    <div>
      <div>
        <NavBar />
      </div>
    <div className="ComponentCardDetail">
      {videogame.id == id ? (
        <div className="CardDetail">
          <h1 className="name">{videogame.name}</h1>
          <div className="images">
            <Carousel>
            {videogame.short_screenshots?.map((e) => {
              return <img src={e} alt="Not found" width="700px" height="400px" />;
            })}
            </Carousel>
          </div>
          <div className="release_date">
            <h4>Release Date: </h4>
            <p>{videogame.release_date}</p>
          </div>
          <div className="rating">
            <h4>Rating: </h4>
            <p>{videogame.rating}</p>
          </div>
          <div className="description">
            <h4>Description: </h4>
            <p>{videogame.description}</p>
          </div>
          <div className="genres">
            <h3>Genres:</h3>
            {videogame.genres?.map((e) => {
              if (typeof e === "string") {
                return (
                  <span className="type" key={e}>
                    {e.replace(e[0], e[0].toUpperCase())} |{" "}
                  </span>
                );
              } else {
                return <span key={e.name}>{e.name} | </span>;
              }
            })}
          </div>
          <div className="freeOrPay">
            {videogame.free_to_play === true ? (
              <span>Free</span>
            ) : (
              <p>${videogame.price}</p>
            )}
          </div>
          <div className="esrb">
            <h4>Esrb Rating: </h4>
            {videogame.esrb_rating}
          </div>
          <div className="requirements">
            <h3>Requirements: </h3>
            {videogame.requirements === null ? (
              <span>The videogame has not requirements actually</span>
            ) : (
              <p>{videogame.requirements}</p>
            )}
          </div>
          <div className="tags">
            <h3>Tags:</h3>
            {videogame.tags?.map((e) => {
              return <p>{e}</p>;
            })}
          </div>

          <div className="onSale">
            {videogame.on_sale === true ? <p>On Sale!</p> : null}
          </div>

          {/* <div>        
            {
              !gameWish?
              (<button onClick={() => handleOnClick(videogame.id)}>Add to Wish List</button> ) 
              : (<button onClick={() => handleOnClickDelete(videogame.id)}>Delete from Wish List</button>                           )
            }
          </div> */}

          {videogame.db_created && (
            <button
              className="deleteButtonDetail"
              onClick={(e) => handleDelete(e)}
            >
              Delete Videogame
            </button>
          )}

          <div>
            <button onClick={(e) => HandleAddToCart(e)}>
              Add to Cart
            </button>
          </div>

          <div className="buttonBackHome">
            <Link to="/home">
              <button>Back to the Main Page</button>
            </Link>
            <Link to="/store">
              <button>Back to the store</button>
            </Link>
          </div>
        </div>
      ) : null}
    </div>
  </div>
  );
}
