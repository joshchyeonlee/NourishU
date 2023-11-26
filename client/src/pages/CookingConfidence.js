import { Typography, Grid, Box, Slider, Button } from "@mui/material";

const CookingConfidence = () => {
  const valuetext = (value) => {
    return `${value}% Confidence`;
  };

  return (
    <div>
      <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
        <Box padding={10}>
          <Typography variant="h4">How Confident are you with cooking?</Typography>
        </Box>
        <Grid container spacing={1} direction="column" width={200} justifyContent="flex-start" textAlign="left">
          <Grid item>
            <Box sx={{ width: 300}}>
            <Slider
              aria-label="Cooking Confidence"
              defaultValue={30}
              getAriaValueText={valuetext}
              valueLabelDisplay="auto"
              step={1}
              marks
              min={1}
              max={10}
              sx={{ width: '200%', mt: 4 }}
            />
            </Box>
          </Grid>
            <Grid item>
                <Button variant="contained" sx ={{width: '200px'}}>Continue</Button>
            </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default CookingConfidence;
