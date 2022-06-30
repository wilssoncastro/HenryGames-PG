import React from 'react'
import NavBar from '../NavBar/navbar'
import { Link } from 'react-router-dom'
import './profile.css'

export default function Profile() {
  return (
    <div className='Profile'>
      <NavBar/>
      <ul className='Create-Videogame-Bttn'>
        <Link to='/home/createVideogame' > 
          <span>Create Videogame</span>
        </Link>
      </ul>
    </div>
  )
}
