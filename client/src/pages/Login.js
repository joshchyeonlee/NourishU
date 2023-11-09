import { Button, Typography } from '@mui/material';
import { useState, useEffect } from 'react';
import axios from 'axios';

const Login = () => {
    const [users, setUsers] = useState([]);
    const [usersToAdd, setUserToAdd] = useState({
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
            setUsers(res.data);
        } catch(err){
            throw(err);
        }
    }

    useEffect(() => {
        fetchIngredients();
    }, []);

    const handleClick = async () => {
        const ingToAdd = {
            UserID: 98,
            UserName: "the bean guy",
            UserEmail: "google@google.com",
            UserBirthdate: "1999-08-19",
            UserHeight: 290,
            UserWeight: 135,
            UserAge: 25,
            DietName: "Professional Bean Consumer",
            DietDescription: "Bean",
            CookingConfidence: 3
        }

        try{
            await axios.post("http://localhost:3001/login", ingToAdd);
        } catch(error){
            throw(error);
        }
        
        setUserToAdd(ingToAdd);
        fetchIngredients();
    }

    return (
        <div>
            <Typography>Login</Typography>
            <Button onClick={handleClick}>Add new bean to ingredient</Button>
            <div>
                {users.map(user => (<div>
                    <Typography>Name: {user.UserName}</Typography>
                    <Typography>Diet Name: {user.DietName}</Typography>
                </div>))}
            </div>
        </div>
    )
};

export default Login;