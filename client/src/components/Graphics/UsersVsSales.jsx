import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

//import {useMemo} from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    /* Filler, */
  } from 'chart.js';

  import { Line } from "react-chartjs-2"
import { getAllUsers, getCardStatistics, getSales } from "../../redux/actions";

  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );
  

const options = {
  fill: true,
  responsive: true,
  scales: {
    y:{
      min: 0,
      
    }
  }
}

  // const sales = {
  //   label: "Total ventas",
  //   data:  [],
  //   lineTension: 0.3,
  //   borderColor: "rgb(75, 192, 192)"
  // };
  
  const labels = ["enero","febrero","marzo", "abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre"]

export default function UsersVsSales(){

  const users = useSelector((state) => state.users)
  const sales = useSelector((state) => state.sales)
  const [name] = useState("")
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(getCardStatistics(name))
    dispatch(getAllUsers())
    dispatch(getSales())
  }, [dispatch, name])

  let enero = [0, 0]
  let febrero = [0, 0]
  let marzo = [0, 0]
  let abril = [0, 0]
  let mayo = [0, 0]
  let junio = [0, 0]
  let julio = [0, 0]
  let agosto = [0, 0]
  let septiembre = [0, 0]
  let octubre = [0, 0]
  let noviembre = [0, 0]
  let diciembre = [0, 0]

for (let i = 0; i < users.length; i++) {
  const date = users[i].createdAt
  if (date.slice(5,7) === "04") {
    abril[0] = abril[0] + 1
  }
  else if (date.slice(5,7) === "05") {
    mayo[0] = mayo[0] + 1
  }
  else if (date.slice(5,7) === "06") {
    junio[0] = junio[0] + 1
  }
  else if (date.slice(5,7) === "07") {
    julio[0] = julio[0] + 1
  }
}

for (let i = 0; i < sales.length; i++) {
  const date = sales[i].createdAt
  if (date.slice(5,7) === "04") {
    abril[1] = abril[1] + 1
  }
  else if (date.slice(5,7) === "05") {
    mayo[1] = mayo[1] + 1
  }
  else if (date.slice(5,7) === "06") {
    junio[1] = junio[1] + 1
  }
  else if (date.slice(5,7) === "07") {
    julio[1] = julio[1] + 1
  }
}

const usersGr = {
  label: "Signed up Users",
  data: [enero[0], febrero[0], marzo[0], abril[0], mayo[0], junio[0], julio[0], agosto[0], septiembre[0], octubre[0], noviembre[0], diciembre[0]],
  lineTension: 0.3,
  borderColor: "rgb(191, 42, 42)"
};

const salesGr = {
  label: "Sold units",
  data: [enero[1], febrero[1], marzo[1], abril[1], mayo[1], junio[1], julio[1], agosto[1], septiembre[1], octubre[1], noviembre[1], diciembre[1]],
  lineTension: 0.3,
  borderColor: "rgb(75, 192, 192)"
}

const data =  {
  datasets: [usersGr, salesGr],
  labels,
}
  return <Line data ={data} options={options}/>
}