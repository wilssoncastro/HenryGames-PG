const { Router } = require('express');
const { Comment, Player, Videogame } = require('../db.js');

const router = Router();

router.get('/', async(req, res) => {
    const { id_game } = req.query

    let condition = {}
    let where = {}

    if(id_game)where.id_game=id_game
    condition.where = where
    

    try {
        let comments = await Comment.findAll({condition}) 

        res.json(comments)
    } catch (error) {
        res.status(404).send('Error al cargar comentarios')
    }
})

router.post('/madeComment/:id_user/:id_game', async(req, res) => {

    const { id_user, id_game} = req.params
    const { comment } = req.body
    

    if(!id_user || !id_game)return res.status(401).send('Faltan parametros obligatorios')
    if(comment.length > 256)return res.status(401).send('El comentario es muy largo.')

    try {
        console.log('Hola!')
        let user = await Player.findByPk(id_user);
        let videogame = await Videogame.findByPk(id_game)

        if(!user)return res.status(404).send('El usuario no existe')
        if(!videogame) return res.status(404).send('El videojuego no existe')

        let create = {
            id_game: id_game,
            id_user: id_user,
            comment: comment
        }

        let commentary = await Comment.create(create)

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

        res.send('El comentario se modifico correctamente.')
    } catch (error) {
        return res.send(error)
    }
})

router.put('/report_comment/:id_comment', async(req, res) => {
    const { id_comment } = req.params

    try {
        let reported_comment = await Comment.findByPk(id_comment)
        if(!reported_comment)return res.status(401).send('El comentario no existe')

        reported_comment.reported = true
        return res.send('El comentario fue denunciado.')

    } catch (error) {
        res.status(404).send(error)
    }
})

router.put('/unreport_comment/:id_comment', async(req, res) => {
    const { id_comment } = req.params

    try {
        let unreported_comment = await Comment.findByPk(id_comment)
        if(!unreported_comment)return res.status(401).send('El comentario no existe')

        reported_comment.reported = false
        return res.send('Eliminaste el reporte.')

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
        return res.send('El comentario fue eliminado.')

    } catch (error) {
        res.status(404).send(error)
    }
})

module.exports = router