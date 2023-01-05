import { createTheme, adaptV4Theme } from '@mui/material/styles';

export const defaultTheme = createTheme(
  adaptV4Theme({
    palette: {
      primary: {
        main: '#303f9f',
      },
      secondary: {
        main: '#33691e',
      },
    },
    typography: {
      body1: 16,
      body2: 14,
      useNextVariants: true,
      fontFamily: [
        'Roboto',
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
    },
  })
);
