const { Router } = require('express');
const router = Router();
const { Videogame, Genre, Esrb, Tag } = require('../db.js')

router.post('/', async (req, res) => { 
    const {name, description, release_date, image, rating, price, on_sale, free_to_play, genres, esrb, tags} = req.body

    try {
        let videogameCreate = await Videogame.create({
            name, description, release_date, image, rating, price, on_sale, free_to_play
        })

        // let esrbDb = await Esrb.findOne({
        //     where: {name: esrb}
        // })

        // await videogameCreate.addEsrb(esrbDb)
        // let genresDb = await Genre.findAll({
        //     where: {name: genres}
        // })

        // let tagsDb = await Tag.findAll({
        //     where: {name: tags}
        // })

        // videogameCreate.addGenre(genresDb)
        // videogameCreate.addEsrb(tagsDb)

        res.send(`El videojuego ${req.body.name}, fue posteado con exito`)
    } catch (error) {
        console.log(error)
    }
})

module.exports = router