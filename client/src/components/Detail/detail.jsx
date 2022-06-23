import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Link, useParams, useNavigate} from 'react-router-dom'
import { getDetailsVideogame, deleteVideogame } from '../../redux/actions'

export default function Detail() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {id} = useParams();

  const videogame = useSelector((state) => state.details)
  
  useEffect(() => {
    dispatch(getDetailsVideogame(id))
  }, [dispatch, id])

  const handleDelete = (id) => {
    function confirm() {
      var respuesta = window.confirm('¿Seguro/a que quieres eliminar el juego?');
      if(respuesta === true){
        dispatch(deleteVideogame(id));
        navigate('/home');
      }
    }
    confirm();
  }

  
  return (
    <div>
      {
        videogame.id == id ? (
          <div>
            <h1>{videogame.name}</h1>
            <img src={videogame.image} alt='Not found' width='400px' height='210' />
            <p>{videogame.released}</p>
            <p>{videogame.rating}</p>
            <p>{videogame.description}</p>
            <h3>Genres: </h3>
            <div>
            {
            videogame.genres?.map((e) => {
                if (typeof e === "string") {
                  return (
                    <span className="type" key={e}>
                      {e.replace(e[0], e[0].toUpperCase())} |{" "}
                    </span>
                  );
                } else {
                  return <span key={e.name}>{e.name} | </span>;
                }
              })}
              </div>
              <div>
              {
                videogame.free_to_play === true ? <span>Free</span> : 
                <p>{videogame.price}</p>
              }
              </div>
              <div>
                {
                  videogame.short_screenshots?.map((e) => {
                    return (
                      <img src={e} alt='Not found' width='400px' height='210'/>
                    )
                  })
                }
              </div>
              <div>
                {
                  videogame.tags?.map((e) => {
                    return(
                      <p>{e}</p>
                    )
                  })
                }
                <div>
                  {
                    videogame.on_sale === true ? <p>En Oferta!</p> : 
                    null
                  }
                </div>
              </div>
              {
                videogame.db_created && (
                  <button onClick={(e) => handleDelete(e)}>Borrar Videojuego</button>
                )
              }
              <div>
                <Link to="/home">
                  <button>Volver a la Página Principal</button>
                </Link>
              </div>
          </div>
        ) : null
      }
    </div>
  )
}
