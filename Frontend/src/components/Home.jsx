// src/components/Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import Dashboard from './Dashboard';



const Home = () => {
  return (
    <div className="container-fluid text-center mt-5 home text-white ">
      <h1>🎓 Student Management System</h1>
      <p className="lead mt-3">Welcome to the portal! You can add, view, edit, and manage student records efficiently.</p>
      <Link to="/students" className="btn btn-primary mt-4">Go to Student List</Link>

<Dashboard/>
    </div>
  );
};

export default Home;
