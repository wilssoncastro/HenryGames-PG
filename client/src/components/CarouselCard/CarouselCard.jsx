import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getFilteredVideogames } from '../../redux/actions'

export default function CarouselCard({name, id, image, short_screenshots, genres, price}) {
  // const dispatch = useDispatch();
  // const videogames = useSelector((state) => state.videogames)

  // const [sort, setSort] = useState('rating');
  // const [order, setOrder] = useState('desc');
  // const [limit, setLimit] = useState(6);
  
  // useEffect(() => {
  //   dispatch(getFilteredVideogames(sort, order, limit))
  // }, [dispatch, sort, order, limit])
  
  return (
    <div>
      <item>
        <div className='ItemCarousel'>

          {/* IZQUIERDA */}
          <div className='c65'>
            <Link to={`/store/${id}`}>
              <img className='imagenes' src={image} alt='img not found' />
            </Link>
          </div>

          {/* DERECHA */}
          <div className='c35'>
            <h3 className="legend">{name}</h3>
            <div className='screenshots-div'>
              {/* map por los 4 screenshots */}
              <img className='screenshots' src={short_screenshots[0]} alt='img not found' />
              <img className='screenshots' src={short_screenshots[1]} alt='img not found' />
              <img className='screenshots' src={short_screenshots[2]} alt='img not found' />
              <img className='screenshots' src={short_screenshots[3]} alt='img not found' />
            </div>
            <div className='c35-footer'>
              <h5 className='footer-txt'>Top Seller</h5>
              <div className='genres-section'>
              {/* <span className='genre-style'>{genres[0].name}</span> */}
                {genres.map((g) => (
                  <span className='genre-style'>{g.name}</span>
                ))}
              </div>
              <span className='price-tag'>{price}</span>
            </div>
          </div>

        </div>
      </item>
    </div>
  )
}
