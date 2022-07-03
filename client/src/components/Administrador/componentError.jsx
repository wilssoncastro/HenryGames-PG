import { Link } from "react-router-dom";

export function ComponentError() {

    return(
        <div className="errorAdmin">
          <h1>You don't have enough credentials to be here</h1>
          <img src="https://cdn-icons-png.flaticon.com/512/755/755014.png" alt="" />
          <Link to="/home">
          <button>Back to home</button>
          </Link>
         
        </div>
      )
}