import { Button, Typography, Box, TextField, Grid } from '@mui/material';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const[emailInput, setEmailInput] = useState("")
    const[passwordInput, setPasswordInput] = useState("")
    const[isEmailValid, setIsEmailValid] = useState(false)
    const[isPasswordValid, setisPasswordValid] = useState(false)
    const[isButtonClicked, setIsButtonClicked] = useState(false)
    const navigate = useNavigate()

    const handleEmailChange = (value) => {
        setEmailInput(value)
    }

    const handlePasswordChange = (value) => {
        setPasswordInput(value)
    }

    const checkUserEmail = async () => {
        const usereml = {
            userEmail: emailInput
        }
        try{
            const res = await axios.post("http://localhost:3001/getUserEmail", usereml)
            console.log(res.data);
            if (res.data.length > 0) {
                setIsEmailValid(true)
               
            }
            else {
                setIsEmailValid(false)
            }

        } catch(err){
            throw(err);
        }
    }

    const checkUserPassword = async () => {
        const userPass = {
            userPassword: passwordInput
        }
        try{
            const res = await axios.post("http://localhost:3001/getUserPassword", userPass)
            console.log(res.data);
            if (res.data.length > 0) {
                setisPasswordValid(true)
               
            }
            else {
                setisPasswordValid(false)
            }

        } catch(err){
            throw(err);
        }

    }
    const checkUserCred = () => {
        checkUserEmail()
        checkUserPassword()
        setIsButtonClicked(true)

    }
    useEffect(() => {
        if (isEmailValid && isPasswordValid) {
            navigate("/Dashboard")
        }
    },[isEmailValid, isPasswordValid]);
    return (
        <div>
            <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" padding={10}>
                <Typography variant='h4'>Sign In</Typography>
            </Box>
            <Grid container spacing={3} direction="column" alignItems="center">
                <Grid item>
                    <TextField error={!isEmailValid && isButtonClicked} id="outlined-basic" label="Email" variant="outlined" helperText={(!isEmailValid && isButtonClicked) ? "Invalid Email" : ""} onChange={(event)=>{handleEmailChange(event.target.value)}}/>
                </Grid>
                <Grid item>
                    <TextField type='password' error={!isEmailValid && isButtonClicked} id="outlined-basic" label="Password" variant="outlined" helperText={(!isPasswordValid && isButtonClicked) ? "Invalid Password" : ""} onChange={(event)=>{handlePasswordChange(event.target.value)}} />
                </Grid>
                <Grid item>
                    <Button variant="contained" onClick={checkUserCred}>Log in</Button>
                </Grid>
            </Grid>
        </div>
    );
}

export default Login;