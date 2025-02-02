// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WaitingRoom from "./components/WaitingRoom";
import './App.css'
import NotFound from "./components/NotFound";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/waiting" element={<WaitingRoom />} />
        <Route path="*" element={<NotFound />} /> 
      </Routes>
    </Router>
  );
}

export default App;
