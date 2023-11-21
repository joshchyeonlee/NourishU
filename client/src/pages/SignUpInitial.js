import React from 'react';
import { Typography, TextField, Grid, Button, Box, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const SignUpInitial = () => {
    return (
        <div>
             <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" padding={4}>
             <IconButton sx={{position: "absolute", top:10, left: 10}}>
                <ArrowBackIcon fontSize="large"/>
                </IconButton>
            <Typography variant="h4" padding={2}>Sign up - Let's get started!</Typography>
            <Grid container direction="column" spacing={3} justifyContent="center" alignItems="center">
                <Grid item>
                    <TextField id="outlined" label="Name" variant="outlined" />
                </Grid>
                <Grid item>
                    <TextField id="outlined" label="Email" variant="outlined" />
                </Grid>
                <Grid item>
                    <TextField id="outlined" label="Password" variant="outlined" />
                </Grid>
                <Grid item>
                    <TextField id="outlined" label="Confirm Password" variant="outlined" />
                </Grid>
                <Grid item style={{ marginTop: '10px' }}>
                    <Button variant="contained" size="small" disabled>
                        Next
                    </Button>
                </Grid>
            </Grid>
            </Box>
        </div>
    );
};

export default SignUpInitial;
