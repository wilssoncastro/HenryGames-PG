import React from 'react'
import { Link } from 'react-router-dom'
import "./card.css"

export default function Cards({ image, name, price, rating, on_sale, id, free_to_play }) {
  
  return (
    <div className='card'>
      <Link className='link' to= {`/store/${id}`}>
        <img className='image' src={image} alt='Imagen no encontrada' width='400px' height='220px'/>
        <h2>{name}</h2>
        <h3>Rating {rating}/5</h3>
        { free_to_play === true ? <p>Free to Play</p> : <h4>${price}</h4> }
        { free_to_play !== true  && on_sale === true && <h3>On Sale!!</h3> }
      </Link>
    </div>
  )
}