import { Typography, Grid, Box, Slider, Button } from "@mui/material";

const CookingConfidence = () => {
  const changeSliderValue = (value) => {
    console.log(value)
  }

  return (
    <div>
      <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
        <Box padding={10}>
          <Typography variant="h4">How Confident are you with cooking?</Typography>
        </Box>
      <Box sx={{ width: 300 }}>
        <Slider
          aria-label="Cooking Confidence"
          defaultValue={3}
          valueLabelDisplay="auto"
          step={1}
          marks
          min={1}
          max={5}
          onChange={(event) => changeSliderValue(event.target.value)}
        />
      </Box>
        <Box position="absolute" bottom={800}>
          <Button variant="contained" sx={{width: '200px'}}>Continue</Button>
        </Box>
    </Box>
    </div>
  );
};

export default CookingConfidence;
