import { Typography, Box, Slider, Button, IconButton } from "@mui/material";
import { useState } from "react";
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';

const ConfidenceIcon = (props) => {
  //scale based off of 
  //https://stackoverflow.com/questions/36482126/how-to-enlarge-the-svg-icon-in-material-ui-iconbuttons
  if(props.value === 1) return(<SentimentVeryDissatisfiedIcon/>)
  else if(props.value === 2) return(<SentimentDissatisfiedIcon/>)
  else if(props.value === 3) return(<SentimentSatisfiedIcon/>)
  else if(props.value === 4) return(<SentimentSatisfiedAltIcon/>)
  else return(<SentimentVerySatisfiedIcon/>)
}

const CookingConfidence = () => {
  const [value, setValue] = useState(3);

  const blue = "#035E7B";
  const green = "#4F772D";
  const red = "#BF211E";
  const yellow = "#FDCA40";
  const orange = "#F78764";

  const getColor = (value) => {
    if(value <= 1) return {color: blue};
    if(value <= 2) return {color: green};
    if(value <= 3) return {color: yellow};
    if(value <= 4) return {color: orange};
    if(value <= 5) return {color: red};
  }

  const changeSliderValue = (value) => {
    setValue(value)
  }

  const marks = [{value: 1, label: "Not confident at all"}
                ,{value: 5, label: "Extremely confident"}];

  return (
      <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
        <Box padding={8}>
          <Typography variant="h4">How Confident are you with cooking?</Typography>
        </Box>
        <Box padding={8} sx={{ width:"30%" }}>
          <Box paddingTop={4} paddingBottom={8} display="flex" justifyContent="center">
            <IconButton size="200px" disabled
              sx={{ transform:"scale(1.8)", "&.Mui-disabled": {color: getColor(value)}}}>
              <ConfidenceIcon value={value}/>
            </IconButton>
          </Box>
          <Slider
            aria-label="Cooking Confidence"
            defaultValue={3}
            value={value}
            valueLabelDisplay="auto"
            step={1}
            marks = {marks}
            min={1}
            max={5}
            onChange={(event) => changeSliderValue(event.target.value)}
          />
        </Box>
        <Box position="absolute" bottom={50}>
          <Button variant="contained" sx={{width: '200px'}}>Continue</Button>
        </Box>
    </Box>
  );
};

export default CookingConfidence;
