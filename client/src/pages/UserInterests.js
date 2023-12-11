import { Typography, Button, Box, Grid} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import axios from "axios";
import { useSignIn } from 'react-auth-kit';
import FormHelperText from '@mui/material/FormHelperText';

const UserInterests = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const [userEmail, setUserEmail] = useState(location.state.UserEmail);
    const [userPass, setUserPass] = useState(location.state.UserPass);

    const [userID, setUserID] = useState(location.state.user);
    const [userInterest, setUserInterest] = useState([]);
    const [interestsList, setInterestsList] = useState([]);

    const [userNotReady, setUserNotReady] = useState(true);
    const signIn = useSignIn();

    const fetchInterests = async () => {
      const res = await axios.get("http://localhost:3001/interests");
      setInterestsList(res.data);
  }

    const handleInterestSelected = (interestInput) => {
        setUserInterest(interestInput)
        checkInterest(interestInput);
    }

    const checkInterest = (interestInput) => {
        if (interestInput.length === 0) {
            setUserNotReady(true);
        }
        
        else {
            setUserNotReady(false);
        }
    }

    const insertUserInterest = async () => {
      try {
          // Use Promise.all to wait for all asynchronous calls to complete
          await Promise.all(userInterest.map(async (interest) => {
              const theInterest = {
                  UserID: userID,
                  InterestID: interest.InterestID, 
              };
  
              // Make a separate call for each interest
              const res = await axios.post("http://localhost:3001/createUserInterests", theInterest);
          }));
      } catch (err) {
          console.error(err);
      }
  };

  const handleContinue = async () => {
    await insertUserInterest();
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

useEffect(() => {
  fetchInterests();
}, []);

    return (
        <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
        <Box padding={8}>
          <Typography variant="h4">Tell us more about you!</Typography>
        </Box>
  
        <FormControl sx={{ m: 1, width: 300 }}>
          <InputLabel id="demo-multiple-chip-label">What are your interests?</InputLabel>
          <Select
            labelId="What are your interests?"
            id="What are your interests?"
            multiple
            value = {userInterest}
            onChange={(e) => handleInterestSelected(e.target.value)}
            input={<OutlinedInput id="What are your interests?" label="What are your interests?" />}
            renderValue={(selected) => (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value.InterestID} label={value.InterestName} />
              ))}
            </Box>
          )}
          >
            {interestsList.map((name) => (
              <MenuItem key={name.InterestID} value={name}>
                {name.InterestName}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText>At least one interest must be selected!</FormHelperText>
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