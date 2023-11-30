import { Typography, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";

const Welcome = () => {
    return (
        <Box padding={4} display="flex" flexDirection="column" justifyContent="center" alignItems="center">
            <Box padding={8} display="flex" justifyContent="center">
                <Typography variant="h4">{"NourishU"}</Typography>
            </Box>
            <Box paddingTop={4} display="flex" justifyContent="center" flexDirection="column">
                <Box padding={1}>
                    <Button variant="contained" sx = {{width: '200px'}} component={Link} to={{pathname:"/login"}}>Log in</Button>
                </Box>
                <Box padding={1}>
                    <Button variant="contained" sx = {{width: '200px'}}>Sign Up</Button>
                </Box>
            </Box>
        </Box>
    )
}
export default Welcome;