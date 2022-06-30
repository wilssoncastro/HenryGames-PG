import React, { useEffect, useState } from 'react';
import NavBar from '../NavBar/navbar'
import Carousel from 'react-elastic-carousel'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { getAllVideogames, getFilteredVideogames } from '../../redux/actions'
import * as BiIcons from "react-icons/bi"
import CarouselCard from '../CarouselCard/CarouselCard'
import './home.css'
import './carousel.css'
// import Card from '../Card/card'

export default function Home() {
    const dispatch = useDispatch();
    const videogames = useSelector((state) => state.videogames)

    const [name, setName] = useState('')
    const [page, setPage] = useState(0)
    const [sort, setSort] = useState('rating');
    const [order, setOrder] = useState('desc');
    const [limit, setLimit] = useState(6);
    
    useEffect(() => {
        // dispatch(getAllVideogames())
        dispatch(getFilteredVideogames(name, page, sort, order, limit))
    }, [dispatch, sort, order, limit])


    
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
                        <h1 className='main-carousel-title'>Promoted</h1>
                        <Carousel focusOnSelect={false}>
                            {videogames.map((e) => {
                                console.log(e.genres)
                                return(
                                    <item>
                                        <CarouselCard
                                            name={e.name}
                                            id={e.id}
                                            image={e.image}
                                            short_screenshots={e.short_screenshots}
                                            genres={e.genres}
                                            price={`$${e.price}`}
                                            />
                                    </item>
                                )
                            })}

                        </Carousel>
                    </div>

                    {/* Carousel secundarios del medio del home */}
                    <div className="CategoryContainerCarousel">
                        <h3 className='category-carousel-title'>Shooter</h3>
                        <Carousel focusOnSelect={false} itemsToShow={4}>
                            <item>
                                <Link to='/store/3498' className='text-deco'>
                                    <div className='cat-card'>

                                        {/* Arriba */}
                                        <img className='category-carousel-img' src="https://i.blogs.es/35200c/gta-san-andreas-android/1366_2000.jpeg" alt='img not found' />

                                        {/* Abajo */}
                                        <div className='cat-card-footer'>
                                            <h3 className="carousel-card-title">Grand Theft Auto V</h3>
                                            <span className='carousel-card-price'>$59.99</span>
                                        </div>

                                    </div>
                                </Link>
                            </item>
                            <item>
                                <Link to='/store/3498' className='text-deco'>
                                    <div className='cat-card'>

                                        {/* Arriba */}
                                        <img className='category-carousel-img' src="https://cdn2.unrealengine.com/Diesel%2Fproductv2%2Fgrand-theft-auto-v%2Fhome%2FGTAV_EGS_Artwork_1920x1080_Hero-Carousel_V06-1920x1080-1503e4b1320d5652dd4f57466c8bcb79424b3fc0.jpg" alt='img not found' />

                                        {/* Abajo */}
                                        <div className='cat-card-footer'>
                                            <h3 className="carousel-card-title">Grand Theft Auto V</h3>
                                            <span className='carousel-card-price'>$59.99</span>
                                        </div>

                                    </div>
                                </Link>
                            </item>

                            <item>
                                <Link to='/store/3498' className='text-deco'>
                                    <div className='cat-card'>

                                        {/* Arriba */}
                                        <img className='category-carousel-img' src="https://media.rawg.io/media/games/328/3283617cb7d75d67257fc58339188742.jpg" alt='img not found' />

                                        {/* Abajo */}
                                        <div className='cat-card-footer'>
                                            <h3 className="carousel-card-title">Portal 2</h3>
                                            <span className='carousel-card-price'>$59.99</span>
                                        </div>

                                    </div>
                                </Link>
                            </item>
                            <item>
                                <Link to='/store/3498' className='text-deco'>
                                    <div className='cat-card'>

                                        {/* Arriba */}
                                        <img className='category-carousel-img' src="https://cdn2.unrealengine.com/Diesel%2Fproductv2%2Fgrand-theft-auto-v%2Fhome%2FGTAV_EGS_Artwork_1920x1080_Hero-Carousel_V06-1920x1080-1503e4b1320d5652dd4f57466c8bcb79424b3fc0.jpg" alt='img not found' />

                                        {/* Abajo */}
                                        <div className='cat-card-footer'>
                                            <h3 className="carousel-card-title">Grand Theft Auto V</h3>
                                            <span className='carousel-card-price'>$59.99</span>
                                        </div>
                                    </div>
                                </Link>
                            </item>
                            <item>
                                <Link to='/store/3498' className='text-deco'>
                                    <div className='cat-card'>

                                        {/* Arriba */}
                                        <img className='category-carousel-img' src="https://cdn2.unrealengine.com/Diesel%2Fproductv2%2Fgrand-theft-auto-v%2Fhome%2FGTAV_EGS_Artwork_1920x1080_Hero-Carousel_V06-1920x1080-1503e4b1320d5652dd4f57466c8bcb79424b3fc0.jpg" alt='img not found' />

                                        {/* Abajo */}
                                        <div className='cat-card-footer'>
                                            <h3 className="carousel-card-title">Grand Theft Auto V</h3>
                                            <span className='carousel-card-price'>$59.99</span>
                                        </div>

                                    </div>
                                </Link>
                            </item>
                        </Carousel>
                    </div>

                    <div className="CategoryContainerCarousel">
                        <h3 className='category-carousel-title'>Most Popular</h3>
                        <Carousel focusOnSelect={false} itemsToShow={4}>
                            <item>
                                <Link to='/store/3498' className='text-deco'>
                                    <div className='cat-card'>

                                        {/* Arriba */}
                                        <img className='category-carousel-img' src="https://i.blogs.es/35200c/gta-san-andreas-android/1366_2000.jpeg" alt='img not found' />

                                        {/* Abajo */}
                                        <div className='cat-card-footer'>
                                            <h3 className="carousel-card-title">Grand Theft Auto V</h3>
                                            <span className='carousel-card-price'>$59.99</span>
                                        </div>
                                    </div>
                                </Link>
                            </item>
                            <item>
                                <Link to='/store/3498' className='text-deco'>
                                    <div className='cat-card'>

                                        {/* Arriba */}
                                        <img className='category-carousel-img' src="https://cdn2.unrealengine.com/Diesel%2Fproductv2%2Fgrand-theft-auto-v%2Fhome%2FGTAV_EGS_Artwork_1920x1080_Hero-Carousel_V06-1920x1080-1503e4b1320d5652dd4f57466c8bcb79424b3fc0.jpg" alt='img not found' />

                                        {/* Abajo */}
                                        <div className='cat-card-footer'>
                                            <h3 className="carousel-card-title">Grand Theft Auto V</h3>
                                            <span className='carousel-card-price'>$59.99</span>
                                        </div>
                                    </div>
                                </Link>
                            </item>

                            <item>
                                <Link to='/store/3498' className='text-deco'>
                                    <div className='cat-card'>

                                        {/* Arriba */}
                                        <img className='category-carousel-img' src="https://media.rawg.io/media/games/328/3283617cb7d75d67257fc58339188742.jpg" alt='img not found' />

                                        {/* Abajo */}
                                        <div className='cat-card-footer'>
                                            <h3 className="carousel-card-title">Portal 2</h3>
                                            <span className='carousel-card-price'>$59.99</span>
                                        </div>
                                    </div>
                                </Link>
                            </item>
                            <item>
                                <Link to='/store/3498' className='text-deco'>
                                    <div className='cat-card'>

                                        {/* Arriba */}
                                        <img className='category-carousel-img' src="https://cdn2.unrealengine.com/Diesel%2Fproductv2%2Fgrand-theft-auto-v%2Fhome%2FGTAV_EGS_Artwork_1920x1080_Hero-Carousel_V06-1920x1080-1503e4b1320d5652dd4f57466c8bcb79424b3fc0.jpg" alt='img not found' />

                                        {/* Abajo */}
                                        <div className='cat-card-footer'>
                                            <h3 className="carousel-card-title">Grand Theft Auto V</h3>
                                            <span className='carousel-card-price'>$59.99</span>
                                        </div>
                                    </div>
                                </Link>
                            </item>
                            <item>
                                <Link to='/store/3498' className='text-deco'>
                                    <div className='cat-card'>

                                        {/* Arriba */}
                                        <img className='category-carousel-img' src="https://cdn2.unrealengine.com/Diesel%2Fproductv2%2Fgrand-theft-auto-v%2Fhome%2FGTAV_EGS_Artwork_1920x1080_Hero-Carousel_V06-1920x1080-1503e4b1320d5652dd4f57466c8bcb79424b3fc0.jpg" alt='img not found' />

                                        {/* Abajo */}
                                        <div className='cat-card-footer'>
                                            <h3 className="carousel-card-title">Grand Theft Auto V</h3>
                                            <span className='carousel-card-price'>$59.99</span>
                                        </div>
                                    </div>
                                </Link>
                            </item>
                        </Carousel>
                    </div>

                    <div className='nuestra-info'>
                        <span className='github-link'>ACA VA EL GITHUB</span>
                    </div>
                </div>

            </div>
        </div>
    )
}
