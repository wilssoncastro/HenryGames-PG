
const { Genre } = require('../db')
require('dotenv').config();
const axios = require("axios")
const { API_KEY } = process.env


async function genres(){
    console.log('Espera por favor...')
    console.log('Guardando generos en base de datos')
    const allGenres = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`)
    let genres = (allGenres.data.results)
    let generos =  genres.map(g=> {
       Genre.create(
        {
          name: g.name       
        }
  
      )
    })
      await Promise.all(generos)
        console.log('Generos guardados')
        console.log('Back levantado exitosamente✔️ , PUEDES SEGUIR CODEANDO!')
  }


module.exports = {genres}