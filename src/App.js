import React from 'react';
import './App.css';
import ProjectsPage from './projects/ProjectsPage';
import ProjectPage from './projects/ProjectPage';
import PrivateRoute from './account/PrivateRoute';

import {
  BrowserRouter as Router,
  Route,
  NavLink,
  Routes,
} from 'react-router-dom';
import HomePage from './home/HomePage';
import SignInPage from './account/SignInPage';
import AccountHeader from './account/AccountHeader';
import { ProvideAuth } from './account/useAuth';

function App() {
  console.log(process.env.NODE_ENV);
  console.log(process.env.REACT_APP_API_URL);
  return (
    <ProvideAuth>
      <Router>
        <header className="sticky">
          <span className="logo">
            <img src="/assets/logo-3.svg" alt="logo" width="49" height="99" />
          </span>
          <NavLink to="/" className="button rounded">
            <span className="icon-home"></span>
            Home
          </NavLink>
          <NavLink to="/projects/" className="button rounded">
            Projects
          </NavLink>
          <AccountHeader />
        </header>
        <div className="container">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route
              path="/projects"
              element={
                <PrivateRoute>
                  <ProjectsPage />
                </PrivateRoute>
              }
            ></Route>
            <Route
              path="/projects/:id"
              element={
                <PrivateRoute>
                  <ProjectPage />
                </PrivateRoute>
              }
            ></Route>
            <Route path="/signin" element={<SignInPage />} />
          </Routes>
        </div>
      </Router>
    </ProvideAuth>
  );
}

export default App;
