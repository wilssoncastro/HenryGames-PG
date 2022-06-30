import {useMemo} from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    Title,
    Tooltip,
    Legend,
    Filler,
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

 const salesdata= {
    label: "top sales",
    data: ["9", "8", "7", "8", "3", "4", "2", "8", "5", "6"]
 }

const options = {
    fill: true,
    responsive: false,
    animations: true,
    scales: {
        y:{
            min: 0,
        }
    }
}

export default function BarChart(){
    const data = useMemo(function (){
        return {
            datasets: [salesdata],
            labels: ["play1","play2","play3","play4","play5","play6","play7","play8","play9","play10"]
        }
    }, []);
    return <Bar data ={data} options={options}/>
}