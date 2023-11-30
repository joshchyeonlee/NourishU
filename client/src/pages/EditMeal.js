import { Box, Typography, TextField, IconButton, Button } from "@mui/material";
import { useLocation, Link } from "react-router-dom";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import axios from 'axios';
import { useState } from "react";

const EditMeal = () => {
    const location = useLocation();
    const [meal, setMeal] = useState(location.state.meal);
    const [recipes, setRecipes] = useState(location.state.recipes);
    const [mealName, setMealName] = useState(location.state.meal.MealTitle);

    const deleteRecipeFromDB = async (recipeID) => {
        const RecipeID = {
            RecipeID: recipeID,
            MealID: meal.MealID,
        }
        try{
            const res = await axios.post("http://localhost:3001/removeRecipeFromMeal", RecipeID)
            console.log(res.data);
        } catch (err) {
            throw(err);
        }
    }

    const handleDelete = (recipe) => {
        deleteRecipeFromDB(recipe.recipeID);
        
        var recipeCopy = [...recipes];
        const index = recipeCopy.indexOf(recipe);
        if(index >= 0) recipeCopy.splice(index, 1);

        setRecipes(recipeCopy);
    }

    const updateMealTitle = async () => {
        const data = {
            MealTitle: mealName,
            MealID: meal.MealID,
        }
        try{
            const res = await axios.post("http://localhost:3001/updateMealTitle", data)
            console.log(res.data);
            var m = meal;
            m.MealTitle = mealName;
            setMeal(m);
        } catch (err) {
            throw (err);
        }
    }

    const handleDone = () => {
        if(mealName === meal.MealTitle) return;
        updateMealTitle();
    }

    return(
        <div>
            <IconButton sx={{position: "absolute", top:10, left: 10}} component={Link} to={{pathname:"/viewMeal"}} state={{ meal:meal }}>
                <ArrowBackIcon fontSize="large"/>
            </IconButton>
            <Box display="flex" flexDirection="column" padding={4} justifyContent="center" textAlign="center">
                <Typography variant="h5">Edit Meal</Typography>
            </Box>
            <Box padding={4} display="flex" flexDirection="column" justifyContent="center" alignItems="center">
                <TextField label="Meal Name" variant="standard" defaultValue={mealName} onChange={(event) => {setMealName(event.target.value)}}/>
            </Box>
            <Box padding={4} display="flex" flexDirection="column" justifyContent="center" alignItems="center">
                {recipes.map((value, key) => {
                    return(
                        <Box key={key} display="flex" flexDirection="row" justifyContent="space-between" sx={{ width:1/2 }}>
                            <Typography>{value.recipeTitle}</Typography>
                            <Box>
                                <IconButton color="primary"
                                    component={Link}
                                    to={{ pathname:"/editFood" }}
                                    state={{ food:value, meal:meal, recipes: recipes }}
                                    >
                                    <EditIcon/>
                                </IconButton>
                                <IconButton color="error"
                                    onClick={() => {handleDelete(value)}}>
                                    <DeleteIcon/>
                                </IconButton>
                            </Box>
                        </Box>
                    )
                })}
            </Box>
            <Box position="absolute" bottom={10} width="100%" left="50%" marginLeft="-160px">
                <Box sx={{width:"320px"}} padding={1} display="flex" flexDirection="column" justifyContent="center" alignItems="center">
                    <Button fullWidth variant="contained"
                        component={Link}
                        to={{pathname:"/searchRecipes"}}
                        state={{meal: meal, from:"/editMeal", recipes:recipes}}>Add Food</Button>
                </Box>
                <Box sx={{width:"320px"}} padding={1} display="flex" flexDirection="column" justifyContent="center" alignItems="center">
                    <Button fullWidth variant="contained"
                        component={Link}
                        to={{pathname:"/dashboard"}}
                        state={{meal:meal}}
                        onClick={handleDone}
                        >
                            Done</Button>
                </Box>
            </Box>
        </div>
    )
}

export default EditMeal;