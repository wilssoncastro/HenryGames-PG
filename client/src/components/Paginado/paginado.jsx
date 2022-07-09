import React, { useEffect, useState } from 'react'
import "./paginado.css"
import { useSelector, useDispatch } from 'react-redux';
import { getAllVideogames, getFilteredVideogames } from '../../redux/actions';

export default function Paginado({ limit, page, paginado }) {

  // const allVideogames = useSelector((state) => state.allVideogames)
  // const videogames = useSelector((state) => state.videogames)
  const noLimitVG = useSelector((state) => state.noLimitVideogames)

  // const [name, setName] = useState("");
  // const [gen, setGen] = useState("");
  // const [tag, setTag] = useState("");
  // const [esrb, setEsrb] = useState("");
  // const [sort, setSort] = useState("");
  // const [order, setOrder] = useState("");
  //const [pageF, setPage] = useState(0)
  //const [limitF, setLimit] = useState(200)
  
  // useEffect(() => {  
  //   dispatch(getAllVideogames());
  //   //dispatch(getFilteredVideogames(name, gen, tag, esrb, page, sort, order, limit))
  // }, [dispatch]);
  
  const pageNumbers = [];
  const pageNum5 = []
  const currentPage = (page/limit)
  const resta = ((currentPage-1)*limit)-limit+20
  const pageQty = ((resta+noLimitVG.length)/limit)

  console.log("pageQty "+pageQty)

  for (let i = 0; i < pageQty; i++) {
    pageNumbers.push(i+1)
  }

  for (let j = currentPage-1; j < currentPage + 4; j++) {
    if (j > 2 && j < pageQty+1) {
      pageNum5.push(pageNumbers[j-2])
    }
  }
  
  return  (
    <div className='paginado'>
      {
        pageQty>1?<ul className="pagination">
          {
            <button className='edge' onClick={() => paginado(1)}>{1}</button>
          }
          { 
            pageNum5.map(number =>(
              <li className="number" key={number}>
                <button className="buttonPaginado" onClick={()=> paginado(number)}>{number}</button>
              </li>
            ))
          }
          {
            <button className='edge' onClick={() => paginado(pageNumbers.length)}>{pageNumbers.length}</button>
          }
        </ul>:null
      }
    </div>
  )
  
  // for (let i = 0; i < pageQty; i++) {
  //   pageNumbers.push(i + 1);
  // }
  
  // for (let j = videogamesPerPage; j < videogamesPerPage + 5; j++) {
  //   if ((j-2) > 0 && (j-1) < pageQty) {
  //     pageNum5.push(pageNumbers[j-2])
  //   }
  // }
  
  // return (
  //   <div className='paginado'>
  //     <ul className='pagination'>
  //       <button className='edge' onClick={() => paginado(1)}>{1}</button>
  //       <br/>
  //       {
  //         pageNum5.map(n => (
  //           <li className='number' key={n}>
  //             <button className='buttonPaginado' onClick={() => paginado(n)}>{n}</button>
  //           </li> 
  //         ))
  //       }
  //       <br/>
  //       {
  //         <button className='edge' onClick={() => paginado(pageNumbers.length)}>{pageNumbers.length}</button>
  //       }        
  //     </ul>
  //   </div>
  // )
}

//pageNumbers.length>1?
