import './App.css';
import Home from './Components/Home';
import Login from './Components/Login';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import City from './Components/City'
import State from './Components/State'
import Warehouse from './Components/Warehouse'
import EditState from './Components/EditState';
import AddState from './Components/Addstate';
import EditCity from './Components/EditCity';
import Addcity from './Components/Addcity';
import Digi from './Components/Digi'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path='/city' element={<City/>}/>
        <Route path='/state' element={<State/>}/>
        <Route path='/house' element={<Warehouse/>}/>
        <Route path='/edit-state/:id' element={<EditState/>}/>
        <Route path='/add-state' element={<AddState/>}/>
        <Route path='/edit-city/:id' element={<EditCity/>}/>
        <Route path='/add-city' element={<Addcity/>}/>
        <Route path='/digi' element={<Digi/>}/>
      </Routes>
    </Router>
  );
}

export default App;
