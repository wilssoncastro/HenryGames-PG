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

module.exports = router
