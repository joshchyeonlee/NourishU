import { Box, Typography, IconButton, Rating, Card, CardContent, TextField, Divider, Button } from "@mui/material";
import { useState, useEffect } from "react";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import FavoriteIcon from '@mui/icons-material/Favorite';
import axios from "axios";

const ViewRecipe = () => {
    //change this value based on information from previous page
    const [recipeID, setRecipeID] = useState(1);
    const [recipeIngredients, setRecipeIngredients] = useState([]);
    const [vitamins, setVitamins] = useState([]);
    const [recipeTitle, setRecipeTitle] = useState("");
    const [recipeDifficulty, setRecipeDifficulty] = useState(0);
    const [recipeDescription, setRecipeDescription] = useState("");
    const [reviews, setReviews] = useState([]);
    const [ratingDifficulty, setRatingDifficulty] = useState(0);
    const [hover, setHover] = useState(-1);

    const fetchRecipe = async () => {
        const rID = {
            RecipeID: recipeID,
        }

        try{
            const res = await axios.post("http://localhost:3001/getRecipeIngredients", rID);
            setRecipeIngredients(res.data);
            console.log(res.data);
            setRecipeDifficulty(res.data[0].RDifficulty);
            setRecipeTitle(res.data[0].RecipeTitle);
            setRecipeDescription(res.data[0].RecipeDescription);
        } catch (err) {
            throw (err);
        }
    }

    const fetchVitamins = async () => {
        const rID = {
            RecipeID: recipeID,
        }
        try{
            const res = await axios.post("http://localhost:3001/getRecipeVitamins", rID);
            setVitamins(res.data);
        } catch (err) {
            throw(err);
        }
    }

    const fetchReviews = async () => {
        const rID = {
            RecipeID: recipeID,
        }
        try{
            const res = await axios.post("http://localhost:3001/getRecipeReviews", rID);
            setReviews(res.data);
        } catch (err) {
            throw(err);
        }
    }

    //reuse rating component from previous pr
    const setColor = (rating) => {
        if(rating === 1) return {color: "blue"};
        if(rating === 2) return {color: "green"};
        if(rating === 3) return {color: "yellow"};
        if(rating === 4) return {color: "orange"};
        if(rating === 5) return {color: "red"};
    }

    const setRatingColor = () => {
        if(hover !== -1){
            if(hover === 1) return {color: "blue"};
            if(hover === 2) return {color: "green"};
            if(hover === 3) return {color: "yellow"};
            if(hover === 4) return {color: "orange"};
            if(hover === 5) return {color: "red"};
        } else {
            if(ratingDifficulty === 1) return {color: "blue"};
            if(ratingDifficulty === 2) return {color: "green"};
            if(ratingDifficulty === 3) return {color: "yellow"};
            if(ratingDifficulty === 4) return {color: "orange"};
            if(ratingDifficulty === 5) return {color: "red"};
        }
    }

    //remove useEffect if passing in recipe information from previous page
    useEffect(() => {
        fetchRecipe();
        fetchVitamins();
        fetchReviews();
    },[]);

    return(
        <div>
            <IconButton sx={{position: "absolute", top:10, left: 10}}>
                <ArrowBackIcon fontSize="large"/>
            </IconButton>
            <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column" paddingTop={3}>
                <Typography paddingTop={4} variant="h5">{recipeTitle}</Typography>
                <Typography padding={1} variant="caption">{recipeDescription}</Typography>
                <Box display="flex" justifyContent="space-between" paddingTop={3} sx={{width:"30%"}}>
                    <Typography>Difficulty</Typography>
                    <Rating
                        value={recipeDifficulty}
                        icon={<LocalDiningIcon sx={setColor(recipeDifficulty)}/>}
                        emptyIcon={<LocalDiningIcon/>}
                        readOnly
                    />
                </Box>
            </Box>
            <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" padding={4}>
                <Box padding={1} sx={{width:"50%"}} display="flex" justifyContent="center" flexDirection="column" alignItems="center">
                    <Card variant="outlined" sx={{width:"100%"}}>
                        <CardContent>
                            <Typography variant="h6">Nutritional Info:</Typography>
                        </CardContent>
                    </Card>
                </Box>
                <Box padding={1} sx={{width:"50%"}} display="flex" justifyContent="center" flexDirection="column" alignItems="center">
                    <Card variant="outlined" sx={{width:"100%"}}>
                        <CardContent>
                            <Typography variant="h6">Ingredients:</Typography>
                            <Box padding={1}>
                                {recipeIngredients.map((value, key) => {
                                    return(
                                        <Box key={key}>
                                            <Typography>{value.IngredientName}</Typography>
                                        </Box>
                                    )
                                })}
                            </Box>
                        </CardContent>
                    </Card>
                </Box>
                <Box padding={1} sx={{width:"50%"}} display="flex" justifyContent="center" flexDirection="column" alignItems="center">
                    <Card variant="outlined" sx={{width:"100%"}}>
                        <CardContent>
                            <Typography variant="h6">Steps:</Typography>
                        </CardContent>
                    </Card>
                </Box>
                <Box padding={1} sx={{width:"50%"}} display="flex" justifyContent="center" flexDirection="column" alignItems="center">
                    <Card variant="outlined" sx={{width:"100%"}}>
                        <CardContent>
                            <Typography variant="h6">Reviews:</Typography>
                            {reviews.map((value, key) => {
                                return(<Box key={key} padding={2}>
                                    <Box display="flex" justifyContent="space-between">
                                        <Typography>{value.UserName}</Typography>
                                        <Rating
                                            value={value.Rdifficulty}
                                            icon={<FavoriteIcon sx={setColor(value.Rdifficulty)}/>}
                                            emptyIcon={<FavoriteIcon/>}
                                            readOnly
                                        />
                                    </Box>
                                    <Box>
                                        <Typography>{value.RComment}</Typography>
                                    </Box>
                                </Box>)
                            })}
                            <Divider/>
                            <Box padding={2}>
                                <Typography>Write a Review:</Typography>
                                <Box display="flex" padding={1} flexDirection="column">
                                    <Box display="flex" justifyContent="space-between" paddingBottom={1}>
                                        <Typography>Rating </Typography>
                                        <Rating
                                            value={ratingDifficulty}
                                            icon={<FavoriteIcon sx={setRatingColor()}/>}
                                            emptyIcon={<FavoriteIcon/>}
                                            onChange={(event) => setRatingDifficulty(parseInt(event.target.value))}
                                            onChangeActive={(event, newHover) => setHover(newHover)}
                                        />
                                    </Box>
                                    <TextField
                                        sx={{width:"100%"}}
                                        multiline
                                        rows={4}
                                        />
                                    <Box paddingTop={1} display="flex" justifyContent="flex-end">
                                        <Button variant="contained">Add Review</Button>
                                    </Box>
                                </Box>
                            </Box>
                        </CardContent>
                    </Card>
                </Box>
            </Box>
        </div>
)
}

export default ViewRecipe;