const { Videogame,Genre, Tag} = require('../db')
const { Op } = require("sequelize");
const { Router } = require('express');
const router = Router();
require('dotenv').config();
const axios = require("axios")
const { API_KEY } = process.env
const  getAllApiGames = require('../services/services');




//---------Query---------//

router.get('/', async (req, res) => {
 
  const testGames = await Videogame.findAll()


  if(testGames.length === 0){
  console.log('descargando juegos de la API')

  let juego = await getAllApiGames()
  let copi = juego
  juego.map((e) => { Videogame.findOrCreate({
    where:{
      id: e.id,
      name: e.name,
      release_date: e.released,
      image: e.background_image,
      description: e.slug,
      rating: e.rating,
      price: (Math.random()*10).toFixed(3),
      on_sale: (Math.random()*10) < 7 ? false : true,
      free_to_play: e.tags.filter(j => j.name === "Free to Play").length ? true : false,
      short_screenshots: e.short_screenshots.map(s => s.image),
      // esrb_ratings: e.esrb_rating !== null?  e.esrb_rating.name : "Rating Pending"
    }})
  }) 
  await Promise.all(juego)
  console.log('guardando relacion de generos')
 
  // let games = await getAllApiGames()
  let genre = juego.map(e => e.genres.map(g => g.name))

  let promisePendingArray = []
 for (let i = 0; i < copi.length; i++) {       
  let genreDb = await Genre.findAll({
    where: {
      name: genre[i]
    }
  });  
  Videogame.findByPk(copi[i].id)
  .then(response => response.addGenre(genreDb))

  console.log('cargando '+ i +' juegos')    
          
}
console.log('juegos cargados!') 

let totalData =  await Videogame.findAll(
   {
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

res.send(totalData);
       
}
/////////////////////////////////////////llamado a BD
else{
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
      offset: page,
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
    })
    
    res.send(videogames);
  }

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
    
  
 
  
  } catch (error) {
    console.log("El juego no se encontro u ocurrio un error!")
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