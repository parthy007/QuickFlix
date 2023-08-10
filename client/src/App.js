import './app.scss';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import HomePage from './pages/Home/Homepage.jsx';
import Watch from './pages/Watch/Watch';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import { useContext } from 'react';
import {AuthContext} from "./authContext/AuthContext"


function App() {
const {user} = useContext(AuthContext);
  return (
    <div className="app">
      <Router>
        <Routes>
          <Route path='/' element={user ? <HomePage/> : <Navigate replace to="/register"/>}/>
          <Route path='/register' element={!user ? <Register/> : <Navigate replace to="/"/>}/>
          <Route path='/login' element={!user ? <Login/>: <Navigate replace to="/"/>}/>
          {user && (
            <>
            <Route path='/movies' element={<HomePage type="movies"/>}/>
            <Route path='/series' element={<HomePage type="series"/>}/>
            <Route path='/watch' element={<Watch/>}/>
            </>
          )}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
