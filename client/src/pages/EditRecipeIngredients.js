import { Box, Typography, IconButton, Select, FormControl, InputAdornment, MenuItem, Button } from "@mui/material"
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DeleteIcon from '@mui/icons-material/Delete';
import { useLocation, useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const EditRecipeIngredients = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [recipeID, setRecipeID] = useState(location.state.recipeID);
    const [state, setState] = useState([]);

    const fetchRecipeIngredients = async () => {
        const rID = {
            RecipeID: recipeID,
        }
        try{
            const res = await axios.post("http://localhost:3001/getRecipeIngredients", rID);
            setState(res.data);
        } catch (err) {
            navigate("/not-found");
        }
    }

    const handleChange = (e, i) => {
        const { value, quantity } = e.target;
        const newState = [...state];

        newState[i] = {
            ...newState[i],
            AmountIngredient: value
        };

        setState(newState);
    }

    const handleDelete = (index) => {
        var newState = [...state];
        newState.splice(index, 1);
        setState(newState);
    }

    const updateRecipeIngredient = async (ingredient) => {
        const ing = {
            RecipeID: recipeID,
            IngredientID: ingredient.IngredientID,
            AmountIngredient: ingredient.AmountIngredient
        }
        try{
            await axios.post("http://localhost:3001/updateRecipeIngredient", ing);
        } catch (err) {
            navigate("/not-found");
        }
    }

    const handleUpdate = () => {
        state.map((value => {
            updateRecipeIngredient(value);
        }))
        navigate(location.state.prev.from);
    }

    useEffect(() => {
        fetchRecipeIngredients();
    },[])
    
    return(
        <Box display="flex" justifyContent="center" padding={2} flexDirection="column" textAlign="center" alignItems="center">
            <Typography variant="h5">Edit Recipe Ingredients</Typography>
            <IconButton sx={{position: "absolute", top:10, left: 10}}
                component={Link}
                to={{pathname: location.state.from}}
                state={ location.state.prev }>
                <ArrowBackIcon fontSize="large"/>
            </IconButton>
            <Box display="flex" justifyContent="center" alignItems="center" padding={2} flexDirection="column" sx={{ width:"100%" }}>
                {
                    state.map((value, key) => {return(
                        <Box key={key} display="flex" padding={2} justifyContent="space-between" alignItems="center" sx={{ width:"70%" }}>
                            <Typography>{value.IngredientName}</Typography>
                            <Box display="flex" alignItems="center">
                                {value.IsPerServing.data[0] === 1 ?
                                    <FormControl>
                                        <Select
                                            value={state[key] ? state[key].AmountIngredient : 1}
                                            sx={{width:"150px"}}
                                            onChange={(e) => handleChange(e, key)}
                                            endAdornment={
                                                <InputAdornment position="end" sx={{marginRight:"30px"}}>servings</InputAdornment>
                                            }
                                        >
                                            {Array.from(Array(10), (e, i) => { return(
                                                <MenuItem key={i} value={i + 1}>{i + 1}</MenuItem>
                                            )})}
                                        </Select>
                                    </FormControl>
                                :
                                    <FormControl>
                                        <Select
                                            value={state[key] ? state[key].AmountIngredient : 1}
                                            sx={{width:"150px"}}
                                            onChange={(e) => handleChange(e, key)}
                                            endAdornment={
                                                <InputAdornment position="end" sx={{marginRight:"30px"}}>g</InputAdornment>
                                            }
                                        >
                                            {Array.from(Array(500), (e, i) => { return(
                                                <MenuItem key={i} value={i + 1}>{i + 1}</MenuItem>
                                            )})}
                                        </Select>
                                    </FormControl>
                                }
                                <Box paddingLeft={1}>
                                    <IconButton onClick={() => handleDelete(key)}>
                                        <DeleteIcon/>
                                    </IconButton>
                                </Box>
                            </Box>                            
                        </Box>
                    )})
                }

            </Box>
            <Box position="absolute" bottom={50}>
                <Button variant="contained" onClick={() => handleUpdate()}>Update</Button>
            </Box>
        </Box>
    )
}

export default EditRecipeIngredients;