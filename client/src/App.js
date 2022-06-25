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

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>

          {/* LANDING page que va a pedir Log In, ofrecer tambien un Sign Up, si por COOKIES detecta 
              que ya esta loggeado, te manda directo al Home O ENTRAR COMO INVITADO */}

        {/*   <Route exact path='/' element={<LogIn/>}/> */}
          <Route exact path='/' element={<LandingPage />} />

          {/* Muestra algunas categorias (a lo netflix) con los juegos promocionados en esa categoria en forma de BANNER */}
          <Route exact path='/home' element={<Home/>}/>

          {/* Detalles de los videojuegos */ }
          <Route exact path='/store/:id' element={<Detail/>} />

                {/* RUTA TEMPORAL O NO. */}
          <Route exact path='/home/createVideogame' element={<VideogameCreate/>} />

          {/* STORE es la tienda donde van a aparecer TODOS los juegos. Aca se van a poder FILTRAR */}
          <Route exact path='/store' element={<Store/>}/>

          {/* LIBRARY es la libreria de juegos que el USUARIO tiene comprados */}
          <Route exact path='/library' element={<Library/>}/>

          {/* Ingresar al detalle del juego cuando lo clickeas o pedis ver su detalle */}
          <Route exact path='/store/:id' element={<Detail/>}/>

          {/* Te manda a un form para crear tu perfil que va a ser ingresado en la Base de Datos. AUTENTICACION!!!!!! */}
          <Route exact path='/sign_up' element={<SignUp/>}/>

          {/* Te manda a tu perfil :)  */}
          <Route exact path='/profile/:id' element={<Profile/>}/>

          {/* Te manda a tu carrito (larga la pasta monki) */}
          <Route exact path='/my_cart' element={<ShoppingCart/>}/>

          {/* Te manda a la lista de deseos */}
          <Route exact path='/wish_list' element={<Wishlist/>} />
          
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
