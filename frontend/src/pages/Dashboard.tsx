// src/pages/Dashboard.tsx
import React, { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import { Box, Typography, Container, Grid, Paper, AppBar, Toolbar, Button } from '@mui/material';

const Dashboard: React.FC = () => {
  const auth = useContext(AuthContext);

  if (auth?.loading) {
    return <div>Loading...</div>;
  }

  if (!auth?.user) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Dashboard
          </Typography>
          {/* Add logout button or other navigation links */}
          <Button color="inherit" onClick={auth.logout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      {/* Rest of your content */}
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Welcome, {auth.user.username}!
        </Typography>

        <Grid container spacing={3}>
          {/* Main Content */}
          <Grid item xs={12}>
            <Paper
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                minHeight: 240,
              }}
            >
              {/* Add your dashboard content here */}
              <Typography variant="h6">Your Dashboard</Typography>
              <Typography>
                This is where you can manage your 3D models, orders, and account settings.
              </Typography>
              <Grid container spacing={3}>
                {/* Recent Models */}
                <Grid item xs={12} md={6}>
                  <Paper sx={{ p: 2 }}>
                    <Typography variant="h6">Recent Models</Typography>
                    {/* Add content or components to display models */}
                  </Paper>
                </Grid>

                {/* Recent Orders */}
                <Grid item xs={12} md={6}>
                  <Paper sx={{ p: 2 }}>
                    <Typography variant="h6">Recent Orders</Typography>
                    {/* Add content or components to display orders */}
                  </Paper>
                </Grid>

                {/* Account Information */}
                <Grid item xs={12}>
                  <Paper sx={{ p: 2 }}>
                    <Typography variant="h6">Account Information</Typography>
                    {/* Display user's account information */}
                    <Typography>Email: {auth.user.email}</Typography>
                    {/* Add more user info if needed */}
                  </Paper>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Dashboard;
  