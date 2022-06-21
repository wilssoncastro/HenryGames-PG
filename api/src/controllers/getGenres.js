const { Router } = require('express')
const router = Router()
const axios = require('axios')
const {API_KEY} = process.env

//import DB MODELS
const { Genre } = require('../db.js')


router.get('/', async(req, res) => {
    const genresApi = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`)
    
    try {
        let allGenres = genresApi.data.results.map(genre => genre.name)

        allGenres.forEach(genre => {
            Genre.findOrCreate({
                where: {name: genre}
            })
        })

        let genreFromDb = await Genre.findAll()
        res.status(200).send(genreFromDb)
    } catch (error) {
        console.log(error)
    }
})

module.exports = router