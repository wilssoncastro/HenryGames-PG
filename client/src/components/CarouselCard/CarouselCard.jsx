import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getFilteredVideogames } from '../../redux/actions'
import Carousel from 'react-elastic-carousel'
import loading from '../../images/loading/Pulse-1.1s-200px.gif'

export default function CarouselCard() {
  
  const dispatch = useDispatch();
  const videogames = useSelector((state) => state.videogames)

  const [name, setName] = useState("");
  const [gen, setGen] = useState("")
  const [tag, setTag] = useState("");
  const [esrb, setEsrb] = useState("");
  const [on_sale, setOnSale] = useState("");
  const [free_to_play, setFtp] = useState("")
  const [page, setPage] = useState(0)
  const [limit, setLimit] = useState(200)
  const [sort, setSort] = useState('rating');
  const [order, setOrder] = useState('desc');

  useEffect(() => {
    dispatch(getFilteredVideogames(name, gen, tag, esrb, on_sale, free_to_play, page, sort, order, limit))
  }, [dispatch, name, gen, tag, esrb, on_sale, free_to_play, page, sort, order, limit])
  
  return (
    <div>
      <Carousel focusOnSelect={false}>
      {!videogames.length ?
      <img src={loading} alt='' />
      :
      videogames.slice(0, 6).map((e) => (
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
              <img className='screenshots-carousel' src={e.short_screenshots[0]} alt='img not found' />
              <img className='screenshots-carousel' src={e.short_screenshots[1]} alt='img not found' />
              <img className='screenshots-carousel' src={e.short_screenshots[2]} alt='img not found' />
              <img className='screenshots-carousel' src={e.short_screenshots[3]} alt='img not found' />
            </div>
            <div className='c35-footer'>
              <h5 className='footer-txt'>Rating {e.rating}</h5>
              <div className='genres-section'>
                {e.genres.map((g) => (
                  <span className='genre-style'>{g.name}</span>
                ))}
              </div>
              <span className='price-tag'>${e.price}</span>
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
