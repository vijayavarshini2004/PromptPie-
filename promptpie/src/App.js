// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home'
// import LoginPage from './LoginPage'


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/" element={<LoginPage/>} /> */}
        </Routes>
    </Router>
  );
}

export default App;
