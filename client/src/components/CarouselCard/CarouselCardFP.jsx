import React /* { useEffect, useState } */ from 'react';
//import { Link } from 'react-router-dom';
import { /* useDispatch */ useSelector } from 'react-redux';
//import { getFilteredVideogames } from '../../redux/actions'
import Carousel from 'react-elastic-carousel'
import Card from '../Card/card';

export default function CarouselFP() {

  const videogames = useSelector((state) => state.videogames)
  const onsale = videogames.filter((e) => e.free_to_play == true)
  
  return (
    <div>
      <Carousel focusOnSelect={false} itemsToShow={5}>
      {onsale.slice(0, 15).map((e) => (
        <item>
          
          <Card
            key={e.id}
            image={e.image}
            name={e.name}
            price={e.price}
            free_to_play={e.free_to_play}
            id={e.id}
          />

        </item>
      ))}
    </Carousel>
    </div>
  )
}