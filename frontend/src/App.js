import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import ChatPage from './components/ChatPage';
import HomePage from './components/HomePage';

const App = () => {
  return (
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/chat/:username" element={<ChatPage/>} />
      </Routes>
  );
}

export default App;
