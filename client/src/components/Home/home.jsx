import React from 'react'
import NavBar from '../NavBar/navbar'
import Carousel from 'react-elastic-carousel'
import './home.css'
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
            <div className="ContainerCarousel">
                <Carousel>
                    <div className='ItemCarousel'>
                        <img className='imagenes' src="https://cdn2.unrealengine.com/Diesel%2Fproductv2%2Fgrand-theft-auto-v%2Fhome%2FGTAV_EGS_Artwork_1920x1080_Hero-Carousel_V06-1920x1080-1503e4b1320d5652dd4f57466c8bcb79424b3fc0.jpg" alt= 'img not found'/>
                        <p className="legend">Grand Theft Auto V</p>
                    </div>
                    <div className='ItemCarousel'>
                        <img className='imagenes' src="https://i.blogs.es/35200c/gta-san-andreas-android/1366_2000.jpeg" alt= 'img not found'/>
                        <p className="legend">Grand Theft Auto San Andreas</p>
                    </div>
                    <div className='ItemCarousel'>
                        <img className='imagenes' src="https://www.somosxbox.com/wp-content/uploads/2021/11/492540bf02636390efd77a305399187b.jpg" alt= 'img not found'/>
                        <p className="legend">Grand Theft Auto IV</p>
                    </div>
                </Carousel>
                <Carousel>
                    <div>
                        <img className='imagenes' src= 'https://nerdmacia.cl/wp-content/uploads/2020/05/Diesel_productv2_mafia-definitive-edition_home_EGS_MafiaDefinitiveEditionPreOrder_Hangar13_G1A_00-1920x1080-e7457132d8ebeb06c2d663944087c683e4834918.jpg' alt= 'img not found'/>
                        <p className="legend">Mafia I</p>
                    </div>
                    <div>
                        <img className='imagenes' src="https://cdn2.unrealengine.com/Diesel%2Fproductv2%2Fmafia-ii-definitive-edition%2Fhome%2FEGS_MafiaIIDefinitiveEdition_RedKiteGames_G1A_00-1920x1080-acf8d4a19c74c43376139a01afeed9b43ac0db86.jpg" alt= 'img not found'/>
                        <p className="legend">Mafia II</p>
                    </div>
                    <div>
                        <img className='imagenes' src="https://cdn2.unrealengine.com/Diesel%2Fproductv2%2Fmafia-iii-definitive-edition%2Fhome%2FEGS_MafiaIIIDefinitiveEdition_Hangar13_G1A_00-1920x1080-6513f27c3b9eff7c623e492e84f361fc52213360.jpg" alt= 'img not found'/>
                        <p className="legend">Mafia III</p>
                    </div>
                </Carousel>
                <Carousel>
                    <div>
                        <img className='imagenes' src= 'https://cdn2.unrealengine.com/21br-metaimage-lineup-1920x1080-44acd5f27136.jpg' alt= 'img not found'/>
                        <p className="legend">Fortnite</p>
                    </div>
                    <div>
                        <img className='imagenes' src="https://cdn1.epicgames.com/offer/50118b7f954e450f8823df1614b24e80/es-ES_FallGuysSS1_OfferImage_2560x1440_2560x1440-291db57cf0ebc2a5e83e52e4fb0f9740" alt= 'img not found'/>
                        <p className="legend">Fall Guys</p>
                    </div>
                    <div>
                        <img className='imagenes' src="http://media.steampowered.com/apps/csgo/blog/images/fb_image.png?v=6" alt= 'img not found'/>
                        <p className="legend">Counter Strike: Global Offensive</p>
                    </div>
                </Carousel>
            </div>
        </div>
    )
}
