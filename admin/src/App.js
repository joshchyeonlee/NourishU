import './App.css';
import { BrowserRouter , Routes, Route } from "react-router-dom";
import Login from './pages/Login';
import Admin from './pages/Admin';
import CreateIngredient from './pages/CreateIngredient';
import ManageReviews from './pages/ManageReviews';
import { RequireAuth } from 'react-auth-kit';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/createIngredient" element={<CreateIngredient/>}/>
        <Route path="/manageReviews" element={<ManageReviews/>}/>
      </Routes>
  </BrowserRouter>
  );
}

export default App;
