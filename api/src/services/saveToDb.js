
const { Videogame,Genre, Tag} = require('../db')
require('dotenv').config();
const axios = require("axios")
const { API_KEY } = process.env
const  getAllApiGames = require('../services/services');

async function generos(){
    console.log('Espera por favor...')
    console.log('Guardando generos')
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
        console.log('generos guardados!')
      
  
  }

  async function tags(){
    let tagsFromApi = await axios.get(`https://api.rawg.io/api/tags?key=${API_KEY}&page_size=40`)

        let allTags = tagsFromApi.data.results.map(tag => tag.name)

       let tags = allTags.map(tag => {
            Tag.findOrCreate({
                where: {name: tag}
            })
        })

        await Promise.all(tags)
        console.log('Tags guardados')
    }



module.exports = {generos, tags}