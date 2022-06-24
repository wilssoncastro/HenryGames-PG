import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { getAllVideogames } from '../../redux/actions';
import Card from '../Card/card.jsx'
import NavBar from '../NavBar/navbar';

export default function Store() {
  const dispatch = useDispatch();
  const allVideogames = useSelector((state) => state.videogames)


 

  useEffect(() => {
    dispatch(getAllVideogames());
  }, [dispatch])

  return (
    <div>
      <div>
        <NavBar />
      </div>
      <h1>Videogames</h1>
      <div>
        {
          allVideogames.map((v) => {
            return(
              <div>
              <Card key={v.id} image={v.image} name={v.name} price={v.price} id={v.id} />
              </div>
            )
          })
        }
      </div>
    </div>
  )
}
