import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Box, IconButton, TextField, Typography, Button, Card, CardContent, Grid, Snackbar } from "@mui/material";
import { useAuthUser } from 'react-auth-kit'
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import dayjs from "dayjs";
import { formatString } from "../utils/inputCheck";

const SetRecipeInstructions = () => {
    const auth = useAuthUser();
    const [userId, setUserId] = useState(auth().values.userID);
    const location = useLocation();
    const navigate = useNavigate();
    const [recipeID, setRecipeID] = useState(location.state.recipeID);
    const [instructions, setInstructions] = useState([]);
    const [isAchievementOpen, setIsAchievementOpen] = useState();
    const [valid, setValid] = useState(false);
    
    const insertInstruction = async () => {
        for(var i = 0; i < instructions.length; i++){
            const recipeStep = {
                RecipeID: recipeID,
                StepNo: i + 1,
                StepDescription: instructions[i].instructions,
            }
            
            try{
                await axios.post("http://localhost:3001/setRecipeInstruction", recipeStep)
            } catch (err) {
                navigate("/not-found");
            }
        }
    }

    const handleContinue = () => {
        insertInstruction();
        checkIfFirstRecipe();
    }

    const handleAdd = () => {
        const newInstructions = [...instructions];
        const instr = {
            instructions: "",
        }
        newInstructions.push(instr);
        setInstructions(newInstructions);
    }

    const handleChange = (e, i) => {
        const { value, instruction } = e.target;
        const newState = [...instructions];
        newState[i] = {
            ...newState[i],
            instructions: formatString(value, 255)
        };

        setInstructions(newState);
    }

    const handleDelete = (i) => {
        const newInstr = [...instructions];
        newInstr.splice(i, 1);
        setInstructions(newInstr);
    }

    const handleAchievementClose = (event, reason) => {
        if(reason === 'clickaway') return;
        setIsAchievementOpen(false);
    }

    const checkIfFirstRecipe = async () => {
        const UserID = {
            UserID: userId,
        }
        try{
            const res = await axios.post("http://localhost:3001/isFirstRecipe", UserID);
            if(res.data === true){
                setIsAchievementOpen(true);
                assignAchievement();
            }
            else setIsAchievementOpen(false);
        } catch (err) {
            throw(err)
        }
    }

    const assignAchievement = async () => {
        const UID = {
            UserID: userId,
            Time: dayjs().format("YYYY-MM-DD hh:mm:ss"),
        }
        try{
            const res = await axios.post("http://localhost:3001/assignFirstRecipeAchievement", UID);
        } catch (err) {
            throw (err)
        }
    }

    useEffect(() => {
        if(isAchievementOpen === false){
            const redirect = location.state.prev.prev.prev;
            navigate(redirect.from, {state: {meal: redirect.meal, recipes: redirect.recipes}})
        }
    },[isAchievementOpen])

    useEffect(() => {
        var check = true;
        for(var i = 0; i < instructions.length; i++) {
            check &= instructions[i].instructions.length > 0;
        }
        setValid(check && instructions.length > 0);
    }, [instructions])

    //need to set limits on text fields and put in db
    return (
        <div>
        <Snackbar open={isAchievementOpen} autoHideDuration={1500} onClose={handleAchievementClose} message="Achievement Unlocked! First Recipe Created"/>
        <Box display="flex" justifyContent="center" padding={2} flexDirection="column" alignItems="center">
            <Box display="flex" justifyContent="center" padding={2}>
                <Typography variant="h5">Add Instructions</Typography>
            </Box>
            <Card variant="outlined" sx={{width:"70%", height:"600px", overflowY: "scroll"}}>
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
                <Button variant="contained" disabled={!valid} onClick={handleContinue}>Done</Button>
            </Box>
        </Box>
    </div>
    )
}

export default SetRecipeInstructions;