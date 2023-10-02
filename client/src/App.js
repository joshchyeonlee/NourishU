import './App.css';
import axios from "axios";
import { useState, useEffect } from 'react';
import TestComponent from './components/testComponent';

function App() {
  //Ideally, you don't want too much stuff here, should be in components instead
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/ingredients").then((response) => {
      console.log(response.data);
      setIngredients(response.data);
    });
  }, []);
  return (
    <div className="App"> {
      ingredients.map((value, key) => {
        return(
        <div className="post">
          <div className="title"> {value.name} </div>
          <div className="body"> {value.caloriesPerGram} </div>
        </div>
        );
      })
    }
      <TestComponent/>
    </div>
  );
}

export default App;
