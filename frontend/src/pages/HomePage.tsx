// src/pages/HomePage.tsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Typography,
  Container,
  AppBar,
  Toolbar,
  IconButton,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Create, Login } from '@mui/icons-material';

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const handleRegister = () => {
    navigate('/register');
  };

  const handleLogin = () => {
    navigate('/login');
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            My 3D Print App
          </Typography>
          <Button color="inherit" onClick={handleLogin}>
            Login
          </Button>
          <Button color="inherit" onClick={handleRegister}>
            Register
          </Button>
        </Toolbar>
      </AppBar>

      <Container maxWidth="md" sx={{ mt: 8 }}>
        <Box textAlign="center">
          <Typography variant="h2" gutterBottom sx={{ fontSize: { xs: '2rem', md: '3rem' } }}>
            Welcome to My 3D Print App
          </Typography>
          <Typography variant="h5" gutterBottom>
            Create custom 3D models from text and bring them to life with 3D printing.
          </Typography>
          <Typography variant="body1" paragraph>
            Our platform allows you to generate unique 3D models based on your descriptions.
            Easily turn your ideas into reality.
          </Typography>
          <Box mt={4}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            startIcon={<Create />}
            onClick={handleRegister}
            sx={{ mr: 2 }}
          >
            Get Started
          </Button>
          <Button
            variant="outlined"
            color="primary"
            size="large"
            startIcon={<Login />}
            onClick={handleLogin}
          >
            Login
          </Button>
          </Box>
        </Box>
      </Container>

      <footer>
        <Box mt={8} py={4} bgcolor="grey.200">
          <Container maxWidth="md">
            <Typography variant="body2" color="textSecondary" align="center">
              © {new Date().getFullYear()} My 3D Print App. All rights reserved.
            </Typography>
            <Box mt={2} display="flex" justifyContent="center">
              <Button component={Link} to="/terms" color="primary">
                Terms of Service
              </Button>
              <Button component={Link} to="/privacy" color="primary">
                Privacy Policy
              </Button>
            </Box>
          </Container>
        </Box>
      </footer>
    </>
  );
};

export default HomePage;
