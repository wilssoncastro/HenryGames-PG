import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import NavBar from '../NavBar/navbar'
import Card from '../Card/card'
import {Link, useNavigate} from 'react-router-dom'

export default function ShoppingCart() {

  const navigate = useNavigate()

  const cartFromLocalStorage = JSON.parse(localStorage.getItem('cart') || '[]')
  const [cart, /* setCart */] = useState(cartFromLocalStorage)

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
}, [cart])

  
  const dispatch = useDispatch()
  const videogamesInCart = useSelector((state) => state.cart)
  const cartLocal = JSON.parse(localStorage.getItem('cart'))


  const handleDelete = (id) => {
    localStorage.setItem('cart', JSON.stringify(cartFromLocalStorage.filter(e => e.id !== id)))
    navigate('/my_cart')
  }

  const handleClearCart = () => {
    localStorage.setItem('cart', JSON.stringify([]))
    navigate('/my_cart')
  }

  return (
    <div>
      <div>
        <NavBar />
      </div>
      <div>
      
      {
          cartFromLocalStorage.length > 0 ? 
          (
            <div style={{marginTop: '100px'}}>
              {
                cartFromLocalStorage.map((game) => (
                  <div>
                    <Card image={game.image} name={game.name} price={game.price} />
                    <button type='reset' onClick={() => handleDelete(game.id)}>Remove game from cart</button>
                  </div>
                  )
                )
              }
              <button>Buy</button>
              <button onClick={() => handleClearCart()}>Clear cart</button>
              <Link to='/home'>
                <button>Back to the main page</button>
              </Link>
              <Link to='/store'>
                <button>Back to the store</button>
              </Link>
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
