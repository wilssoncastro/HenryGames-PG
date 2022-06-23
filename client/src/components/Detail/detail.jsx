import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { getDetailsVideogame } from '../../redux/actions'
import {useParams} from 'react-router-dom'

export default function Detail(props) {
  const dispatch = useDispatch()
  const detail = useSelector((state) => state.details)
  const {id} = useParams()

  useEffect(() => {
    dispatch(getDetailsVideogame(id))
  }, [dispatch, id])

  return (
    <div>
      {console.log(detail)}
      {
        // eslint-disable-next-line eqeqeq
        detail.id == id ? (
          <div>
            <h1>{detail.name}</h1>
            <img src={detail.image} alt='Not found' width='400px' height='210' />
            <p>{detail.released}</p>
            <p>{detail.rating}</p>
            <p>{detail.description}</p>
            <h3>Genres: </h3>
            <div>
            {
            detail.genres?.map((e) => {
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
                detail.free_to_play === true ? <span>Free</span> : 
                <p>{detail.price}</p>
              }
              </div>
              <div>
                {
                  detail.short_screenshots?.map((e) => {
                    return (
                      <img src={e} alt='Not found' width='400px' height='210'/>
                    )
                  })
                }
              </div>
              <div>
                {
                  detail.tags?.map((e) => {
                    return(
                      <p>{e}</p>
                    )
                  })
                }
                <div>
                  {
                    detail.on_sale === true ? <p>ON SALE!</p> : 
                    null
                  }
                </div>
              </div>
          </div>
        ) : null
      }
    </div>
  )
}
