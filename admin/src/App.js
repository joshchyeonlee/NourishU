import './App.css';
import { BrowserRouter , Routes, Route, Navigate } from "react-router-dom";
import Login from './pages/Login';
import Admin from './pages/Admin';
import CreateIngredient from './pages/CreateIngredient';
import ManageReviews from './pages/ManageReviews';
import { RequireAuth } from 'react-auth-kit';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/admin" element={<RequireAuth loginPath='/'><Admin /></RequireAuth>} />
        <Route path="/createIngredient" element={<RequireAuth loginPath='/'><CreateIngredient /></RequireAuth>}/>
        <Route path="/manageReviews" element={<RequireAuth loginPath='/'><ManageReviews /></RequireAuth>}/>
        <Route path="*" element={<Navigate replace to="/admin" />} />
      </Routes>
  </BrowserRouter>
  );
}

export default App;
