import './App.css';
import { BrowserRouter , Routes, Route } from "react-router-dom";
import Dashboard from './pages/Dashboard.js'
import Login from './pages/Login.js'
import Recipes from './pages/Recipes.js'
import Profile from './pages/Profile.js';
import SignUpInitial from './pages/SignUpInitial.js';
import SignUpInfo from './pages/SignUpInfo.js';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/login" element={<Login />} />
      <Route path="/recipes" element={<Recipes />} />
      <Route path="/profile" element={<Profile />} />
      <Route path ="/signup-initial" element={<SignUpInitial />} />
      <Route path ="/signup-info" element={<SignUpInfo />} />
    </Routes>
  </BrowserRouter>
  );
}

export default App;
