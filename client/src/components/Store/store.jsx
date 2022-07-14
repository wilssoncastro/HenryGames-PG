import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFilteredVideogames, getAllVideogames, getGenres, getNoLimitFilteredVideogames } from "../../redux/actions";
import Card from "../Card/card.jsx";
import NavBar from "../NavBar/navbar";
import "./store.css";
import Paginado from "../Paginado/paginado";
import loading from '../../images/loading/Bean Eater-1s-200px.gif'
import Footer from '../Footer/Footer';
import * as GrIcons from 'react-icons/gr'
import { FaTruckPickup } from "react-icons/fa";

export default function Store() {
  const dispatch = useDispatch();
  const noLimitVG = useSelector((state) => state.noLimitVideogames)
  const videogames = useSelector((state) => state.videogames);
  const allGenres = useSelector((state) => state.genres)

  const [name, setName] = useState("");
  const [gen, setGen] = useState("");
  const [tag, setTag] = useState("");
  const [esrb, setEsrb] = useState("");
  const [on_sale, setOnSale] = useState("")
  const [free_to_play, setFtp] = useState("")
  const [sort, setSort] = useState("");
  const [order, setOrder] = useState("");
  const [page, setPage] = useState(0)
  const [limit, setLimit] = useState(10)

  const paginado = (pageNum) => {
    setPage((pageNum - 1) * limit);
  };

  useEffect(() => {
    if (!videogames) {
      getAllVideogames();
    }
    dispatch(getFilteredVideogames(name, gen, tag, esrb, on_sale, free_to_play, page, sort, order, limit))
    dispatch(getNoLimitFilteredVideogames(name, gen, tag, esrb, on_sale, free_to_play, page, sort, order))
    dispatch(getGenres())
  }, [dispatch, name, gen, tag, esrb, on_sale, free_to_play, page, sort, order, limit])

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
    setLimit(e.target.value)
  }

  const prev = (e) => {
    e.preventDefault();
    setPage(page - limit)
  }

  const next = (e) => {
    e.preventDefault();
    setPage(page + parseInt(limit))
  }

  const handleInputChange = (e) => {
    e.preventDefault();
    setName(e.target.value);
    setPage(0)
  };

  const handleInputTag = (e) => {
    e.preventDefault();
    setTag(e.target.value);
    setPage(0)
  };

  const handleGen = (e) => {
    e.preventDefault();
    setGen(e.target.value)
    setPage(0)
  }

  const handleEsrb = (e) => {
    e.preventDefault();
    setEsrb(e.target.value)
    setPage(0)
  }

  const handleOnSale = (e) => {
    e.preventDefault();
    setOnSale(e.target.value)
    setFtp("")
    setPage(0)
  }
  
  const handleFtp = (e) => {
    e.preventDefault();
    setFtp(e.target.value)
    setOnSale("")
  // const handleOnSale = (e) => {
  //   e.preventDefault();
  //   setOnSale(e.target.value)
  //   setFtp(!true)
  //   setPage(0)
  // }
  
  // const handleFtp = (e) => {
  //   e.preventDefault();
  //   setFtp(e.target.value)
  //   setOnSale(!true)
  //   setPage(0)
  }

  const handleFtpOnSale = (e) => {
    if(e.target.value === 'ftp'){
      setFtp(true)
      setOnSale(false)
    }
    if(e.target.value === 'on_sale'){
      setOnSale(true)
      setFtp(false)
      
    }
    if(e.target.value === ''){
      setOnSale('')
      setFtp('')
    }
    setPage(0)
  }

  return (
    <div className="backgroundStore">
      <NavBar />
      <div >
        
        <div className="top-filter">
          <div className="containerFilters">

            <input
              value={name}
              type="text"
              placeholder="Search Videogames..."
              onChange={(e) => handleInputChange(e)}
              className="inputSearchStore"
            />

            <input
              value={tag}
              type="text"
              placeholder="Search Tags..."
              onChange={(e) => handleInputTag(e)}
              className="inputSearchStore"
            />

            <select className="selectPages" onChange={(e) => handleGen(e)}>
              <option value="">All Genres</option>
              {
                
                allGenres.map((e) => {
                  return (
                    <option value={e.name}>{e.name}</option>
                  ) 
                })
              }
            </select>

            <select className="selectPages" onChange={(e) => handleEsrb(e)}>
              <option value="">All Esrb Ratings</option>
              <option value="Everyone">Everyone</option>
              <option value="Everyone +10">Everyone +10</option>
              <option value="Teen">Teen</option>
              <option value="Mature">Mature</option>
              <option value="Adults Only">Adults Only</option>
            </select>

            <select className="selectPages" onChange={(e) => handleFtpOnSale(e)}>
              <option value="">All Sales</option>
              <option value="on_sale">On Sale</option>
              <option value="ftp">Free to Play</option>
            </select>

            {/* <select className="selectPages" onChange={(e) => handleFtp(e)}>
              <option value="">All Games</option>
              <option value="true">Free to Play</option>
            </select> */}

            <select className="selectPages" onChange={(e) => handleLimit(e)}>
              <option value="10">Games per page (10)</option>
              <option value="20">20</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>

            <select className="selectFilters" onChange={(e) => handleSort(e)}>
              <option disabled={sort}>Sort</option>
              <option value="name">Name</option>
              <option value="price">Price</option>
              <option value="rating">Rating</option>
            </select>

            <select className="selectOrder" onChange={(e) => handleOrder(e)}>
              <option disabled={order}>Order</option>
              <option value="ASC">Upward</option>
              <option value="DESC">Downward</option>
            </select>
          </div>

          <div className='Paginated' hidden={name.length > 2}>
            <button
              className="buttonPrevNext"
              onClick={(e) => prev(e)}
              disabled={page < 1}
            >
              <GrIcons.GrPrevious size={16}/>
            </button>
            
            <Paginado limit={limit} page={page} paginado={paginado} />
            
            <button
              className="buttonPrevNext"
              onClick={(e) => next(e)}
              disabled={parseInt(page) >= (noLimitVG.length - limit)}
            >
              <GrIcons.GrNext size={16}/>
            </button>
          </div>
        </div>

        { !videogames.length ?
            <div className="loadingStore">
              <img src={loading} alt=''/>
            </div>
            :
            <div className="containercard">
              {videogames.map((v, i) => {
                return(
                  <div className="eachCard">
                    <Card
                      key={v.id}
                      image={v.image}
                      name={v.name}
                      price={v.price}
                      free_to_play={v.free_to_play}
                      on_sale={v.on_sale}
                      id={v.id}
                      rating={v.rating}
                    />
                  </div>
                )
              })}
            </div>
        }
      </div>
      <Footer />
      
    </div>
  );
}
