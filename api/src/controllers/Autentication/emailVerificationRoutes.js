const { Router } = require('express')
const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'theresa.goodwin29@ethereal.email',
        pass: 'p6wj5ck6wZ4RYfE4Y5'
    }
});


const router = Router();

router.get('/email/activation/:userId/:token/:mail', async(req, res, next) => {
    let { userId, token, mail} = req.params
    try {
        

        res.send('')
    } catch (error) {
        console.log(error)
    }
})

module.exports = router