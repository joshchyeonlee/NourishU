import { Box, Typography, IconButton, TextField, Slider, Autocomplete, Button } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuthUser } from 'react-auth-kit'
import { formatNumber, formatString } from "../utils/inputCheck"

const CreateRecipe = () => {
    const auth = useAuthUser();
    const navigate = useNavigate();
    const location = useLocation();
    const [userId, setUserID] = useState(auth().values.userID);
    const [ingredients, setIngredients] = useState([]);
    const [recipeTitle, setRecipeTitle] = useState("");
    const [recipeDescription, setRecipeDescription] = useState("");
    const [selectedIngredients, setSelectedIngredients] = useState([]);
    const [difficultyValue, setDifficultyValue] = useState(3);
    const [cookTime, setCookTime] = useState(30);
    const [servingSize, setServingSize] = useState(1);
    const [titleErr, setTitleErr] = useState(false);
    const [descErr, setDescErr] = useState(false);
    const [ingrErr, setIngrErr] = useState(false);
    const [recipeID, setRecipeID] = useState(-1);

    const fetchIngredients = async () => {
        try{
            const res = await axios.get("http://localhost:3001/ingredients");
            setIngredients(res.data);
        } catch (err) {
            navigate("/not-found");
        }
    }

    const insertRecipe = async () => {
        console.log("insertRecipe")
        const recipe = {
            UserID: userId,
            RDifficulty: difficultyValue,
            CookTime: cookTime,
            RecipeTitle: recipeTitle,
            RecipeDescription: recipeDescription,
            ServingSize: servingSize
        }
        try{
            const res = await axios.post("http://localhost:3001/createRecipe", recipe);
            setRecipeID(res.data.insertId);
        } catch (err){
            navigate("/not-found");
        }
    }

    const handleCreate = () => {
        console.log("create!")
        var isValid = true;
        if(recipeTitle.length === 0){
            setTitleErr(true);
            isValid = false;
        } else setTitleErr(false);

        if(recipeDescription.length === 0){
            setDescErr(true);
            isValid = false;
        } else setDescErr(false);

        if(selectedIngredients.length === 0){
            setIngrErr(true);
            isValid = false;
        } else setIngrErr(false);

        if(!isValid) return;

        insertRecipe()
    }

    const handleRecipeTitle = (val) => {
        setRecipeTitle(formatString(val, 50));
    }

    const handleRecipeDescription = (val) => {
        setRecipeDescription(formatString(val, 300));
    }

    const handleServingSize = (val) => {
        setServingSize(formatNumber(val, 1, 10))
    }

    const handleDifficulty = (val) => {
        setDifficultyValue(formatNumber(val, 1, 5));
    }

    const handleCooktime = (val) => {
        setCookTime(formatNumber(val, 1, 120));
    }

    useEffect(() => {
        fetchIngredients();
    }, []);

    useEffect(() => {
        if (recipeID !== -1) navigate("/setIngredients", {state:{ingredients: selectedIngredients, recipeID: recipeID, prev: location.state}});
    }, [recipeID])

    //back arrow returns to dashboard for now, waiting on PR to be merged to link page
    return(
        <Box display="flex" justifyContent="center" padding={2} flexDirection="column" alignItems="center">
            <IconButton sx={{position: "absolute", top:10, left: 10}}
                component={Link}
                to= { (location.state) ? {pathname: location.state.from} : {pathname:"/dashboard"}}
                state = {(location.state) ? location.state.prev : {}}>
                <ArrowBackIcon fontSize="large"/>
            </IconButton>
            <Box display="flex" justifyContent="center" padding={2}>
                <Typography variant="h5">Create Recipe</Typography>
            </Box>
            <Box sx={{width:"70%"}} padding={2}>
                <Box display="flex" justifyContent="left" flexDirection="column" padding={1}>
                    <Typography variant="h6">Recipe Title</Typography>
                    <TextField
                        error={titleErr}
                        helperText={titleErr ? "Please provide a title for your recipe" : ""}
                        onChange={(event) => {handleRecipeTitle(event.target.value)}}
                    />
                </Box>
                <Box display="flex" justifyContent="left" flexDirection="column" padding={1}>
                    <Typography variant="h6">Recipe Description</Typography>
                    <TextField
                        error={descErr}
                        helperText={descErr ? "Please provide a description for your recipe" : ""}
                        onChange={(event) => {handleRecipeDescription(event.target.value)}}/>
                </Box>
                <Box display="flex" justifyContent="left" flexDirection="column" padding={1}>
                    <Typography variant="h6">Set Serving Size</Typography>
                    <Slider
                        step={1}
                        min={1}
                        max={10}
                        defaultValue={servingSize}
                        onChange={(event) => handleServingSize(event.target.value)}
                        />
                    <Box display="flex" justifyContent="flex-end">
                        <Typography>{servingSize}</Typography>
                    </Box>
                </Box>
                <Box display="flex" justifyContent="left" flexDirection="column" padding={1}>
                    <Typography variant="h6">Set Difficulty</Typography>
                    <Slider
                        step={1}
                        min={1}
                        max={5}
                        defaultValue={difficultyValue}
                        onChange={(event) => handleDifficulty(event.target.value)}
                        />
                    <Box display="flex" justifyContent="flex-end">
                        <Typography>{difficultyValue}</Typography>
                    </Box>
                </Box>
                <Box display="flex" justifyContent="left" flexDirection="column" padding={1}>
                    <Typography variant="h6">Set Cook Time</Typography>
                    <Slider
                        step={1}
                        min={1}
                        max={120}
                        defaultValue={30}
                        onChange={(event) => handleCooktime(event.target.value)}
                    />
                    <Box display="flex" justifyContent="flex-end">
                        <Typography>{cookTime >= 60 ? `${Math.floor(Number(cookTime / 60))} h ${Math.round(((cookTime/60) - Math.floor(cookTime/60)) * 60)} min` : `${cookTime} minutes`}</Typography>
                    </Box>
                </Box>
                <Box display="flex" justifyContent="space-between" flexDirection="row" padding={1} alignItems="center">
                    <Typography variant="h6">Select Ingredients Used</Typography>
                    <Box display="flex" justifyContent="center" padding={2} sx={{width:"70%"}}>
                        <Autocomplete
                            disablePortal
                            multiple
                            options={ingredients}
                            isOptionEqualToValue={(option, value) => option.IngredientName === value.IngredientName}
                            getOptionLabel={(option) => option.IngredientName}
                            filterSelectedOptions
                            sx={{ width:"100%" }}
                            defaultValue={[]}
                            renderInput={(params) => (
                                <TextField {...params} error={ingrErr} helperText={ingrErr ? "At least one ingredient is required" : ""} variant="standard" />
                            )}
                            //https://stackoverflow.com/questions/58666189/getting-the-value-in-the-react-material-ui-autocomplete
                            onChange={(event, value) => {
                                setSelectedIngredients(value);
                            }}
                        />
                    </Box>
                </Box>
                <Box display="flex" justifyContent="center" padding={1}>
                    <Button variant="contained" onClick={handleCreate}>Create!</Button>
                </Box>
            </Box>
        </Box>)
}

export default CreateRecipe;