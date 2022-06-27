const { Router } = require('express')
const router = Router()
const axios = require('axios')
const {API_KEY} = process.env
const  getAllApiGames = require('../services/services');

//import DB MODELS
const { Genre, Videogame } = require('../db.js')


router.get('/', async(req, res) => {
      
    try {
        console.log('Espera por favor')
        let genreFromDb = await Genre.findAll()
        res.status(200).send(genreFromDb)
     
 
 
} catch (error) {
    console.log(error)
}
})

module.exports = router