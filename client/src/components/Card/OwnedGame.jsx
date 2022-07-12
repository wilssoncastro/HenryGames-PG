import React from 'react'
import { Link } from 'react-router-dom'
import "./OwnedGame.css"

export default function OwnedGame({ image, name, id }) {
  
  return (
    <div className="og-card">
        <Link className='og-link' to={`/store/${id}`}>
          <img className='og-image' src={image} alt='Imagen no encontrada' width='400px' height='220px'/>
          <ul className='og-textCard'>
            <li className='og-titleCard'>{name}</li>
            <li className='og-launch'>Launch</li>
          </ul>
        </Link>
    </div>
  )
}