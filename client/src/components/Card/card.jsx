import React from 'react'

export default function Card({ image, name, price }) {
  return (
    <div className='card'>
        <img src={image} alt='Not found' width='400px' height='250px'/>
        <div>
            <h4>{name}</h4>
            <button>...</button>
            <p>{price}</p>
        </div>
    </div>
  )
}
