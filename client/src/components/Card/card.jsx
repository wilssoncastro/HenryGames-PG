import React from 'react'
import { Link } from 'react-router-dom'
import "./card.css"

export default function Card({ image, name, price, id, free_to_play, on_sale }) {
  
  return (
    <div className="card">
        <Link className='link' to= {`/store/${id}`}>
          <img className='image' src={image} alt='Imagen no encontrada' width='400px' height='220px'/>
          <ul className='textCard'>
            <li className='titleCard'>{name}</li>
            { free_to_play === true ? <li className='priceCard'>Free to Play</li> : <li className='priceCard'>{"$" + price}</li> }
            { on_sale === true ? <li className='onSale'>On Sale</li> : null }
          </ul>
        </Link>
    </div>
  )
}
