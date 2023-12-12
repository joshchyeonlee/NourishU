import { Typography, Box, Button } from "@mui/material"
import { Link } from "react-router-dom"

const YourRecipesList = (props) => {
    return(
        <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" sx={{ width: "100%" }}>
            <Typography variant={props.title} padding={2}>{(props.isSelf) ? "Your Recipes" : "Recipes"}</Typography>
            {props.recipes.length === 0 ?
            <Box sx={{height:"100%"}} alignItems="center" padding={2}>
                <Typography>
                { props.isSelf ? "You haven't created any recipes yet!" : "No recipes to display" }
                </Typography>
            </Box>
            :
            <Box display="flex" sx={{ width: "90%" }} justifyContent="center" flexDirection="column">
                {props.recipes.map((val, key) => { return(
                    <Box key={key} sx={{ width: "100%" }} display="flex" justifyContent="space-between" flexDirection="row" alignItems="center">
                        <Typography>
                            {val.RecipeTitle}
                        </Typography>
                        <Box display="flex" padding={1}>
                            <Box padding={1}>
                                <Button
                                    component={Link}
                                    to={{pathname: "/viewRecipe"}}
                                    state={{prev: {from: props.from}, recipeID: val.RecipeID, from: props.from}}
                                >
                                    View
                                </Button>
                            </Box>
                            <Box padding={1}>
                            { props.isSelf ?
                                <Button
                                component={Link}
                                to={{pathname: "/editRecipe"}}
                                state={{from: props.from, recipeID: val.RecipeID}}
                                >Edit</Button>
                                :<></>
                            }
                            </Box>
                        </Box>
                    </Box>
                )})}
            </Box>
            }
        </Box>
    )
}

export default YourRecipesList;