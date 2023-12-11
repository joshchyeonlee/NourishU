import { Typography, Box, Button } from "@mui/material";
import { Link } from "react-router-dom";
const NotFound = ( ) => {
    return(
        <Box
            sx={{height:"100vh", width: "100%"}}
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
            >
            <Typography variant="h1" padding={8}>OOPS! Something went wrong...</Typography>
            <Button variant="contained" component={Link} to={{pathname: "/"}}>Return Welcome</Button>
        </Box>
    )
}

export default NotFound;