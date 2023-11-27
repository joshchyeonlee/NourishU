import React from 'react';
import { Typography, TextField, Grid, Button, Box, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useState } from "react";
import axios from 'axios';
import {Link} from "react-router-dom"

// put helper text for email and password
const SignUpInitial = () => {
    const [userNameTextField, setUserNameTextField] = useState("");
    const [userEmailTextField, setUserEmailTextField] = useState("");
    const [userPassTextField, setUserPassTextField] = useState("");
    const [userConfirmPassTextField, setUserConfirmPassTextField] = useState("");
    const [isPasswordMatch, setIsPasswordMatch] = useState(false);
    const [isUserNameValid, setUserNameValid] = useState(false);
    const [userEmailValid, setUserEmailValid] = useState(false);

    const [enteredUserNameTextField, setEnteredUserNameTextField] = useState(false);
    const [userNameUnique, setUserNameUnique] = useState(false);


    const storeUserNameInput = (typedUserName) => {
        setUserNameTextField(typedUserName)
        checkUserName(typedUserName)
        setEnteredUserNameTextField(true)
        queryUserUnique(typedUserName)
        console.log(typedUserName)
    }

    const storeUserEmailInput = (typedUserEmail) => {
        setUserEmailTextField(typedUserEmail)
        checkUserEmail(typedUserEmail)
        console.log(typedUserEmail)
    }

    const storeUserPassInput = (typedUserPass) => {
        setUserPassTextField(typedUserPass)
        console.log(typedUserPass)
    }

    const storeUserConfirmPassInput = (typedUserConfirmPass) => {
        setUserConfirmPassTextField(typedUserConfirmPass)
        checkPassMatch(typedUserConfirmPass)
        console.log(typedUserConfirmPass)
    }

    const checkPassMatch = (userConfirmPassInput) => {
        if (userConfirmPassInput.length < 6) {
            setIsPasswordMatch(false)
            return;
        }

        if (userPassTextField === userConfirmPassInput) {
            console.log("True")
            setIsPasswordMatch(true)
        }

        else {
            setIsPasswordMatch(false)
            console.log("False")
        }
    }

    const checkUserName = (userNameInput) => {

        if (userNameInput.length > 6) {
            console.log("True")
            setUserNameValid(true)
            return;
        }

        else {
            console.log("False")
            setUserNameValid(false)
        }
    }

    const checkUserEmail = (userEmailInput) => {
        const check = userEmailInput.toLowerCase()
        .match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );

        console.log(`check user email ${check}`)

        if (check === null) {
            setUserEmailValid(false)
            return;
        }

        else {
            setUserEmailValid(true)
            console.log(`setting true ${check}`)
        }

        // if (userNameInput.length > 6) {
        //     console.log("True")
        //     setUserNameValid(true)
        //     return;
        // }

        // else {
        //     console.log("False")
        //     setUserNameValid(false)
        // }
    }

    const queryUserUnique = async (userNameInput) => {
        const userName = {
            UserName: userNameInput,
        }
        try{
            const res = await axios.post("http://localhost:3001/queryUserNameExists", userName)
            console.log(res.data);
            //setUserName(res.data[0].UserName);

            if (res.data.length > 0) {
                setUserNameUnique(false)
                console.log("User name taken")
            }

            else {
                setUserNameUnique(true)
                console.log("User name available")
            }
        } catch(err){
            throw(err);
        }
    }



    return (
        <div>
             <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" padding={4}>
             <IconButton sx={{position: "absolute", top:10, left: 10}}>
                <ArrowBackIcon fontSize="large"/>
                </IconButton>
            <Typography variant="h4" padding={2}>Sign up - Let's get started!</Typography>
            <Grid container direction="column" spacing={3} justifyContent="center" alignItems="center">
                <Grid item>
                    <TextField id="outlined" label="Name" variant="outlined" onChange = {(e) => {
                        storeUserNameInput(e.target.value)
                    }} error = {(!isUserNameValid) && (enteredUserNameTextField)} helperText = {(isUserNameValid) || (!enteredUserNameTextField)? "" : "Username must be longer than 6 characters!"}/>
                </Grid>
                <Grid item>
                    <TextField id="outlined" label="Email" variant="outlined" onChange = {(e) => {
                        storeUserEmailInput(e.target.value)
                    }}/>
                </Grid>
                <Grid item>
                    <TextField id="outlined" label="Password" variant="outlined" hidden onChange = {(e) => {
                        storeUserPassInput(e.target.value)
                    }}/>
                </Grid>
                <Grid item>
                    <TextField id="outlined" label="Confirm Password" variant="outlined" hidden onChange = {(e) => {
                        storeUserConfirmPassInput(e.target.value) 
                    }}/>
                </Grid>
                <Grid item style={{ marginTop: '10px' }}>
                    <Button variant="contained" size="small" disabled = {!isPasswordMatch}
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
