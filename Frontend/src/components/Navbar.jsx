// src/components/Navbar.jsx
import React, { useState } from 'react';
import { MenuOutlined } from '@ant-design/icons';
import { Button, Drawer, Menu } from 'antd';
import { Link, useLocation } from 'react-router-dom';
// import './Navbar.css'; // optional for extra custom styles
import '../App.css'

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const showDrawer = () => setOpen(true);
  const onClose = () => setOpen(false);

  const menuItems = [
    { key: '1', label: <Link to="/">Home</Link> },
    { key: '2', label: <Link to="/students/add">Add Student</Link> },
    { key: '3', label: <Link to="/students">Student List</Link> },
  ];

  return (
    <div className="navbar navbar-navbar-expand-xxl bg-dark text-white px-4 py-2 d-flex justify-content-between align-items-center"  style={{ width: '100%', maxWidth: '100vw', overflowX: 'hidden' }} >
      <div className="navbar-brand fs-5 fw-bold text-white">
        🎓 StudentManager
      </div>

      {/* Desktop Menu */}
      <div className="d-none d-lg-flex gap-4">
        {menuItems.map(item => (
          <Link
            key={item.key}
            to={item.label.props.to}
            className={`nav-link text-white ${
              location.pathname === item.label.props.to ? 'fw-bold' : ''
            }`}
          >
            {item.label.props.children}
          </Link>
        ))}
      </div>

      {/* Mobile Hamburger Menu */}
      <Button
        className="d-lg-none"
        type="text"
        icon={<MenuOutlined style={{ color: '#fff', fontSize: '20px' }} />}
        onClick={showDrawer}
      />

      {/* Drawer for Mobile View */}
      <Drawer
        title="Navigation"
        placement="right"
        onClose={onClose}
        open={open}
        className="mobile-menu"
      >
        <Menu mode="vertical" selectedKeys={[location.pathname]}>
          {menuItems.map(item => (
            <Menu.Item key={item.label.props.to} onClick={onClose}>
              {item.label}
            </Menu.Item>
          ))}
        </Menu>
      </Drawer>
    </div>
  );
};

export default Navbar;
