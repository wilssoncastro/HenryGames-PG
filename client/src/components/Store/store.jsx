import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFilteredVideogames, getAllVideogames, getGenres, /* filterVideogamesByGenre */ } from "../../redux/actions";
// import { CardImg, CardBody, CardTitle, Button, CardText, CardSubtitle, CardGroup } from 'reactstrap';
import Card from "../Card/card.jsx";
import NavBar from "../NavBar/navbar";
/* import SearchBar from '../Searchbar/searchbar'; */
import "./store.css";
import Paginado from "../Paginado/paginado";

export default function Store() {
  const dispatch = useDispatch();
  const allVideogames = useSelector((state) => state.allVideogames)
  const videogames = useSelector((state) => state.videogames);
  const allGenres = useSelector((state) => state.genres)

  const [name, setName] = useState("");
  const [gen, setGen] = useState("");
  const [tag, setTag] = useState("");
  const [esrb, setEsrb] = useState("");
  const [sort, setSort] = useState("");
  const [order, setOrder] = useState("");
  const [page, setPage] = useState(0)
  const [limit, setLimit] = useState(200)

  // const [currentPage, setCurrentPage] = useState(1)
  // const [videogamesPerPage, setVideogamesPerPage] = useState(limit)
  // const indexOfLastVideogame = currentPage * videogamesPerPage
  // const indexOfFirstVideogame = indexOfLastVideogame - videogamesPerPage
  // const currentVideogames = allVideogames.slice(indexOfFirstVideogame, indexOfLastVideogame)
  // const pageQty = allVideogames.length/videogamesPerPage
  // const pageQty = allVideogames.length/limit
  // const currentPage = (page/limit)

  // console.log("length = "+ allVideogames.length + " y limit = "+ limit)
  // console.log("resta = "+ (allVideogames.length-limit))
  // console.log("page = "+ page)
  
  const paginado = (pageNum) => {
    setPage((pageNum-1)*limit);
  };

  useEffect(() => {
    dispatch(getAllVideogames())
    dispatch(getFilteredVideogames(name, gen, tag, esrb, page, sort, order, limit))
    dispatch(getGenres())
  }, [dispatch, name, gen, tag, esrb, page, sort, order, limit])

  // let filterGame = name!==""?currentVideogames.filter((e) => e.name.toLowerCase().includes(name)):currentVideogames
  // gen!==""?filterGame=filterGame.filter((e) => e.genres.find((e) => e.name === gen)):filterGame=filterGame
  // tag!==""?filterGame=filterGame.filter((e) => e.tags.find(e => e.toLowerCase().includes(tag))):filterGame=filterGame
  // esrb!==""?filterGame=filterGame.filter((e) => e.esrb_rating.includes(esrb)):filterGame=filterGame
  

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
    // setVideogamesPerPage(e.target.value);
    // setCurrentPage(1)
  }

  const prev = (e) => {
    e.preventDefault();
    setPage(page - limit)
    // setCurrentPage(parseInt(currentPage) - 1)
  }

  const next = (e) => {
    e.preventDefault();
    setPage(page + parseInt(limit))
    // setCurrentPage(parseInt(currentPage) + 1)
  }

  const handleInputChange = (e) => {
    e.preventDefault();
    setName(e.target.value);
  };

  const handleInputTag = (e) => {
    e.preventDefault();
    setTag(e.target.value);
    // if (e.target.value !== "") {
    //   setVideogamesPerPage(allVideogames.length)
    // }
  };

  // const handleGen = (e) => {
  //   e.preventDefault();
  //   dispatch(filterVideogamesByGenre(e.target.value))
  //   //setCurrentPage(1)
  // }
  const handleGen = (e) => {
    e.preventDefault();
    setGen(e.target.value)
    // if (e.target.value !== "") {
    //   setVideogamesPerPage(allVideogames.length)
    // }
  }

  const handleEsrb = (e) => {
    e.preventDefault();
    setEsrb(e.target.value)
    // if (e.target.value !== "") {
    //   setVideogamesPerPage(allVideogames.length)
    // }
  }

  return (
    <div className="background">
      <div className="first-row">
        <NavBar />
      </div>
      <div className="top-filter">
        <h1>Videogames</h1>
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

          <select className="selectPages" onChange={(e) => handleLimit(e)}>
            <option value="200">Games per page</option>
            <option value="10">10</option>
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

        <div hidden={name.length > 2 || esrb || tag}>
          <button
            className="buttonPrev"
            onClick={(e) => prev(e)}
            disabled={page < 1}
          >
          PREV
          </button>
          <button
            className="buttonNext"
            onClick={(e) => next(e)}
            disabled={parseInt(page) >= (allVideogames.length-limit)}
          >
          NEXT
          </button>
          <div>
            <Paginado limit={limit} page={page} paginado={paginado}/>
          </div>
        </div>
      </div>

      <div className="containercard">
        {videogames.map((v, i) => {
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
          );
        })}
      </div>
    </div>
  );
}
