import { Typography, Box, Button, TextField, Container, MenuItem, Select, IconButton } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {  useState, useEffect } from "react";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import axios from "axios";

const CreateIngredient = () => {
    const[ingredientName, setIngredientName] = useState("");
    const[carbs, setCarbs] = useState("");
    const[protein, setProtein] = useState("");
    const[saturatedFats, setSaturatedFats] = useState("");
    const [isPerServing, setIsPerServing] = useState(-1);
    const[unsaturatedFats, setUnsaturatedFats] = useState("");
    const[calories, setCalories] = useState("");
    const[adminID, setAdminID] = useState(0);
    const[ingredientID, setIngredientID] = useState(-1);
    const [titleErr, setTitleErr] = useState(false);
    const [carbErr, setCarbErr] = useState(false);
    const [proteinErr, setProteinErr] = useState(false);
    const [satFatErr, setSatFatErr] = useState(false);
    const [unSatFatErr, setUnSatFatErr] = useState(false);
    const [calErr, setCalErr] = useState(false);
    const [vitaminName, setVitaminName] = useState("");

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
        const res = await axios.post("http://localhost:3001/getVitamin", vitamin);
        setVitaminName(res.data);
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

        if (!isValid) return;

        insertIngredient();
    }

    useEffect(() => {
        if(ingredientID === -1) return; //change that 0 to whatever you initially set the ingredientID to when you use const [ingredientID, setIngredientID] = useState(< use this value>)
        insertVitamin()
    }, [ingredientID])

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
                <Box display="flex" justifyContent="center" flexDirection="row">
                    <TextField label="Ingredient Name" variant="outlined" sx={{ maxWidth: 500 }} error={titleErr}
                        inputProps={ {maxLength: 50 } }
                        helperText={titleErr ? "Ingredient Name must be provided" : "" } 
                        onChange={(event) => {setIngredientName(event.target.value)}}/>
                    <Select
                        defaultValue={1}
                        onChange={(event) => {setIsPerServing(event.target.value)}}
                        fullWidth
                        sx={{ maxWidth: 200 }}>
                        <MenuItem value={1}>per serving</MenuItem>
                        <MenuItem value={0}>per 100 grams</MenuItem>
                    </Select>
                </Box>
                <Box display="flex" justifyContent="center" sx={{ marginTop: 2 }}>
                    <TextField label="Carbs(g)" variant="outlined" type="number"
                        inputProps={ {maxLength: 2 } }
                        error={carbErr}
                        helperText={carbErr ? "Amount of Carbs must be provided" : ""}
                        onChange={(event) => {setCarbs(event.target.value)}}
                        />
                </Box>
                <Box display="flex" justifyContent="center" sx={{ marginTop: 2 }}>
                    <TextField label="Protein(g)" variant="outlined" type="number"
                    inputProps={ {maxLength: 2 } }
                    error={proteinErr}
                    helperText={proteinErr ? "Amount of Protein must be provided" : ""}
                    onChange={(event) => {setProtein(event.target.value)}} />
                </Box>
                <Box display="flex" justifyContent="center" sx={{ marginTop: 2 }}>
                    <TextField label="Saturated Fats(%)" variant="outlined" type="number"
                    inputProps={ {maxLength: 2 } }
                    error={satFatErr}
                    helperText={satFatErr ? "Amount of Saturated Fats must be provided" : ""}
                    onChange={(event) => {setSaturatedFats(event.target.value)}}/>
                </Box>
                <Box display="flex" justifyContent="center" sx={{ marginTop: 2 }}>
                    <TextField label="Unsaturated Fats(%)" variant="outlined" type="number"
                    inputProps={ {maxLength: 2 } }
                    error={unSatFatErr}
                    helperText={unSatFatErr ? "Amount of Unsaturated Fats must be provided" : ""}
                    onChange={(event) => {setUnsaturatedFats(event.target.value)}}/>
                </Box>
                <Box display="flex" justifyContent="center" sx={{ marginTop: 2 }}>
                    <TextField label="Calories" variant="outlined" type="number"
                    inputProps={ {maxLength: 2 } }
                    error={calErr}
                    helperText={calErr ? "Amount of Calories must be provided" : ""}
                    onChange={(event) => {setCalories(event.target.value)}}/>
                </Box>
                <Box display="flex" justifyContent="center" sx={{ marginTop: 2 }}>
                    <Select
                        defaultValue={"Vitamin A"}
                        onChange={(event) => { setVitaminName(event.target.value) }}
                        fullWidth
                        sx={{ maxWidth: 200 }}
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
                </Box>
                <Box display="flex" justifyContent="center" sx={{ marginTop: 2 }}>
                    <Button variant="contained" onClick={handleCreate}>Create</Button>
                </Box>
            </Box>
        </Container>
    );
}

export default CreateIngredient;