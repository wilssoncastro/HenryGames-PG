import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addWishList, deleteFavorite } from '../../redux/actions';

export default function Card({ image, name, price, id }) {
  // const dispatch = useDispatch();
  
  // const videogames = useSelector((state) => state.videogames)
  // const wish = useSelector((state) => state.wishList)
  // const videoWish = wish.find(v => v.id === id)

  // function handleWish() {
  //   if(!videoWish){
  //     dispatch(addWishList(videogames))
  //   } else {
  //     dispatch(deleteFavorite(id))
  //   }
  // }
  
  return (
    <div className='card'>
      <h2>{name}</h2>
      <h4>{price}</h4>
      <img className='image' src={image} alt='Imagen no encontrada' width='400px' height='250px'/>
      {/* <button onClick={handleWish}>{
          !videoWish ? 
          <>Add to wishlist</> :
          <>Delete from wishlist</>
        }</button> */}
    </div>
  )
}
