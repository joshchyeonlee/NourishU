import './App.css';
import { BrowserRouter , Routes, Route } from "react-router-dom";
import Dashboard from './pages/Dashboard.js'
import Login from './pages/Login.js'
import Recipes from './pages/Recipes.js'
import Profile from './pages/Profile.js';
import AddFood from './pages/AddFood.js';
import ViewMeal from './pages/ViewMeal.js';
import EditMeal from './pages/EditMeal.js';
import EditFood from './pages/EditFood.js';
import CookingConfidence from './pages/CookingConfidence.js';
import CreateRecipe from './pages/CreateRecipe.js';
import SetIngredients from './pages/SetIngredients.js';
import SetRecipeInstructions from './pages/SetRecipeInstructions.js';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/Dashboard" element={<Dashboard />} />
      <Route path="/login" element={<Login />} />
      <Route path="/recipes" element={<Recipes />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/addFood" element={<AddFood />} />
      <Route path="/viewMeal" element={<ViewMeal />} />
      <Route path="/editMeal" element={<EditMeal />} />
      <Route path="/editFood" element={<EditFood />} />
      <Route path="/CookingConfidence" element={<CookingConfidence />} />
      <Route path="/createRecipe" element={<CreateRecipe />}/>
      <Route path="/setIngredients" element={<SetIngredients/>}/>
      <Route path="/setRecipeInstructions" element={<SetRecipeInstructions/>}/>
    </Routes>
  </BrowserRouter>
  );
}

export default App;
