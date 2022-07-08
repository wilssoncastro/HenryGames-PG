import React /* { useEffect, useState } */ from 'react';
import { Link } from 'react-router-dom';

export default function CarouselCatCard({name, id, image, price}) {
  return (
    <div>
        <item>
            <Link to={`/store/${id}`} className='text-deco'>
                <div className='cat-card'>

                    {/* Arriba */}
                    <img className='category-carousel-img' src={image} alt='img not found' />

                    {/* Abajo */}
                    <div className='cat-card-footer'>
                        <h3 className="carousel-card-title">{name}</h3>
                        <span className='carousel-card-price'>{price}</span>
                    </div>
                </div>
            </Link>
        </item>
    </div>
  )
}
