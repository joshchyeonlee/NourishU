import { useState } from "react";
import { useLocation } from "react-router-dom";
import { Box, Typography } from "@mui/material";

const SetRecipeInstructions = () => {
    const location = useLocation();
    const [recipeID, setRecipeID] = useState(location.state.recipeID);
    const [state, setState] = useState([]);
    
    return (
    <Box display="flex" justifyContent="center" padding={2} flexDirection="column" alignItems="center">
        <Box display="flex" justifyContent="center" padding={2}>
            <Typography variant="h5">Add Instructions</Typography>
        </Box>
    </Box>
    )
}

export default SetRecipeInstructions;