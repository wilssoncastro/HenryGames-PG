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

export default function ShoppingCart() {

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const id_user = localStorage.getItem('id')
  const videogamesInCart = useSelector((state) => state.cart)
  const cartLocal = JSON.parse(localStorage.getItem('cart'))
  
  

  const cartFromLocalStorage = JSON.parse(localStorage.getItem('cart') || '[]')
  const [cart, /* setCart */] = useState(cartFromLocalStorage)

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
    dispatch(getCartById(id_user))
}, [cart, dispatch])

  
  const current_cart = (typeof id_user === 'object') ? cartLocal : videogamesInCart
  

  
  


  const handleDelete = (id) => {
    if(typeof id_user === 'object'){
      localStorage.setItem('cart', JSON.stringify(cartFromLocalStorage.filter(e => e.id !== id)))
    }else{
      dispatch(delFromCart(id_user, id))
    }
    navigate('/my_cart')
  }

  const handleClearCart = () => {
    if(typeof id_user === 'object'){
      localStorage.setItem('cart', JSON.stringify([]))
    }else{
      dispatch(delAllFromCart())
    }
    navigate('/my_cart')
  }
  
  const handleBuyMercadoPago = (carrito) => {
    dispatch(postMercadoPago(carrito))
    .then((data)=>{
          // window.location.assign(data.data.init_point)
          window.open(data.data.init_point);
        })
        .catch(err => console.error(err))
  }

  return (
    <div>
      <div>
        <NavBar />
      </div>
      <div>
      
      {
          current_cart?.length > 0 ? 
          (
            <div style={{marginTop: '100px'}}>
              {
                current_cart.map((game) => (
                  <div>
                    <Card image={game.image} name={game.name} price={game.price} />
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
              
              <button onClick={() => {handleBuyMercadoPago(cartFromLocalStorage)}}>Buy</button>
              
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
