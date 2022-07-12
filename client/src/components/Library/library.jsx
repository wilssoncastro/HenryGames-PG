import React, { useEffect, /* useState */ } from 'react';
import NavBar from '../NavBar/navbar';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getLibraryById } from '../../redux/actions';
import Footer from '../Footer/Footer';
import './library.css'
import OwnedGame from '../Card/OwnedGame';

export default function Library() {

  const dispatch = useDispatch()

  const id_user = localStorage.getItem('id');

  useEffect(() =>{
    dispatch(getLibraryById(id_user))
  }, [])

  let my_games = useSelector(state => state.my_games)
  

  console.log(my_games)
  return (
    <div className='library-body'>
      <NavBar />
      <div className='library-component'>
        <div>
          {my_games.length ?
            <div>
              <h1 className='library-title'>My games</h1> 
              <div className="containercard">
              {my_games.map((v, i) => {
                return (
                  <div>
                    <OwnedGame
                      key={v.id}
                      image={v.image}
                      name={v.name}
                      id={v.id}
                    />
                  </div>
                )
              })}
          </div>
            </div>
          : (
            <div className="library-empty-component">
              <h2 className="library-empty-title">You don't own any games yet!</h2>
              <p className="library-empty-redirect">Do you want to get some games?  <br />
                <Link to="/store">
                  <button className="library-empty-button">Let's Go!</button>
                </Link>
              </p>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  )
}
