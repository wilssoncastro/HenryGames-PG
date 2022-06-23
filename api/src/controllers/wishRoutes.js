const { Router } = require('express');
const { Player, Videogame } = require('../db.js');


const router = Router();

router.get('/:id', async(req, res) => {
    const { id } = req.params
    

    try {
        
        const user = await Player.findByPk(id, {
            include: 'wishs'
        })
        

        if(!user){
            return res.send('No se encontro el usuario')
        }

        return res.json(user)
    } catch (error) {
        res.send('No se encontro el usuario')
    }
})

router.post('/add/:id/:idGame', async (req, res) => {
    const { id, idGame } = req.params

    try {
        const user = await Player.findByPk(id)
        const game = await Videogame.findByPk(idGame)

        if(user && game){
            await user.addWish(game)
        }else{
            return res.send('No se encontro el usuario')
        }

        return res.send('Deseo agregado')

    } catch (error) {
        res.send(error)
    }
})

router.delete('/delete/:id/:idGame', async(req, res) => {
    const { id, idGame } = req.params

    try {
        const user = await Player.findByPk(id)
        const game = await Videogame.findByPk(idGame)


        if(user && game){
            await user.removeWish(game)
        }else{
            return res.send('No se encontro el usuario')
        }

        return res.send('Deseo eliminado')
    } catch (error) {
        res.send(error)
    }
})

module.exports = router