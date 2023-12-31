import { Box, Typography, Select, MenuItem, Button, FormControl } from "@mui/material";
import { useState } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { formatNumber } from "../utils/inputCheck";

const EditFood = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const food = location.state.food;
    const meal = location.state.meal;
    const recipes = location.state.recipes;

    const [qConsumed, setQConsumed] = useState(food.quantityConsumed);

    const handleQSelect = (val) => {
        setQConsumed(formatNumber(val, 1, 10));
    }

    const handleConfirm = async () => {
        const MealID = {
            RecipeID: food.recipeID,
            QuantityConsumed: qConsumed,
        };

        try{
            await axios.post("http://localhost:3001/editFood", MealID);
        } catch(err){
            navigate("/not-found");
        }
    }

    return(
        <div>
            <Box display="flex" justifyContent="center" flexDirection="column" padding={4} alignItems="center">
                <Typography variant="h5">Edit Food</Typography>
                <Box display="flex" padding={2}>
                    <Typography variant="h6">{food.recipeTitle}</Typography>
                </Box>
                <Box padding={2} display="flex" flexDirection="row" alignItems="center" justifyContent="space-between" sx={{ width:1/2 }}>
                    <Typography>Quantity Consumed</Typography>
                    <FormControl variant="standard" sx={{m: 1, minWidth: 120}}>
                        <Select value={qConsumed} onChange={(e) => handleQSelect(e.target.value)} label="Quantity Consumed" defaultValue={food.quantityConsumed}>
                            {Array.from(Array(10), (e, i) => {
                                return(
                                    <MenuItem key={i} value={i + 1}>{i + 1}</MenuItem>
                                )
                            })}
                        </Select>
                    </FormControl>
                </Box>
                <Box position="absolute" bottom={50} width="100%" left="50%" marginLeft="-160px">
                    <Box sx={{width:"320px"}} padding={1} display="flex" flexDirection="column" justifyContent="center" alignItems="center">
                        <Button variant="contained" onClick={() => handleConfirm()} component={Link} to={{pathname: "/EditMeal"}} state={{ recipes:recipes, meal:meal }}>
                            Confirm
                        </Button>
                    </Box>
                    <Box sx={{width:"320px"}} padding={1} display="flex" flexDirection="column" justifyContent="center" alignItems="center">
                        <Button component={Link} to={{pathname: "/EditMeal"}} state={{ recipes:recipes, meal:meal }}>
                            Cancel
                        </Button>
                    </Box>
                </Box>
            </Box>    
        </div>
    );
}

export default EditFood;