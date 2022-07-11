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
   /*  Filler, */
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

// const scores = [1,1.3,1.6,2,2.6,3.5,4.5,5.5,6.7,7.5,8.5,9.9]


const labels = ["enero","febrero","marzo", "abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre"]

const options = {
    fill: true,
    responsive: true,
    scales: {
        y:{
            min: 0,
        }
    }
}

export default function LineChart({ enero, febrero, marzo, abril, mayo, junio, julio, agosto, septiembre, octubre, noviembre, diciembre }){
    const scores = [enero, febrero, marzo, abril, mayo, junio, julio, agosto, septiembre, octubre, noviembre, diciembre]
    const data = {
            datasets: [{
                label: "Sales",
                data: scores,
                tension:0.3,
                borderColor: "rgb(75, 192, 192)",
                pointRadisu:6,
                pointBackgroundColor: "rgb(75, 192, 192)",
            }],
            labels,
        }
    return <Line data ={data} options={options}/>
}