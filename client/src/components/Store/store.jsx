import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFilteredVideogames } from '../../redux/actions';
// import { CardImg, CardBody, CardTitle, Button, CardText, CardSubtitle, CardGroup } from 'reactstrap';
import Card from '../Card/card.jsx'
import NavBar from '../NavBar/navbar';
import SearchBar from '../Searchbar/searchbar';
import './store.css';
import Paginado from '../Paginado/paginado';

export default function Store() {
  const dispatch = useDispatch();
  const currentVideogames = useSelector((state) => state.videogames);
  
  const [name, setName] = useState(""); 
  const [page, setPage] = useState(0); 
  const [sort, setSort] = useState(""); 
  const [order, setOrder] = useState(""); 
  const [limit, setLimit] = useState(10);

  const paginado = (pageNum) => {
    setPage((pageNum-1)*limit)
  }
  
  useEffect(() => {  
    dispatch(getFilteredVideogames(name, page, sort, order, limit));
  }, [dispatch, name, page, sort, order, limit]);

 const handleSort = (e) => {
  e.preventDefault();
  setSort(e.target.value);
 }

 const handleOrder = (e) => {
  e.preventDefault();
  setOrder(e.target.value);
 }

 const handleLimit = (e) => {
  e.preventDefault();
  setLimit(e.target.value);
 }

 const prev = (e) => {
  e.preventDefault();
  setPage(page - limit)
 }
 
 const next = (e) => {
  e.preventDefault();
  setPage(parseInt(page) + parseInt(limit))
 }
 

  return (
    <div className='background'>
      <div className='first-row'>
        <NavBar />
      </div>
      <div className='top-filter'>
        <h1>Videogames</h1>
        <SearchBar
          name= {name} 
          setName = {setName}
          setPage={setPage}
        />

        <select onChange={(e) => handleLimit(e)}>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
            <option value="100">100</option>
            <option value="200">200</option>
        </select>

        <select onChange={(e) => handleSort(e)}>
            <option disabled={sort}>Sort</option>
            <option value='name'>Name</option>
            <option value='price'>Price</option>
            <option value='rating'>Rating</option>
        </select>

        <select onChange={(e) => handleOrder(e)}>
          <option disabled={order}>Order</option>
          <option value='ASC'>Upward</option>
          <option value='DESC'>Downward</option>
        </select>

        <div hidden={name.length > 2}>
          <button onClick={(e) => prev(e)} disabled={page < 10}>PREV</button>
          <button onClick={(e) => next(e)} disabled={parseInt(limit) + parseInt(page) > 198}>NEXT</button>
          <div>
            <Paginado
              page={page}
              limit={limit}
              paginado={paginado}
            />
          </div>
        </div>
      </div>

      <div className='containercard'>
        {
          currentVideogames.map((v, i) => {
            return (
              <div>
                <Card
                  key={v.id}
                  image={v.image}
                  name={v.name}
                  price={v.price}
                  free_to_play={v.free_to_play}
                  id={v.id}
                />
              </div>
            )
          })
        }
      </div>
    </div>
  );
}
