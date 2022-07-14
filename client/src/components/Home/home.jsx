import React, { useState }  from 'react';
import NavBar from '../NavBar/navbar'
// import Carousel from 'react-elastic-carousel'
// import { Link } from 'react-router-dom'
// import * as BiIcons from "react-icons/bi"
import axios from "axios"
import { useSelector } from 'react-redux';
import { getAllVideogames } from '../../redux/actions';
import CarouselCard from '../CarouselCard/CarouselCard.jsx'
import CarouselFP from '../CarouselCard/CarouselCardFP.jsx'
import CarouselOS from '../CarouselCard/CarouselCardOS.jsx'
import { useEffect } from 'react';
import Footer from '../Footer/Footer';
import swal from "sweetalert";
import './home.css'
import './carousel.css'

const BACK_URL = process.env.REACT_APP_API || "http://localhost:3001";

const google = []

export default function Home() {

    let [banned, setBanned] = useState(false)
    const [errorGoogle, setErrorGoogle] = useState(false)
    const videogames = useSelector((state) => state.videogames);

    if (!videogames.length) {
        console.log('Se ejecuto el getAllVideogames')
        getAllVideogames();
    }

    useEffect(() => {
        //fetch
        console.log("entró al useEffect")
        const getUser = async () => {
            console.log("entró al getUser()")
            try {
                
                const info = await fetch(`https://henrygames.herokuapp.com/auth/google/protected`,
                    {
                        method: 'GET',
                        credentials: 'include',
                        header: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json',
                            'Access-Control-Allow-Credentials': true,
                        }
                    }
                ).json()
                console.log("terminó el axios ", info)
                if (info.success === true) {
                    const resObj = info
                    console.log(resObj+ " if 200")
                    localStorage.setItem("id", resObj.user.id)
                    localStorage.setItem('name', resObj.user.name)
                    localStorage.setItem('lastname', resObj.user.lastname)
                    localStorage.setItem('type', resObj.user.type)
                    localStorage.setItem('profile_pic', resObj.user.profile_pic)
                    localStorage.setItem('user', resObj.user.email)
                }
                else if (info.success === false) {
                    console.log("este es el if 401")
                    const resObj = info
                    console.log(resObj+ " if 401")
                    // localStorage.setItem("id", resObj.user.id)
                    // localStorage.setItem('name', resObj.user.name)
                    // localStorage.setItem('lastname', resObj.user.lastname)
                    // localStorage.setItem('type', resObj.user.type)
                    // localStorage.setItem('profile_pic', resObj.user.profile_pic)
                    // localStorage.setItem('user', resObj.user.email)
                }
            } catch (error) {
                console.log(error, "este es el error cachado")
            }
            }
            getUser()
    }, [])

    if(errorGoogle){
        swal({
            title: 'We have a problem with your account',
            text: 'Sorry',
            icon: "error",
        })
    }

    if(banned){
        swal({
            title: 'Your account is banned. Can not log in',
            icon: "error",
        })
    }
    
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

                </div>

            </div>
            <Footer />
        </div>
    )
}

 // const getUser = () =>{
        //     fetch(`${BACK_URL}/auth/google/protected`, {
        //         method: 'GET',
        //         credentials: 'include',
        //         header: {
        //         Accept: 'application/json',
        //         'Content-Type': 'application/json',
        //         'Access-Control-Allow-Credentials': true,
        //     },
        // }).then((res) => {
        //     console.log(res)
        //     if (res.status===200) {return res.json()}
        //     //else if(res.status===401) {return res.json()}
        //     else if(res.status===401) {return "MIERDA"}
        //     else throw new Error('authentication has been failed')
        // }).then((resObj) => {
        //     //console.log('info user google ', resObj.user)
        //     if(resObj.success){
        //         localStorage.setItem("id", resObj.user.id)
        //         localStorage.setItem('name', resObj.user.name)
        //         localStorage.setItem('lastname', resObj.user.lastname)
        //         localStorage.setItem('type', resObj.user.type)
        //         localStorage.setItem('profile_pic', resObj.user.profile_pic)
        //         localStorage.setItem('user', resObj.user.email)
        //     }
        //     else if(resObj.banned){
        //         //console.log('entre al condicional de baneo')
        //         setBanned(true)
        //     }
        //     else if(!resObj.banned && !resObj.success){
        //         setErrorGoogle(true)
        //     }
        // })
        // }

        // vercel error redirect_uri_mismatch
