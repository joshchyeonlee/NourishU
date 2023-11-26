import './App.css';
import { BrowserRouter , Routes, Route } from "react-router-dom";
import Dashboard from './pages/Dashboard.js'
import Login from './pages/Login.js'
import Recipes from './pages/Recipes.js'
import Profile from './pages/Profile.js';
import CookingConfidence from './pages/CookingConfidence.js';


function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/login" element={<Login />} />
      <Route path="/recipes" element={<Recipes />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/CookingConfidence" element={<CookingConfidence />} />
    </Routes>
  </BrowserRouter>
  );
}

export default App;
