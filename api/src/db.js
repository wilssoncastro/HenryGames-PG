require('dotenv').config();
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');
const {
  DB_USER, DB_PASSWORD, DB_HOST, API_KEY
} = process.env;
const  getAllApiGames = require('./services/services.js');
const axios = require('axios');

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

//------------------ESRB 1:N VIDEOGAME------------------------
Esrb.hasMany(Videogame)
Videogame.belongsTo(Esrb)



 getAllApiGames()
.then(response => 
 response.map((e) => { Videogame.create({
  name: e.name,
  release_date: e.released,
  image: e.background_image,
  rating: e.rating,
  price: (Math.random()*10).toFixed(3),
  on_sale: (Math.random()*10) < 7 ? false : true,
  free_to_play: e.tags.filter(j => j.name === "Free to Play").length ? true : false
})}
))

const allGenres = axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`)
  .then(response =>response.data.results)
  allGenres.then(e=> {
    e.map(g=>{
      Genre.create({
        name: g.name, 
       
      })
    })
  })
 

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize,     // para importart la conexión { conn } = require('./db.js');
};

