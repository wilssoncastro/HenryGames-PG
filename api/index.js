//                      __
//                    .'  '.
//                _.-'/  |  \
//   ,        _.-"  ,|  /   `-.
//   |\    .-"       `--""-.__.'=====================-,
//   \ '-'`        .___.--._)=========================|
//    \            .'      |                          |
//     |     /,_.-'        |        HENRYGAMES        |
//   _/   _.'(             |                          |
//  /  ,-' \  \            |                          |
//  \  \    `-'            |                          |
//   `-'                   '--------------------------'

const server = require('./src/app.js');
const { conn } = require('./src/db.js');
const { genres, esrb, addArticle } = require('./src/services/saveToDb');


conn.sync({ force: true }).then(() => {
  server.listen(3001, () => {
    console.log('%s listening at 3001'); // eslint-disable-line no-console
    esrb()
    genres()  
    addArticle()// permite cargar el blog con los articulos de la BD
  });
});