import React, { useEffect, useState } from 'react';
import NavBar from '../NavBar/navbar'
import Carousel from 'react-elastic-carousel'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { getAllVideogames, getFilteredVideogames } from '../../redux/actions'
import * as BiIcons from "react-icons/bi"
import CarouselCard from '../CarouselCard/CarouselCard.jsx'
import CarouselFP from '../CarouselCard/CarouselCardFP.jsx'
import CarouselOS from '../CarouselCard/CarouselCardOS.jsx'
import './home.css'
import './carousel.css'
// import Card from '../Card/card'

export default function Home() {
    
    return (
        <div className='background'>
            <div>
                <NavBar/>
            </div>

            <div className='home-component-box'>

                <div className='home20'>
                    <div className='genres-filter'>
                        <div className='filters-column'>
                            <div className='filters-title'>
                                <span>Genres</span>
                                {/* <BiIcons.BiTag className="filter-icon"/> */}
                            </div>
                            <ul className='genres-list'>
                                <li className='genre-txt' >
                                    <Link to="#">
                                        <span>Action</span>
                                    </Link>
                                </li>
                                <li className='genre-txt' >
                                    <Link to="#">
                                        <span>Indie</span>
                                    </Link>
                                </li>
                                <li className='genre-txt' >
                                    <Link to="#">
                                        <span>Adventure</span>
                                    </Link>
                                </li>
                                <li className='genre-txt' >
                                    <Link to="#">
                                        <span>RPG</span>
                                    </Link>
                                </li>
                                <li className='genre-txt' >
                                    <Link to="#">
                                        <span>Strategy</span>
                                    </Link>
                                </li>
                            </ul>
                        </div>


                        <div className='filters-column'>
                            <div className='filters-title'>
                                <span>Tags</span>
                            </div>
                            <ul className='genres-list'>
                                <li className='genre-txt' >
                                    <Link to="#">
                                        <span>Single Player</span>
                                    </Link>
                                </li>
                                <li className='genre-txt' >
                                    <Link to="#">
                                        <span>Co-Op</span>
                                    </Link>
                                </li>
                                <li className='genre-txt' >
                                    <Link to="#">
                                        <span>Multiplayer</span>
                                    </Link>
                                </li>
                                <li className='genre-txt' >
                                    <Link to="#">
                                        <span>MMO</span>
                                    </Link>
                                </li>
                            </ul>
                        </div>


                        <div className='filters-column'>   
                            <div className='filters-title'>
                                <span>ESRB</span>
                            </div>
                            <ul className='genres-list'>
                                <li className='genre-txt' >
                                    <Link to="#">
                                        <span>Everyone</span>
                                    </Link>
                                </li>
                                <li className='genre-txt' >
                                    <Link to="#">
                                        <span>+10</span>
                                    </Link>
                                </li>
                                <li className='genre-txt' >
                                    <Link to="#">
                                        <span>Mature</span>
                                    </Link>
                                </li>
                                <li className='genre-txt' >
                                    <Link to="#">
                                        <span>Adults</span>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className='home60'>

                    {/* Carousel principal */}
                    <div className="ContainerCarousel">
                        <h1 className='main-carousel-title'>Best rated</h1>
                        <CarouselCard/>
                    </div>
                    {/* Carousel secundarios del medio del home */}
                    <div className="CategoryContainerCarousel">
                        <h3 className='category-carousel-title'>Free to Play</h3>
                        <CarouselFP/>
                    </div>

                    <div className="CategoryContainerCarousel">
                        <h3 className='category-carousel-title'>On Sale</h3>
                        <CarouselOS/>
                    </div>

                    <div className='nuestra-info'>
                        <span className='github-link'>ACA VA EL GITHUB</span>
                    </div>
                </div>

            </div>
        </div>
    )
}
