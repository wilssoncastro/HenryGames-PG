const { Router } = require('express');
const { Comment, Player, Videogame } = require('../db.js');

const router = Router();

router.get('/', async(req, res) => {
    const { id_game } = req.query

    let condition = {}
    let where = {}

    if(id_game)where.id_game=id_game
    condition.where = where
    // condition.include = Player

    try {
        let comments = await Comment.findAll(condition) 

        res.json(comments)
    } catch (error) {
        res.status(404).send('Error al cargar comentarios')
    }
})

router.get('/:idGame', async(req, res) => {
    const { idGame } = req.params
    
    try {
        let user = await Videogame.findByPk(idGame, {
            include: 'comments_videogame',
            attributes: [],
            
            
        })

        res.send(user)
    } catch (error) {
        res.send(error)
    }
})

router.post('/madeComment/:id_user/:id_game', async(req, res) => {

    const { id_user, id_game} = req.params
    const { comment, username } = req.body
    

    if(!id_user || !id_game)return res.status(401).send('Faltan parametros obligatorios')
    if(comment.length > 256)return res.status(401).send('El comentario es muy largo.')

    try {
        
        let user = await Player.findByPk(id_user);
        let videogame = await Videogame.findByPk(id_game)
        console.log(username)
        if(!user)return res.status(404).send('El usuario no existe')
        if(!videogame) return res.status(404).send('El videojuego no existe')
        if(!username) return res.status(404).send('No ingresaste el usuario')
        
        let create = {
            id_game: id_game,
            id_user: id_user,
            comment: comment,
            username:username
        }
        console.log('llego hasta aca')
        let commentary = await Comment.create(create)
        console.log('llego hasta aca2')
        res.send(commentary)
    } catch (error) {
        res.status(404).send(error)
    }
})

router.put('/editComment/:id_comment', async(req, res) => {
    const { comment } = req.body
    const { id_comment } = req.params

    if(comment.length === 0)return res.status(401).send('No ingresaste nada!')
    if(!id_comment)return res.status(404).send('No especificaste el comentario')

    try {
        let edit_comment = await Comment.findByPk(id_comment)
        if(!edit_comment)return res.status(401).send('El comentario no existe.')
        edit_comment.comment = comment
        await edit_comment.save()

        res.send(edit_comment)
    } catch (error) {
        return res.send(error)
    }
})

router.put('/report_comment/:id_comment', async(req, res) => {
    const { id_comment } = req.params

    try {
        let reported_comment = await Comment.findByPk(id_comment)
        if(!reported_comment)return res.status(401).send('El comentario no existe')
        console.log(reported_comment)
        reported_comment.reported = true
        await reported_comment.save()
        return res.send(reported_comment)

    } catch (error) {
        res.status(404).send(error)
    }
})

router.put('/unreport_comment/:id_comment', async(req, res) => {
    const { id_comment } = req.params

    try {
        let unreported_comment = await Comment.findByPk(id_comment)
        if(!unreported_comment)return res.status(401).send('El comentario no existe')

        unreported_comment.reported = false
        await unreported_comment.save()
        return res.send(unreported_comment)

    } catch (error) {
        res.status(404).send(error)
    }
})

router.delete('/deleteComment/:id_comment', async(req, res) => {
    const { id_comment } = req.params
    if(!id_comment)return res.status(404).send('No especificaste el comentario')

    try {
        let delete_comment = await Comment.findByPk(id_comment)
        if(!delete_comment)return res.status(401).send('El comentario no existe')

        await delete_comment.destroy()
        return res.send(delete_comment)

    } catch (error) {
        res.status(404).send(error)
    }
})

module.exports = router