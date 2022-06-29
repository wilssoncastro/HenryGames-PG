import React from 'react'
import { Link } from 'react-router-dom'
import "./card.css"

export default function Cards({ image, name, price, rating, on_sale, id }) {
  
  return (
    <div className='card'>
      <Link to= {`/store/${id}`}>
        <img className='image' src={image} alt='Imagen no encontrada' width='400px' height='220px'/>
        <h2>{name}</h2>
        <h3>{rating}</h3>
        {on_sale&&<h3>ON SALE</h3>}
        <h4>${price}</h4>
      </Link>
    </div>
  )
}