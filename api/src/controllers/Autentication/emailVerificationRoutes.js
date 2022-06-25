const { Router } = require('express')
const nodemailer = require('nodemailer')

let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      type: "OAuth2",
      user: "nicolasgonzalezdev@gmail.com",
      clientId: "127347722329-a6uc4sri8t59nhji4i061nmhlr7hcd72.apps.googleusercontent.com",
      clientSecret: "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",
      refreshToken: "1//04cRJ-vwYIVQqCgYIARAAGAQSNwF-L9Ir3LXz6tTFCpwdbNeP7z1Ju5_aVdsn6pC5mEQt3nWB4WkAfuJ6ayIE8rmSM5KKzyFmIaI",
      accessToken: "ya29.a0ARrdaM_6ZY7IZ2V7-aM1S-1Ha2ZQo5ylEg_RwTCNrNTbK62SkDmOmFZq7pAu-tWWETv5UgrGllt76PeJxPOOaOY5S6RSeAjj_A-BEZm_ryX0Vp2LdSjCLjzhctqmzFEs90geWhp5RfHmS7wSdJ5i8It-Edcu",
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