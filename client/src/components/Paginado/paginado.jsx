import React, { useEffect } from 'react'
import "./paginado.css"
import { useSelector, useDispatch } from 'react-redux';
import { getAllVideogames } from '../../redux/actions';

// Los parametros pasados a la funcion se resuelven en el componente que los renderice
export default function Paginado({limit, paginado}) {
  const allVideogames = useSelector((state) => state.allVideogames)
  const dispatch = useDispatch()

  useEffect(() => {  
    dispatch(getAllVideogames());
  }, [dispatch]);

  const pageNumber = [];
  const totalPages = allVideogames.length/limit

  for (let i = 0; i < totalPages; i++) {
    pageNumber.push(i + 1);
  }

  return (
    <div className='paginado'>
      <ul className='pagination'>
        {
          pageNumber?.map(number => (
            <li className='number' key={number}>
              <button onClick={() => paginado(number)}>{number}</button>
            </li>
          ))
        }
      </ul>
    </div>
  )
}
