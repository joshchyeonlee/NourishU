import './App.css';
import { BrowserRouter , Routes, Route } from "react-router-dom";
import Dashboard from './pages/Dashboard.js'
import Login from './pages/Login.js'
import Recipes from './pages/Recipes.js'
import Profile from './pages/Profile.js';
import ViewMeal from './pages/ViewMeal.js';
import EditMeal from './pages/EditMeal.js';
import EditFood from './pages/EditFood.js';
import CookingConfidence from './pages/CookingConfidence.js';
import ViewRecipe from './pages/ViewRecipe.js';
import SearchRecipes from './pages/SearchRecipes.js';
import Welcome from './pages/Welcome.js';
import { RequireAuth } from 'react-auth-kit';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/dashboard" element={<RequireAuth loginPath='/welcome'><Dashboard /></RequireAuth>}/>
      <Route path="/recipes" element={<RequireAuth loginPath='/welcome'><Recipes /></RequireAuth>}/>
      <Route path="/profile" element={<RequireAuth loginPath='/welcome'><Profile/></RequireAuth>}/>
      <Route path="/searchRecipes" element={<RequireAuth loginPath='/welcome'><SearchRecipes/></RequireAuth>}/>
      <Route path="/viewMeal" element={<RequireAuth loginPath='/welcome'><ViewMeal/></RequireAuth>}/>
      <Route path="/editMeal" element={<RequireAuth loginPath='/welcome'><EditMeal/></RequireAuth>}/>
      <Route path="/editFood" element={<RequireAuth loginPath='/welcome'><EditFood/></RequireAuth>}/>
      <Route path="/cookingConfidence" element={<RequireAuth loginPath='/welcome'><CookingConfidence/></RequireAuth>}/>
      <Route path="/viewRecipe" element={<RequireAuth loginPath='/welcome'><ViewRecipe/></RequireAuth>}/>
      <Route path="/dashboard" element={<RequireAuth loginPath='/welcome'><Dashboard/></RequireAuth>}/>
      <Route path="/welcome" element={<Welcome />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  </BrowserRouter>
  );
}

export default App;
