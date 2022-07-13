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
const { Player, Videogame, Genre, Esrb, Comment, Sale, Article, LibraryPlayer, Chat} = sequelize.models;

// Aca vendrian las relaciones
//Player.hasMany(Player)  En duda, es para amigos.

//------------------VIDEOGAME N:M PLAYER----------------------
Videogame.belongsToMany(Player, {through: 'Player_Videogame'})
Player.belongsToMany(Videogame, {through: 'Player_Videogame'})

//------------------VIDEOGAME N:M GENRE-----------------------
Videogame.belongsToMany(Genre, {through: 'Genre_Videogame'})
Genre.belongsToMany(Videogame, {through: 'Genre_Videogame'})

//------------------VIDEOGAME N:M TAG-------------------------
// Tag.belongsToMany(Videogame, {through: 'Tag_Videogame'})
// Videogame.belongsToMany(Tag, {through: 'Tag_Videogame'})
// Esrb.hasMany(Videogame)
// Videogame.belongsTo(Esrb)
//------------------VIDEOGAME 1:M SALE-----------------------
/* Sale.hasOne(Videogame)
Videogame.belongsTo(Sale)  */
Videogame.hasMany(Sale)
Sale.belongsTo(Videogame)
//---------------------PLAYER N:M FRIEND--------------------------------
Player.belongsToMany(Player, { 
  as: 'friends',
  foreignKey: 'user_id',
  through: 'UsersFriends'
});

Player.belongsToMany(Player, { 
  as: 'userFriends',
  foreignKey: 'friend_id',
  through: 'UsersFriends'
});
//////////////////////////////////
//----------------------PLAYER N:M VIDEOGAME (WISH-LIST)--------------------------//
Player.belongsToMany(Videogame,{
  as: 'wishs',
  foreignKey: 'player_id',
  through: 'WishList'
})

Videogame.belongsToMany(Player,{
  as: 'wishGame',
  foreignKey: 'wish_id',
  through: 'WishList'
})
//----------------------PLAYER N:M VIDEOGAME (CART)--------------------------//
Player.belongsToMany(Videogame,{
  as: 'cart',
  foreignKey: 'player_id',
  through: 'Cart'
})

Videogame.belongsToMany(Player,{
  as: 'cartGames',
  foreignKey: 'cart_id',
  through: 'Cart'
})

//---------------------PLAYER N:M COMMENTS ----------------------------------------//

// Player.belongsToMany(Videogame, {
//   as: 'comments_player',
//   foreignKey: 'id_user',
//   through: Comment
// })

// Videogame.belongsToMany(Player,{
//   as: 'comments_videogame',
//   foreignKey: 'id_game',
//   through: Comment
// })

//----------------------PLAYER N:M VIDEOGAMES (LIBRARY) -----------------------------------------//

Player.belongsToMany(Videogame,{
  as: 'library',
  foreignKey: 'id_user',
  through: LibraryPlayer
})

Videogame.belongsToMany(Player,{
  as: 'players_property',
  foreignKey: 'id_game',
  through: LibraryPlayer
})


//---------------------PLAYER N:M CHAT ----------------------------------------//

Player.belongsToMany(Chat, {through: "player_chat"})
Chat.belongsToMany(Player, {through: "player_chat"});

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize,     // para importart la conexión { conn } = require('./db.js');

};

