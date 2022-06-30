import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFilteredVideogames } from '../../redux/actions';
import { CardImg, CardBody, CardTitle, Button, CardText, CardSubtitle, CardGroup } from 'reactstrap';
import Card from '../Card/card.jsx'
import Cards from '../Card/cards.jsx'
import NavBar from '../NavBar/navbar';
import SearchBar from '../Searchbar/searchbar';
import '../Store/store.css';
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
    <div>
      <div>
        <NavBar />
      </div>
      <h1>Videogames</h1>
      <SearchBar 
        name= {name} 
        setName = {setName}
      />

      <select hidden={name} onChange={(e) => handleLimit(e)}>
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="50">50</option>
          <option value="100">100</option>
          <option value="200">200</option>
      </select>

      <select hidden={name} onChange={(e) => handleSort(e)}>
          <option disabled={sort}>Sort</option>
          <option value='name'>Name</option>
          <option value='price'>Price</option>
          <option value='rating'>Rating</option>
      </select>

      <select hidden={name} onChange={(e) => handleOrder(e)}>
        <option disabled={order}>Order</option>
        <option value='ASC'>Upward</option>
        <option value='DESC'>Downward</option>
      </select>

      <div hidden={name}>
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

      <div className='containercard'>
        {currentVideogames.map((v) => {
          return (
            !name?
            <div>
              <Card
                key={v.id}
                image={v.image}
                name={v.name}
                price={v.price}
                id={v.id}
              />
            </div> : 
            <div>
              <Cards
                key={v.id}
                image={v.image}
                name={v.name}
                rating={v.rating}
                on_sale={v.on_sale}
                price={v.price}
                id={v.id}
              />
            </div>
          );
        })}
      </div>

    </div>
  );
}
