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

router.post('/addToMany/:id', async (req, res) => {
    const { id } = req.params
    const { games } = req.body
    

    try {
        if(games){
            let user = await Player.findByPk(id)
            
            if(!user)return res.status(404).send('El usuario no existe')

            let response = games.map(e => e.name)
            let games_added = await Videogame.findAll({
                where:{name:response}
            })

            console.log(games_added)

            await user.addCart(games_added)

            res.send(user)
        }else{
            return res.send('No mandaste juegos!')
        }
    } catch (error) {
        res.status(401).send(error)
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

// router.delete('/deleteAll/:id', async(req, res) => {
//     const { id } = req.params

//     try {
//         const user = await Player.findByPk(id)
       
//         if(!user){
//             await user.removeCart()
//         }else{
//             return res.send('No se encontro el usuario... Intentalo otra vez')
//         }

//         return res.send('Juego Eliminado')
//     } catch (error) {
//         res.send(error)
//     }
// })
router.post('/deleteToMany/:id', async (req, res) => {
    let { id } = req.params

    let { games } = req.body

    try {
        let user = await Player.findByPk(id)
        if(!user)return res.status(404).send('El usuario no existe')
        console.log(user)

        let response = games.map(e => e.name)
        let games_deleted = await Videogame.findAll({
            where:{name:response}
        })

        console.log(games_deleted)

        const promise_pendings_array = games_deleted.map(e => user.removeCart(e))
        await Promise.all(promise_pendings_array)

        res.send(user)

    } catch (error) {
        res.status(401).send(error)
    }
})

module.exports = router