const { Router } = require("express")
const router = Router()
const { Esrb } = require('../db.js')

router.get('/', async (req, res) => {

    try {
        let esrbFromDb = await Esrb.findAll()
        res.status(200).send(esrbFromDb)
    } catch (error) {
        res.status(404).send(error)
    }
})

module.exports = router