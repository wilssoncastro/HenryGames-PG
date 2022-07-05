const { Router } = require('express');
const { Article } = require('../db.js');



const router = Router();

router.get('/', async (req, res) => {

    try {
        
        const allArticles= await Article.findAll();
        
         console.log("ruta", allArticles) 
        res.json(allArticles)
    } catch (error) {
        console.log("error", error)
    }
}) 

module.exports = router