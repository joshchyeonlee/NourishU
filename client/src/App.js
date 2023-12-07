import './App.css';
import { BrowserRouter , Routes, Route } from "react-router-dom";
import { RequireAuth } from 'react-auth-kit';
import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import theme from './themes/theme.js';
import Dashboard from './pages/Dashboard.js'
import Login from './pages/Login.js'
import Recipes from './pages/Recipes.js'
import Profile from './pages/Profile.js';
import ViewMeal from './pages/ViewMeal.js';
import EditMeal from './pages/EditMeal.js';
import EditFood from './pages/EditFood.js';
import CookingConfidence from './pages/CookingConfidence.js';
import CreateRecipe from './pages/CreateRecipe.js';
import SetIngredients from './pages/SetIngredients.js';
import SetRecipeInstructions from './pages/SetRecipeInstructions.js';
import ViewRecipe from './pages/ViewRecipe.js';
import SearchRecipes from './pages/SearchRecipes.js';
import Welcome from './pages/Welcome.js';
import EditRecipe from './pages/EditRecipe.js';
import EditRecipeIngredients from './pages/EditRecipeIngredients.js';
import YourRecipes from './pages/YourRecipes.js';
import LogMeal from './pages/LogMeal.js';
import EditRecipeSteps from './pages/EditRecipeSteps.js';
import EditRecipeRedirect from './pages/EditRecipeRedirect.js';
import SignUpInitial from './pages/SignUpInitial.js';
import SignUpInfo from './pages/SignUpInfo.js';
import UserInterests from './pages/UserInterests.js';

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}> 
      <CssBaseline />
      <Routes>
        <Route path="/dashboard" element={<RequireAuth loginPath='/'><Dashboard /></RequireAuth>}/>
        <Route path="/recipes" element={<RequireAuth loginPath='/'><Recipes /></RequireAuth>}/>
        <Route path="/profile" element={<RequireAuth loginPath='/'><Profile/></RequireAuth>}/>
        <Route path="/searchRecipes" element={<RequireAuth loginPath='/'><SearchRecipes/></RequireAuth>}/>
        <Route path="/viewMeal" element={<RequireAuth loginPath='/'><ViewMeal/></RequireAuth>}/>
        <Route path="/editMeal" element={<RequireAuth loginPath='/'><EditMeal/></RequireAuth>}/>
        <Route path="/editFood" element={<RequireAuth loginPath='/'><EditFood/></RequireAuth>}/>
        <Route path="/createRecipe" element={<RequireAuth loginPath='/'><CreateRecipe /></RequireAuth>}/>
        <Route path="/setIngredients" element={<RequireAuth loginPath='/'><SetIngredients/></RequireAuth>}/>
        <Route path="/setRecipeInstructions" element={<RequireAuth loginPath='/'><SetRecipeInstructions/></RequireAuth>}/>
        <Route path="/viewRecipe" element={<RequireAuth loginPath='/'><ViewRecipe/></RequireAuth>}/>
        <Route path="/dashboard" element={<RequireAuth loginPath='/'><Dashboard/></RequireAuth>}/>
        <Route path="/editRecipe" element={<RequireAuth loginPath='/'><EditRecipeRedirect /></RequireAuth>} />
        <Route path="/editRecipeDetails" element={<RequireAuth loginPath='/'><EditRecipe /></RequireAuth>} />
        <Route path="/editRecipeSteps" element={<RequireAuth loginPath='/'><EditRecipeSteps /></RequireAuth>} />
        <Route path="/editRecipeIngredients" element={<RequireAuth loginPath='/'><EditRecipeIngredients /></RequireAuth>} />
        <Route path="/viewYourRecipes" element={<RequireAuth loginPath='/'><YourRecipes /></RequireAuth>} />
        <Route path="/logMeal" element={<RequireAuth loginPath='/'><LogMeal/></RequireAuth>}/>
        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route path ="/signup-initial" element={<SignUpInitial />} />
        <Route path ="/signup-info" element={<SignUpInfo />} />
        <Route path ="/signup-userinterests" element={<UserInterests />} />
        <Route path="/cookingConfidence" element={<CookingConfidence/>}/>
    </Routes>
    </ThemeProvider>
  </BrowserRouter>
)}

export default App;
