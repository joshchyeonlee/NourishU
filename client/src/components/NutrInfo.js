import { Box, Typography } from "@mui/material";
const NutrInfo = (props) => {
    return(
    <Box display="flex" flexDirection="column">
        <Box display="flex" flexDirection="row" justifyContent="space-between">
            <Typography>Calories</Typography>
            <Typography>{(!props.info) ? 0 : props.info.totalCalories}</Typography>
        </Box>
        <Box display="flex" flexDirection="row" justifyContent="space-between">
            <Typography>Protein</Typography>
            <Typography>{(!props.info) ? 0 : props.info.totalProtein}</Typography>
        </Box>
        <Box display="flex" flexDirection="row" justifyContent="space-between">
            <Typography>Carbohydrates</Typography>
            <Typography>{(!props.info) ? 0 : props.info.totalCarbohydrates}</Typography>
        </Box>
        <Box display="flex" flexDirection="row" justifyContent="space-between">
            <Typography>Fats</Typography>
            <Typography>{(!props.info) ? 0 : (props.info.totalSaturatedFats + props.info.totalUnsaturatedFats).toFixed(2)}</Typography>
        </Box>
        <Box paddingLeft={1} display="flex" flexDirection="column">
            <Box display="flex" flexDirection="row" justifyContent="space-between">
                <Typography variant="caption">Saturated Fats</Typography>
                <Typography variant="caption">{(!props.info) ? 0 : props.info.totalSaturatedFats}</Typography>
            </Box>
            <Box display="flex" flexDirection="row" justifyContent="space-between">
                <Typography variant="caption">Unsaturated Fats</Typography>
                <Typography variant="caption">{(!props.info) ? 0 : props.info.totalUnsaturatedFats}</Typography>
            </Box>
        </Box>
    </Box>
    )
}

export default NutrInfo;