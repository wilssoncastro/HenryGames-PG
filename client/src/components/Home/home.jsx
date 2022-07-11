import React/*  { useEffect, useState } */ from 'react';
import NavBar from '../NavBar/navbar'
// import Carousel from 'react-elastic-carousel'
// import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { getAllVideogames } from '../../redux/actions'
// import * as BiIcons from "react-icons/bi"
import CarouselCard from '../CarouselCard/CarouselCard.jsx'
import CarouselFP from '../CarouselCard/CarouselCardFP.jsx'
import CarouselOS from '../CarouselCard/CarouselCardOS.jsx'
import { useEffect } from 'react';
import Footer from '../Footer/Footer';
import './home.css'
import './carousel.css'

export default function Home() {
    const dispatch = useDispatch();
    
    // useEffect(() => {
    //     dispatch(getAllVideogames())
    // }, [dispatch])

    useEffect(() => {
        
        const getUser = () =>{
            fetch('http://localhost:3001/auth/google/protected', {
                method: 'GET',
                credentials: 'include',
                header: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Credentials': true,
            },
        }).then((res) => {
            if (res.status===200) return res.json(); 
            else throw new Error('authentication has been failed')
        }).then((resObj) => {
            //console.log('info user google ', resObj.user)
            localStorage.setItem("id", resObj.user.id)
            localStorage.setItem('name', resObj.user.name)
            localStorage.setItem('lastname', resObj.user.lastname)
            localStorage.setItem('type', resObj.user.type)
            localStorage.setItem('profile_pic', resObj.user.profile_pic)
            localStorage.setItem('user', resObj.user.email)
        }).catch((error)=> {
            console.log(error)
        })
        }
        getUser()
    }, [])
    
    return (
        <div className='background'>
            <div>
                <NavBar/>
            </div>

            <div className='home-component-box'>

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

                    <Footer />
                </div>

            </div>
        </div>
    )
}
