import React from 'react'
import NavBar from '../NavBar/navbar'
import { Link } from 'react-router-dom'
import './profile.css'

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
    <div className='Profile'>
      <NavBar/>
      <ul className='Create-Videogame-Bttn'>
        <Link to='/home/createVideogame' > 
          <span>Create Videogame</span>
        </Link>
      </ul>
    </div>
  )
}
