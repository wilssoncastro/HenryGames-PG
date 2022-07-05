import {useMemo} from 'react';
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
    Filler,
  } from 'chart.js';

  import { Line } from "react-chartjs-2"

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



const users = {
    label: "Total usuarios",
    data: [50, 80, 150, 200, 270,350,450, 520, 600, 650, 800, 900],
    lineTension: 0.3,
    borderColor: "rgb(191, 42, 42)"
    // Set More Options
  };
     
  const sales = {
    label: "Total ventas",
    data:  [10, 20, 50, 150, 170,220,350, 400, 380, 450, 520, 650],
    lineTension: 0.3,
    borderColor: "rgb(75, 192, 192)"
    // Set More Options
  };
  
  const labels = ["enero","febrero","marzo", "abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre"]

  

export default function UsersVsSales(){
    const data = useMemo(function (){
        return {
            datasets: [users, sales],
            labels,
        }
    }, []);
    return <Line data ={data} options={options}/>
}