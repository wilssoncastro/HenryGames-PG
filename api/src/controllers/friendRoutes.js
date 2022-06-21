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

        return res.json(user)
    } catch (error) {
        
    }
})

router.post('/addFriend', async(req, res) => {
    
})

module.exports = router