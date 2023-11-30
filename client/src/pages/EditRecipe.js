import { Box, Slider, TextField, Typography, Button, IconButton } from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import axios from "axios";

const EditRecipe = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [recipeID, setRecipeID] = useState(location.state.recipeID);
    const [servingSize, setServingSize] = useState(0)
    const [recipeDifficulty, setRecipeDifficulty] = useState(0);
    const [cookTime, setCookTime] = useState(0);
    const [recipeTitle, setRecipeTitle] = useState("");
    const [recipeDescription, setRecipeDescription] = useState("");

    const fetchRecipe = async () => {
        const rID = {
            RecipeID: recipeID,
        }

        try{
            const res = await axios.post("http://localhost:3001/getRecipeIngredients", rID);
            console.log(res.data);
            setServingSize(res.data[0].ServingSize);
            setRecipeDifficulty(res.data[0].RDifficulty);
            setCookTime(res.data[0].CookTime);
            console.log(res.data[0].CookTime);
            setRecipeTitle(res.data[0].RecipeTitle);
            setRecipeDescription(res.data[0].RecipeDescription);

        } catch (err) {
            throw (err);
        }
    }

    const updateRecipe = async () => {
        const recipe = {
            RecipeID: recipeID,
            RecipeTitle: recipeTitle,
            RecipeDescription: recipeDescription,
            CookTime: cookTime,
            ServingSize: servingSize,
            RecipeDifficulty: recipeDifficulty,
        }
        try{
            const res = await axios.post("http://localhost:3001/updateRecipe", recipe);
            console.log(res);
        } catch (err) {
            throw (err)
        }
    }

    const handleEditIngredients = () => {
        updateRecipe();
        navigate("/editRecipeIngredients", {state: { recipeID: recipeID }});
    }

    const handleDone = () => {
        updateRecipe();
        navigate("/profile");
    }

    useEffect(() => {
        fetchRecipe();
    },[])

    return(
        <Box display="flex" justifyContent="center" padding={2} flexDirection="column" textAlign="center" alignItems="center">
            <IconButton sx={{position: "absolute", top:10, left: 10}}
                component={Link}
                to={{pathname:"/profile"}}>
                <ArrowBackIcon fontSize="large"/>
            </IconButton>
            <Typography variant="h5">Edit Recipe</Typography>
            <Box display="flex" justifyContent="center" padding={2} sx={{width:"70%"}} flexDirection="column">
                <Box padding={2}>
                    <TextField
                        label="Recipe Title"
                        fullWidth
                        value={recipeTitle}
                        onChange={(e) => setRecipeTitle(e.target.value)}
                    />
                    <Box display="flex" justifyContent="right">
                        <Typography variant="caption">{recipeTitle.length}/255</Typography>
                    </Box>
                </Box>
                <Box padding={2}>
                    <TextField
                        label="Recipe Description"
                        fullWidth
                        value={recipeDescription}
                        onChange={(e) => setRecipeDescription(e.target.value)}
                    />
                    <Box display="flex" justifyContent="right">
                        <Typography variant="caption">{recipeDescription.length}/255</Typography>
                    </Box>
                </Box>
                <Box padding={2} textAlign="left">
                    <Typography paddingBottom={1}>Set Serving Size</Typography>
                    <Slider
                        defaultValue={servingSize}
                        min={1}
                        max={5}
                        step={1}
                        valueLabelDisplay="auto"
                        value={servingSize}
                        onChange={(e) => setServingSize(e.target.value)}
                        
                    />
                    <Box display="flex" justifyContent="right">
                        <Typography variant="caption">{servingSize}</Typography>
                    </Box>
                </Box>
                <Box padding={2} textAlign="left">
                    <Typography paddingBottom={1}>Set Recipe Difficulty</Typography>
                    <Slider
                        defaultValue={recipeDifficulty}
                        min={1}
                        max={5}
                        step={1}
                        valueLabelDisplay="auto"
                        value={recipeDifficulty}
                        onChange={(e) => setRecipeDifficulty(e.target.value)}
                    />
                    <Box display="flex" justifyContent="right">
                        <Typography variant="caption">{recipeDifficulty}</Typography>
                    </Box>
                </Box>
                <Box padding={2} textAlign="left">
                    <Typography paddingBottom={1}>Set Cook Time</Typography>
                    <Slider
                        defaultValue={cookTime}
                        min={1}
                        max={120}
                        step={1}
                        valueLabelDisplay="auto"
                        value={cookTime}
                        onChange={(e) => setCookTime(e.target.value)}
                    />
                    <Box display="flex" justifyContent="right">
                        <Typography variant="caption">{cookTime}</Typography>
                    </Box>
                </Box>
            </Box>
            <Box sx={{width:"25%"}}>
                <Box padding={1}>
                    <Button fullWidth variant="contained" onClick={handleDone}>
                        Update
                    </Button>
                </Box>
                <Box padding={1}>
                    <Button onClick={handleEditIngredients}>
                        Update and Edit Ingredients
                    </Button>
                </Box>
            </Box>
        </Box>
    )
}

export default EditRecipe;