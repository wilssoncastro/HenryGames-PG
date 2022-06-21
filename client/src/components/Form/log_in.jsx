import React from 'react'
import {Link} from 'react-router-dom'


export default function Log_In() {
    return (
        <div>
          <form>
            <div>
              <p>Username: </p>
              <input type='text' name='user' />
            </div>
            <div>
              <p>Password: </p>
              <input type='text' name='password' />
            </div>
            <div>
              <input type="submit" value="">Login</input>
            </div>
            <div>
              <p>Not a member yet?<Link to='/sign_up'>Signup npw</Link></p>
            </div>
          </form>
        </div>
  )
}
// OPCION "Sign Up" abajo de todo
