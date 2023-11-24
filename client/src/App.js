import './App.css';
import { BrowserRouter , Routes, Route } from "react-router-dom";
import Dashboard from './pages/Dashboard.js'
import Login from './pages/Login.js'
import Recipes from './pages/Recipes.js'
import Profile from './pages/Profile.js';
import theme from './themes/theme.js';
import { ThemeProvider } from '@emotion/react';
import { CssBaseline, Grid } from '@mui/material';

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Grid height={"100vh"}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/recipes" element={<Recipes />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </Grid>
      </ThemeProvider>
  </BrowserRouter>
  );
}

export default App;
