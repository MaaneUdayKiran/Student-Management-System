// src/components/Navbar.jsx
import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4  mb-4">
      <Link className="navbar-brand" to="/">🎓 StudentManager</Link>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ms-auto">
          <li className="nav-item">
            <NavLink className="nav-link" to="/">Home</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/students">Student List</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/students/add">Add Student</NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
