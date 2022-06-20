import React from 'react'

export default function Card({ image, name }) {
  return (
    <div className='card'>
        <h1>img</h1>
        <img src={image}/>
        <div>
            <h4>Juego{name}</h4>
            <button>...</button>
        </div>
    </div>
  )
}
