const { Router } = require('express')
const nodemailer = require('nodemailer')
const { Player } = require('../../db');
const randomstring = require("randomstring");

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

router.get('/email/gameActivation/:secretCode/:id_user/:longitude', async(req, res) => {
    const { secretCode, id_user, longitude } = req.params
    

    const user = await Player.findByPk(id_user)
    let mail = user.email
    

    const link = `http://localhost:3000/activation/games/${secretCode}/${id_user}/${longitude}`
    
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

        res.redirect("http://localhost:3000/home")


    } catch (error) {
        res.status(404).send(error)
    }
})

router.get('/email/reSend/:mail', async(req, res) => {
    const { mail } = req.params
    

    try {
        let user = await Player.findAll({where: {
            email: mail
        }})

        

        if(!user)return res.send('No se encontro el usuario')

        const user_id = user[0].dataValues.id
        
        const token = user[0].dataValues.secret_token
        
        
        let verification_link = `http://localhost:3000/activation/${user_id}/${token}`
        

        if(user_id && token && mail){
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

            res.json('Mail reenviado');
        }

    } catch (error) {
        res.send(error)
    }
})

router.post('/recovery_password', async(req, res) => {
    const { mail } = req.body

    try {
        let user = await Player.findOne({
            where: {
                email: mail
            }
        })

        if(!user)return res.send('No se encontro el usuario')

        const new_token = await randomstring.generate(7)

        user.secret_token = new_token
        await user.save()

        if(new_token){
            let mail_options = {
                from: '🎮🕹 <nicolasgonzalezdev@gmail.com> ',
                to: mail,
                subject: 'Activacion de Mail',
                html:`
                <b>Escriba este codigo en HenryGames para modificar su contraseña</b>
                <br>
                <h1><b>${new_token}</b></h1> 
                `
            }

            let info = await transporter.sendMail(mail_options, (error, info) => {
                if(error)console.log(error, 'ERROOOOOOOOOOOOOOOOOOOOOOORRRRRRRRRRRRRRRRRRRRRR')
            })

            res.json(user.id);
        }

    } catch (error) {
        res.send(error)
    }
})



module.exports = router