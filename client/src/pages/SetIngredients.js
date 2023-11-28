import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Box, IconButton, Select, Typography, MenuItem, FormControl, Button } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DeleteIcon from '@mui/icons-material/Delete';

const SetIngredients = () => {
    const location = useLocation();
    const [ingredients, setIngredients] = useState(location.state.ingredients);
    const [state, setState] = useState([]);

    //https://stackoverflow.com/questions/69206649/handle-multiple-input-boxes-rendered-using-map-function-javascript
    const handleChange = (e, i) => {
        const { value, quantity } = e.target;
        const newState = [...state];

        newState[i] = {
            ...newState[i],
            quantity: value
        };

        setState(newState);
    }
    
    const setIngrState = () => {
        const arr = [];
        ingredients.map((val, key) => {
            const s = {
                ingredientID: val.IngredientID,
                quantity: 1,
            }
            arr.push(s);
        })

        setState(arr);
    }

    const handleContinue = () => {
        console.log("continue");
    }

    useEffect(() => {
        setIngrState();
    }, [])

    return(
    <Box display="flex" justifyContent="center" padding={2} flexDirection="column" alignItems="center">
        <IconButton sx={{position: "absolute", top:10, left: 10}}>
            <ArrowBackIcon fontSize="large"/>
        </IconButton>
        <Box display="flex" justifyContent="center" padding={2}>
            <Typography variant="h5">Set Ingredient Quantities</Typography>
        </Box>
        <Box display="flex" flexDirection="column" justifyContent="center" padding={2} sx={{width:"60%"}}>
            {ingredients.map((value, index) => {return(
                //multiple selects from https://stackoverflow.com/questions/69206649/handle-multiple-input-boxes-rendered-using-map-function-javascript
                <Box display="flex" justifyContent="space-between" padding={1} key={index} alignItems="center" sx={{width:"100%"}}>
                    <Typography>{value.IngredientName}</Typography>
                    <Box display="flex" justifyContent="flex-end" sx={{width:"70%"}}>
                        {value.IsPerServing.data[0] === 1 ?
                            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                                <Select
                                    value={state[index] ? state[index].quantity : 0}
                                    sx={{width:"150px"}}
                                    onChange={(e) => handleChange(e, index)}
                                >
                                    {Array.from(Array(10), (e, i) => {
                                        return(
                                            <MenuItem key={i} value={i + 1}>{i + 1}</MenuItem>
                                        )
                                    })}
                                </Select>
                            </FormControl>
                            :
                            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                                <Select
                                    value={state[index] ? state[index].quantity : 0}
                                    sx={{width:"150px"}}
                                    onChange={(e) => handleChange(e, index)}
                                >
                                    {Array.from(Array(10), (e, i) => {
                                        return(
                                            <MenuItem key={i} value={i + 1}>{i + 1}</MenuItem>
                                        )
                                    })}
                                </Select>
                            </FormControl>
                    }
                        <IconButton>
                            <DeleteIcon/>
                        </IconButton>
                    </Box>
                </Box>
            )})}
            <Box position="absolute" bottom={30} sx={{width:"inherit"}}>
                <Box display="flex" justifyContent="center">
                    <Button variant="contained" onClick={handleContinue}>Continue</Button>
                </Box>
            </Box>
        </Box>

    </Box>)
}

export default SetIngredients;