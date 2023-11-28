import { Typography, Grid, Button, Box, IconButton } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import BottomNav from "../components/BottomNav";
import { Link } from "react-router-dom";

const Recipes = () => {
    return (
        <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
            <IconButton sx={{position: "absolute", top:10, left: 10}}>
                <ArrowBackIcon fontSize="large"/>
            </IconButton>
            <Box padding={10}>
                <Typography variant="h4" padding={2}>Recipes</Typography>
            </Box>
            <Grid container spacing={3} direction="column" width={500}>
                <Grid item>
                    <Button variant="contained" fullWidth size="large"
                    component={Link}
                    to={{pathname:"/searchRecipes"}}
                    state={{from:"/recipes", recipeID:""}}>Search Recipes</Button>
                </Grid>
                <Grid item>
                    <Button variant="contained" fullWidth size="large">View Your Recipes</Button>
                </Grid>
            </Grid>
            <BottomNav currentPage="Recipes" value={0}/>
        </Box>
    )
}

export default Recipes;