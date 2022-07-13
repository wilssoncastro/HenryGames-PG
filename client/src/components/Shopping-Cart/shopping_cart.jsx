import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import NavBar from "../NavBar/navbar";
import Card from "../Card/card";
import {  Link , useNavigate } from "react-router-dom";
import {
  delFromCart,
  getCartById,
  deleteAllFromCart,
  postMercadoPago,
} from "../../redux/actions";
import swal from "sweetalert";
import "./shoppingcart.css";
import * as FaIcons from "react-icons/fa";
import * as GiIcons from "react-icons/gi"

export default function ShoppingCart() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const id_user = localStorage.getItem("id");
  const videogamesInCart = useSelector((state) => state.cart);

  const cartFromLocalStorage = JSON.parse(localStorage.getItem("cart") || "[]");
  const [cart /* setCart */] = useState(cartFromLocalStorage);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
    if(typeof id_user === "string"){
      dispatch(getCartById(id_user));
    }
  }, [cart /* dispatch */]);

  const current_cart =
    typeof id_user === "string" ? videogamesInCart : cartFromLocalStorage;

  const handleDelete = (id) => {
    localStorage.setItem(
      "cart",
      JSON.stringify(cartFromLocalStorage.filter((e) => e.id !== id))
    );
    if (typeof id_user === "string") {
      dispatch(delFromCart(id_user, id));
      
    } else {
      localStorage.setItem(
        "cart",
        JSON.stringify(cartFromLocalStorage.filter((e) => e.id !== id))
      );
    }
    navigate("/my_cart");
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

  const handleClearCart = (e) => {
    if (typeof id_user === "string") {
      dispatch(deleteAllFromCart(id_user, { games: videogamesInCart }));
    } else {
      localStorage.setItem("cart", []);
    }
    navigate("/my_cart");
  };

  const handleBuyMercadoPago = (carrito) => {
    swal({
      title: "You will be redirected to MercadoPago",
      text: "Ready?",
      icon: "success",
      buttons: {
        mp: {
          text: "Go to MercadoPago",
          value: "mp",
        },
        store: {
          text: "Go to shop",
          value: "store",
        },
        cancel: "Cancel",
      },
    }).then((value) => {
      switch (value) {
        case "mp":
          dispatch(postMercadoPago(carrito))
            .then((data) => {
              console.log(data);
              window.location.href = data.data.init_point;
            })
            .catch((err) => console.error(err));
          break;

        case "store":
          navigate("/store");
          break;

        default:
          break;
      }
    });
  };

  return (
    <div className="backgroundCart">
      <div>
        <NavBar />
      </div>
      <div>
        {current_cart?.length > 0 ? ( 
          <div className="cart">
            <div className="containerButtonsCart">
              <button 
                className="buttonCleanCart" 
                onClick={() => handleClearCart()}>
                  Clear Cart <GiIcons.GiBroom /> </button>
              <button
              className="buttonBuyCart"
                onClick={
                  typeof id_user === "string"
                    ? () => {
                        handleBuyMercadoPago(current_cart);
                      }
                    : () => {
                        logInToBuy();
                      }
                }
              >Purchase <GiIcons.GiPayMoney /></button>
            </div>
            <div className="containercard">
              {current_cart.map((game) => (
                <div className="containerCart">
                  <div className="cardCart">
                    <Card
                      key={game.id}
                      image={game.image}
                      name={game.name}
                      price={game.price}
                      id={game.id}
                      rating={game.rating}
                    />
                    <button
                      className="buttonRemove"
                      type="reset"
                      onClick={() => handleDelete(game.id)}
                    >
                      <FaIcons.FaTrashAlt />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
            <div className="div">
              <h2 className="CartIsEmpty">The Cart is Empty..</h2>
              <p className="AddGamesCart">Do you want to add games to your Cart ?  <br/>
               <Link to="/store">
                 <button className="btnAddToCart">Let's Go!</button>
               </Link>
              </p>
            </div>
        )}
      </div>
    </div>
  );
}
