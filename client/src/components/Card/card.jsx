import React from 'react'
import { Link } from 'react-router-dom'

export default function Card({ image, name, price }) {
  return (
    <div className='card'>
      
      <h2>{name}</h2>
      <h4>${price}</h4>
      <img className='image' src={image} alt='Imagen no encontrada' width='400px' height='250px'/>
      <Link to= '/home/:id'>
      <button>Más</button>
      </Link>
    </div>
  )
}
