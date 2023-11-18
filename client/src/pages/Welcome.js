import { Typography, Button, Box, Grid } from "@mui/material";

const Welcome = () => {
    return (
        <>
        <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
            <Box padding={10}>
                <div><Typography variant="h4">{"NourishU"}</Typography></div>
            </Box>
            <Grid container spacing={3} direction="column" width={200}>
                <Grid item>
                    <div><Button variant="contained" sx = {{width: '200px'}}>Log in</Button></div>
                </Grid>
                <Grid item>
                    <div><Button variant="contained" sx = {{width: '200px'}}>Sign Up</Button></div>
                </Grid>
            </Grid>
        </Box>
        </>
    );
}


export default Welcome;
