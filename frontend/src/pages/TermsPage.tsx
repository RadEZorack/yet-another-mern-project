// src/pages/TermsPage.tsx
import React from 'react';
import { Container, Typography } from '@mui/material';

const TermsPage: React.FC = () => {
  return (
    <Container maxWidth="md" sx={{ mt: 8 }}>
      <Typography variant="h4" gutterBottom>
        Terms of Service
      </Typography>
      {/* Add terms content here */}
    </Container>
  );
};

export default TermsPage;
