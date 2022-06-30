import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import swal from "sweetalert";
import { getWishList, deleteWishList, getUserById } from '../../redux/actions/index';
import NavBar from "../NavBar/navbar";

export default function Profile() {

  const id_user = localStorage.getItem('id')
  
  const dispatch = useDispatch(); 
  let list = useSelector((state) => state.wishList);
  
  useEffect(() => {
    dispatch(getUserById(id_user))
    dispatch(getWishList(id_user));    
  }, [dispatch, id_user])
  
  const handleOnClickDelete = (idGame) => {
    let id = localStorage.getItem("id");
    dispatch(deleteWishList(id, idGame));
    swal({
      title: "Confirmed",
      text: "Videogame was deleted from your wish list",
      icon: "success"
    })
    console.log('algo');
    dispatch(getWishList(id));
  }

  console.log(list);

  return (
    <div>
      <div>
        <NavBar />
      </div>
      <br/>
      <br/>
      <br/>
      <h3>Wish List :</h3>
       { list[0]?.wishs.length !== 0 ? list[0]?.wishs.map((e) => 
       <div> 
         <h4>{e.name}</h4> 
         <img src={e.image} height='100px' width='200px' />
         <h3>{e.price}</h3>
         <button onClick={() => handleOnClickDelete(e.id)}>Delete from Wish List</button>
       </div> 
       ) : "Your wish list is empty" }
    </div>
  )
}
