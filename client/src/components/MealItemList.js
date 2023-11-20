import { Box, Typography, Button } from "@mui/material";

const MealItemList = (props) => {
    return(
        <Box display="flex" justifyContent="space-between" alignItems="center">
            <Box>
                <Typography>{props.mealName}</Typography>
            </Box>
            <Box display="flex">
                <Button>View</Button>
                <Button>Remove</Button>
            </Box>
        </Box>
    )
}

export default MealItemList;