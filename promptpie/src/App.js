// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Home from './Home';
import Signup from './Signup';
function App() {
  return (
    <Router>
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/" element={<Signup />} />

    
      </Routes>
    </Router>
  );
}

export default App;
