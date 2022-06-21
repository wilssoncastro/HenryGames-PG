import React from 'react'
import {Link} from 'react-router-dom'

export default function Header() {
  return (
    <div>
      <Link to='/home'>
        <img src='' alt='' />
      </Link>
      <Link to='/log_in'>
        <button>Log In</button>
      </Link>
      <Link to='/sign_up'>
        <button>Sign Up</button>
      </Link>
      <Link to='/profile'>
        <img src='' alt='' />
      </Link>
    </div>
  )
}
