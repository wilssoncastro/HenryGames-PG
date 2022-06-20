import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/Home/home';
import Library from './components/Library/library';
import Detail from './components/Detail/detail';
import Shopping_Cart from './components/Shopping-Cart/shopping_cart';
import Profile from './components/Profile/profile';

function App() {
  return (
      <BrowserRouter>
      <div className="App">
        <Routes>
          <Route exact path='/' element={<Home/>}/>
          <Route exact path='/store' element={<Library/>}/>
          <Route exact path='/store/:id' element={<Detail/>}/>
          <Route exact path='/my_cart/:id' element={<Shopping_Cart/>}/>
          <Route exact path='/profile/:id' element={<Profile/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
