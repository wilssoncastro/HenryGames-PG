import React from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function Google() {
    
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
            console.log('info user google ', resObj.user)
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

    const myProfile = JSON.parse(localStorage.getItem("id"))

    return (
        <div>
            <h1>Welcome to Henrygames</h1>
            <h4>You are login with Google</h4>
            <Link to='/home'>
                <button>Go homepage</button>
            </Link>
            <Link to='/store'>
                <button>Go to the store</button>
            </Link>
            <Link to={`/profile/${myProfile}`}>
                <button>Go to the profile</button>
            </Link>
        </div>
    )
}