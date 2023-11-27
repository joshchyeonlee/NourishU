import { Box, Button, Divider, Typography, IconButton } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useLocation, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from 'axios';

const ViewMeal = () => {
    const location = useLocation();
    const meal = location.state.meal;
    const [recipeIngredients, setRecipeIngredients] = useState([]);
    const [totalCalories, setTotalCalories] = useState(0);
    const [totalProtein, setTotalProtein] = useState(0);
    const [totalCarbohydrates, setTotalCarbohydrates] = useState(0);
    const [totalSaturatedFats, setTotalSaturatedFats] = useState(0);
    const [totalUnsaturatedFats, setTotalUnsaturatedFats] = useState(0);

    const formatData = (data) => {
        const rTitles = [...new Set(data.map(val => val.RecipeTitle))];

        const recipeIngr = [];

        rTitles.forEach((value) => {
            var arr = (data.filter((val) => val.RecipeTitle === value))
            
            const recipeIngredient = {
                recipeID: arr[0].RecipeID,
                recipeTitle: value,
                ingredients: arr.map(val => val.IngredientName),
                ingredientIDs: arr.map(val => val.IngredientID),
                ingredientAmtConsumed: arr[0].AmountIngredient,
                quantityConsumed: arr[0].QuantityConsumed,
            }

            var calories = 0;
            var protein = 0;
            var saturatedFats = 0;
            var unsaturatedFats = 0;
            var carbohydrates = 0;

            for(var i = 0; i < arr.length; i++){
                var amt = 1;
                if(arr[i].isPerServing.data[0]){
                    amt = arr[i].AmountIngredient;
                }
                calories += amt * arr[i].Calories;
                protein += amt * arr[i].Protein;
                saturatedFats += amt * arr[i].SaturatedFats;
                unsaturatedFats += amt * arr[i].UnsaturatedFats;
                carbohydrates += amt * arr[i].Carbs;
            }

            var totalFats = saturatedFats + unsaturatedFats;

            recipeIngredient.calories = calories;
            recipeIngredient.protein = protein;
            recipeIngredient.saturatedFats = saturatedFats;
            recipeIngredient.unsaturatedFats = unsaturatedFats;
            recipeIngredient.totalFats = totalFats;
            recipeIngredient.carbohydrates = carbohydrates;

            const mult = recipeIngredient.quantityConsumed;
            setTotalCalories(totalCalories + (calories * mult));
            setTotalProtein(Number(totalProtein + (mult * protein)).toFixed(2));
            setTotalSaturatedFats(Number(totalSaturatedFats + (mult * saturatedFats)).toFixed(2));
            setTotalUnsaturatedFats(Number(totalUnsaturatedFats + (mult * unsaturatedFats)).toFixed(2));
            setTotalCarbohydrates(Number(totalCarbohydrates + (mult * carbohydrates)).toFixed(2));

            recipeIngr.push(recipeIngredient);
        })

        setRecipeIngredients(recipeIngr);
    }

    const fetchMealContains = async () => {
        const MealID = {
            MealID: meal.MealID,
        }
        try{
            const res = await axios.post("http://localhost:3001/getMealContains", MealID);
            formatData(res.data);

        } catch(err){
            throw(err);
        }
    }
    
    const getTotalFats = () => {
        return (parseInt(totalSaturatedFats) + parseInt(totalUnsaturatedFats));
    }

    useEffect( () => {
        fetchMealContains();
    },[]);
    
    return(
        <div>
            <IconButton sx={{position: "absolute", top:10, left: 10}} component={Link} to={{pathname:"/dashboard"}}>
                <ArrowBackIcon fontSize="large"/>
            </IconButton>
            <Box display="flex" flexDirection="column" padding={4} justifyContent="center" textAlign="center">
                <Typography variant="h5">View Meal</Typography>
            </Box>
            <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
                <Typography variant="h6">{meal.MealTitle}</Typography>
                <Box display="flex" flexDirection="column" paddingTop={4} sx={{ width: 1/2 }}>
                    <Box display="flex">
                        <Typography variant="h6">Foods Consumed:</Typography>
                    </Box>
                    <Box padding={1}>
                        {recipeIngredients.map((val, key) => {
                            return(<Box key={key} display="flex" flexDirection="column" justifyContent="space-between">
                                <Typography>{val.recipeTitle}</Typography>
                                <Box paddingLeft={1} paddingRight={1}>
                                    <Box display="flex" flexDirection="row" justifyContent="space-between">
                                        <Typography variant="caption">Calories Per Serving</Typography>
                                        <Typography variant="caption">{val.calories}</Typography>
                                    </Box>
                                    <Box display="flex" flexDirection="row" justifyContent="space-between">
                                        <Typography variant="caption">Quantity Consumed</Typography>
                                        <Typography variant="caption">{val.quantityConsumed}</Typography>
                                    </Box>
                                    <Box display="flex" flexDirection="row" justifyContent="space-between">
                                        <Typography variant="caption">Total Calories Consumed</Typography>
                                        <Typography variant="caption">{val.quantityConsumed * val.calories}</Typography>
                                    </Box>
                                </Box>
                            </Box>)
                        })}
                    </Box>
                    <Box padding={1}>
                        <Divider/>
                    </Box>
                    <Box display="flex" flexDirection="column">
                        <Typography variant="h6">Total Nutrients Consumed:</Typography>
                        <Box padding={1}>
                            <Box display="flex" flexDirection="row" justifyContent="space-between">
                                <Typography>Calories</Typography>
                                <Typography>{totalCalories}</Typography>
                            </Box>
                            <Box display="flex" flexDirection="row" justifyContent="space-between">
                                <Typography>Protein</Typography>
                                <Typography>{totalProtein}</Typography>
                            </Box>
                            <Box display="flex" flexDirection="row" justifyContent="space-between">
                                <Typography>Carbohydrates</Typography>
                                <Typography>{totalCarbohydrates}</Typography>
                            </Box>
                            <Box display="flex" flexDirection="row" justifyContent="space-between">
                                <Typography>Fats</Typography>
                                <Typography>{getTotalFats()}</Typography>
                            </Box>
                            <Box paddingLeft={1} display="flex" flexDirection="column">
                                <Box display="flex" flexDirection="row" justifyContent="space-between">
                                    <Typography variant="caption">Saturated Fats</Typography>
                                    <Typography variant="caption">{totalSaturatedFats}</Typography>
                                </Box>
                                <Box display="flex" flexDirection="row" justifyContent="space-between">
                                    <Typography variant="caption">Unsaturated Fats</Typography>
                                    <Typography variant="caption">{totalUnsaturatedFats}</Typography>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                    <Box display="flex" justifyContent="center" padding={4}>
                        <Button component={Link}
                            to={{pathname:"/editMeal"}}
                            state={{meal:meal, recipes: recipeIngredients}}
                            variant="contained">Edit</Button>
                    </Box>
                </Box>
            </Box>
        </div>
    )
}

export default ViewMeal;