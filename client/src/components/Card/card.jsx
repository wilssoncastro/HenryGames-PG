import React from 'react'
import { Link } from 'react-router-dom'
import "./card.css"

export default function Card({ image, name, price, id }) {
  
  return (
    <div className='card'>
      <Link className='link' to= {`/store/${id}`}>
        <img className='image' src={image} alt='Imagen no encontrada' width='400px' height='220px'/>
        <h2>{name}</h2>
        <h4>${price}</h4>
      </Link>
    </div>
  )
}
