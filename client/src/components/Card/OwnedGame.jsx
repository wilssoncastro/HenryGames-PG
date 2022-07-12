import React from 'react'
import { Link } from 'react-router-dom'
import "./OwnedGame.css"
import axios from 'axios';

export default function OwnedGame({ image, name, id, setVideo, setVisuality}) {
  
  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  async function putVideo(e){
    
    let videos = (await axios.get(`https://api.rawg.io/api/games/${e}/movies?key=345444feabdc45b185eefff732f7bb27`)).data
    
    let length_videos = videos.count
    if(length_videos !== 0){
      let index = getRandomInt(length_videos)
      let game = videos.results
      let total = game[index]
      setVideo(total.data[480])
    }else{
      setVideo('https://www.youtube.com/embed/QN3Wv6Gkoic')
    }
    setVisuality(true)
}

  return (
    <div className="og-card">
        <Link className='og-link' to={`/store/${id}`}>
          <img className='og-image' src={image} alt='Imagen no encontrada' width='400px' height='220px'/>
          </Link>
          <ul className='og-textCard'>
            <li className='og-titleCard'>{name}</li>
            <button onClick={() => putVideo(id)} className='og-launch'>Launch</button>
          </ul>
        
    </div>
  )
}