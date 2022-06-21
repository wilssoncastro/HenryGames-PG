const { Router } = require('express');
const router = Router();

//import DB MODELS
const { Videogame, Genre, Esrb, Tag } = require('../db.js')

//------------------------------------------POST-----------------------------------------------------------
router.post('/', async (req, res) => {
    const { name, description, release_date, image, rating, price, on_sale, free_to_play, genre, esrb, tag} = req.body

    try {
        let videogameCreate = await Videogame.create({
            tag, genre, name, description, release_date, image, rating, price, on_sale, free_to_play, db_created: true, id: Math.ceil(Math.random()*100000)
        })
        
        if(genre){
            let genresDb = await Genre.findAll({
                where: {name: genre} 
            })

            videogameCreate.addGenre(genresDb)
        }

        if(tag){
            let tagsDb = await Tag.findAll({
                where: {name: tag}
            })

            videogameCreate.addTag(tagsDb)
        }

        // if(esrb){
        //     let esrbPk = await Esrb.findByPk(esrb)

        //     if(!esrbPk){
        //         res.status(404).send('No se encontró el id de la clasificacion ESRB')
        //     }

        //     let addEsrb = await Videogame.update({where: {esrbId: esrbPk}})
        // }

        res.send(`El videojuego ${req.body.name}, fue posteado con exito`)
    } catch (error) {
        console.log(error)
    }
})

//-----------------------------------------DELETE-----------------------------------------------------------
router.delete('/:id', async (req, res) => {
    const {id} = req.params

    try {
        let deleteVideogame = await Videogame.findByPk(id)
    
        if(!deleteVideogame){
            res.status(404).send('No se encontró el videojuego')
        }
        
        await deleteVideogame.destroy()
    
        res.send('El videojuego fue borrado correctamente')
    } catch (error) {
        console.log(error)
    }
})

//---------------------------------------PUT-----------------------------------------------------------
router.put('/:id', async (req, res) => {
    const {id} = req.params
    const {name, description, release_date, image, rating, price, on_sale, free_to_play, genres, esrb, tags} = req.body

    // let condition = {}

    try {
        const videogame = await Videogame.findByPk(id)

        if(!videogame){
            return res.send('No se encontró el videojuego')
        }

        let videogameUpdate = await Videogame.update({
            name: name, description: description, release_date: release_date, image: image, rating: rating, price: price, on_sale: on_sale, free_to_play: free_to_play
        })

        // if(name){condition.name = name}
        // if(description){condition.description = description}
        // if(release_date){condition.release_date = release_date}
        // if(image){condition.image = image}
        // if(rating){condition.rating = rating}
        // if(price){condition.price = price}
        // if(on_sale){condition.on_sale = on_sale}
        // if(free_to_play){condition.free_to_play = free_to_play}

        // let updateVideogame = await Videogame.update(condition)

        // let esrbDb = await Esrb.findOne({
        //     where: {name: esrb}
        // })
        
        // let genresDb = await Genre.findAll({
        //     where: {name: genres}
        // })

        // let tagsDb = await Tag.findAll({
        //     where: {name: tags}
        // })

        // videogameCreate.addGenre(genresDb)
        // videogameCreate.addEsrb(tagsDb)
        // videogameCreate.addEsrb(esrbDb)
        res.send('Datos del videojuego actualizado')
    } catch (error) {
        console.log(error)
    }
})
module.exports = router