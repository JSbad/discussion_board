//import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Post from './post.js';
import Home from './home.js';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'


function App() {
  return (
    <Router>
      <Routes>
        <Route  path='/' element={<Home/>} />
        <Route  path='/:id' element={<Post/>} />
      </Routes>
    </Router>
  );
}

export default App;
