import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import axios from "axios";


export default function LogIn() {

  //let miStorage = window.localStorage;

  const [input, setInput] = useState({
    username:'',
    password:''
  })
  
  const [error, setError] = useState('');

  function handleChange(e){
    setInput({
      ...input,
      [e.target.name]:e.target.value
    })
  }

  async function onSubmit(e){
    e.preventDefault()

    if(input.username && input.password){
      const login = await axios({
        method: "post",
        url: "http://localhost:3001/authentication/login",
        data: input,
        headers: { "X-Requested-With": "XMLHttpRequest" },
        withCredentials: true,
      })
      .then((res) => {
        return res;
      })
      .catch((error) => console.log(error));

      
      let {log_in, id, name, lastname, type} = login.data
      
      
      if(log_in){
        console.log('cargando local')
        localStorage.setItem("id", id)
        localStorage.setItem('name', name)
        localStorage.setItem('lastname', lastname)
        localStorage.setItem('type', type)

      }

      if(typeof login.data === 'string'){
        setError(login.data)
      }



    }else{
      setError('Faltan datos')
    }

  }

    return (
        <div>
          <form onSubmit={onSubmit}>
            <div>
              <p>Usuario: </p>
              <input 
                type='text' 
                name='username' 

                value={input.username}
                onChange={handleChange}
              />
            </div>
            <div>
              <p>Contraseña: </p>
              <input 
                type='password' 
                name='password' 

                value={input.password}
                onChange={handleChange}
              />
            </div>
            <div>
              <button type="submit">Ingresar</button>
            </div>
            <div>
              <p>¿Todavia no sos usuario? <Link to='/sign_up'>Registrate ahora!</Link></p>
            </div>
          </form>
          <p>{error}</p>
          <Link to='/home'>
           O entra como invitado
          </Link>
        </div>
  )
}
// OPCION "Sign Up" abajo de todo
