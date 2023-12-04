import { Typography, Button, Box, Grid} from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import axios from "axios";
import { useSignIn } from 'react-auth-kit';

const UserInterests = () => {

    const navigate = useNavigate();
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

    const [userID, setUserID] = useState(location.state.user);
    const [userInterest, setUserInterest] = useState("");

    const [userNotReady, setUserNotReady] = useState(true);
    const signIn = useSignIn();

    const interestsList = [
        'Reading',
        'Video Games',
        'Traveling',
        'Cooking',
        'Sports',
        'Programming',
        'Dancing',
        'Fitness',
        'Fashion',
        'Technology',
        'Movies/Tv Shows',
    
      ];

    const handleInterestSelected = (interestInput) => {
        setUserInterest(interestInput)
        checkInterest(interestInput);
    }

    const checkInterest = (interestInput) => {
        if (interestInput === "") {
            setUserNotReady(true);
        }
        
        else {
            setUserNotReady(false);
        }
    }

    const insertUserInterest = async () => {
      const theInterests = {
        UserID: userID,
        UserInterests: userInterest

      }
      const res = await axios.post("http://localhost:3001/createUserInterests", theInterests);
  }
    

  const handleContinue = async () => {
    insertUserInterest();
    await authenticateUser();
    navigate("/dashboard", {state:{UserID: userID}});
  }

  const authenticateUser = async () => {
    const cred = {
        Email: userEmail,
        Password: userPass,
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
    return (
        <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
        <Box padding={8}>
          <Typography variant="h4">Tell us more about you!</Typography>
        </Box>
  
        <FormControl sx={{ m: 1, width: 300 }}>
          <InputLabel id="demo-multiple-chip-label">What is your top interest?</InputLabel>
          <Select
            labelId="What is your top interest?"
            id="What is your top interest?"
            onChange={(e) => handleInterestSelected(e.target.value)}
            input={<OutlinedInput id="What is your top interest?" label="What is your top interest?" />}
            renderValue={(selected) => (
              <Chip key={selected} label={selected} />
            )}
          >
            {interestsList.map((name) => (
              <MenuItem key={name} value={name}>
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Grid item style={{ marginTop: '10px' }}>
                    <Button variant="contained" size="small" disabled={userNotReady}
                    onClick = {handleContinue}
                    >
                        Go to dashboard!
                    </Button>
                </Grid>
      </Box>
    );
  };
export default UserInterests;