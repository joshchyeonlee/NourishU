import { Typography, Button, Box, Grid } from "@mui/material";
import { Link } from "react-router-dom";

const Welcome = () => {
    return (
        <>
            <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
                <Box padding={10}>
                    <Typography variant="h4">{"NourishU"}</Typography>
                </Box>
                <Grid container spacing ={3} direction="column" width={200}>
                    <Grid item>
                        <Button variant="contained" sx = {{width: '200px'}} component={Link} to={{pathname:"/login"}}>Log in</Button>
                    </Grid>
                    <Grid item>
                    <Button variant="contained" sx = {{width: '200px'}} component={Link} to={{pathname:"/signup-initial"}}>Sign Up</Button>
                    </Grid>
                </Grid>
            </Box>
        </>
    )
}
export default Welcome;