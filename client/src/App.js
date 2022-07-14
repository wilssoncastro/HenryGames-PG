import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/Home/home';
import Library from './components/Library/library';
import Detail from './components/Detail/detail';
import ShoppingCart from './components/Shopping-Cart/shopping_cart';
import Profile from './components/Profile/profile';
import LogIn from './components/Form/log_in';
import SignUp from './components/Form/sign_up';
import Store from './components/Store/store'
import Wishlist from './components/Wish-List/wish_list';
import LandingPage from './components/Langing-Page/LangingPage';
import VideogameCreate from './components/VideogameForm/CreateVideogame';
/*Administradr */
import Estadisticas from './components/Administrador/EstadisticasVentas';
import { Admin } from './components/Administrador/Admin';
import Edit from './components/Administrador/EditVideogame';
import CommentAdmin from './components/Administrador/CommentAdmin';
/* */
import FormEdit from './components/VideogameForm/FormEdit'
import Blog from './components/Blog/Blog';
import Article from './components/Blog/Article';
import EditArticles from './components/Blog/EditArticles';
import { Users } from './components/Administrador/Users';
//import Comment from './components/Comment/Comment';
import ValidationMail from './components/ValidationMail/validationMail'
import  EdiProfile from './components/Profile/EditProfile';
import  Friends  from './components/Friends/Friends';
import ValidationGame from './components/ValidationGame/validationGame';
import Chat from './components/ChatRoom/chat'
import AccountDeleted from './components/AccountDeleted/AccountDeleted';
import ReSendMail from './components/ReSendMail/ReSendMail';
//import Google from './components/Google/Google';
import RecoveryPassword from './components/RecoveryPassword/RecoveryPassword';
import ChangePassword from './components/ChangePassword/ChangePassword';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>

          {/* LANDING page que va a pedir Log In, ofrecer tambien un Sign Up, si por COOKIES detecta 
              que ya esta loggeado, te manda directo al Home O ENTRAR COMO INVITADO */}
          
          <Route exact path='/' element={<LandingPage />} />

          {/* Muestra algunas categorias (a lo netflix) con los juegos promocionados en esa categoria en forma de BANNER */}
          <Route exact path='/home' element={<Home />}/>

          {/* Detalles de los videojuegos */ }
          <Route exact path='/store/:id' element={<Detail />} />

          {/* Página del admin */}
          <Route exact path='/admin' element={<Admin/>}/>
          
          {/* Ruta para publicar videogame */}
          <Route exact path='/admin/publishVideogame' element={<VideogameCreate />} />

          {/* Editar o borrar videogame */}
          <Route exact path='/admin/editVideogame' element={<Edit />} />

          <Route exact path='/admin/editVideogame/formEdit/:id' element={<FormEdit />} />

          {/* STORE es la tienda donde van a aparecer TODOS los juegos. Aca se van a poder FILTRAR */}
          <Route exact path='/store' element={<Store />}/>

          {/* LIBRARY es la libreria de juegos que el USUARIO tiene comprados */}
          <Route exact path='/library' element={<Library />}/>

          {/* Ingresar al detalle del juego cuando lo clickeas o pedis ver su detalle */}
          <Route exact path='/store/:id' element={<Detail />}/>

          {/* Te manda a un form para crear tu perfil que va a ser ingresado en la Base de Datos. AUTENTICACION!!!!!! */}
          <Route exact path='/sign_up' element={<SignUp />}/>
          <Route exact path='/log_in' element={<LogIn />}/> 
          {/* Te manda a tu perfil :)  */}
          <Route exact path='/profile/:id' element={<Profile />}/>
          <Route exact path='/profile/:id/editprofile' element={<EdiProfile/>}/>
          <Route exact path='/profile/:id/delete' element={<AccountDeleted/>}/>

          {/* componente para ver las estadisiticas, para el admin */}
          <Route exact path='/admin/statistics' element={<Estadisticas />}/>
          <Route exact path='/admin/users' element={<Users />} />
          <Route exact path='/admin/comments' element={<CommentAdmin />} />

          {/* Te manda a tu carrito (larga la pasta monki) */}
          <Route exact path='/my_cart' element={<ShoppingCart />}/>

          {/* Te manda a la lista de deseos */}
          <Route exact path='/wish_list' element={<Wishlist />} />
          
          {/* Autorizacion - NO TOCAR */}
          <Route path='/activation/:user_id/:token' element={<ValidationMail />} />

          {/* ingresar al blog, donde encontraremos articlos, noticias, acerca del mundo gamer */}
          <Route exact path='/blog' element={<Blog />}/>

          <Route exact path= '/blog/:id' element={<Article/>} />
          <Route exact path= '/blog/editArticles' element={<EditArticles/>} />

          {/* amigos*/} 
          <Route exact path='/friends/:id' element={<Friends/>}/>
          <Route path='/activation/games/:secretCode/:id_user/:longitude' element={<ValidationGame />}/>
          <Route path='/activation/mail-validation/:mail' element={<ReSendMail />}/>

          {/* ///CHAT */}
          <Route path='/chat/:id_user/:idF' element={<Chat />}/>

          {/* <Route path='/googleLogin' element={<Google />}/> */}
          <Route path='/recoverPass' element={<RecoveryPassword />} />
          <Route path='/recoverPass/:id_user' element={<ChangePassword />} />
          {/* <Route path='/comment' element={<Comment />} /> */}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
