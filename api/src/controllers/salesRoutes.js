const { Router } = require('express');
const { Sale, Player, Videogame } = require('../db.js');
const { v4: uuidv4 } = require('uuid');


const router = Router();

router.get('/', async(req, res) => {
    try {
        const sales = await Sale.findAll()

        return res.json(sales)
    } catch (error) {
        return res.status(401).send('Hubo un error')
    }
})

// Para realizar una venta si o si enviar un array
// Por mas que solo sea un elemento
// 
// 
// 
// 
// 

router.post('/made/:id_user', async (req, res) => {
    const id_sale = uuidv4()
    const { id_user } = req.params
    let game
    try {
        let user = await Player.findByPk(id_user)

        if(!user)return res.status(401).send('Usuario desconocido')

        let data = (req.body).map(e => {
            return {
                id_sale: id_sale,
                id_game:e.id,
                id_user: id_user,
                price: e.price
            }
        })
        
        for(let i = 0; i<data.length; i++){
            game = await Videogame.findByPk(data[i].id_game)
            if(!game)return res.status(401).send('Juego desconocido')
        }

        for(let i = 0; i<data.length; i++){
            game = await Videogame.findByPk(data[i].id_game)
            game.contador = game.contador + 1
            await game.save()
        }
        
        const promise_pending_array = data.map(e => Sale.create(e))

        await Promise.all(promise_pending_array)
    
        

        res.json('Compra realizada exitosamente')
    } catch (error) {
        res.status(404).send(error)
    }
})

module.exports = router