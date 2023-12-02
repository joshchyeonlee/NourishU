import './App.css';
import { BrowserRouter , Routes, Route } from "react-router-dom";
import Login from './pages/Login';
import Admin from './pages/Admin';
import CreateIngredient from './pages/CreateIngredient';
import ManageReviews from './pages/ManageReviews';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/createIngredient" element={<CreateIngredient/>}/>
        <Route path="/manageReviews" element={<ManageReviews/>}/>

      </Routes>
  </BrowserRouter>
  );
}

export default App;
