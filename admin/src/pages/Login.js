import { Button, Box, Typography, Grid, TextField, Snackbar, Alert } from '@mui/material'; 
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSignIn } from 'react-auth-kit';
import sha256 from 'js-sha256'

const Login = () => {
    const[emailInput, setEmailInput] = useState("")
    const[passwordInput, setPasswordInput] = useState("")
    const[isCredentialValid, setIsCredentialValid] = useState(false);
    const[isButtonClicked, setIsButtonClicked] = useState(false)
    const[open, setOpen] = useState(false)
    const[adminID, setAdminID] = useState();
    const navigate = useNavigate();
    const signIn = useSignIn();

    const handleEmailChange = (value) => {
        setEmailInput(value)
    }

    const handlePasswordChange = (value) => {
        setPasswordInput(value)
    }

    const checkUserCredentials = async () => {
        const hash = sha256(passwordInput);
        const userCredentials = {
            Email: emailInput,
            Password: hash,
        }
        try{
            const res = await axios.post("http://localhost:3001/checkUserCredentials", userCredentials);
            setAdminID(res.data[0].UserID);
            setIsCredentialValid(res.data.length > 0);
        } catch(err){
            throw(err);
        }
    }

    const authenticateAdmin = async () => {
        const cred = {
            Email: emailInput,
            Password: passwordInput,
        }
        try{
            const res = await axios.post("http://localhost:3001/authenticateUser", cred)

            signIn({
                token: res.data.token,
                expiresIn: 3600,
                tokenType: "Bearer",
                authState: {values: {email: cred.Email, userID: adminID}},
            })
            
        } catch (err) {
            throw(err);
        }
    }

    const checkAdminCred = () => {
        checkUserCredentials();
        setIsButtonClicked(true)
        setOpen(true)
    }

    useEffect(() => {
        const auth = async () => {
            await authenticateAdmin();
            navigate("/admin");
        }

        if(typeof adminID === 'undefined' || !isCredentialValid) return;
        auth();
    },[adminID, isCredentialValid]);

    return(<div>
        <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" padding={10}>
                <Typography variant='h4'>NourishU Admin</Typography>
        </Box>
        <Grid container spacing={3} direction="column" alignItems="center">
            <Grid item>
                <TextField error={!isCredentialValid && isButtonClicked} id="outlined-basic" label="Email" variant="outlined" helperText={(!isCredentialValid && isButtonClicked) ? "Invalid Email" : ""} onChange={(event)=>{handleEmailChange(event.target.value)}}/>
            </Grid>
            <Grid item>
                <TextField type='password' error={!isCredentialValid && isButtonClicked} id="outlined-basic" label="Password" variant="outlined" helperText={(!isCredentialValid && isButtonClicked) ? "Invalid Password" : ""} onChange={(event)=>{handlePasswordChange(event.target.value)}}/>
            </Grid>
            <Grid item>
                <Button variant="contained" onClick={checkAdminCred}>Sign in</Button>
                <Grid item>
                <Snackbar open={open} autoHideDuration={6000}>
                    <Alert severity="error">lol looks like you got beaned!</Alert>
                </Snackbar>
                </Grid>
            </Grid>
        </Grid>
    </div>);
}
export default Login;