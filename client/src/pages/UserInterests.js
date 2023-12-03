import { Typography, Button, Box, Grid } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";


const UserInterests = () => {

    const location = useLocation();
    const [userName, setUserName] = useState(location.state.UserName);
    const [userEmail, setUserEmail] = useState(location.state.UserEmail);
    const [userPass, setUserPass] = useState(location.state.UserPass);
    const [userBirthDate, setUserBirthDate] = useState(location.state.UserBirthDate);
    const [userHeight, setUserHeight] = useState(location.state.UserHeight);
    const [userWeight, setUserWeight] = useState(location.state.UserWeight);
    const [userDiet, setUserDiet] = useState(location.state.UserDiet);
    const [userDietDescription, setUserDietDescription] = useState(location.state.UserDietDescription);
    const [userAge, setUserAge] = useState(location.state.UserAge);


    return (
        <Box>
        
        {/* <Typography variant="h4" padding={2}>{userName}</Typography>
        <Typography variant="h4" padding={2}>{userEmail}</Typography>
        <Typography variant="h4" padding={2}>{userPass}</Typography> 
        <Typography variant="h4" padding={2}>{userBirthDate}</Typography> 
        <Typography variant="h4" padding={2}>{userHeight}</Typography> 
        <Typography variant="h4" padding={2}>{userWeight}</Typography> 
        <Typography variant="h4" padding={2}>{userDiet}</Typography> 
        <Typography variant="h4" padding={2}>{userDietDescription}</Typography> 
        <Typography variant="h4" padding={2}>{userAge}</Typography>  */}

        
        
        </Box>


    )
}
export default UserInterests;