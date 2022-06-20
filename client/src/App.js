import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/Home/home';
import Library from './components/Library/library';
import Detail from './components/Detail/detail';
import Shopping_Cart from './components/Shopping-Cart/shopping_cart';
import Profile from './components/Profile/profile';
import Log_In from './components/Form/log_in';
import Sign_Up from './components/Form/sign_up';

function App() {
  return (
      <BrowserRouter>
      <div className="App">
        <Routes>
          <Route exact path='/' element={<Log_In/>}/>
          <Route exact path='/home' element={<Home/>}/>
          <Route exact path='/store' element={<Library/>}/>
          <Route exact path='/store/:id' element={<Detail/>}/>
          <Route exact path='/sign_up' element={<Sign_Up/>}/>
          <Route exact path='/profile/:id' element={<Profile/>}/>
          <Route exact path='/my_cart/:id' element={<Shopping_Cart/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
