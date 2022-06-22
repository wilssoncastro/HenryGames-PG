require('dotenv').config();
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');
const {
  DB_USER, DB_PASSWORD, DB_HOST, API_KEY
} = process.env;
// const  getAllApiGames = require('./services/services.js');
// const  axios  = require('axios');


const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/henrygames`, {
  logging: false, // set to console.log to see the raw SQL queries
  native: false, // lets Sequelize know we can use pg-native for ~30% more speed
});
const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, '/models'))
    .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
    .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
});

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach(model => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const { Player, Videogame, Genre, Esrb, Tag} = sequelize.models;

// Aca vendrian las relaciones
//Player.hasMany(Player)  En duda, es para amigos.

//------------------VIDEOGAME N:M PLAYER----------------------
Videogame.belongsToMany(Player, {through: 'Player_Videogame'})
Player.belongsToMany(Videogame, {through: 'Player_Videogame'})

//------------------VIDEOGAME N:M GENRE-----------------------
Videogame.belongsToMany(Genre, {through: 'Genre_Videogame'})
Genre.belongsToMany(Videogame, {through: 'Genre_Videogame'})

//------------------VIDEOGAME N:M TAG-------------------------
Tag.belongsToMany(Videogame, {through: 'Tag_Videogame'})
Videogame.belongsToMany(Tag, {through: 'Tag_Videogame'})
// Esrb.hasMany(Videogame)
// Videogame.belongsTo(Esrb)

// async function generos(){
//   const allGenres = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`)
//   let genres = (allGenres.data.results)
//   let todes =  genres.forEach(g=> {
//      Genre.create(
//       {
//         name: g.name       
//       }

//     ).then(console.log('holaaa'))
    
//   })
  

//   // .then(response =>response.data.results)
//   // allGenres.then(e=> {
//   //   e.map(g=>{
//   //     Genre.findOrCreate({
//   //       where: {
//   //         name: g.name
//   //       }         
//   //     })
//   //   })
//   // })
// }
// generos()

 


// async function savetoDb() {
//   let juego = await getAllApiGames()
//   juego.map((e) => { Videogame.findOrCreate({
//     where:{
//       id: e.id,
//       name: e.name,
//       release_date: e.released,
//       image: e.background_image,
//       description: e.slug,
//       rating: e.rating,
//       price: (Math.random()*10).toFixed(3),
//       on_sale: (Math.random()*10) < 7 ? false : true,
//       free_to_play: e.tags.filter(j => j.name === "Free to Play").length ? true : false,
//       // genre: e.genres.map(g => g.name),
//       // tag: e.tags.map(t => t.name),
//       short_screenshots: e.short_screenshots.map(s => s.image),
//       // esrb_ratings: e.esrb_rating !== null?  e.esrb_rating.name : "Rating Pending"
//     }})
//   }) 
// }
// savetoDb()
// async function saveGenres(){
//   let juego = await getAllApiGames()
//   let genre = juego.map(e => e.genres.map(g => g.name))

    
//  for (let i = 0; i < juego.length; i++) {       
//   let genreDb = await Genre.findAll({
//     where: {
//       name: genre[i]
//     }
//   });  
//   Videogame.findByPk(juego[i].id)
//   .then(response => response.addGenre(genreDb).then(console.log('relacion creada')))
       
    
// }
// }

// saveGenres() 


   
//   console.log(juego[0].tags)

   
//     for(let i = 0; i < juego.length; i++) {
//       juego[0] = Videogame.create({
//         id: juego[0].id,
//         name:juego[0].name,
//         release_date: juego[0].released,
//         image: juego[0].background_image,
//         description: juego[0].slug,
//         rating: juego[0].rating,
//         price: (Math.random()*10).toFixed(3),
//         on_sale: (Math.random()*10) < 7 ? false : true,
//         free_to_play: juego[0].tags.filter(j => j.name === "Free to Play").length ? true : false,
//         genre: e.genres.map(g => g.name),
//         tag: e.tags.map(t => t.name),
//         short_screenshots: juego[0].short_screenshots.map(s => s.image),
//         esrb_ratings: juego[0].esrb_rating !== null? juego[0].esrb_rating.name : "Rating Pending"
//       })
    
      
//       let hola = juego[i].genres

//       let genreeeeeeees = hola.map(e => e.name)
//       let genresDb = await Genre.findAll({where: {name: genreeeeeeees}})
//       newGame.addGenre(genresDb);
 
   
    
//   }
     
//     })
//     console.log(genresDb)

//     videogameCreate.addGenre(genresDb)




// }





module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize,     // para importart la conexión { conn } = require('./db.js');

};

