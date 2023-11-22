import { Box, Button, Divider, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import axios from 'axios';

const ViewMeal = () => {
    const location = useLocation();
    const meal = location.state.meal;
    const [recipeInfo, setRecipeInfo] = useState([]);
    const [recipes, setRecipes] = useState([]);
    const [recipeTitles, setRecipeTitles] = useState([]);
    const [recipeIngredients, setRecipeIngredients] = useState([]);
    const [totalCalories, setTotalCalories] = useState(0);
    const [totalProtein, setTotalProtein] = useState(0);
    const [totalCarbohydrates, setTotalCarbohydrates] = useState(0);
    const [totalSaturatedFats, setTotalSaturatedFats] = useState(0);
    const [totalUnsaturatedFats, setTotalUnsaturatedFats] = useState(0);
    // const [isEdit, setIsEdit] = useState(false);

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

    const setTotalData = (d) => {
        setTotalCalories(d.reduce((c, {TotalCalories}) => c + parseInt(TotalCalories), 0));
        setTotalCarbohydrates(d.reduce((c, {TotalCarbs}) => c + TotalCarbs, 0).toFixed(2))
        setTotalProtein(d.reduce((c, {TotalProtein}) => c + TotalProtein, 0).toFixed(2));
        setTotalSaturatedFats(d.reduce((c, {TotalSatFat}) => c + TotalSatFat, 0).toFixed(2));
        setTotalUnsaturatedFats(d.reduce((c, {TotalUnsatFat}) => c + TotalUnsatFat, 0).toFixed(2));
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
            setTotalData(res.data);
        } catch(err) {
            throw(err);
        }
    }

    const getCalories = (id) => {
        const filteredData = recipeInfo.filter(recipe => recipe.RecipeID = id)
        try{
            const calories = filteredData[0].TotalCalories;
            return calories
        } catch (err){
            return 0;
        }
    }
    
    const getTotalFats = () => {
        return (parseInt(totalSaturatedFats) + parseInt(totalUnsaturatedFats));
    }

    const handleEdit = () => {
        console.log("edit");
    }

    useEffect( () => {
        fetchMealContains();
        fetchMealInfo();
    },[]);
    

    return(
        <div>
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
                            return(<Box key={key} display="flex" flexDirection="row" justifyContent="space-between">
                                <Typography>{val.recipeTitle}</Typography>
                                <Typography>Calories: {getCalories(val.recipeID)}</Typography>
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
                        <Button variant="contained" onClick={(() => handleEdit())}>Edit</Button>
                    </Box>
                </Box>
            </Box>
        </div>
    )
}

export default ViewMeal;