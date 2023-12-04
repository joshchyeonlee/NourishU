import { Box, Typography, IconButton, Button } from "@mui/material"
import { useEffect, useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const EditRecipeRedirect = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [recipeID, setRecipeID] = useState(location.state.recipeID);
    return(
        <Box display="flex" justifyContent="center" padding={2} flexDirection="column" textAlign="center" alignItems="center" sx={{height:"100vh", width:"100%"}}>
            <IconButton sx={{position: "absolute", top:10, left: 10}}
                component={Link}
                to={{pathname: location.state.from}}>
                <ArrowBackIcon fontSize="large"/>
            </IconButton>
            <Box padding={8}>
                <Typography variant="h5">What would you like to edit?</Typography>
            </Box>
            <Box sx={{height:"100%", width:"100%"}}>
                <Box sx={{position: "relative",
                    float: "left",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -100%)",
                    width: "30%"}}
                    padding={4} display="flex" flexDirection="column"
                >
                    <Box padding={1}>
                        <Button fullWidth variant="contained"
                            component={ Link }
                            to={{pathname: "/editRecipeDetails"}}
                            state={{recipeID: recipeID, from:"/editRecipe", prev:location.state}}
                        >Recipe Details</Button>
                    </Box>
                    <Box padding={1}>
                        <Button fullWidth variant="contained"
                            component={ Link }
                            to={{pathname: "/editRecipeIngredients"}}
                            state={{recipeID: recipeID, from:"/editRecipe", prev:location.state}}
                        >Ingredients</Button>
                    </Box>
                    <Box padding={1}>
                        <Button fullWidth variant="contained"
                            component={ Link }
                            to={{pathname: "/editRecipeSteps"}}
                            state={{recipeID: recipeID, from:"/editRecipe", prev:location.state}}
                        >Steps</Button>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default EditRecipeRedirect;