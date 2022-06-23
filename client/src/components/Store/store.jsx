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
              <Card image={v.image} name={v.name} price={v.price} />
            )
          })
        }
      </div>
    </div>
  )
}
