import logo from './logo.svg';
import './App.css';
import Header from './components/header';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/home';
import AddBlog from './pages/addBlog';
import Login from './pages/login';
import Signup from './pages/signup';
function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route exact path = '/' element={<Home />}/>
        <Route exact path = '/add-blog' element={<AddBlog />}/>
        <Route exact path = '/login' element = {<Login />}/>
        <Route exact path = '/signup' element = {<Signup />}/>
      </Routes>
    </div>
  );
}

export default App;
