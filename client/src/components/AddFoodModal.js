import { Box, IconButton, Modal, Typography, FormControl, Select, MenuItem, Button, Snackbar } from "@mui/material"
import CloseIcon from '@mui/icons-material/Close';
import { useState } from "react";
import axios from "axios";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

const AddFoodModal = (props) => {
    const [amtConsumed, setAmountConsumed] = useState(1);
    const [confirmationOpen, setConfirmationOpen] = useState(false);

    const handleClose = () => {
        props.setOpen(false)
        setConfirmationOpen(true);
    };

    const handleConfirmationClose = () => {
        setConfirmationOpen(false);
    };

    const handleAmountSelect = (event) => {
        setAmountConsumed(event.target.value);
    }

    const addToMeal = async (recipe, meal) => {
        const mealRecipe = {
            RecipeID: recipe.RecipeID,
            MealID: meal.MealID,
            Quantity: amtConsumed,
        }
        try{
            await axios.post("http://localhost:3001/addToMeal", mealRecipe);
        } catch(err) {
            throw(err);
        }
    }

    const updateMeal = async (recipe, meal) => {
        const mealRecipe = {
            RecipeID: recipe.RecipeID,
            MealID: meal.MealID,
            Quantity: amtConsumed,
        }
        try{
            await axios.post("http://localhost:3001/updateMealRecipeQuantity", mealRecipe);
        } catch(err) {
            throw(err);
        }
    }

    const checkIfRecipeExistsInMeal = async (recipe, meal) => {
        const mealRecipe = {
            RecipeID: recipe.RecipeID,
            MealID: meal.MealID,
        }
        try{
            const res = await axios.post("http://localhost:3001/queryMealContainsRecipe", mealRecipe);
            if(res.data.length > 0) updateMeal(recipe, meal);
            else addToMeal(recipe, meal);
        } catch(err){
            throw(err);
        }
    }

    const handleAdd = () => {
        checkIfRecipeExistsInMeal(props.recipe, props.meal);
        handleClose();
    }

    return (
        <div>
        <Snackbar
            open={confirmationOpen}
            autoHideDuration={6000}
            onClose={handleConfirmationClose}
            message="Successfully added food to meal!"
        />
        <Modal open={props.open} onClose={handleClose}>
            <Box sx={style}>
                <Box position="absolute" top={10} right={10}>
                    <IconButton onClick={handleClose}>
                        <CloseIcon/>
                    </IconButton>
                </Box>
                <Box display="flex" justifyContent="center" flexDirection="column" alignItems="center">
                    <Typography padding={1} variant="h6">Add Food</Typography>
                </Box>
                <Box display="flex" padding={2} flexDirection="column">
                    <Typography>Adding {props.recipeTitle}</Typography>
                    <Typography>To meal: {props.meal ? props.meal.MealTitle : ""}</Typography>
                </Box>
                <Box display="flex" justifyContent="space-between" alignItems="center" padding={2}>
                    <Typography>Select Quantity:</Typography>
                    <FormControl variant="standard" sx={{m: 1, minWidth: 120}}>
                        <Select value={amtConsumed} onChange={handleAmountSelect} label="Quantity Consumed" defaultValue={1}>
                            {Array.from(Array(10), (e, i) => {
                                return(
                                    <MenuItem key={i} value={i + 1}>{i + 1}</MenuItem>
                                )
                            })}
                        </Select>
                    </FormControl>
                </Box>
                <Box display="flex" justifyContent="center" padding={2}>
                    <Button variant="contained" onClick={handleAdd}>Add</Button>
                </Box>
            </Box>
        </Modal>
        </div>
    )
}

export default AddFoodModal;