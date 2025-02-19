// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WaitingRoom from "./components/WaitingRoom";
import './App.css'
import "./App.css";
import CodingPlatform from "./components/CodingPlatform";
import LandingPage from "./components/LandingPage";
import CreateSession from "./components/CreateSession";
import Leaderboard from "./components/Leadboard";

import NotFound from "./components/NotFound";
import { Bounce, ToastContainer } from "react-toastify";
function App() {
  return (
    <div>
        <Router>  
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/create" element={<CreateSession />} />
            <Route path="/waiting" element={<WaitingRoom />} />
            <Route path="/competition" element={<CodingPlatform />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
          transition={Bounce}
        />
    </div>
  );
}

export default App;
