import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Signup from './pages/SignupPage';
import LoginPage from './pages/LoginPage'
import HomePage from './pages/HomePage';
import DonePage from './pages/DonePage';
import NotDonePage from './pages/NotDonePage';



function App() {
  return  (
    <div>
      <Routes>
      <Route path="/" element={<Signup/>}/>
      <Route path="/user/login" element={<LoginPage />} />
      <Route path='/user/home' element= {<HomePage/>}/>
      <Route path='/done' element= {<DonePage/>}/>
      <Route path='/notdone' element= {<NotDonePage/>}/>
      
      </Routes>
    </div>
  )
}

export default App;
