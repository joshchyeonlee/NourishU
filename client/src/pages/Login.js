import { Button, Typography, Box, TextField, Grid } from '@mui/material';
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

    const fetchUsers = async () => {
        try{
            const res = await axios.get("http://localhost:3001/login")
            console.log(res);
            setUsers(res.data);
        } catch(err){
            throw(err);
        }
    }

    useEffect(() => {
        fetchUsers();
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
        fetchUsers();
    }

    return (
        <div>
            <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" padding={10}>
                <Typography variant='h4'>Sign In</Typography>
            </Box>
            <Grid container spacing={3} direction="column" alignItems="center">
                <Grid item>
                    <TextField id="outlined-basic" label="Email" variant="outlined" />
                </Grid>
                <Grid item>
                    <TextField id="outlined-basic" label="Password" variant="outlined" />
                </Grid>
                <Grid item>
                    <Button variant="contained">Log in</Button>
                </Grid>
            </Grid>
        </div>
    );
};

export default Login;