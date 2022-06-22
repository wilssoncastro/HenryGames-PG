const { Videogame,Genre, Tag} = require('../db')
const { Op } = require("sequelize");
const { Router } = require('express');
const router = Router();
require('dotenv').config();
const axios = require("axios")
const { API_KEY } = process.env



//---------Query---------//

router.get('/:id', async (req, res) => {
  
  const id = req.params.id
  try {
    const videogames = await Videogame.findByPk(id)
    
    if(videogames.db_created === false){

      const videogames = await Videogame.findByPk(id
        , {
          include: [{
            model: Genre,
            attributes: ['name'],
            through: {
                attributes: [],
            }
            
        },
        {
            model: Tag,
            attributes: ['name'],
            through: {
                attributes: [],
            }
            
        }
      ]
    }
    
    )
    console.log('cargando descripcion del juego')

    const gameDetail = await axios(`https://api.rawg.io/api/games/${videogames.id}?key=${API_KEY}`);
    
    
    videogames.dataValues.description = gameDetail.data.description
    
    console.log('juego cargado exitosamente') 
    
     
    res.send(videogames)

    }else
    {
      const videogames = await Videogame.findByPk(id
        , {
        include: [{
            model: Genre,
            attributes: ['name'],
            through: {
                attributes: [],
            }
            
        },
        {
            model: Tag,
            attributes: ['name'],
            through: {
                attributes: [],
            }
            
        }
      ]
    }
    
    )   
    console.log('juego cargado exitosamente')   
     res.send(videogames)
    }
    
  
 
  
  // if (videogames.db_created == false) {
  //   let e = gameDetail.data;
  //   const detailsObj = {
  //     name: e.name,
  //     image: e.background_image,
  //     description: e.description,
  //     released: e.released,
  //     rating: e.rating,
  //     genres: e.genres.map(e => e.name),
  //     price: videogames.price,
  //     free_to_play: videogames.free_to_play,
  //     screeshots: videogames.short_screenshots,
  //     esrb_ratings: videogames.esrb_ratings,
  //     tags: videogames.tag.map(e => e),
  //     on_sale: videogames.on_sale
  //   }
  //   console.log("DB FALSE")
  //   res.send(detailsObj);
  // }
  // else {
  //   const obj = {
  //     name: e.name,
  //     image: e.background_image,
  //     description: e.description,
  //     released: e.released,
  //     rating: e.rating,
  //     price: videogames.price,
  //     free_to_play: videogames.free_to_play,
  //     screeshots: videogames.short_screenshots,
  //     on_sale: videogames.on_sale
  //   }
  //   console.log("DB TRUE")
  //   res.send(obj)
  // }

  } catch (error) {
    console.log("El juego no se encontro u ocurrio un error!")
  }
})
router.get('/', async (req, res) => {


  const { name, page, limit, order, sort} = req.query
  if (name) {
    const videogames = await Videogame.findAll({
      where: {
        name: { [Op.iLike]: `${name}%` },
      },
    })
    res.send(videogames);
  }
  else if (sort && order) {
    const videogames = await Videogame.findAll({
      limit: limit, // cantidad de videogames por página
      offset: page, // índice del primer videogame que se muestra en la página
      order: [[sort, order]] // sort (ordenamiento por) y order (ordenamiento ASC o DESC)
    })
    res.send(videogames);
  }
  else {
    const videogames = await Videogame.findAll({
      limit: limit,
      offset: page
    });
    res.send(videogames);
  }
})

// ---------Params---------//
// router.get('/:id', async (req, res) => {
//   const id = req.params.id
//   const videogames = await Videogame.findByPk(id);
//   res.send(videogames);
//   console.log(videogames)
// })

router.get('/:id', async (req, res) => {
  try {
  const id = req.params.id
  const videogames = await Videogame.findByPk(id);
  
  if (!videogames.dataValues.db_created) {
    const gameDetail = await axios(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`);
    let e = gameDetail.data;
    const detailsObj = {
      name: e.name,
      image: e.background_image,
      description: e.description,
      released: e.released,
      rating: e.rating,
      genres: e.genres.map(e => e.name),
      price: videogames.price,
      free_to_play: videogames.free_to_play,
      screeshots: videogames.short_screenshots,
      esrb_ratings: videogames.esrb_ratings,
      tags: videogames.tag.map(e => e),
      on_sale: videogames.on_sale
    }
    console.log("DB FALSE")
    res.send(detailsObj);
  }
  else {
    const obj = {
      name: e.name,
      image: e.background_image,
      description: e.description,
      released: e.released,
      rating: e.rating,
      price: videogames.price,
      free_to_play: videogames.free_to_play,
      screeshots: videogames.short_screenshots,
      on_sale: videogames.on_sale
    }
    console.log("DB TRUE")
    res.send(obj)
  }
  } catch (error) {
    console.log("errorcachado")
  }
})

module.exports = router;

// {
//   include: [{
//     model: Genre,
//     attributes: ["name"],
//     through: {
//       attributes: []
//     }
//   },
//   {
//     model: Esrb,
//     attributes: ["name"],
//     through: {
//       attributes: []
//     }
//   },
//   {
//     model: Tag,
//     attributes: ["name"],
//     through: {
//       attributes: []
//     }
//   }],
// }