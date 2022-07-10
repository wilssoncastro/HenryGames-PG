const {Router} = require('express')
const { Chat, Player } = require('../db.js');

const router = Router();

router.get('/:id_user/:idF', async(req, res) => {
    const { id_user, idF} = req.params

    let condition = {}
    let where = {}

    if(id_user && idF){
        where.id_user=id_user 
        where.idF=idF}
        condition.where = where
    // condition.include = Player

    try {
        let messages = await Chat.findAll(condition) 

        res.json(messages)
    } catch (error) {
        res.status(404).send('Error al cargar comentarios')
    }
})


router.post('/message/:id_user/:idF', async(req, res) => {
    const { id_user, idF} = req.params
    const { message, username } = req.body
    
    

    if(!id_user || !idF)return res.status(401).send('Faltan parametros obligatorios')
    if(message.length > 256)return res.status(401).send('El mensaje es muy largo.')

    try {
        
        let user = await Player.findByPk(id_user);
        let friend = await Player.findByPk(idF)
        if(!user)return res.status(404).send('El usuario no existe')
        if(!friend) return res.status(404).send('El amigo no existe')
        if(!username) return res.status(404).send('No ingresaste el usuario')
        
        let create = {
            username:username,
            id_user: id_user,
            idF: idF,
            message: message,
            
        }
        console.log('el mensaje se creo')
        let messageToChat = await Chat.create(create)
        console.log('llego hasta aca2')
        res.send(messageToChat
            )
    } catch (error) {
        console.log(error)
        res.status(404).send(error)
    }
})


module.exports = router