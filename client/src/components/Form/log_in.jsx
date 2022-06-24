import React from 'react'
import { Link } from 'react-router-dom'


export default function LogIn() {
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
              <button type="submit">Login</button>
            </div>
            <div>
              <p>Not a member yet?<Link to='/sign_up'>Sign Up now!</Link></p>
            </div>
          </form>
          <Link to='/home'>
            Or enter as a guest.
          </Link>
        </div>
  )
}
// OPCION "Sign Up" abajo de todo
