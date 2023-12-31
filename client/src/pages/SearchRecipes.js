import { Box, IconButton, InputBase, Typography, Button, Paper, Rating } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, Link, useNavigate } from "react-router-dom";
import AddFoodModal from "../components/AddFoodModal";
import { formatString } from "../utils/inputCheck";

const SearchRecipes = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [prevPageData, setPrevPageData] = useState(location.state)
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [search, setSearch] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [addRecipe, setAddRecipe] = useState();
    const [addRecipeTitle, setAddRecipeTitle] = useState("");

    const searchRecipes = async () => {
        const searchQuery = {
            Search: formatString(search, 255),
        }
        try{
            const res = await axios.post("http://localhost:3001/searchRecipes", searchQuery);
            setSearchResults(res.data);
        } catch(err){
            navigate("/not-found");
        }
    }

    const handleSearchBar = (val) => {
        setSearch(val);
    }

    const handleSearch = () => {
        if(search === ""){
            setSearchResults([]);
            return;
        }
        searchRecipes();
    }

    const setColor = (val) => {
        if(val === 1) return {color:"blue"};
        if(val === 2) return {color:"green"};
        if(val === 3) return {color:"yellow"};
        if(val === 4) return {color:"orange"};
        if(val === 5) return {color:"red"};
    }

    const handleAddFoodModal = (recipe) => {
        setAddRecipe(recipe)
        setAddRecipeTitle(recipe.RecipeTitle);
        setIsAddModalOpen(true);
    }

    return(
        <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column">
            <AddFoodModal open={isAddModalOpen} setOpen={setIsAddModalOpen} recipe={addRecipe} recipeTitle={addRecipeTitle} meal={prevPageData.meal}/>
            {prevPageData.from !== "/logMeal" ?
            <IconButton sx={{position: "absolute", top:10, left: 10}}
                component={Link}
                to={{pathname: prevPageData.from}}
                state={prevPageData}>
                <ArrowBackIcon fontSize="large"/>
            </IconButton> : <></>}
            <Box display="flex" justifyContent="center" padding={4}>
                <Typography variant="h5">{prevPageData.from === "/editMeal" ? "Add Food" :"Search Recipes"}</Typography>
            </Box>
            <Box display="flex" justifyContent="center" padding={2} sx={{width:"100%"}}>
                <Paper variant="outlined" square={false} sx={{ width:1/2 }}>
                    <IconButton disabled>
                        <SearchIcon/>
                    </IconButton>
                    <InputBase
                        inputProps={{maxLength: 255}}
                        placeholder="search recipes"
                        sx={{ width:"80%" }}
                        onChange={(event) => handleSearchBar(event.target.value)}
                    />
                    <Button onClick={() => handleSearch()}>
                        Search
                    </Button>
                </Paper>
            </Box>
            {searchResults.length === 0 ?
            <Box display="flex" justifyContent="center" flexDirection="column" alignItems="center" padding={4}>
                <Typography>No results</Typography>
            </Box>
            :
            <Box display="flex"
                flexDirection="column"
                alignItems="center"
                padding={2}
                sx={{ width:1/2, height:"450px", overflowY:"auto", overflowX:"visible"}}>
                {searchResults.map((value, key) => {
                    return(
                        <Box key={key} display="flex" justifyContent="space-between" padding={1} sx={{ width:"100%" }}>
                            <Box>
                                <Typography variant="h6">{value.RecipeTitle}</Typography>
                                <Box display="flex" flexDirection="row">
                                <Typography>Difficulty: </Typography>
                                <Rating
                                    value={value.RDifficulty}
                                    icon={<LocalDiningIcon sx={setColor(value.RDifficulty)}/>}
                                    emptyIcon={<LocalDiningIcon/>}
                                    readOnly
                                    ></Rating>
                                </Box>
                                <Typography>{value.RecipeDescription}</Typography>
                            </Box>
                            <Box>
                                <Box>
                                    <Button component={Link}
                                    to={{pathname:"/viewRecipe"}}
                                    state={{prev: prevPageData, recipeID: value.RecipeID, from:"/searchRecipes"}}>View</Button>
                                </Box>
                                {(!prevPageData.meal) ? (
                                    <div/>
                                ) : (<Box>
                                    <Button onClick={() => {handleAddFoodModal(value)}}>Add</Button>
                                    </Box>)
                                }
                            </Box>
                        </Box>
                    )
                })}
            </Box>
            }   
            <Box position="absolute" bottom={50} width="50%" left="50%" marginLeft="-160px" display="flex" flexDirection="column">
                <Box padding={1}>
                    <Button variant="contained" sx={{ width:"320px" }}
                            component={Link}
                            to={{ pathname: "/createRecipe"}}
                            state={{prev: prevPageData, from: "/searchRecipes"}}>
                        Create Recipe
                    </Button>
                </Box>
                <Box padding={1}>
                    <Button variant="contained" sx={{ width:"320px" }}
                            component={Link}
                            to={{pathname: (prevPageData.from === "/logMeal") ? "/dashboard" : prevPageData.from}}
                            state={prevPageData}>
                        Done
                    </Button>
                </Box>
            </Box>
        </Box>
    )
}

export default SearchRecipes;