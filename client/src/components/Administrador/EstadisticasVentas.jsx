import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCardStatistics } from "../../redux/actions";
/* import Card from "../Card/card"; */
import { Link } from "react-router-dom";
import BarChart from "../Graphics/BarChart";
import LineChart from "../Graphics/LineChart";
import UsersVsSales from "../Graphics/UsersVsSales";

export default function Estadisticas() {
  const dispatch = useDispatch();
  const videogame = useSelector((state) => state.videogames);
  const [name, setName] = useState("");

  useEffect(() => {
    dispatch(getCardStatistics(name));
    console.log("juegos", videogame)
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
    console.log(totalGanancias);
  }

  return (
    <div>
      <div>
        <Link to="/admin">
          <button>Back to Admin page</button>
        </Link>
      </div>
      <br></br>
      <input
        placeholder="Search Videogame..."
        value={name}
        type="text"
        id="inputName"
        onChange={(e) => handleInputChange(e)}
      />

      <h2>Ganancias Totales: ${(totalGanancias).toFixed(2)}</h2>
      {
        name ?
          videogame.map((e) => (
            <div>
              {/* <Card key={e.id} name={e.name} price={e.price} /> */}
              <h3>{e.name} = ${e.price}</h3>
              <h4>Ventas: {e.contador}</h4>
              <h4>Ganancias del juego: ${(e.contador * e.price).toFixed(2)}</h4>
            </div>
          )) : null
      }
      <div>
        <h2> Top videojuegos vendidos</h2>
        <BarChart />
      </div>
      <div>
        <h2>Ganancias por mes</h2>
        <LineChart />
      </div>
      <div>
        <h2>Numero de usuarios y ventas</h2>
        <UsersVsSales />
      </div>
    </div>
  );
}
