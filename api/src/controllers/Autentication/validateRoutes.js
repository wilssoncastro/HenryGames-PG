const { Router } = require('express')
const { Player } = require('../../db')
const router = Router()

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

    } catch (error) {
        res.status(400).send('Ocurrió un error durante la activación')
    }
})


module.exports = router