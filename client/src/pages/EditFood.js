import { Box, Typography, Select, MenuItem, Button, FormControl } from "@mui/material";
import { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import axios from 'axios';

const EditFood = () => {
    const location = useLocation();
    const food = location.state.food;

    const [qConsumed, setQConsumed] = useState(food.quantityConsumed);

    const handleQSelect = (event) => {
        setQConsumed(event.target.value);
    }

    const handleConfirm = async () => {
        console.log(food);
        const MealID = {
            RecipeID: food.recipeID,
            QuantityConsumed: qConsumed,
        };

        console.log(MealID);
        try{
            const res = await axios.post("http://localhost:3001/editFood", MealID);
            console.log(res);
        } catch(err){
            throw(err);
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
                        <Select value={qConsumed} onChange={handleQSelect} label="Quantity Consumed" defaultValue={food.quantityConsumed}>
                            {Array.from(Array(10), (e, i) => {
                                return(
                                    <MenuItem key={i} value={i + 1}>{i + 1}</MenuItem>
                                )
                            })}
                        </Select>
                    </FormControl>
                </Box>
                <Box position="absolute" bottom={10} width="100%" left="50%" marginLeft="-160px">
                    <Box sx={{width:"320px"}} padding={1} display="flex" flexDirection="column" justifyContent="center" alignItems="center">
                        <Button variant="contained" onClick={() => handleConfirm()}
                        component={Link}
                        to={{pathname:"/dashboard"}}>
                            Confirm
                        </Button>
                    </Box>
                    <Box sx={{width:"320px"}} padding={1} display="flex" flexDirection="column" justifyContent="center" alignItems="center">
                        <Button>
                            Cancel
                        </Button>
                    </Box>
                </Box>
            </Box>    
        </div>
    );
}

export default EditFood;