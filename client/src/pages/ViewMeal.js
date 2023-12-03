import { Box, Button, Divider, Typography, IconButton } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useLocation, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from 'axios';
import formatRecipeData from "../utils/formatRecipeData";
import NutrInfo from "../components/NutrInfo";

const ViewMeal = () => {
    const location = useLocation();
    const meal = location.state.meal;
    const [recipeIngredients, setRecipeIngredients] = useState([]);
    const [nutrInfo, setNutrInfo] = useState();

    const fetchMealContains = async () => {
        const MealID = {
            MealID: meal.MealID,
        }
        try{
            const res = await axios.post("http://localhost:3001/getMealContains", MealID);
            const obj = formatRecipeData(res.data);
            setNutrInfo(obj);
            setRecipeIngredients(obj.recipeIngredients);

        } catch(err){
            throw(err);
        }
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
                    <Typography variant="h6">Total Nutrition:</Typography>
                    <NutrInfo info={nutrInfo}/>
                </Box>
                <Box position="absolute" display="flex" justifyContent="center" bottom={50}>
                    <Button component={Link}
                        to={{pathname:"/editMeal"}}
                        state={{meal:meal, recipes: recipeIngredients}}
                        variant="contained">Edit</Button>
                </Box>
            </Box>
        </div>
    )
}

export default ViewMeal;