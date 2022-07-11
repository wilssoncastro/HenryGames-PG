import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFilteredVideogames, getAllVideogames, getGenres, getNoLimitFilteredVideogames } from "../../redux/actions";
import Card from "../Card/card.jsx";
import NavBar from "../NavBar/navbar";
import "./store.css";
import Paginado from "../Paginado/paginado";
import loading from '../../images/loading/Bean Eater-1s-200px.gif'

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
  const [sort, setSort] = useState("");
  const [order, setOrder] = useState("");
  const [page, setPage] = useState(0)
  const [limit, setLimit] = useState(200)

  const paginado = (pageNum) => {
    setPage((pageNum - 1) * limit);
  };

  useEffect(() => {
    dispatch(getFilteredVideogames(name, gen, tag, esrb, on_sale, page, sort, order, limit))
    dispatch(getNoLimitFilteredVideogames(name, gen, tag, esrb, on_sale, page, sort, order))
    dispatch(getGenres())
  }, [dispatch, name, gen, tag, esrb, on_sale, page, sort, order, limit])

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
    setPage(0)
  }

  return (
    <div className="backgroundStore">
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

          <select className="selectPages" onChange={(e) => handleOnSale(e)}>
            <option value="">All Sales</option>
            <option value="true">On Sale</option>
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

        <div hidden={name.length > 2}>
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
            disabled={parseInt(page) >= (noLimitVG.length - limit)}
          >
            NEXT
          </button>
          <div>
            <Paginado limit={limit} page={page} paginado={paginado} />
          </div>
        </div>
      </div>

      {/* <div className="containercard"> */}
        { !videogames.length ?
            <div className="loadingStore">
              <img src={loading} alt=''/>
            </div>
            :
            <div className="containercard">
              {videogames.map((v, i) => {
                return(
                  <div>
                    <Card
                      key={v.id}
                      image={v.image}
                      name={v.name}
                      price={v.price}
                      free_to_play={v.free_to_play}
                      on_sale={v.on_sale}
                      id={v.id}
                    />
                  </div>
                )
              })}
            </div>
        }
      {/* </div> */}
    </div>
  );
}
