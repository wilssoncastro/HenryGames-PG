import { Link } from "react-router-dom";

export function ComponentError() {

    return(
        <div className="errorAdmin">
          <h1>you can not be here!</h1>
          <img src="https://images.emojiterra.com/twitter/v14.0/512px/1f6ab.png" alt="" />
          <Link to="/home">
          <button>Back to home</button>
          </Link>
         
        </div>
      )
}