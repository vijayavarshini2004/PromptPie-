// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Dashboard from './components/dashboard';
import Chatbot from './components/chatbot';
import Signup from './components/signup';
import Profile from './components/Profile';
import Analysis from './components/Analysis'
 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Profile" element={<Profile/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/chat" element={<Chatbot />} />
        <Route path = "/signup" element = {<Signup/>} />
        <Route path="/Analysis" element={<Analysis/>}/>
      </Routes>
    </Router>
  );
}

export default App;
