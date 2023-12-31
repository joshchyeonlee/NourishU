import { Typography, Box, Button, TextField, Container, MenuItem, Select, IconButton, Autocomplete, FormControl, InputLabel, Snackbar, Alert } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useState, useEffect } from "react";
import { useAuthUser } from "react-auth-kit";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import axios from "axios";


const CreateIngredient = () => {
    const auth = useAuthUser();
    const[adminID, setAdminID] = useState(auth().values.userID);
    const[ingredientName, setIngredientName] = useState("");
    const[carbs, setCarbs] = useState("");
    const[protein, setProtein] = useState("");
    const[saturatedFats, setSaturatedFats] = useState("");
    const[isPerServing, setIsPerServing] = useState(0);
    const[servingVal, setServingVal] = useState("");
    const[servingValErr, setServingValErr] = useState("");
    const[unsaturatedFats, setUnsaturatedFats] = useState("");
    const[calories, setCalories] = useState("");
    const[ingredientID, setIngredientID] = useState(-1);
    const[open, setOpen] = useState(false);
    const[vitaminName, setVitaminName] = useState("");
    const[titleErr, setTitleErr] = useState(false);
    const[carbErr, setCarbErr] = useState(false);
    const[proteinErr, setProteinErr] = useState(false);
    const[satFatErr, setSatFatErr] = useState(false);
    const[unSatFatErr, setUnSatFatErr] = useState(false);
    const[calErr, setCalErr] = useState(false);

    const insertIngredient = async () => {
        const ingredient = {
            IngredientName: ingredientName,
            Carbs: carbs,
            Protein: protein,
            SaturatedFats: saturatedFats,
            UnsaturatedFats: unsaturatedFats,
            IsPerServing: isPerServing,
            Calories: calories,
            AdminID: adminID,
            DatePosted: dayjs().format("YYYY-MM-DD")
        }
        const res = await axios.post("http://localhost:3001/createIngredient", ingredient);
        setIngredientID(res.data.insertId);
    }

    const insertVitamin = async () => {
        const vitamin = {
            IngredientID: ingredientID,
            VitaminName: vitaminName
        }
        await axios.post("http://localhost:3001/getVitamin", vitamin);
        (isPerServing === 0) ? await handleGrams() : await handleServing();
    }

    const handleCreate = () => {
        var isValid = true;
        if(ingredientName.length === 0) {
            setTitleErr(true);
            isValid = false;
        } else setTitleErr(false);

        if (carbs.length === 0) {
            setCarbErr(true);
            isValid = false;
        } else setCarbErr(false);

        if (protein.length === 0) {
            setProteinErr(true);
            isValid = false;
        } else setProteinErr(false);

        if (saturatedFats.length === 0) {
            setSatFatErr(true);
            isValid = false;
        } else setSatFatErr(false);

        if (unsaturatedFats.length === 0) {
            setUnSatFatErr(true);
            isValid = false;
        } else setUnSatFatErr(false);

        if (isPerServing !== 0 && isPerServing !== 1) {
            setIsPerServing(1)
            isValid = false;
        } else setIsPerServing(0);

        if(calories.length === 0) {
            setCalErr(true);
            isValid = false;
        } else setCalErr(false);

        
        if(servingVal.length === 0) {
            setServingValErr(true);
            isValid = false;
        } else setCalErr(false);

        if (!isValid) return;

        insertIngredient();
        setOpen(true);
        
    }
    
    const clearValues = () => {
        setIngredientName("")
        setServingVal("")
        setCarbs("")
        setProtein("")
        setSaturatedFats("")
        setUnsaturatedFats("")
        setCalories("")
    }

    const capVal = (val) => {
        if(val.length > 3) return val.substring(0,3);
        return val;
    }

    const handleGrams = async () => {
        const obj = {
            IngredientID: ingredientID,
            ServingSize: servingVal
        }
        try{
            await axios.post("http://localhost:3001/setIngredientPer100g", obj);
        } catch (err){
            throw(err);
        }
    }

    const handleServing = async () => {
        const obj = {
            IngredientID: ingredientID,
            Weight: servingVal
        }
        try{
            await axios.post("http://localhost:3001/setIngredientPerServing", obj);
        } catch (err){
            throw(err);
        }
    }

    useEffect(() => {
        const insertVals = async () => {
            await insertVitamin();
            clearValues();
        }

        if(ingredientID === -1) return;
        else insertVals();
        
    }, [ingredientID])

    const handleSnackbarClose = () => {
        setOpen(false);
    }

    return (
        <Container>
            <Box display="flex" justifyContent="center" padding={2} flexDirection="column" alignItems="center">
                <IconButton sx={{position: "absolute", top:10, left: 10}}
                    component={Link} to={{pathname:"/admin"}}>
                    <ArrowBackIcon fontSize="large"/>
                </IconButton>
                <Box display="flex" justifyContent="center" sx={{ marginTop: 2 }}>
                    <Typography variant="h4" component="div" gutterBottom>
                        Create Ingredient
                    </Typography>
                </Box>
                <Box display="flex" justifyContent="center" flexDirection="column" padding={2} sx={{ width:"60%" }}>
                    <Box display="flex" justifyContent="space-between" flexDirection="row" padding={1}>
                        <TextField label="Ingredient Name" variant="outlined" error={titleErr}
                            inputProps={ {maxLength: 50 } }
                            sx={{ width:"70%" }}
                            value={ingredientName}
                            helperText={titleErr ? "Ingredient Name must be provided" : "" } 
                            onChange={(event) => {setIngredientName(event.target.value)}}/>
                        <Select
                            defaultValue={1}
                            value={isPerServing}
                            onChange={(event) => {setIsPerServing(event.target.value)}}
                            sx={{ width:"25%" }}>
                            <MenuItem value={1}>per serving</MenuItem>
                            <MenuItem value={0}>per 100 grams</MenuItem>
                        </Select>
                    </Box>
                    <Box display="flex" justifyContent="center" flexDirection="row" padding={1}>
                        <TextField
                            error={servingValErr}
                            helperText={servingValErr ? ((isPerServing === 0) ? "Serving Size must be provided" : "g Per Serving must be provided") : "" } 
                            fullWidth
                            type="number"
                            value={servingVal}
                            onChange={(e) => setServingVal(e.target.value)}
                            label={(isPerServing === 0) ? "Serving Size" : "g Per Serving"}
                        />

                    </Box>
                    <Box display="flex" justifyContent="center" padding={1}>
                        <TextField label="Carbs(g)" variant="outlined" type="number"
                            fullWidth
                            error={carbErr}
                            helperText={carbErr ? "Amount of Carbs must be provided" : ""}
                            value={carbs}
                            onChange={(event) => {setCarbs(capVal(event.target.value))}}
                        />
                    </Box>
                    <Box display="flex" justifyContent="center" padding={1}>
                        <TextField label="Protein(g)" variant="outlined" type="number"
                            fullWidth
                            error={proteinErr}
                            helperText={proteinErr ? "Amount of Protein must be provided" : ""}
                            value={protein}
                            onChange={(event) => {setProtein(capVal(event.target.value))}} />
                    </Box>
                    <Box display="flex" justifyContent="center" padding={1}>
                        <TextField label="Saturated Fats(%)" variant="outlined" type="number"
                            fullWidth
                            error={satFatErr}
                            helperText={satFatErr ? "Amount of Saturated Fats must be provided" : ""}
                            value={saturatedFats}
                            onChange={(event) => {setSaturatedFats(capVal(event.target.value))}}/>
                    </Box>
                    <Box display="flex" justifyContent="center" padding={1}>
                        <TextField label="Unsaturated Fats(%)" variant="outlined" type="number"
                            fullWidth
                            error={unSatFatErr}
                            helperText={unSatFatErr ? "Amount of Unsaturated Fats must be provided" : ""}
                            value={unsaturatedFats}
                            onChange={(event) => {setUnsaturatedFats(capVal(event.target.value))}}/>
                    </Box>
                    <Box display="flex" justifyContent="center" padding={1}>
                        <TextField label="Calories" variant="outlined" type="number"
                            fullWidth
                            error={calErr}
                            helperText={calErr ? "Amount of Calories must be provided" : ""}
                            value={calories}
                            onChange={(event) => {setCalories(capVal(event.target.value))}}/>
                    </Box>
                    <Box display="flex" justifyContent="center" padding={1}>
                    <FormControl fullWidth>
                        <InputLabel>Vitmains</InputLabel>
                        <Select
                            defaultValue={"Vitamin A"}
                            onChange={(event) => { setVitaminName(event.target.value) }}
                            value={vitaminName}
                            fullWidth
                        >
                            <MenuItem value={"Vitamin A"}>Vitamin A</MenuItem>
                            <MenuItem value={"Vitamin C"}>Vitamin C</MenuItem>
                            <MenuItem value={"Vitamin D"}>Vitamin D</MenuItem>
                            <MenuItem value={"Vitamin E"}>Vitamin E</MenuItem>
                            <MenuItem value={"Vitamin K"}>Vitamin K</MenuItem>
                            <MenuItem value={"Vitamin B1"}>Vitamin B1</MenuItem>
                            <MenuItem value={"Vitamin B2"}>Vitamin B2</MenuItem>
                            <MenuItem value={"Vitamin B6"}>Vitamin B6</MenuItem>
                            <MenuItem value={"Vitamin B12"}>Vitamin B12</MenuItem>
                        </Select>
                    </FormControl>
                    </Box>
                    <Box display="flex" justifyContent="center" padding={1}>
                        <Button variant="contained" onClick={handleCreate}>Create</Button>
                    </Box>
                </Box>
                <Box display="flex" justifyContent="center" sx={{ marginTop: 2 }}>
                    <Snackbar open={open} autoHideDuration={1500} onClose={handleSnackbarClose}>
                        <Alert severity="success">You have successfully created an ingredient!</Alert>
                    </Snackbar>
                </Box>
            </Box>
        </Container>
    );
}

export default CreateIngredient;