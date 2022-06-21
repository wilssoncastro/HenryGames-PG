import React from 'react'
import {Link} from 'react-router-dom'


export default function Log_In() {
    return (
        <div>
          <form>
            <div>
              <p>Usuario: </p>
              <input type='text' name='user' />
            </div>
            <div>
              <p>Contraseña: </p>
              <input type='text' name='password' />
            </div>
            <div>
              <p>¿No tienes una cuenta creada? Crea una <Link to='/sign_up'>aquí</Link></p>
            </div>
          </form>
        </div>
  )
}
// OPCION "Sign Up" abajo de todo
