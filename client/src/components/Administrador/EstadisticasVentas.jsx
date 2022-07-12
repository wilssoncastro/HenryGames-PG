import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers, getCardStatistics, getSales } from "../../redux/actions";
/* import Card from "../Card/card"; */
//import { Link } from "react-router-dom";
import BarChart from "../Graphics/BarChart";
import LineChart from "../Graphics/LineChart";
import UsersVsSales from "../Graphics/UsersVsSales";
import { ComponentError } from "./componentError";
import NavBar from "../NavBar/navbar";
import './Estadisticas.css';

export default function Estadisticas() {
  const dispatch = useDispatch();
  const videogame = useSelector((state) => state.videogames);
  const sales = useSelector((state) => state.sales)
  const users = useSelector((state) => state.users)
  const [name, setName] = useState("");
  const [statistics, setStatistics] = useState({
    gameSales: false,
    monthlyEarning: false,
    top: false,
    userStatistics: false
  });


  useEffect(() => {
    dispatch(getCardStatistics(name));
    dispatch(getSales())
    dispatch(getAllUsers())
  }, [dispatch, name]);

  const handleInputChange = (e) => {
    e.preventDefault();
    setName(e.target.value);
  };

  let totalPrice = videogame.map((e) => e.price);
  let ventasTotales = videogame.map((e) => e.contador);
  let totalGanancias = 0;
  for (let i = 0; i < totalPrice.length; i++) {
    let ganancias = totalPrice[i] * ventasTotales[i];
    totalGanancias += ganancias;
  }

  let orderVG = videogame.sort(function (b, a) {
    if (a.contador > b.contador) {
      return 1
    }
    if (b.contador > a.contador) {
      return -1
    }
    return 0
  }).slice(0, 10)

  let enero = 0
  let febrero = 0
  let marzo = 0
  let abril = 0
  let mayo = 0
  let junio = 0
  let julio = 0
  let agosto = 0
  let septiembre = 0
  let octubre = 0
  let noviembre = 0
  let diciembre = 0

  for (let i = 0; i < sales.length; i++) {
    const dateA = sales[i].date
    //const dateB = sales[i].createdAt
    if (dateA.slice(5, 7) === "04") {
      abril = abril + sales[i].price
    }
    else if (dateA.slice(5, 7) === "05") {
      mayo = mayo + sales[i].price
    }
    else if (dateA.slice(5, 7) === "06") {
      junio = junio + sales[i].price
    }
    else if (dateA.slice(5, 7) === "07") {
      julio = julio + sales[i].price
    }
  }

  const handleSale = (e) => {
    e.preventDefault()
    setStatistics({
      gameSales: true,
      monthlyEarning: false,
      top: false,
      userStatistics: false
    });
  }
  const handleMonthly = (e) => {
    e.preventDefault()
    setStatistics({
      gameSales: false,
      monthlyEarning: true,
      top: false,
      userStatistics: false
    });
  }
  const handleTop = (e) => {
    e.preventDefault()
    setStatistics({
      gameSales: false,
      monthlyEarning: false,
      top: true,
      userStatistics: false
    });
  }
  const handleUserStatistics = (e) => {
    e.preventDefault()
    setStatistics({
      gameSales: false,
      monthlyEarning: false,
      top: false,
      userStatistics: true
    });
  }

  const id_user_admin = localStorage.getItem('type')
  if (id_user_admin) {
    if (id_user_admin === "adm") {

      return (
        <div className="component_component_estatistics">
          <NavBar />
          <br></br>


          <div className="containerEstatistics">
            <div className="title_estatistics">
              <h1>Sales management indicators</h1>
            </div>


            <div className="estatistics">
              <div className="option_statistics">
                <h2>Select the option you want to see</h2>
                <button className="btn_option" onClick={(e) => handleSale(e)}>Game sales</button>
                <button className="btn_option" onClick={(e) => handleTop(e)}> Top 10 videogames sales </button>
                <button className="btn_option" onClick={(e) => handleMonthly(e)}>Monthly earnings</button>
                <button className="btn_option" onClick={(e) => handleUserStatistics(e)}>User statistics and sales per user</button>
              </div>

              {statistics.gameSales == true &&
                <div className="component_search_videogame_sale">


                  <h2> Total Earns: ${(totalGanancias).toFixed(2)}</h2>
                  <input
                    placeholder="Search Videogame..."
                    value={name}
                    type="text"
                    id="inputName"
                    onChange={(e) => handleInputChange(e)}
                  />
                  <div className="card_game_statistics">
                    {
                      name ?
                      videogame.map((e) => (
                        <div className="card_stadistics">
                          {/* <Card key={e.id} name={e.name} price={e.price} /> */}
                          <h3>{e.name} = ${e.price}</h3>
                          <h4>Sales: {e.contador}</h4>
                          <h4> Game Earns: ${(e.contador * e.price).toFixed(2)}</h4>
                        </div>
                      )):null

                    }
                  </div>
                </div>
              }
              {statistics.top == true &&
                <div className="component_top_videogames">
                  <h2> Top videojuegos vendidos</h2>
                  <BarChart orderVG={orderVG} />
                </div>
              }
              {statistics.monthlyEarning == true &&
                <div className="component_sales_monthly">
                  <h2>Ganancias por mes</h2>
                  <LineChart enero={enero} febrero={febrero} marzo={marzo} abril={abril} mayo={mayo} junio={junio} julio={julio} agosto={agosto} septiembre={septiembre} octubre={octubre} noviembre={noviembre} diciembre={diciembre} />
                </div>
              }
              {statistics.userStatistics == true &&
                <div className="component_users_numbers">
                  <h2>Numero de usuarios y ventas</h2>
                  <UsersVsSales />
                </div>
              }
            </div>
          </div>
        </div>
      )
    } else {
      return (
        <ComponentError></ComponentError>
      )
    }
  } else
    return (
      <ComponentError></ComponentError>
    )



}



