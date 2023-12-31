import { Button, Typography, Box, TextField, Grid } from '@mui/material';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSignIn } from 'react-auth-kit';
import sha256 from 'js-sha256'
import { formatString } from '../utils/inputCheck';

const Login = () => {
    const [emailInput, setEmailInput] = useState("")
    const [passwordInput, setPasswordInput] = useState("")
    const [isCredentialValid, setIsCredentialValid] = useState(false);
    const [isButtonClicked, setIsButtonClicked] = useState(false)
    const [userID, setUserID] = useState();
    const navigate = useNavigate()
    const signIn = useSignIn();

    const handleEmailChange = (value) => {
        setEmailInput(formatString(value))
    }

    const handlePasswordChange = (value) => {
        setPasswordInput(formatString(value))
    }

    // Checks if email is in valid format
    // Regex from: https://stackoverflow.com/questions/46155/how-can-i-validate-an-email-address-in-javascript
    const checkUserEmail = (email) => {
        const check = email.toLowerCase()
        .match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

        return (check !== null && email.length <= 50 && email.length > 0);
    }

    const checkUserCredentials = async () => {
        if(!checkUserEmail(emailInput)) return;
        const hash = sha256(passwordInput);
        const userCredentials = {
            Email: emailInput,
            Password: hash,
        }
        try{
            const res = await axios.post("http://localhost:3001/checkUserCredentials", userCredentials);
            if(res.data.length > 0){
                setUserID(res.data[0].UserID);
                setIsCredentialValid(true);
            }
        } catch(err){
            navigate("/not-found");
        }
    }

    const authenticateUser = async () => {
        const hash = sha256(passwordInput);
        const cred = {
            Email: emailInput,
            Password: hash,
        }
        try{
            const res = await axios.post("http://localhost:3001/authenticateUser", cred)

            signIn({
                token: res.data.token,
                expiresIn: 3600,
                tokenType: "Bearer",
                authState: {values: {email: cred.Email, userID: userID}},
            })
            
        } catch (err) {
            throw(err);
        }
    }

    const checkUserCred = () => {
        checkUserCredentials();
        setIsButtonClicked(true)
    }

    useEffect(() => {
        const auth = async () => {
            await authenticateUser();
            navigate("/Dashboard");
        }

        if(typeof userID === 'undefined' || !isCredentialValid) return;
        auth();
    },[userID, isCredentialValid])

    return (
        <div>
            <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" padding={10}>
                <Typography variant='h4'>Sign In</Typography>
            </Box>
            <Grid container spacing={3} direction="column" alignItems="center">
                <Grid item>
                    <TextField error={!isCredentialValid && isButtonClicked} id="outlined-basic" label="Email" variant="outlined" helperText={(!isCredentialValid && isButtonClicked) ? "Invalid Email" : ""} onChange={(event)=>{handleEmailChange(event.target.value)}}/>
                </Grid>
                <Grid item>
                    <TextField type='password' error={!isCredentialValid && isButtonClicked} id="outlined-basic" label="Password" variant="outlined" helperText={(!isCredentialValid && isButtonClicked) ? "Invalid Password" : ""} onChange={(event)=>{handlePasswordChange(event.target.value)}} />
                </Grid>
                <Grid item>
                    <Box padding={4}>
                        <Button variant="contained" onClick={checkUserCred}>Log in</Button>
                    </Box>
                </Grid>
            </Grid>
        </div>
    );
}

export default Login;