const { Router } = require('express');
const router = Router();
const { Videogame, Genre, Esrb_Rating } = require('../db.js')

router.post('/', async (req, res) => {
    const {name, description, release_date, image, rating, tags, price, on_sale, free_to_play, genres, esrb_rating} = req.body

    try {
        let videogameCreate = await Videogame.create({
            name, description, release_date, image, rating, tags, price, on_sale, free_to_play
        })

        let genresDb = await Genre.findAll({
            where: {name: genres}
        })

        let esrbDb = await Esrb_Rating.findAll({
            where: {name: esrb_rating}
        })

        videogameCreate.addGenre(genresDb)
        videogameCreate.addEsrb_Rating(esrbDb)

        res.send(`El videojuego ${req.body.name}, fue posteado con exito`)
    } catch (error) {
        res.status(404).send(error)
    }
})

module.exports = router