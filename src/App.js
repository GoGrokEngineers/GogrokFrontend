// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import CreateSession from "./components/CreateSession";
import WaitingRoom from "./components/WaitingRoom";
import './App.css'
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/create" element={<CreateSession />} />
        <Route path="/waiting" element={<WaitingRoom />} />
      </Routes>
    </Router>
  );
}

export default App;
