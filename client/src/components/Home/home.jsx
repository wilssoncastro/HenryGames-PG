import React from 'react'
import NavBar from '../NavBar/navbar'
import Carousel from 'react-elastic-carousel'
import './home.css'
import { Link } from 'react-router-dom'
// import { Link } from "react-router-dom";

//traerse todos los jueguitos
// import { useSelector, useDispatch } from 'react-redux'
// import { useEffect } from 'react'
// import { getAllVideogames } from '../../redux/actions'
// import Card from '../Card/card'

export default function Home() {
    // const dispatch = useDispatch();
    // const allVideogames = useSelector((state) => state.videogames)

    // useEffect(() => {
    //     dispatch(getAllVideogames());
    // }, [dispatch])

    return (
        <div className='background'>
            <div>
                <NavBar/>
            </div>
            {/* <div>
                    {allVideogames?.map(e => {
                        return(
                            <div>
                                <Card image={e.image} name={e.name} price={e.price}/>
                            </div>
                        )
                    })}
            </div> */}
            <div className="ConteinerCarousel">
                <Carousel>
                    <div className='ItemCarousel'>
                    <Link to='/home/3498'><img className='imagenes' src="https://cdn2.unrealengine.com/Diesel%2Fproductv2%2Fgrand-theft-auto-v%2Fhome%2FGTAV_EGS_Artwork_1920x1080_Hero-Carousel_V06-1920x1080-1503e4b1320d5652dd4f57466c8bcb79424b3fc0.jpg" alt= 'img not found'/></Link>
                        <p className="legend">Grand Theft Auto V</p>
                    </div>
                    <div className='ItemCarousel'>
                    <Link to='/home/416'><img className='imagenes' src="https://i.blogs.es/35200c/gta-san-andreas-android/1366_2000.jpeg" alt= 'img not found'/></Link>
                        <p className="legend">Grand Theft Auto San Andreas</p>
                    </div>
                    <div className='ItemCarousel'>
                    <Link to='/home/4459'><img className='imagenes' src="https://www.somosxbox.com/wp-content/uploads/2021/11/492540bf02636390efd77a305399187b.jpg" alt= 'img not found'/></Link>
                        <p className="legend">Grand Theft Auto IV</p>
                    </div>
                </Carousel>
                <Carousel>
                    <div>
                    <Link to='/home/906'><img className='imagenes' src= 'https://sm.ign.com/ign_es/screenshot/default/br_sg9a.jpg' alt= 'img not found'/></Link>
                        <p className="legend">Call of Duty: Black Ops III</p>
                    </div>
                    <div>
                    <Link to='/home/4527'><img className='imagenes' src="https://img.unocero.com/2020/03/call-of-duty-modern-warfare-2-remaster-2-1.jpg" alt= 'img not found'/></Link>
                        <p className="legend">Call of Duty: Modern Warfare 2</p>
                    </div>
                    <div>
                    <Link to='/home/865'><img className='imagenes' src="https://cdn.akamai.steamstatic.com/steam/apps/42700/capsule_616x353.jpg?t=1654809667" alt= 'img not found'/></Link>
                        <p className="legend">Call of Duty: Black Ops</p>
                    </div>
                </Carousel>
                <Carousel>
                    <div>
                        <Link to='/home/32'><img className='imagenes' src= 'https://cdn.akamai.steamstatic.com/steam/apps/1085660/header_spanish.jpg?t=1653420922' alt= 'img not found'/></Link>
                        <p className="legend">Destiny 2</p>
                    </div>
                    <div>
                    <Link to='/home/326292'><img className='imagenes' src="https://cdn1.epicgames.com/offer/50118b7f954e450f8823df1614b24e80/es-ES_FallGuysSS1_OfferImage_2560x1440_2560x1440-291db57cf0ebc2a5e83e52e4fb0f9740" alt= 'img not found'/></Link>
                        <p className="legend">Fall Guys</p>
                    </div>
                    <div>
                    <Link to='/home/4291'><img className='imagenes' src="http://media.steampowered.com/apps/csgo/blog/images/fb_image.png?v=6" alt= 'img not found'/></Link>
                        <p className="legend">Counter Strike: Global Offensive</p>
                    </div>
                </Carousel>
            </div>
        </div>
    )
}
