import React from 'react'

export default function SignUp() {
  return (
    <div> 
      <h1>Sign Up</h1>
      <form>
        <div>
          <p>First Name: </p>
            <input type="text" name="name" placeholder='First Name'/>
        </div>
        <div>
          <p>Last Name: </p>
            <input type="text" name="lastname" placeholder='Last Name'/>
        </div>
        <div>
          <p>Date Of Birth: </p>
            <input type="date" name="date_of_birth"/>
        </div>
        <div>
          <p>Phone: </p>
            <input type="tel" name="phone" placeholder='Phone'/>
        </div>
        <div>
          <p>Address: </p>
            <input type="text" name="adress" placeholder='Address'/>
        </div>
        <div>
          <p>Username: </p>
            <input type="text" name="user" placeholder='Username'/>
        </div>
        <div>
          <p>Email: </p>
            <input type="email" name="email" placeholder='Email'/>
        </div>
        <div>
          <p>Password: </p>
            <input type='password' name="password" placeholder='Password'/>
        </div>
        <div>
          <p>Profile Picture: </p>
            <input type='image' name="image" alt='' />
        </div>
        <div>
            <input type='submit' />
        </div>
      </form>
    </div>
  )
}

        
        
        
        
        