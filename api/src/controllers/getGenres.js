const { Router } = require('express')
const router = Router()
const axios = require('axios')
const {API_KEY} = process.env
const  getAllApiGames = require('../services/services');

//import DB MODELS
const { Genre, Videogame } = require('../db.js')


router.get('/', async(req, res) => {
    // const genresApi = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`)
    
    try {
        console.log('Espera por favor')
        // let allGenres = genresApi.data.results.map(genre => genre.name)

        // allGenres.forEach(genre => {
        //     Genre.findOrCreate({
        //         where: {name: genre}
        //     })
        // })

        let genreFromDb = await Genre.findAll()
        res.status(200).send(genreFromDb)

        
    
  //   console.log('descargando juegos de la API')

  //   let juego = await getAllApiGames()
  //   juego.map((e) => { Videogame.findOrCreate({
  //     where:{
  //       id: e.id,
  //       name: e.name,
  //       release_date: e.released,
  //       image: e.background_image,
  //       description: e.slug,
  //       rating: e.rating,
  //       price: (Math.random()*10).toFixed(3),
  //       on_sale: (Math.random()*10) < 7 ? false : true,
  //       free_to_play: e.tags.filter(j => j.name === "Free to Play").length ? true : false,
  //       // genre: e.genres.map(g => g.name),
  //       // tag: e.tags.map(t => t.name),
  //       short_screenshots: e.short_screenshots.map(s => s.image),
  //       // esrb_ratings: e.esrb_rating !== null?  e.esrb_rating.name : "Rating Pending"
  //     }})
  //   }) 

  //   console.log('guardando relacion de generos')
   
  //   let games = await getAllApiGames()
  //   let genre = juego.map(e => e.genres.map(g => g.name))

  //   // for (let i = 0; i < games.length; i++) {
  //   //     const gameDetail = await axios(`https://api.rawg.io/api/games/${games[i].id}?key=${API_KEY}`);
  //   //     Videogame.findByPk(games[i].id)
  //   //     .then(response => response.description = gameDetail.description)  
  //   //     console.log('agregando description...'+ [i])                
  //   //     }
  
      
  //  for (let i = 0; i < games.length; i++) {       
  //   let genreDb = await Genre.findAll({
  //     where: {
  //       name: genre[i]
  //     }
  //   });  
  //   Videogame.findByPk(games[i].id)
  //   .then(response => response.addGenre(genreDb))
  //   console.log('cargando '+ i + ' juegos')    
         
      
  // }
  // console.log('juegos cargados correctamente')
 
 
} catch (error) {
    console.log(error)
}
})

module.exports = router