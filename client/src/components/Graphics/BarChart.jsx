//import { useMemo } from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    Title,
    Tooltip,
    Legend,
    /* Filler */
  } from 'chart.js';

  import { Bar } from "react-chartjs-2"

  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    Title,
    Tooltip,
    Legend
  );

const options = {
    fill: true,
    responsive: true,
    animations: true,
    scales: {
        y:{
            min: 0,
        }
    }
}

export default function BarChart({ orderVG }){
    let sales = orderVG.map(e => e.contador)
    let names = orderVG.map(e => e.name)
    const salesdata= {
        label: "Top Sales",
        data: sales
    }
    const data = {
        datasets: [salesdata],
        labels: names,
    }
    return <Bar data={data} options={options} />
}