const {Router} = require('express')
const { Player, Videogame } = require('../db.js');

const router = Router();

router.get('/:id', async(req, res) =>{
    const { id } = req.params;
    try {
        const user = await Player.findByPk(id, {
            include: 'cart'
        })

        if(!user){
            res.send('No se encontro el usuario... Avergas')
        } else {
            res.send(user)
        }

    } catch (error) {
        res.send(error)
    }
})

router.post('/add/:id/:idGames', async(req, res) =>{
    const {id, idGames} = req.params;
    try {
        const user = await Player.findByPk(id)
        const game = await Videogame.findByPk(idGames)

        if(user && game){
            await user.addCart(game)
        }else{
            return res.send('No se encontro el usuario... Intentalo otra vez')
        }

        return res.send(game)

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
            await user.removeCart(game)
        }else{
            return res.send('No se encontro el usuario... Intentalo otra vez')
        }

        return res.send(game)
    } catch (error) {
        res.send(error)
    }
})

router.delete('/deleteAll/:id', async(req, res) => {
    const { id } = req.params

    try {
        const user = await Player.findByPk(id)
       
        if(!user){
            await user.removeCart()
        }else{
            return res.send('No se encontro el usuario... Intentalo otra vez')
        }

        return res.send('Juego Eliminado')
    } catch (error) {
        res.send(error)
    }
})
module.exports = router