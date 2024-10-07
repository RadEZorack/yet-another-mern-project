// src/components/Header.tsx
import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link, Navigate, NavLink } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

const Header: React.FC = () => {
const auth = React.useContext(AuthContext);

  if (auth?.loading) {
    return <div>Loading...</div>;
  }

  if (!auth?.user) {
    return <Navigate to="/login" />;
  }

  const handleLogout = () => {
    auth.logout();
  };

  const linkStyle = {
    color: 'inherit',
    textDecoration: 'none',
  };

  const activeLinkStyle = {
    fontWeight: '900',
    color: 'yellow',
    textDecoration: 'none',
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          My 3D App
        </Typography>
        <NavLink
          to="/dashboard"
          style={({ isActive }: { isActive: boolean }) =>
            isActive ? activeLinkStyle : linkStyle
          }
        >
          <Button color="inherit">Dashboard</Button>
        </NavLink>
        <NavLink
          to="/platter"
          style={({ isActive }: { isActive: boolean }) =>
            isActive ? activeLinkStyle : linkStyle
          }
        >
          <Button color="inherit">Platter</Button>
        </NavLink>
        <Button color="inherit" onClick={handleLogout}>
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
