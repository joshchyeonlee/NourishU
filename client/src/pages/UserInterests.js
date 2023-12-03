import { Typography, Button, Box, Grid} from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';


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

    const [userID, setUserID] = useState(location.state.userID);
    const [userInterest, setUserInterest] = useState("");

    const [userNotReady, setUserNotReady] = useState(true);

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
    }

    const checkInterest = () => {
        if (userInterest === "") {
            setUserNotReady(true);
        }
        
        else {
            setUserNotReady(false);
        }
    }

    // Make function to insert the user interest into the db

    // also make function to set the cookie

    useEffect(() => {
        if (userInterest != "") navigate("/dashboard", {state: {user: userID}});
        }, [userInterest])


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
                    component = {Link}
                    to={{pathname:"/cookingConfidence"}}
                    >
                        Next
                    </Button>
                </Grid>
      </Box>
    );
  };
export default UserInterests;