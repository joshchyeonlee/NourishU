import './App.css';
import axios from "axios";
import { useState, useEffect } from 'react';
import { BrowserRouter , Routes, Route } from "react-router-dom";
import Dashboard from './pages/Dashboard.js'
import Layout from './pages/Layout.js'
import Login from './pages/Login.js'
// import TestComponent from './components/testComponent';

function App() {
  //Ideally, you don't want too much stuff here, should be in components instead
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/").then((response) => {
      console.log(response.data);
      setIngredients(response.data);
    });
  }, []);

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="login" element={<Login />} />
        </Route>
    </Routes>
  </BrowserRouter>
    // <div className="App"> {
    //   ingredients.map((value, key) => {
    //     return(
    //     <div className="post">
    //       <div className="title"> {value.name} </div>
    //       <div className="body"> {value.caloriesPerGram} </div>
    //     </div>
    //     );
    //   })
    // }
    //   <TestComponent/>
    // </div>
  );
}

export default App;
