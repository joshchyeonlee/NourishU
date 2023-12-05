import { Box, BottomNavigation, BottomNavigationAction } from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useState } from "react";
import { useAuthUser } from "react-auth-kit";
import Profile from "../pages/Profile";

function BottomNav(props){
    const auth = useAuthUser();
    const [value, setValue] = useState(props.value);

    //children to pass props from https://stackoverflow.com/questions/60439210/how-to-pass-props-to-screen-component-with-a-tab-navigator

    return(
        <Box sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
            <BottomNavigation
                showLabels
                value={value}
                onChange={(event, newValue) => {setValue(newValue);}}
            >
                <BottomNavigationAction href="/recipes" disabled={props.currentPage === "Recipes"} label="Recipes" icon={<MenuBookIcon />} />
                <BottomNavigationAction href="/dashboard" disabled={props.currentPage === "Dashboard"} label="Dashboard" icon={<HomeIcon />} />
                <BottomNavigationAction
                    href="/profile"
                    label="Profile"
                    icon={<AccountCircleIcon />} 
                    children={() => <Profile userId={auth().values.userID}/>}
                    />
            </BottomNavigation>
        </Box>
    )
}

export default BottomNav;