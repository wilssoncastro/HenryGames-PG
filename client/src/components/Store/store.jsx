import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { addWishList, deleteFavorite, getAllVideogames } from '../../redux/actions';
import Card from '../Card/card.jsx'
import NavBar from '../NavBar/navbar';

export default function Store() {
  const dispatch = useDispatch();
  const allVideogames = useSelector((state) => state.videogames)
  const wish = useSelector((state) => state.wishList)
  const id = allVideogames[0]?.id
  const videoWish = wish.find(v => v.id === id)

  function handleWish(e) {
    e.preventDefault();
    if(!videoWish){
      dispatch(addWishList(allVideogames))
    } else {
      dispatch(deleteFavorite(id))
    }
  }

  useEffect(() => {
    dispatch(getAllVideogames());
  }, [dispatch])

  return (
    <div>
      {console.log(wish)}
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
              <button onClick={(e) => handleWish(e)}>{
                !videoWish ? 
                <>Add to wishlist</> :
                <>Delete from wishlist</>
              }</button>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}
