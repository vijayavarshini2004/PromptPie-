import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Dashboard from './components/dashboard';
import Chatbot from './components/chatbot';
import Signup from './components/signup';
import Profile from './components/Profile';
import Analysis from './components/Analysis';
import Login from './components/login';
import PrivateRoute from './PrivateRoute';
 
function App() {
  return (
    <Router>
      <Routes>
        <Route path ="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/chat" element={<PrivateRoute><Chatbot /></PrivateRoute>} />
        <Route path = "/signup" element = {<Signup/>} />
        <Route path="/analysis" element={<PrivateRoute><Analysis /></PrivateRoute>} />
      </Routes>
    </Router>
  );
}

export default App;
