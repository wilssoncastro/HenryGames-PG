const { Router } = require('express')
const nodemailer = require('nodemailer')

const { MAIL_USER, CLIENT_ID, CLIENT_SECRET, ACCESS_TOKEN, REFRESH_TOKEN} = process.env

let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      type: "OAuth2",
      user: MAIL_USER,
      clientId: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
      refreshToken: "1//"+REFRESH_TOKEN,
      accessToken: ACCESS_TOKEN,
      expires: 1484314697598,
    },
  });

transporter.verify(()=>{
    console.log('Listo para enviar mails!')
})

const router = Router();

//-------------------------------------------------------------------------------
// Esta ruta envía un correo electrónico de verificación para la validación 
// del email registrado (validar para activar la cuenta)
//-------------------------------------------------------------------------------

router.get('/email/activation/:userId/:token/:mail', async(req, res, next) => {
    let { userId, token, mail} = req.params
    

    let verification_link = `http://localhost:3000/activation/${userId}/${token}`
    try {
        if( userId && token && mail){
            
            let mail_options = {
                from: '🎮🕹 <nicolasgonzalezdev@gmail.com> ',
                to: mail,
                subject: 'Activacion de Mail',
                html:`
                <b>Por favor has click en el siguiente link para verificar su correo</b>
                <br>
                <a href="${verification_link}">LINK</a> 
                `
            }

            let info = await transporter.sendMail(mail_options, (error, info) => {
                if(error)console.log(error, 'ERROOOOOOOOOOOOOOOOOOOOOOORRRRRRRRRRRRRRRRRRRRRR')
            })

            res.json({created: true, message:'Cuenta creada, hemos enviado un email de validación a su correo'});  
        }
        
        console.log('llegue')
        
    } catch (error) {
        console.log('no llegue')
        console.log(error)
    }
})

router.get('/email/gameActivation/:secretCode/:id_user', async(req, res) => {
    const { secretCode } = req.params
    const id_user = req.session.passport.user

    const user = await Player.findByPk(id_user)
    let mail = user.email
    console.log(mail)

    const link = `http://localhost:3000/activation/games/${secretCode}/${id_user}`
    
    try {
        let mail_options = {
            from: '🎮🕹 <nicolasgonzalezdev@gmail.com> ',
            to: mail,
            subject: 'Activacion de juegos',
            html:`
            <b>Su compra fue realizada exitosamente!</b>
            <b>Por favor has click en el siguiente link para verificar tu compra</b>
            <br>
            <a href="${link}">LINK</a> 
            `
        }

        let info = await transporter.sendMail(mail_options, (error, info) => {
            if(error)console.log(error, 'ERROOOOOOOOOOOOOOOOOOOOOOORRRRRRRRRRRRRRRRRRRRRR')
        })

        return res.send(info)


    } catch (error) {
        res.status(404).send(error)
    }
})



module.exports = router