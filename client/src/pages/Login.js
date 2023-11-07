import { Button, Typography } from '@mui/material';
import { useState, useEffect } from 'react';
import axios from 'axios';

const Login = () => {
    const [ingredients, setIngredients] = useState([]);
    const [ingredientToAdd, setIngredientToAdd] = useState({
        id: 0,
        name: "",
        caloriesPerGram: 0,
        createdAt: null,
        updatedAt: null
    });

    const fetchIngredients = async () => {
        try{
            const res = await axios.get("http://localhost:3001/login")
            console.log(res);
            setIngredients(res.data);
        } catch(err){
            throw(err);
        }
    }

    useEffect(() => {
        fetchIngredients();
    }, []);

    const handleClick = async () => {
        const ingToAdd = {
            id: 3,
            name: "refried bean",
            caloriesPerGram: 420,
            createdAt: new Date(),
            updatedAt: new Date()
        }

        try{
            await axios.post("http://localhost:3001/login", ingToAdd);
        } catch(error){
            throw(error);
        }
        
        setIngredientToAdd(ingToAdd);
        fetchIngredients();
    }

    return (
        <div>
            <Typography>Login</Typography>
            <Button onClick={handleClick}>Add new bean to ingredient</Button>
            <div>
                {ingredients.map(ingredient => (<div>
                    <Typography>Name: {ingredient.name}</Typography>
                    <Typography>Calories Per Gram: {ingredient.caloriesPerGram}</Typography>
                </div>))}
            </div>
        </div>
    )
};

export default Login;