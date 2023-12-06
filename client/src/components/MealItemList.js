import { Box, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

const MealItemList = (props) => {
    return(
        <Box display="flex" justifyContent="space-between" alignItems="center">
            <Box>
                <Typography>{props.meal.MealTitle}</Typography>
            </Box>
            <Box display="flex">
                <Button component={Link} to={{pathname:"/viewMeal"}} state={{meal:props.meal}}>View</Button>
                <Button onClick={() => props.handleRemove(props.i)}>Remove</Button>
            </Box>
        </Box>
    )
}

export default MealItemList;