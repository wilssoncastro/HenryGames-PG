import React from 'react'
import "./paginado.css"
import { useSelector } from 'react-redux';

export default function Paginado({ limit, page, paginado }) {

  const noLimitVG = useSelector((state) => state.noLimitVideogames)
  
  const pageNumbers = [];
  const pageNum5 = []
  const currentPage = (page / limit) + 1
  const pageQty = limit>0?Math.ceil(noLimitVG.length / limit):1

  for (let i = 1; i <= pageQty; i++) {
    pageNumbers.push(i)
  }

  for (let j = currentPage; j < currentPage + 5; j++) {
    if (j > 1 && j < pageQty) {
      pageNum5.push(pageNumbers[j - 1])
    }
  }

let activeEdgeInitial = (currentPage === 1)
let activeEdgeFinal = (currentPage === pageNumbers.length)

  return (
    <div className='paginado'>
      {
        pageQty > 1 ? <ul className="pagination">
          
          {
            
            <button className={activeEdgeInitial ? 'PaginadoActive' : 'EdgeInactive'} onClick={() => paginado(1)}>{1}</button>
          }
          {
            pageNum5.map(number => {
              let active = (currentPage === number)
              return (
                <button className={active ? 'PaginadoActive' : 'PaginadoInactive'} onClick={() => paginado(number)}>{number}</button>
              
            )})
          }
          {
            <button className={activeEdgeFinal ? 'PaginadoActive' : 'EdgeInactive'} onClick={() => paginado(pageNumbers.length)}>{pageNumbers.length}</button>
          }
        </ul> : null
      }
    </div>
  )
}
