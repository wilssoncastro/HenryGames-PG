const {Router} = require('express')
const { Player, Videogame, LibraryPlayer } = require('../db.js');

const router = Router();

router.get('/', async(req, res) => {
    try {
        let data = await LibraryPlayer.findAll()

        res.send(data)
    } catch (error) {
        res.send(error)
    }
}) 

router.get('/:id_user', async(req, res) =>{
    let { id_user } = req.params
    
    try {
        let userLibrary = await Player.findByPk(id_user, {
            include: 'library',
            attributes: [], 
        })

        res.send(userLibrary)
    } catch (error) {
        res.status(404).send(error)
    }
})

router.put('/addInLibrary/:id_game/:id_user', async(req,res) => {
    const { id_game } = req.params
    const { id_user } = req.params

    try {
        let game = await Videogame.findByPk(id_game)
        if(!game)return res.send('No se encontro el juego')
        let user = await Player.findByPk(id_user)
        if(!user)return res.send('No se encontro el usuario')

        let resultado = await user.addLibrary(game)

        let desactivated_games = await LibraryPlayer.findAll({
            where: {
                id_user: id_user,
                id_game: id_game
            }
        })

        for (let i = 0; i < desactivated_games.length; i++){
            if((!desactivated_games[i].code) && (!desactivated_games[i].active)){
                desactivated_games[i].active = true
                await desactivated_games[i].save()
            }
        }

        game.contador = game.contador+1
        await game.save()

        return res.send(resultado)
    } catch (error) {
        
    }
})

module.exports = router
