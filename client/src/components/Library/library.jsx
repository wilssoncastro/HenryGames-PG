import React, { useEffect, /* useState */ } from 'react';
import NavBar from '../NavBar/navbar';
import { CardImg, CardBody, CardTitle, Button, CardText, CardSubtitle, CardGroup, Card } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getLibraryById } from '../../redux/actions';
import { useState } from 'react';
import axios from 'axios';
import './library.css'

export default function Library() {

  const dispatch = useDispatch()
  const [visuality, setVisuality] = useState(false)
  const [video, setVideo] = useState('')

  const id_user = localStorage.getItem('id');

  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  useEffect(() =>{
    dispatch(getLibraryById(id_user))
  }, [])

  let my_games = useSelector(state => state.my_games)

  async function putVideo(e){
    console.log(e)
    let videos = (await axios.get(`https://api.rawg.io/api/games/${e}/movies?key=345444feabdc45b185eefff732f7bb27`)).data
    console.log(videos)
    let length_videos = videos.count
    let index = getRandomInt(length_videos)
    let game = videos.results
    let total = game[index]
    setVideo(total.data[480])
    setVisuality(true)
  }

  //console.log(my_games)
  return (
    <div>
        <NavBar/>

      <CardGroup>
      {
        my_games && my_games.map(e => (
          //Aca pongan las cards
          <Card>
          <CardImg
            alt="Card image cap"
            src={e.image}
            top
            width="100%"
          />
          <CardBody>
            <CardTitle tag="h5">
              {e.name}
            </CardTitle>
            <CardSubtitle
              className="mb-2 text-muted"
              tag="h6"
            >
              {e.description}
            </CardSubtitle>
            <CardText>
              {e.LibraryPlayer.active ? "Juego activado" : "Juego desactivado"}
            </CardText>
            <Button onClick={() => {putVideo(e.id)}}>
              Play
            </Button>
          </CardBody>
        </Card>
        ))
      }  
        
      </CardGroup>

      {
        visuality ? 
        <div className='frame'>
            <button className='close-button-red' onClick={() => setVisuality(false)}>X</button>
            <iframe 
          id="inlineFrameExample"
          title="Inline Frame Example"
          width="700"
          height="600"
          src={video}
          ></iframe>
        </div>
        : <></>
      }
    </div>
  )
}
