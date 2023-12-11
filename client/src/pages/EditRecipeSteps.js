import { Box, TextField, Typography, Button, IconButton, Card, Grid, CardContent } from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { formatString } from "../utils/inputCheck";
import axios from "axios";

const EditRecipeSteps = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [recipeID, setRecipeID] = useState(location.state.recipeID);
    const [recipeSteps, setRecipeSteps] = useState([]);
    const [isEmpty, setIsEmpty] = useState(true);
    
    const fetchRecipeSteps = async () => {
        const RecipeID = { RecipeID: recipeID };
        try{
            const steps = [];
            const res = await axios.post("http://localhost:3001/fetchRecipeSteps", RecipeID);

            for(var i = 0; i < res.data.length; i++){
                steps.push(res.data[i].StepDescription);
            }

            setRecipeSteps(steps);
        } catch (err) {
            navigate("/not-found");
        }
    }

    const updateRecipeSteps = async () => {
        const RecipeID = {RecipeID: recipeID};
        try {
            await axios.post("http://localhost:3001/removeAllSteps", RecipeID);
        } catch (err) {
            throw(err);
        }

        for(var i = 0; i < recipeSteps.length; i++){
            const step = {
                RecipeID: recipeID,
                StepDescription: recipeSteps[i],
                StepNo: i + 1,
            }
            try{
                await axios.post("http://localhost:3001/setRecipeInstruction", step);
            } catch (err) {
                console.log("failed FE");
                throw(err);
            }
        }
    }

    const handleDone = () => {
        updateRecipeSteps();
        navigate(location.state.prev.from);
    }

    const handleAdd = () => {
        const newInstructions = [...recipeSteps];
        newInstructions.push("");
        setRecipeSteps(newInstructions);
    }

    const handleChange = (e, i) => {
        const { value, instruction } = e.target;
        const newState = [...recipeSteps];
        newState[i] = formatString(value, 255);
        setRecipeSteps(newState);
    }

    const handleDelete = (i) => {
        const newInstr = [...recipeSteps];
        newInstr.splice(i, 1);
        setRecipeSteps(newInstr);
    }

    useEffect(() => {
        fetchRecipeSteps();
    }, [])

    useEffect(() => {
        var empty = false;
        for(var i = 0; i < recipeSteps.length; i++){
            empty |= (recipeSteps[i] === "");
        }
        setIsEmpty(empty);
    }, [recipeSteps])
    
    return(
        <Box display="flex" justifyContent="center" padding={2} flexDirection="column" textAlign="center" alignItems="center">
        <IconButton sx={{position: "absolute", top:10, left: 10}}
            component={Link}
            to={{pathname: location.state.from}}
            state={ location.state.prev }>
            <ArrowBackIcon fontSize="large"/>
        </IconButton>
        <Typography padding={2} variant="h5">Edit Recipe</Typography>
        <Box display="flex" justifyContent="center" padding={2} flexDirection="column" alignItems="center" sx={{width:"70%"}}>
            <Card variant="outlined" sx={{width:"70%", height:"600px", overflowY: "scroll"}}>
                <Grid container spacing={2} display="flex" justifyContent="center" padding={4}>
                    {recipeSteps.map((value, key) => {return(
                        <Grid item xs={12} key={key}>
                            <Card sx={{width:"100%"}} padding={4} variant="outlined">
                                <CardContent>
                                    <Typography padding={1}>Step {key + 1}</Typography>
                                    <Box display="flex" justifyContent="space-between">
                                        <TextField
                                            value={recipeSteps[key]}
                                            error={recipeSteps[key].length === 0}
                                            inputProps= {{maxLength: 255}}
                                            helperText={(recipeSteps[key].length === 0) ? "Cannot be blank" : ""}
                                            sx={{width:"90%"}}
                                            onChange={(e) => handleChange(e, key)}/>
                                            
                                        <Box display="flex">
                                            <IconButton onClick={() => handleDelete(key)}>
                                                <DeleteIcon/>
                                            </IconButton>
                                        </Box>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>
                    )})}
                </Grid>
                <Box display="flex" justifyContent="center" padding={1}>
                    <IconButton onClick={handleAdd}>
                        <AddIcon/>
                    </IconButton>
                </Box>
            </Card>
        </Box>
        <Box sx={{width:"25%"}}>
            <Box padding={1}>
                <Button
                    fullWidth
                    variant="contained"
                    onClick={handleDone}
                    disabled={recipeSteps.length <= 0 || isEmpty}
                >
                    Update
                </Button>
            </Box>
        </Box>
    </Box>
    )
}

export default EditRecipeSteps;