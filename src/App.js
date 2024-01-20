import React from "react";
import "./App.css";
import ProjectsPage from "./projects/ProjectsPage";
import ProjectPage from "./projects/ProjectPage";

import { BrowserRouter as Router, Route, NavLink, Routes } from "react-router-dom";
import HomePage from "./home/HomePage";

function App() {
  return (
    <Router>
      <header>
        <svg id="logo-35" width="50" height="39" viewBox="0 0 50 39" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M16.4992 2H37.5808L22.0816 24.9729H1L16.4992 2Z" className="ccompli1" fill="#007AFF"></path>{" "}
          <path
            d="M17.4224 27.102L11.4192 36H33.5008L49 13.0271H32.7024L23.2064 27.102H17.4224Z"
            className="ccustom"
            fill="#312ECB"
          ></path>{" "}
        </svg>
        <nav>
          <NavLink to="/">
            <span className="icon-home"></span>
            Home
          </NavLink>
          <NavLink to="/projects/">Projects</NavLink>
        </nav>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/projects/:id" element={<ProjectPage />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
