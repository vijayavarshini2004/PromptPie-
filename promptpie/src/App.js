// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import Dashboard from './components/dashboard';
import Chatbot from './chatbot';
import Signup from './components/signup';
 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/chat" element={<Chatbot />} />
        <Route path = "/signup" element = {<Signup/>} />
      </Routes>
    </Router>
  );
}

export default App;
