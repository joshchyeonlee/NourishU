import { Box, Divider, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from 'axios';

const ViewMeal = () => {
    const location = useLocation();
    const meal = location.state.meal;
    const [recipeInfo, setRecipeInfo] = useState([]);
    const [recipes, setRecipes] = useState([]);
    const [recipeTitles, setRecipeTitles] = useState([]);
    const [recipeIngredients, setRecipeIngredients] = useState([]);
    const [totalCalories, setTotalCalories] = useState([]);
    const [totalProtein, setTotalProtein] = useState([]);
    const [totalCarbohydrates, setTotalCarbohydrates] = useState([]);
    const [totalSaturatedFats, setTotalSaturatedFats] = useState([]);
    const [totalUnsaturatedFats, setTotalUnsaturatedFats] = useState([]);

    const formatData = (data) => {
        const rTitles = [...new Set(data.map(val => val.RecipeTitle))];
        setRecipeTitles(rTitles);

        const recipeIngredients = [];

        rTitles.forEach((value) => {
            var arr = (data.filter((val) => val.RecipeTitle === value))
            var ingr = arr.map(val => val.IngredientName);
            const rid = arr[0].RecipeID;

            const recipeIngredient = {
                recipeID: rid,
                recipeTitle: value,
                ingredients: ingr,
            }
            recipeIngredients.push(recipeIngredient);
        })

        setRecipeIngredients(recipeIngredients);
    }

    const setTotalData = () => {
        console.log(recipeInfo);
        setTotalCalories(recipeInfo.reduce((c, {TotalCalories}) => c + parseInt(TotalCalories), 0));
        setTotalCarbohydrates(recipeInfo.reduce((c, {TotalCarbs}) => c + TotalCarbs, 0))
        setTotalProtein(recipeInfo.reduce((c, {TotalProtein}) => c + TotalProtein, 0));
        setTotalSaturatedFats(recipeInfo.reduce((c, {TotalSatFat}) => c + TotalSatFat, 0));
        setTotalUnsaturatedFats(recipeInfo.reduce((c, {TotalUnsatFat}) => c + TotalUnsatFat, 0));
    }

    const fetchMealContains = async () => {
        const MealID = {
            MealID: meal.MealID,
        }
        try{
            const res = await axios.post("http://localhost:3001/getMealContains", MealID);
            setRecipes(res.data);
            formatData(res.data);

        } catch(err){
            throw(err);
        }
    }

    const fetchMealInfo = async () => {
        const MealID = {
            MealID: meal.MealID,
        }
        try{
            const res = await axios.post("http://localhost:3001/getMealInfo", MealID);
            setRecipeInfo(res.data);
        } catch(err) {
            throw(err);
        }
        setTotalData();
    }

    const getCalories = (id) => {
        const filteredData = recipeInfo.filter(recipe => recipe.RecipeID = id)
        return filteredData[0].TotalCalories;
    }
    
    const getTotalFats = () => {
        return (totalSaturatedFats + totalUnsaturatedFats).toFixed(2);
    }

    useEffect(() => {
        fetchMealContains();
        fetchMealInfo();
    }, []);


    return(
        <div>
            <Box display="flex" flexDirection="column" padding={4} justifyContent="center" textAlign="center">
                <Typography variant="h5">View Meal</Typography>
            </Box>
            <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
                <Typography variant="h6">{meal.MealTitle}</Typography>
                <Box display="flex" flexDirection="column" paddingTop={4} sx={{ width: 1/2 }}>
                    <Box display="flex" paddingBottom={2}>
                        <Typography variant="h6">Foods Consumed:</Typography>
                    </Box>
                    <Box>
                        {recipeIngredients.map((val, key) => {
                            return(<Box key={key} display="flex" flexDirection="row" justifyContent="space-between">
                                <Typography>{val.recipeTitle}</Typography>
                                <Typography>Calories: {getCalories(val.recipeID)}</Typography>
                            </Box>)
                        })}
                    </Box>
                    <Box padding={2}>
                        <Divider/>
                    </Box>
                    <Box display="flex" flexDirection="column">
                        <Typography variant="h6">Total Nutrients Consumed:</Typography>
                        <Box paddingLeft={1} paddingRight={2}>
                            <Box display="flex" flexDirection="row" justifyContent="space-between">
                                <Typography>Calories</Typography>
                                <Typography>{totalCalories}</Typography>
                            </Box>
                            <Box display="flex" flexDirection="row" justifyContent="space-between">
                                <Typography>Calories</Typography>
                                <Typography>{totalCalories}</Typography>
                            </Box>
                            <Box display="flex" flexDirection="row" justifyContent="space-between">
                                <Typography>Protein</Typography>
                                <Typography>{totalProtein.toFixed(2)}</Typography>
                            </Box>
                            <Box display="flex" flexDirection="row" justifyContent="space-between">
                                <Typography>Carbohydrates</Typography>
                                <Typography>{totalCarbohydrates.toFixed(2)}</Typography>
                            </Box>
                            <Box display="flex" flexDirection="row" justifyContent="space-between">
                                <Typography>Fats</Typography>
                                <Typography>{getTotalFats()}</Typography>
                            </Box>
                            <Box paddingLeft={1} display="flex" flexDirection="column">
                                <Box display="flex" flexDirection="row" justifyContent="space-between">
                                    <Typography variant="caption">Saturated Fats</Typography>
                                    <Typography variant="caption">{totalSaturatedFats.toFixed(2)}</Typography>
                                </Box>
                                <Box display="flex" flexDirection="row" justifyContent="space-between">
                                    <Typography variant="caption">Unsaturated Fats</Typography>
                                    <Typography variant="caption">{totalUnsaturatedFats.toFixed(2)}</Typography>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </div>
    )
}

export default ViewMeal;