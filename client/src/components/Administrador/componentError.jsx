import { Link } from "react-router-dom";
import NavBar from '../NavBar/navbar'

export function ComponentError() {

    return(

      <div className="errorAdmin">
          <NavBar />
          <h1>You don't have enough credentials to be here</h1>
          <img src="https://cdn-icons-png.flaticon.com/512/755/755014.png" alt="" />
          <Link to="/home">
          <button>Back to home</button>
          </Link>
         
        </div>
      )
}