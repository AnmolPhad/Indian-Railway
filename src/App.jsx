import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import TrainAnimation from "./pages/TrainAnimation.jsx";
import Dustbin1 from "./pages/Dustbin1.jsx";
import "./styles/App.css";

function App() {
  return (
    <Router>
      <div>
        {/* <h1 style={{ textAlign: "center", marginTop: "20px" }}>
          🚆 Smart Railways React App
        </h1> */}

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/train" element={<TrainAnimation />} />
          <Route path="/dustbin1" element={<Dustbin1 />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
