import React, { useEffect, /* useState */ } from 'react';
import NavBar from '../NavBar/navbar';
import { CardImg, CardBody, CardTitle, Button, CardText, CardSubtitle, CardGroup, Card } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getLibraryById } from '../../redux/actions';

export default function Library() {

  const dispatch = useDispatch()

  const id_user = localStorage.getItem('id');

  useEffect(() =>{
    dispatch(getLibraryById(id_user))
  }, [])

  let my_games = useSelector(state => state.my_games)

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
            <Button>
              Button
            </Button>
          </CardBody>
        </Card>
        ))
      }  
        
      </CardGroup>
    </div>
  )
}
