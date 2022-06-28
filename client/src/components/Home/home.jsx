import React from 'react'
import NavBar from '../NavBar/navbar'
import Carousel from 'react-elastic-carousel'
import { Link } from 'react-router-dom'
import * as BiIcons from "react-icons/bi"
import './home.css'
import './carousel.css'

// traerse todos los jueguitos
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { getAllVideogames } from '../../redux/actions'
// import Card from '../Card/card'

export default function Home() {
    const dispatch = useDispatch();
    // const allVideogames = useSelector((state) => state.allVideogames);
    // const currentVideogames = useSelector((state) => state.videogames);

    useEffect(() => {
        dispatch(getAllVideogames());
    }, [dispatch])

    return (
        <div className='background'>
            <div>
                <NavBar/>
            </div>

            <div className='home-component-box'>

                <div className='home20'>
                    <div className='genres-filter'>
                        <div className='filters-title'>
                            <span>Genres</span>
                            <BiIcons.BiTag className="filter-icon"/>
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

                <div className='home60'>
                    {/* Carousel principal */}
                    <div className="ContainerCarousel">
                        <Carousel focusOnSelect={false}>
                            <item>
                                <div className='ItemCarousel'>
                                    <Link to='/store/3498'>
                                        <div className='c65'>
                                            <img className='imagenes' src="https://cdn2.unrealengine.com/Diesel%2Fproductv2%2Fgrand-theft-auto-v%2Fhome%2FGTAV_EGS_Artwork_1920x1080_Hero-Carousel_V06-1920x1080-1503e4b1320d5652dd4f57466c8bcb79424b3fc0.jpg" alt= 'img not found'/>
                                        </div>
                                    </Link>
                                    <div className='c35'>
                                        <h3 className="legend">Grand Theft Auto V</h3>
                                        <div className='screenshots-div'>
                                            <img className='screenshots' src='https://media.rawg.io/media/screenshots/a7c/a7c43871a54bed6573a6a429451564ef.jpg' alt='img not found' />
                                            <img className='screenshots' src='https://media.rawg.io/media/screenshots/cf4/cf4367daf6a1e33684bf19adb02d16d6.jpg' alt='img not found' />
                                            <img className='screenshots' src='https://media.rawg.io/media/screenshots/f95/f9518b1d99210c0cae21fc09e95b4e31.jpg' alt='img not found' />
                                            <img className='screenshots' src='https://media.rawg.io/media/screenshots/a5c/a5c95ea539c87d5f538763e16e18fb99.jpg' alt='img not found' />
                                        </div>
                                        <div className='c35-footer'>
                                            <h5 className='footer-txt'>Top Seller</h5>
                                            <div className='genres-section'>
                                                <span className='genre-style'>Action</span>
                                                <span className='genre-style'>Shooter</span>
                                            </div>
                                            <span className='price-tag'>$59.99</span>
                                        </div>
                                    </div>
                            
                                </div>
                            </item>
                            <item>
                            <Link to='/store/416' className='ItemCarousel'>
                                <img className='imagenes' src="https://i.blogs.es/35200c/gta-san-andreas-android/1366_2000.jpeg" alt= 'img not found'/>
                                <p className="legend">Grand Theft Auto San Andreas</p>
                            </Link>
                            </item>
                            <item>
                            <Link to='/store/4459' className='ItemCarousel'>
                                <img className='imagenes' src="https://www.somosxbox.com/wp-content/uploads/2021/11/492540bf02636390efd77a305399187b.jpg" alt= 'img not found'/>
                                <p className="legend">Grand Theft Auto IV</p>
                            </Link>
                            </item>
                        </Carousel>
                    </div>

                    {/* Carousel secundarios del medio del home */}
                    <div>
                    </div>

                </div>


                <div className='home20last'></div>



            </div>
        </div>
    )
}
