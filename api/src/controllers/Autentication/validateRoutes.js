const { Router } = require('express')
const { Player, LibraryPlayer } = require('../../db')
const router = Router()
const bcrypt = require('bcrypt');

//-----------------------------------------------------------------------
// Esta ruta responde cuando necesito activar una cuenta recién creada y es
// llamada directamente por los usuarios cuando les enviamos el correo de
// validación de email, en el cual va un link para llamarla.
//------------------------------------------------------------------------

router.get('/activation/:userId/:secretToken', async(req, res) => {
    const { userId, secretToken } = req.params

    try {
        let user = await Player.findByPk(userId)
        if(!user)return res.status(404).json({err:'El usuario no existe'})

        if(user && user.secret_token === secretToken){
            user.active = true
            await user.save()
        }

        return res.json({msg:'Usuario activado'})

    } catch (error) {
        res.status(400).send('Ocurrió un error durante la activación')
    }
})

router.get(`/activation/games/:secretCode/:id_user/:longitude`, async(req, res) => {
    let { secretCode, id_user, longitude } = req.params
    longitude = parseInt(longitude)
    try {
        

        let user = await Player.findByPk(id_user)

        if(!user){
            return res.send('No se encontro el usuario!')
        }

        let registros = await LibraryPlayer.findAll({
            where: {
                code: secretCode,
                id_user: id_user
            }
        })

        if(registros.length === longitude){
            console.log('Entro a modificar registros')
            for(let i = 0; i < registros.length; i++){
                registros[i].active = true
                await registros[i].save()
            }
        }else{
            
            return res.send('Error en la validacion')
        }

        

        
        return res.send(user)
    } catch (error) {
        console.log('mmm')
        res.status(404).send(error)
    }
})

router.post('/changePassword/:id_user', async(req, res) => {
    const {token, password} = req.body
    const { id_user } = req.params
    try {
        const saltRounds = 8;
        let user = await Player.findByPk(id_user)
        if(!user)return res.send('User not found')

        if(user.secret_token !== token)return res.send('Token invalid!')
        let new_password = await bcrypt.hash(password, saltRounds);

        user.password = new_password
        await user.save()

        return res.send('Your password has been changed')

    } catch (error) {
        
    }
})


module.exports = router