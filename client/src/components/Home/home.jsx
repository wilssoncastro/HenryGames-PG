import React from 'react'
import NavBar from '../NavBar/navbar'
import Carousel from 'react-elastic-carousel'
import './home.css'
// import { Link } from "react-router-dom";

export default function Home() {
    return (
        <div className='background'>
            <div>
                <NavBar/>
            </div>
            <div className="Carousel">
            <Carousel>
                <div>
                    <img className='imagenes' src="https://i.blogs.es/2db5a8/grand-theft-auto-v-ps5-xbox/1366_2000.jpeg" alt= 'img not found'/>
                    <p className="legend">Legend 1</p>
                </div>
                <div>
                    <img className='imagenes' src="https://i.blogs.es/c97ab3/trucos-san-andreas-1/1366_2000.jpg" alt= 'img not found'/>
                    <p className="legend">Legend 2</p>
                </div>
                <div>
                    <img className='imagenes' src="https://www.somosxbox.com/wp-content/uploads/2021/11/492540bf02636390efd77a305399187b.jpg" alt= 'img not found'/>
                    <p className="legend">Legend 3</p>
                </div>
            </Carousel>
            </div>
        </div>
    )
}
