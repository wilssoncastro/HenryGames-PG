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

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    console.log("ID",id)
   
    try {
        const articleId= await Article.findByPk(id);
        console.log("allArtilcles",articleId); 

        if(articleId){
            res.status(200).json(articleId) 
        }
       

    } catch (error) {
        console.log("error", error)
        res.status(404).send('article not found')
    }
   
    
    /* if(id){
        idArticle.length ? res.status(200).json(idArticle) :
    res.status(404).send('Country not found')
    } */
    
})

module.exports = router