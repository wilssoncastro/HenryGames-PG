import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import NavBar from '../NavBar/navbar'
import Card from '../Card/card'
import {Link, useNavigate} from 'react-router-dom'
import { 
  delFromCart, 
  getCartById,
  delAllFromCart,
  postMercadoPago } 
from '../../redux/actions'
import swal from 'sweetalert'
import './shoppingcart.css'

export default function ShoppingCart() {

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const id_user = localStorage.getItem('id')
  const videogamesInCart = useSelector((state) => state.cart)

  const cartFromLocalStorage = JSON.parse(localStorage.getItem('cart') || '[]')
  const [cart, /* setCart */] = useState(cartFromLocalStorage)

  console.log(videogamesInCart)

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
    // dispatch(getCartById(id_user))
}, [cart, /* dispatch */])
  
  //const current_cart = (typeof id_user === 'object') ? cartFromLocalStorage : videogamesInCart

  const handleDelete = (id) => {
    localStorage.setItem('cart', JSON.stringify(cartFromLocalStorage.filter(e => e.id !== id)))
    if(typeof id_user === 'object'){
      localStorage.setItem('cart', JSON.stringify(cartFromLocalStorage.filter(e => e.id !== id)))
    }else{
      dispatch(delFromCart(id_user, id))
    }
    navigate('/my_cart')
  }

  const logInToBuy = () => {
    swal({
      title: 'You need log in to buy',
      text: 'Not registered yet?',
      icon: "error",
      buttons: {
        login: {
          text: 'Go to log in',
          value: 'log_in'
        },
        signup: {
          text: 'Go to sign up',
          value: 'sign_up'
        },
        cancel: 'Cancel'
      }
    })
      .then((value) => {
        switch (value) {
          case 'log_in':
            navigate('/log_in')
            break;

          case 'sign_up':
            navigate('/sign_up')
            break;

          default:
            break;
        }
      })
  }

  const handleClearCart = (id) => {
    if(typeof id_user === 'string'){
      dispatch(delFromCart(id_user, id))
    }
    localStorage.setItem('cart', JSON.stringify([]))
    if(typeof id_user === 'object'){
      localStorage.setItem('cart', JSON.stringify([]))
    }else{
      dispatch(delAllFromCart())
    }
    navigate('/my_cart')
  }
  
  const handleBuyMercadoPago = (carrito) => {
    swal({
      title: 'You will be redirected to MercadoPago',
      text: 'Ready?',
      icon: "success",
      buttons: {
        mp: {
          text: 'Go to MercadoPago',
          value: 'mp'
        },
        store: {
          text: 'Go to shop',
          value: 'store'
        },
        cancel: 'Cancel'
      }
    })
      .then((value) => {
        switch (value) {
          case 'mp':
            dispatch(postMercadoPago(carrito))
              .then((data)=>{
                window.open(data.data.init_point);
              })
              .catch(err => console.error(err))
            break;

          case 'store':
            navigate('/store')
            break;

          default:
            break;
        }
      })    
    
  }

  return (
    <div className='backgroundCart'>
      <div>
        <NavBar />
      </div>
      <div >
      
      {
          cartFromLocalStorage.length > 0 ? 
          (
            <div className='cart' /* style={{marginTop: '100px'}} */>
              <div className='containercard'>
              {
                cartFromLocalStorage.map((game) => (
                  <div>
                    <Card key={game.id} image={game.image} name={game.name} price={game.price} id={game.id} />
                    <button type='reset' onClick={() => handleDelete(game.id)}>Remove game from cart</button>
                  </div>
                  )
                )
              }
              </div>
              <div className='containerButtons' >
                <button onClick={() => handleClearCart()}>Clear cart</button>
                <Link to='/home'>
                  <button>Back to the main page</button>
                </Link>
                <Link to='/store'>
                  <button>Back to the store</button>
                </Link>
                
                <button onClick={typeof id_user === 'string' ? () => {handleBuyMercadoPago(cartFromLocalStorage)} : () => {logInToBuy()}}>Buy</button>
              </div>
            </div>
          ) :
          (
          <div>
            <h1 style={{marginTop: '100px'}}>No games in cart...</h1>
            <Link to='/home'>
              <button>Back to the main page</button>
            </Link>
            <Link to='/store'>
              <button>Back to the store</button>
            </Link>
          </div>
          )
        }
      </div>
    </div>
  )
}
