import React from 'react';
import { Typography, TextField, Grid, Button, Box, IconButton, FormControl, InputLabel, Select, MenuItem, InputAdornment, Checkbox } from '@mui/material';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import { useState, useEffect } from "react";
import axios from 'axios';
import { Link, useLocation } from "react-router-dom"

import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const SignUpInfo = () => {
    const location = useLocation();
    const [userName, setUserName] = useState(location.state.userName);
    const [userEmail, setUserEmail] = useState(location.state.userEmail);
    const [userPass, setUserPass] = useState(location.state.userPass);
    const [userBirthDate, setUserBirthDate] = useState("");
    const [userHeight, setUserHeight] = useState(-1);
    const [userWeight, setUserWeight] = useState(-1);
    const [userDiet, setUserDiet] = useState("");
    const [userDietDescription, setUserDietDescription] = useState("");
    const [userAge, setUserAge] = useState(-1);
    const[userDietDescSize, setUserDietDescSize] = useState(true);
    const[userDone, setUserDone] = useState(true);
    const earlyDate = dayjs('1920-01-01')
    const today = dayjs();

    const dietNames = [
        'None',
        'Keto',
        'Paleo',
        'Vegetarian',
        'Vegan',
        'Pescatarian',
        'Halal',
    ]; 

    const handleBirthDate = (newValue) => {
        // Extract year, month, and day values
        const year = newValue.year();
        const month = newValue.month() + 1; // Months are zero-indexed
        const day = newValue.date();

        // Create a new Dayjs object with the extracted values
        const newBirthDate = dayjs(`${year}/${month}/${day}`);

        // Update the state with the new Dayjs object
        setUserBirthDate(newBirthDate.format('YYYY-MM-DD'));

        calculateUserAge(newBirthDate)
    };

    const handleUserHeight = (inputHeight) => {
        setUserHeight(inputHeight)
    }

    const handleUserWeight = (inputWeight) => {
        setUserWeight(inputWeight)
    }

    const handleUserDiet = (inputDiet) => {
        setUserDiet(inputDiet)
    }

    const handleUserDietDescription = (inputDietDesc) => {
        setUserDietDescription(inputDietDesc)
        checkDietDescriptionLength(inputDietDesc)
    }

    const checkDietDescriptionLength = (inputDietDesc) => {
        if (inputDietDesc.length >= 50) {
            setUserDietDescSize(false)
            return;
        }

        if (inputDietDesc === '') {
            setUserDietDescSize(false)
            return;
        }
        else {
            setUserDietDescSize(true);
        }
    }

    const checkInfo = () => {
        if (userBirthDate === "" || userHeight ===  -1 || userWeight === -1 || userDiet === ""  || userDietDescription === ""){
            setUserDone(true)
        }

        else {
            setUserDone(false);
        }
        console.log("in after check info");
    }

    const calculateUserAge = (theDate) => {
        const calculation = today.diff(theDate, "y")

        setUserAge(calculation)
    }

    useEffect(() => {
        // This effect will run whenever the variables in the array change
        console.log("before checkInfo");
        checkInfo();
    }, [userBirthDate, userHeight, userWeight, userDiet, userDietDescription]);

    return (
        <div>
            <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" padding={4}>
                <Typography variant="h4" padding={2}>Sign up - Basic Info</Typography>

                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker label="Enter your birthdate" sx={{ m: 1, minWidth: 350 }}
                        views={['year', 'month', 'day']}
                        minDate={earlyDate}
                        maxDate={today}
                        disableFuture = {true}
                        onChange={(newValue) => handleBirthDate(newValue)} />
                </LocalizationProvider>

                <Box sx={{ minWidth: 250 }} padding={4}>
                    <FormControl sx={{ m: 1, minWidth: 350 }}>
                        <InputLabel id="Height">Height</InputLabel>
                        <Select
                            labelId="Height"
                            id="Height"
                            label="Height"
                            onChange={(e) => handleUserHeight(e.target.value)}
                            endAdornment={
                                <InputAdornment position="end" sx={{ marginRight: "30px" }}>cm</InputAdornment>}
                        >
                            {Array.from({ length: 95 }, (_, index) => (
                                <MenuItem key={index} value={index + 120}>
                                    {index + 120}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Box>
                <FormControl sx={{ m: 1, minWidth: 350 }}>
                    <InputLabel id="Weight">Weight</InputLabel>
                    <Select
                        labelId="Weight"
                        id="Weight"
                        label="Weight"
                        onChange={(e) => handleUserWeight(e.target.value)}
                        endAdornment={
                            <InputAdornment position="end" sx={{ marginRight: "30px" }}>kg</InputAdornment>}
                    >
                        {Array.from({ length: 140 }, (_, index) => (
                            <MenuItem key={index} value={index + 1}>
                                {index + 1}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <Box sx={{ minWidth: 250 }} padding={4}>
                <FormControl sx={{ m: 1, minWidth: 350 }}>
                    <InputLabel id="Do you subscribe to any diets?">Do you subscribe to any diets?</InputLabel>
                    <Select
                        labelId="Do you subscribe to any diets?"
                        id="Do you subscribe to any diets?"
                        label="Do you subscribe to any diets?"
                        onChange={(e) => handleUserDiet(e.target.value)}
                        endAdornment={<InputAdornment position="end" sx={{ marginRight: "30px" }} >  <RestaurantIcon color="" /></InputAdornment>}
                    >
                        {dietNames.map((diet) => (
                            <MenuItem key={diet} value={diet}>
                                {diet}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                </Box>

                <TextField id="outlined" label="Briefly describe your diet!" variant="outlined" sx={{ m: 1, minWidth: 350 }} inputProps = {{maxLength: 50}}
                onChange = {(e) => {handleUserDietDescription(e.target.value)}}
                error = {(!userDietDescSize)} helperText = {(userDietDescSize)? "" : "Description is blank or TOO long!" }/>
                

                <Grid item style={{ marginTop: '10px' }}>
                    <Button variant="contained" size="small" disabled={userDone || !userDietDescSize}
                    component = {Link}
                    to={{pathname:"/cookingConfidence"}}
                    state={{UserName: userName, UserEmail: userEmail, UserPass: userPass, 
                        UserBirthDate: userBirthDate, UserHeight: userHeight, UserWeight: userWeight,
                    UserDiet: userDiet, UserDietDescription: userDietDescription, UserAge: userAge}}
                    >
                        Next
                    </Button>
                </Grid>


            </Box>

        </div>

    );


};

export default SignUpInfo;