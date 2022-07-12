import React, { useState }  from 'react';
import NavBar from '../NavBar/navbar'
// import Carousel from 'react-elastic-carousel'
// import { Link } from 'react-router-dom'
// import * as BiIcons from "react-icons/bi"
import CarouselCard from '../CarouselCard/CarouselCard.jsx'
import CarouselFP from '../CarouselCard/CarouselCardFP.jsx'
import CarouselOS from '../CarouselCard/CarouselCardOS.jsx'
import { useEffect } from 'react';
import Footer from '../Footer/Footer';
import swal from "sweetalert";
import './home.css'
import './carousel.css'

export default function Home() {

    let [banned, setBanned] = useState(false)
    const [errorGoogle, setErrorGoogle] = useState(false)

    useEffect(() => {
        
        const getUser = () =>{
            fetch('/auth/google/protected', {
                method: 'GET',
                credentials: 'include',
                header: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Credentials': true,
            },
        }).then((res) => {
            if (res.status===200) {return res.json()}
            else if(res.status===401) {return res.json()}
            else throw new Error('authentication has been failed')
        }).then((resObj) => {
            //console.log('info user google ', resObj.user)
            if(resObj.success){
                localStorage.setItem("id", resObj.user.id)
                localStorage.setItem('name', resObj.user.name)
                localStorage.setItem('lastname', resObj.user.lastname)
                localStorage.setItem('type', resObj.user.type)
                localStorage.setItem('profile_pic', resObj.user.profile_pic)
                localStorage.setItem('user', resObj.user.email)
            }
            else if(resObj.banned){
                //console.log('entre al condicional de baneo')
                setBanned(true)
            }
            else if(!resObj.banned && !resObj.success){
                setErrorGoogle(true)
            }
        })
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
