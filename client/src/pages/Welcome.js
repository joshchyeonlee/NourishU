import { Button, Box } from "@mui/material";
import { Link } from "react-router-dom";
import logo_bg from '../assets/logo_bg.png';

const Welcome = () => {
    return (
        <Box padding={6} display="flex" flexDirection="column" justifyContent="center" alignItems="center">
            <img src={logo_bg} alt="NourishU"/>
            <Box display="flex" justifyContent="center" flexDirection="column">
                <Box padding={1}>
                    <Button variant="contained" sx = {{width: '200px'}} component={Link} to={{pathname:"/login"}}>Log in</Button>
                </Box>
                <Box padding={1}>
                    <Button variant="contained" sx = {{width: '200px'}} component={Link} to={{pathname:"/signup-initial"}}>Sign Up</Button>
                </Box>
            </Box>
        </Box>
    )
}
export default Welcome;