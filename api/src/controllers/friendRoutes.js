const { Router } = require('express');
const { Player } = require('../db.js');

const axios = require("axios")


const router = Router();

router.get('/:id', async(req, res) => {
    const { id } = req.params
    

    try {
        
        const user = await Player.findByPk(id, {
            include: 'friends'
        })
        

        if(!user){
            return res.send('No se encontro el usuario')
        }

        return res.json(user.friends)
    } catch (error) {
        res.send('No se encontro el usuario')
    }
})

router.post('/addFriend/:id/:idF', async(req, res) => {
    const { id, idF } = req.params

    try {
        const user = await Player.findByPk(id)
        const userF = await Player.findByPk(idF)

        if(user && userF){
            const promise_pending_array = [user.addFriend(userF), userF.addFriend(user)]
            await Promise.all(promise_pending_array)
        }else{
            return res.send('No se encontro el usuario')
        }

        return res.send(userF)

    } catch (error) {
        res.send(error)
        console.log(error)
    }
})

router.delete('/delete/:id/:idF', async(req, res) => {
    const { id, idF } = req.params

    try {
        const user = await Player.findByPk(id)
        const userF = await Player.findByPk(idF)

        if(user && userF){
            const promise_pending_array = [user.removeFriend(userF), userF.removeFriend(user)]
            await Promise.all(promise_pending_array)
        }else{
            return res.send('No se encontro el usuario')
        }

        return res.send(userF)
    } catch (error) {
        res.send(error)
    }
})

module.exports = router