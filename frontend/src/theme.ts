// src/theme.ts
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#0077ff',
    },
    secondary: {
      main: '#ff4081',
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial',
  },
});

export default theme;
