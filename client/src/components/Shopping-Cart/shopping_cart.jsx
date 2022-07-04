import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import NavBar from '../NavBar/navbar'
import Card from '../Card/card'
import {Link, useNavigate} from 'react-router-dom'
import { 
  delFromCart, 
  getCartById,
  deleteAllFromCart,
  postMercadoPago,
  is_authorizated
} 
from '../../redux/actions'
import swal from 'sweetalert'
import './shoppingcart.css'

export default function ShoppingCart() {

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const id_user = localStorage.getItem('id')
  const videogamesInCart = useSelector((state) => state.cart)
  

  const cartFromLocalStorage = JSON.parse(localStorage.getItem('cart'))
  const [cart, /* setCart */] = useState(cartFromLocalStorage)


  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
    dispatch(getCartById(id_user))
    dispatch(is_authorizated())
}, [cart, /* dispatch */])
  
  const current_cart = (typeof id_user === 'string') ? videogamesInCart : cartFromLocalStorage
  console.log(current_cart)
  

  const handleDelete = (id) => {
    localStorage.setItem('cart', JSON.stringify(cartFromLocalStorage.filter(e => e.id !== id)))
    if(!dispatch(is_authorizated())){
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

  const handleClearCart = (e) => {
    if(typeof id_user === 'string'){
      console.log('Entre y paso algo')
      dispatch(deleteAllFromCart(id_user, {'games':videogamesInCart}))
      console.log('mmmm')
    }else{
      localStorage.setItem('cart', [])
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
                console.log(data)
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
          current_cart?.length > 0 ? 
          (
            <div className='cart' /* style={{marginTop: '100px'}} */>
              <div className='containercard'>
              {
                current_cart.map((game) => (
                  <div>
                    <Card key={game.id} image={game.image} name={game.name} price={game.price} id={game.id} />
                    <button type='reset' onClick={() => handleDelete(game.id)}>Remove game from cart</button>
                  </div>
                  )
                )
              }
              <button onClick={() => handleClearCart()}>Clear cart</button>
              <Link to='/home'>
                <button>Back to the main page</button>
              </Link>
              <Link to='/store'>
                <button>Back to the store</button>
              </Link>
              
              <button onClick={typeof id_user === 'string' ? () => {handleBuyMercadoPago(current_cart)} : () => {logInToBuy()}}>Buy</button>
              
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
