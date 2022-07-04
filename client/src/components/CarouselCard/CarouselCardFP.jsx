import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getFilteredVideogames } from '../../redux/actions'
import Carousel from 'react-elastic-carousel'

export default function CarouselFP() {
  
  //const dispatch = useDispatch();
  const videogames = useSelector((state) => state.videogames)

  // const [nameF] = useState("")
  // const [sort, setSort] = useState('price');
  // const [order, setOrder] = useState('desc');
  // const [limit, setLimit] = useState(15);
  // const [page, setPage] = useState(0)
  
  // useEffect(() => {
  //   dispatch(getFilteredVideogames(nameF, page, sort, order, limit))
  // }, [dispatch, page, sort, order, limit])

  const onsale = videogames.filter((e) => e.free_to_play == true)
  
  return (
    <div>
      <Carousel focusOnSelect={false} itemsToShow={5}>
      {
      onsale.slice(0, 15).map((e) => (
        <item>
        <div className='ItemCarousel'>
          
          {/* IZQUIERDA */}
          <div className='c65'>
            <Link to={`/store/${e.id}`}>
              <img className='imagenes' src={e.image} alt='img not found' />
            </Link>
          </div>

          {/* DERECHA */}
          <div className='c35'>
            <h3 className="legend">{e.name}</h3>
            <div className='screenshots-div'>
              {/* map por los 4 screenshots */}
              <img className='screenshots' src={e.short_screenshots[0]} alt='img not found' />
              <img className='screenshots' src={e.short_screenshots[1]} alt='img not found' />
              <img className='screenshots' src={e.short_screenshots[2]} alt='img not found' />
              <img className='screenshots' src={e.short_screenshots[3]} alt='img not found' />
            </div>
            <div className='c35-footer'>
              <h5 className='footer-txt'>Free to Play</h5>
              <div className='genres-section'>
              {/* <span className='genre-style'>{genres[0].name}</span> */}
                {e.genres.map((g) => (
                  <span className='genre-style'>{g.name}</span>
                ))}
              </div>
              <span className='price-tag'>Free to Play</span>
            </div>
          </div>

        </div>
        </item>
      ))
    }
    </Carousel>
    </div>
  )
}