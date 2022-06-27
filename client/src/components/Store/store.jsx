import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllVideogames, getFilteredVideogames } from '../../redux/actions';
import Card from '../Card/card.jsx'
import NavBar from '../NavBar/navbar';
import SearchBar from '../Searchbar/searchbar';

export default function Store() {
  const dispatch = useDispatch();
  const currentVideogames = useSelector((state) => state.videogames);
  console.log(currentVideogames)

  const [name, setName] = useState(""); 
  const [page, setPage] = useState(0); 
  const [sort, setSort] = useState(""); 
  const [order, setOrder] = useState(""); 
  const [limit, setLimit] = useState(10); 

  useEffect(() => {  
     dispatch(getFilteredVideogames(name, page, sort, order, limit));
  }, [dispatch, name, page, sort, order, limit]);

/*  const handleName = (e) => {
  e.preventDefault();
  setName(e.target.value);
 } */
 
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

      {/* <input
        type="text"
        value={name}
        placeholder="Name.."
        onChange={(e) => handleName(e)}
      /> */}

      <select onChange={(e) => handleLimit(e)}>
          <option>Shown per Page</option>
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

      <select   onChange={(e) => handleOrder(e)}>
        <option disabled={order}>Order</option>
        <option value='ASC'>Upward</option>
        <option value='DESC'>Downward</option>
      </select>


      <div>
        {currentVideogames.map((v) => {
          return (
            <div>
              <Card
                key={v.id}
                image={v.image}
                name={v.name}
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
