import React, { useEffect, useState } from 'react'
import "./paginado.css"
import { useSelector, useDispatch } from 'react-redux';

export default function Paginado({ limit, page, paginado }) {

  const videogames = useSelector((state) => state.videogames)
  const noLimitVG = useSelector((state) => state.noLimitVideogames)

  const pageNumbers = [];
  const pageNum5 = []
  const currentPage = (page / limit) + 1
  const pageQty = Math.ceil((noLimitVG.length) / limit)

  for (let i = 1; i <= pageQty; i++) {
    pageNumbers.push(i)
  }

  // for (let j = currentPage + 1; j < currentPage + 6; j++) {
  //   if (j > 2 && j < pageQty + 1) {
  //     pageNum5.push(pageNumbers[j - 2])
  //   }
  // }

  for (let j = currentPage; j < currentPage + 5; j++) {
    if (j > 1 && j < pageQty) {
      pageNum5.push(pageNumbers[j - 1])
    }
  }

  return (
    <div className='paginado'>
      {
        pageQty > 1 ? <ul className="pagination">
          {
            <button className='edge' onClick={() => paginado(1)}>{1}</button>
          }
          {
            pageNum5.map(number => (
              <li className="number" key={number}>
                <button className="buttonPaginado" onClick={() => paginado(number)}>{number}</button>
              </li>
            ))
          }
          {
            <button className='edge' onClick={() => paginado(pageNumbers.length)}>{pageNumbers.length}</button>
          }
        </ul> : null
      }
    </div>
  )
}
