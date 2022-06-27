import React from 'react'
import { Link } from 'react-router-dom'

export default function Card({ image, name, price, id }) {
  
  return (
    <div className='card'>
      <img className='image' src={image} alt='Imagen no encontrada' width='100px' height='75px'/>
      <h2>{name}</h2>
      <h4>${price}</h4>
      <Link to= {`/store/${id}`}>
      <button>Más</button>
      </Link>
    </div>
  )
}
