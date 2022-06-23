// const { Router } = require("express")
// const router = Router()
// const axios = require('axios')
// const {API_KEY} = process.env;
// const { Tag } = require('../db.js')

// router.get('/', async (req, res) => {
//     // let tagsFromApi = await axios.get(`https://api.rawg.io/api/tags?key=${API_KEY}&page_size=40`)

//     try {
//         // let allTags = tagsFromApi.data.results.map(tag => tag.name)

//         // allTags.forEach(tag => {
//         //     Tag.findOrCreate({
//         //         where: {name: tag}
//         //     })
//         // })

//         let tagFromDb = await Tag.findAll()
//         res.status(200).send(tagFromDb)
//     } catch (error) {
//         res.status(404).send(error)
//     }
// })

// module.exports = router