<<<<<<< HEAD
import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import swal from "sweetalert";
import { getWishList, deleteWishList } from '../../redux/actions/index';
import NavBar from "../NavBar/navbar";
=======
import React from 'react'
import NavBar from '../NavBar/navbar'
import { Link } from 'react-router-dom'
import './profile.css'
>>>>>>> dev

export default function Profile() {
  
  const dispatch = useDispatch();
  const { id } = useParams(); 
  let list = useSelector((state) => state.wishList);
  
  useEffect(() => {
    dispatch(getWishList(id));    
  }, [dispatch, id])
  
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
<<<<<<< HEAD
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
=======
    <div className='Profile'>
      <NavBar/>
      <ul className='Create-Videogame-Bttn'>
        <Link to='/home/createVideogame' > 
          <span>Create Videogame</span>
        </Link>
      </ul>
>>>>>>> dev
    </div>
  )
}
