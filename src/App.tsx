import React from 'react';
import './App.css';
import Body from './components/Body';
import { IconButton, Box, Container } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import Footer from './components/Footer';
import { useTheme } from './contexts/ThemeContext';

function App() {
  const { darkMode, toggleDarkMode } = useTheme();

  return (
    <Box className="App" sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Container maxWidth="md">
        <Box className="header" sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'flex-end',
          py: 2,
        }}>
          <IconButton 
            onClick={toggleDarkMode} 
            color="inherit"
            aria-label="toggle dark mode"
            sx={{ 
              border: '1px solid',
              borderColor: 'divider'
            }}
          >
            {darkMode ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
        </Box>
        <Body/>
        <Footer/>
      </Container>
    </Box>
  );
}

export default App;
