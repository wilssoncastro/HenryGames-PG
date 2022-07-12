import React from 'react'
import { Link } from 'react-router-dom'
import "./card.css"
import * as FcIcons from 'react-icons/fc'
import * as IoMdIcons from 'react-icons/io'

export default function Card({ image, name, price, id, free_to_play, on_sale, rating }) {
  
  return (
    <section className="card">
        <Link className='link' to= {`/store/${id}`}>
          <img src={image} alt='Imagen no encontrada' width='400px' height='220px'/>
          { on_sale === true && free_to_play === false ? <p className='onSale'>On Sale</p> : null }
          <ul className='ContainerText'>
            <li className='titleCard'>{name}</li>
            <li className='LastRow'>
              <p className='ratingCard'>{rating} <FcIcons.FcRating /></p>
              { free_to_play === true ? <p className='priceCard'>Free to Play</p> : <p className='priceCard'>${price}<IoMdIcons.IoMdPricetags/></p> }
            </li>
          </ul>
        </Link>
    </section>
  )
}
