import { Box, BottomNavigation, BottomNavigationAction } from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useState } from "react";

function BottomNav(props){
    const [value, setValue] = useState(props.value);
    return(
        <Box sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
            <BottomNavigation
                showLabels
                value={value}
                onChange={(event, newValue) => {setValue(newValue);}}
            >
                <BottomNavigationAction href="/recipes" disabled={props.currentPage === "Recipes"} label="Recipes" icon={<MenuBookIcon />} />
                <BottomNavigationAction href="/" disabled={props.currentPage === "Dashboard"} label="Dashboard" icon={<HomeIcon />} />
                <BottomNavigationAction href="/profile" disabled={props.currentPage === "Profile"} label="Profile" icon={<AccountCircleIcon />} />
            </BottomNavigation>
        </Box>
    )
}

export default BottomNav;