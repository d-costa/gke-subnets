import React from 'react';
import './App.css';
import Body from './components/Body';
import { Typography } from '@mui/material';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <header className="header">
        <Typography variant="h4">GKE Subnet Calculator</Typography>
      </header>
      <Body/>
      <Footer/>
    </div>
  );
}

export default App;
