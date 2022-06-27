
const { Genre, Esrb } = require('../db')
require('dotenv').config();
const axios = require("axios")
const { API_KEY } = process.env


async function genres(){
    
    console.log('Guardando generos en base de datos')
    console.log('Espera por favor...')
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
  async function esrb(){
    console.log("guardando Esrb Ratings")
    
  let allRatings = ["Everyone", "Everyone 10+", "Teen", "Mature", "Adults Only", "Rating Pending"]

        allRatings.forEach(Rate => {
            Esrb.findOrCreate({
                where: {name: Rate}
            })
        })
        console.log('Esrb Ratings guardados')
        
  }

module.exports = {genres ,esrb}