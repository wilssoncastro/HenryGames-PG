import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFilteredVideogames, getAllVideogames, getGenres } from "../../redux/actions";
// import { CardImg, CardBody, CardTitle, Button, CardText, CardSubtitle, CardGroup } from 'reactstrap';
import Card from "../Card/card.jsx";
import NavBar from "../NavBar/navbar";
/* import SearchBar from '../Searchbar/searchbar'; */
import "./store.css";
import Paginado from "../Paginado/paginado";

export default function Store() {
  const dispatch = useDispatch();
  const allVideogames = useSelector((state) => state.videogames);
  const allGenres = useSelector((state) => state.genres)

  const [name, setName] = useState("");
  const [gen, setGen] = useState("");
  const [tag, setTag] = useState("");
  const [esrb, setEsrb] = useState("");
  const [sort, setSort] = useState("");
  const [order, setOrder] = useState("");

  const [currentPage, setCurrentPage] = useState(1)
  const [videogamesPerPage, setVideogamesPerPage] = useState(200)
  const indexOfLastVideogame = currentPage * videogamesPerPage
  const indexOfFirstVideogame = indexOfLastVideogame - videogamesPerPage
  const currentVideogames = allVideogames.slice(indexOfFirstVideogame, indexOfLastVideogame)
  const pageQty = allVideogames.length/videogamesPerPage
  
  const paginado = (pageNum) => {
    setCurrentPage((pageNum));
  };

  useEffect(() => {
    dispatch(getAllVideogames(sort, order))
    dispatch(getGenres())
  }, [dispatch, sort, order])

  let filterGame = name!==""?currentVideogames.filter((e) => e.name.toLowerCase().includes(name)):currentVideogames
  gen!==""?filterGame=filterGame.filter((e) => e.genres.find((e) => e.name === gen)):filterGame=filterGame
  tag!==""?filterGame=filterGame.filter((e) => e.tags.find(e => e.toLowerCase().includes(tag))):filterGame=filterGame
  esrb!==""?filterGame=filterGame.filter((e) => e.esrb_rating.includes(esrb)):filterGame=filterGame
  

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
    setVideogamesPerPage(e.target.value);
    setCurrentPage(1)
  }

  const prev = (e) => {
    e.preventDefault();
    setCurrentPage(parseInt(currentPage) - 1)
  }

  const next = (e) => {
    e.preventDefault();
    setCurrentPage(parseInt(currentPage) + 1)
  }

  const handleInputChange = (e) => {
    e.preventDefault();
    setName(e.target.value);
    if (e.target.value !== "") {
      setVideogamesPerPage(allVideogames.length)
    }
  };

  const handleInputTag = (e) => {
    e.preventDefault();
    setTag(e.target.value);
    if (e.target.value !== "") {
      setVideogamesPerPage(allVideogames.length)
    }
  };

  const handleGen = (e) => {
    e.preventDefault();
    setGen(e.target.value)
    if (e.target.value !== "") {
      setVideogamesPerPage(allVideogames.length)
    }
  }

  const handleEsrb = (e) => {
    e.preventDefault();
    setEsrb(e.target.value)
    if (e.target.value !== "") {
      setVideogamesPerPage(allVideogames.length)
    }
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
            <option value="200">Items per page</option>
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
            disabled={currentPage < 2}
          >
          PREV
          </button>
          <button
            className="buttonNext"
            onClick={(e) => next(e)}
            disabled={currentPage >= pageQty}
          >
          NEXT
          </button>
          <div>
            <Paginado filterGame={filterGame} currentPage={currentPage} videogamesPerPage={videogamesPerPage} allVideogames={allVideogames} paginado={paginado} />
          </div>
        </div>
      </div>

      <div className="containercard">
        {filterGame.map((v, i) => {
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
