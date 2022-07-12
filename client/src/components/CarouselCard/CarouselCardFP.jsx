import React /* { useEffect, useState } */ from 'react';
//import { Link } from 'react-router-dom';
import { /* useDispatch */ useSelector } from 'react-redux';
//import { getFilteredVideogames } from '../../redux/actions'
import Carousel from 'react-elastic-carousel'
import Card from '../Card/card';
import loading from '../../images/loading/Pulse-1.1s-200px.gif'

export default function CarouselFP() {

  const videogames = useSelector((state) => state.videogames)
  const onsale = videogames.filter((e) => e.free_to_play == true)
  
  return (
    <div>
      <Carousel focusOnSelect={false} itemsToShow={5}>
      {
      !videogames.length ?
      <img src={loading} alt='' />
      :
      onsale.slice(0, 15).map((e) => (
        <item>
          
          <Card
            key={e.id}
            image={e.image}
            name={e.name}
            price={e.price}
            free_to_play={e.free_to_play}
            id={e.id}
            rating={e.rating}
          />

        </item>
      ))}
    </Carousel>
    </div>
  )
}