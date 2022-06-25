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
                if(error)console.log(error)
                else {
                    
                    res.status(200).send('Todo chill')
                }
            })

            
        }
        
        console.log('llegue')
        
    } catch (error) {
        console.log('no llegue')
        console.log(error)
    }
})

module.exports = router