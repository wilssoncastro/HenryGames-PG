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
            res.send('No se encontro el usuario... Intentalo otra vez')
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
        const gamesL = JSON.parse(localStorage.getItem('cart'));

        if(user && game){
            await user.addCart(gamesL)
        }else{
            return res.send('No se encontro el usuario... Intentalo otra vez')
        }

        return res.send('Juego agregado a carrito agregado')

    } catch (error) {
        res.send(error)
    }
})

// router.delete('/delete/:id/:idGame', async(req, res) => {
//     const { id, idGame } = req.params

//     try {
//         const user = await Player.findByPk(id)
//         const game = await Videogame.findByPk(idGame)


//         if(user && game){
//             await user.removeCart(game)
//         }else{
//             return res.send('No se encontro el usuario... Intentalo otra vez')
//         }

//         return res.send('Juego descartado del carrito')
//     } catch (error) {
//         res.send(error)
//     }
// })

module.exports = router