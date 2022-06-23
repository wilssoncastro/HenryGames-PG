import React, { Fragment } from 'react'
import NavBar from '../NavBar/navbar'
import Carousel from 'react-elastic-carousel'
import './home.css'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { getAllVideogames } from '../../redux/actions'
// import { Link } from "react-router-dom";

export default function Home() {
    const dispatch = useDispatch();
    const allVideogames = useSelector((state) => state.videogames)

    useEffect(() => {
        dispatch(getAllVideogames());
    }, [dispatch])

    return (
        <div className='background'>
            <div>
                <NavBar/>
            </div>
            <div className="Carousel">
                <Carousel>
                    <div>
                        <img className='imagenes' src= 'https://cdn2.unrealengine.com/Diesel%2Fproductv2%2Fgrand-theft-auto-v%2Fhome%2FGTAV_EGS_Artwork_1920x1080_Hero-Carousel_V06-1920x1080-1503e4b1320d5652dd4f57466c8bcb79424b3fc0.jpg' alt= 'img not found'/>
                        <p className="legend">Grand Theft Auto V</p>
                    </div>
                    <div>
                        <img className='imagenes' src="https://i.blogs.es/35200c/gta-san-andreas-android/1366_2000.jpeg" alt= 'img not found'/>
                        <p className="legend">Grand Theft Auto San Andreas</p>
                    </div>
                    <div>
                        <img className='imagenes' src="https://www.somosxbox.com/wp-content/uploads/2021/11/492540bf02636390efd77a305399187b.jpg" alt= 'img not found'/>
                        <p className="legend">Grand Theft Auto IV</p>
                    </div>
                </Carousel>
            </div>
        </div>
    )
}
