import { Box, Typography, TextField, IconButton, Button } from "@mui/material";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const EditMeal = () => {
    const location = useLocation();
    const meal = location.state.meal;
    const recipes = location.state.recipes;

    return(
        <div>
            <Box display="flex" flexDirection="column" padding={4} justifyContent="center" textAlign="center">
                <Typography variant="h5">Edit Meal</Typography>
            </Box>
            <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
                <Typography variant="h6">{meal.MealTitle}</Typography>
                <TextField label="Meal Title" variant="standard" defaultValue={meal.MealTitle}/>
            </Box>
            <Box padding={2} display="flex" flexDirection="column" justifyContent="center" alignItems="center">
                {recipes.map((value, key) => {
                    return(
                        <Box key={key} display="flex" flexDirection="row" justifyContent="space-between" sx={{ width:1/2 }}>
                            <Typography>{value.recipeTitle}</Typography>
                            <Box>
                                <IconButton color="primary"
                                    component={Link}
                                    to={{ pathname:"/editFood" }}
                                    state={{ food:value }}
                                    >
                                    <EditIcon/>
                                </IconButton>
                                <IconButton color="error">
                                    <DeleteIcon/>
                                </IconButton>
                            </Box>
                        </Box>
                    )
                })}
            </Box>
            <Box position="absolute" bottom={10} width="100%" left="50%" marginLeft="-160px">
                <Box sx={{width:"320px"}} padding={1} display="flex" flexDirection="column" justifyContent="center" alignItems="center">
                    <Button fullWidth variant="contained">Add Food</Button>
                </Box>
                <Box sx={{width:"320px"}} padding={1} display="flex" flexDirection="column" justifyContent="center" alignItems="center">
                    <Button fullWidth variant="contained"
                        component={Link}
                        to={{pathname:"/viewMeal"}}
                        state={{meal:meal}}
                        >
                            Done</Button>
                </Box>
            </Box>
        </div>
    )
}

export default EditMeal;