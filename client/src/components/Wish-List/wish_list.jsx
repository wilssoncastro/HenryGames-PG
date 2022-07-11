import React from 'react'
import { useSelector } from 'react-redux'
import Card from '../Card/card'
import NavBar from '../NavBar/navbar'

export default function Wish_list() {
  const wish = useSelector((state) => state.wishList)

  return (
    <div>
      <div>
        <NavBar />
      </div>
        {
          (wish.length !== 0 )? 
          (
            <div>
              {
                wish.map(v =>
                  <Card id={v.id} name={v.name} price={v.price} />
                  )
              }
            </div>
          ) :
          (
          <div>
            <h1 style={{marginTop: '100px'}}>No wish game...</h1>
          </div>
          )
        }
    </div>
  )
}
