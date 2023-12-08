import React from 'react';
import { Typography, TextField, Grid, Button, Box, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useState, useEffect } from "react";
import axios from 'axios';
import {Link, useNavigate} from "react-router-dom"
import { InputAdornment, InputLabel } from '@mui/material';
import ErrorIcon from '@mui/icons-material/Error';
import { formatString } from "../utils/inputCheck";

const SignUpInitial = () => {
    const navigate = useNavigate();
    const [userNameTextField, setUserNameTextField] = useState("");
    const [userEmailTextField, setUserEmailTextField] = useState("");
    const [userPassTextField, setUserPassTextField] = useState("");
    const [userConfirmPassTextField, setUserConfirmPassTextField] = useState("");
    const [isPasswordMatch, setIsPasswordMatch] = useState(false);
    const [isUserNameValid, setUserNameValid] = useState(false);
    const [isUserEmailValid, setUserEmailValid] = useState(false);

    const [enteredUserNameTextField, setEnteredUserNameTextField] = useState(false);
    const [enteredUserEmailTextField, setEnteredUserEmailTextField] = useState(false);

    const [userNameUnique, setUserNameUnique] = useState(true);
    const [userEmailUnique, setUserEmailUnique] = useState(true);

    const [isPasswordValid, setPasswordValid] = useState(false)
    const [isConfirmPasswordValid, setConfirmPasswordValid] = useState(false)

    // Stores user name and performs checks
    const storeUserNameInput = (typedUserName) => {
        const formatName = formatString(typedUserName, 25)
        setUserNameTextField(formatName)
        checkUserName(formatName)
        setEnteredUserNameTextField(true)
        queryUserUnique(formatName)
    }

    // Stores user email and performs checks
    const storeUserEmailInput = (typedUserEmail) => {
        const formatEmail = formatString(typedUserEmail, 50)
        setUserEmailTextField(typedUserEmail)
        checkUserEmail(formatEmail)
        setEnteredUserEmailTextField(true)
        queryUserEmailUnique(formatEmail)
    }

    // stores user password and performs checks
    // will be hashed using sha256, will always end up being length 64 in BE/DB
    const storeUserPassInput = (typedUserPass) => {
        checkPassValid(typedUserPass)
        setUserPassTextField(typedUserPass)
    }

    // stores user confirmed password and performs checks
    const storeUserConfirmPassInput = (typedUserConfirmPass) => {
        checkConfirmPassValid(typedUserConfirmPass)
        setUserConfirmPassTextField(typedUserConfirmPass)
        checkPassMatch(typedUserConfirmPass)
    }

    // Checks if password and confirmed password match
    const checkPassMatch = (userConfirmPassInput) => {
        if (userConfirmPassInput.length > 16) {
            setIsPasswordMatch(false)
            return;
        }

        if (userPassTextField === userConfirmPassInput) {
            setIsPasswordMatch(true)
        }

        else {
            setIsPasswordMatch(false)
        }
    }

    const checkPassValid = (userPassInput) => {
        if (userPassInput.length < 0 || userPassInput === "") {
            setPasswordValid(false)
            return;
        }

        else {
            setPasswordValid(true)
        }
    }

    const checkConfirmPassValid = (userConfirmPassInput) => {
        if (userConfirmPassInput.length < 0 || userConfirmPassInput === "") {
            setConfirmPasswordValid(false)
            return;
        }

        else {
            setConfirmPasswordValid(true)
        }
    }

    // Checks if username is of valid input
    const checkUserName = (userNameInput) => {

        if (userNameInput.length > 3 && userNameInput.length <= 25) {
            setUserNameValid(true)
            return;
        }

        else {
            setUserNameValid(false)
        }
    }

    // Checks if email is in valid format
    // Regex from: https://stackoverflow.com/questions/46155/how-can-i-validate-an-email-address-in-javascript
    const checkUserEmail = (userEmailInput) => {
        const check = userEmailInput.toLowerCase()
        .match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

        setUserEmailValid(check !== null && userEmailInput.length <= 50 && userEmailInput.length > 0);
    }

    // Checks if username already exists in the DB (must be unique)
    const queryUserUnique = async (userNameInput) => {
        const userName = {
            UserName: userNameInput,
        }
        try{
            const res = await axios.post("http://localhost:3001/queryUserNameExists", userName)

            if (res.data.length > 0) {
                setUserNameUnique(false)
            }

            else {
                setUserNameUnique(true)
            }
        } catch(err){
            navigate("/not-found");
        }
    }

    // Checks if email already exists in the DB (must be unique)
    const queryUserEmailUnique = async (userEmailInput) => {
        const userEmail = {
            UserEmail: userEmailInput,
        }
        try{
            const res = await axios.post("http://localhost:3001/queryUserEmailExists", userEmail)
            setUserEmailUnique(res.data.length <= 0);
        } catch(err){
            navigate("/not-found");
        }
    }

    useEffect(() => {
        // This effect will run whenever userPassTextField or userConfirmPassTextField changes
        checkPassMatch(userConfirmPassTextField);
    }, [userPassTextField, userConfirmPassTextField]);


    return (
        <div>
             <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" padding={4}>
             <IconButton sx={{position: "absolute", top:10, left: 10}}                     
             component = {Link}
            to={{pathname:"/welcome"}}>
                <ArrowBackIcon fontSize="large"/>
                </IconButton>
            <Typography variant="h4" padding={2}>Sign up - Let's get started!</Typography>
            <Grid container direction="column" spacing={3} justifyContent="center" alignItems="center">
                <Grid item>
                    <TextField id="outlined" label="User Name" variant="outlined" sx={{ m: 1, width: 350 }} inputProps={{maxLength: 25}}onChange = {(e) => {
                        storeUserNameInput(e.target.value)
                    }} error = {(!isUserNameValid) && (enteredUserNameTextField)} helperText = {(isUserNameValid) || (!enteredUserNameTextField)? "" : "Username must be in between 3 to 25 characters!"}
                    InputProps={{
                        endAdornment: userNameUnique ? null : (
                          <InputAdornment position="end">
                            <ErrorIcon color="error" />
                            <InputLabel htmlFor="outlined-adornment-password">Username taken</InputLabel>
                          </InputAdornment>
                        ),
                      }}
                    />
                </Grid>
                <Grid item>
                    <TextField id="outlined" label="Email" variant="outlined" sx={{ m: 1, width: 350 }} inputProps={{maxLength: 50}} onChange = {(e) => {
                        storeUserEmailInput(e.target.value)
                    }} error = {(!isUserEmailValid) && (enteredUserEmailTextField)} helperText = {(isUserEmailValid) || (!enteredUserEmailTextField)? "" : "Email must be of valid format and cannot exceed 50 characters!"}
                    InputProps={{
                        endAdornment: (userEmailUnique) ? null : (
                          <InputAdornment position="end">
                            <ErrorIcon color="error" />
                            <InputLabel htmlFor="outlined-adornment-password">Email Exists</InputLabel>
                          </InputAdornment>
                        ),
                      }}
                    />
                </Grid>
                <Grid item>
                    <TextField id="outlined" label="Password" variant="outlined" type='password' hidden sx={{ m: 1, width: 350 }} inputProps= {{maxLength: 16}} onChange = {(e) => {
                        storeUserPassInput(e.target.value)
                    }} error = {((userPassTextField.length) > 16) || (!isPasswordMatch)} helperText = {((userPassTextField.length) > 16? "Password entered is TOO long!" : "") || (isPasswordMatch?  "": "Passwords don't match")}/>
                </Grid>
                <Grid item>
                    <TextField id="outlined" label="Confirm Password" variant="outlined" type='password' hidden sx={{ m: 1, width: 350 }} inputProps={{maxLength: 16}} onChange = {(e) => {
                        storeUserConfirmPassInput(e.target.value) 
                    }} error = {((userConfirmPassTextField.length) > 16) || (!isPasswordMatch)} helperText = {((userConfirmPassTextField.length) > 16? "Password entered is TOO long!" : "") || (isPasswordMatch?  "": "Passwords don't match")}/>
                </Grid>
                <Grid item style={{ marginTop: '10px' }}>
                    <Button variant="contained" size="small" disabled = {!isPasswordMatch || (!userEmailUnique) || (!userNameUnique) || (!isUserNameValid) || (!isUserEmailValid) || (!isPasswordValid) || (!isConfirmPasswordValid)}
                    component = {Link}
                    to={{pathname:"/signup-info"}}
                    state={{userName:userNameTextField, userEmail: userEmailTextField, userPass: userPassTextField}}
                    >
                        Next
                    </Button>
                </Grid>
            </Grid>
            </Box>
        </div>
    );
};

export default SignUpInitial;
