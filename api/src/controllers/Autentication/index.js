const router = require('express').Router();
const routerRegister = require('./registerRoutes')
const emailVerificationRouter = require('./emailVerificationRoutes')

router.use('/', routerRegister)
router.use('/', emailVerificationRouter)

router.get('/', async (req, res) => {
    try {
        res.status(200).send("Ruta api/service")
    } catch (error) {
        res.status(error.status).json({error: error.message})
    }
});

module.exports = router