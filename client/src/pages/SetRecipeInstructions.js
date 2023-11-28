import { useState } from "react";
import { useLocation } from "react-router-dom";
import { Box, IconButton, TextField, Typography, Button, Card, CardContent, CardActionArea, Grid } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import MenuIcon from '@mui/icons-material/Menu';
import DeleteIcon from '@mui/icons-material/Delete';

const SetRecipeInstructions = () => {
    const location = useLocation();
    const [recipeID, setRecipeID] = useState(location.state.recipeID);
    const [instructions, setInstructions] = useState([]);
    

    const handleContinue = () => {
        console.log("done!");
    }

    const handleAdd = () => {
        const newInstructions = [...instructions];
        const instr = {
            instructions: "",
        }
        newInstructions.push(instr);
        setInstructions(newInstructions);
        console.log("hello?")
        console.log(newInstructions);
    }

    const handleChange = (e, i) => {
        const { value, instruction } = e.target;
        const newState = [...instructions];

        newState[i] = {
            ...newState[i],
            instructions: value
        };

        setInstructions(newState);
        console.log(newState);
    }

    const handleDelete = (i) => {
        const newInstr = [...instructions];
        newInstr.splice(i, 1);
        setInstructions(newInstr);
    }

    return (
    <Box display="flex" justifyContent="center" padding={2} flexDirection="column" alignItems="center">
        <Box display="flex" justifyContent="center" padding={2}>
            <Typography variant="h5">Add Instructions</Typography>
        </Box>
        <Card variant="outlined" sx={{width:"70%", height:"600px"}}>
            <Grid container spacing={2} display="flex" justifyContent="center" padding={4}>
                {instructions.map((value, key) => {return(
                    <Grid item xs={12} key={key}>
                        <Card sx={{width:"100%"}} padding={4} variant="outlined">
                            <CardContent>
                                <Typography padding={1}>Step {key + 1}</Typography>
                                <Box display="flex" justifyContent="space-between">
                                    <TextField
                                        error={instructions[key].instructions.length === 0}
                                        helperText={(instructions[key].instructions.length === 0) ? "Cannot be blank" : ""}
                                        sx={{width:"90%"}}
                                        onChange={(e) => handleChange(e, key)}/>
                                    <Box display="flex">
                                        <IconButton>
                                            <MenuIcon/>
                                        </IconButton>
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
        <Box position="absolute" bottom={30}>
            <Button variant="contained" onClick={handleContinue}>Done</Button>
        </Box>
    </Box>
    )
}

export default SetRecipeInstructions;