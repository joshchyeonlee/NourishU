import React from 'react';
import { Typography, TextField, Grid, Button, Box, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useState } from "react";
import axios from 'axios';
import {Link, useLocation} from "react-router-dom"

const SignUpInfo = () => {
    const location = useLocation();
    const [userName, setUserName] = useState(location.state.userName);
    const [userEmail, setUserEmail] = useState(location.state.userEmail);
    const [userPass, setUserPass] = useState(location.state.userPass);
 

    return (<div>
        <Typography variant="h4" padding={2}>{userName}</Typography>
        <Typography variant="h4" padding={2}>{userEmail}</Typography>
        <Typography variant="h4" padding={2}>{userPass}</Typography>

    </div>)


}

export default SignUpInfo;