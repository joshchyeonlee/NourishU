import { Typography, Button, Box, Stack } from "@mui/material";

const Recipes = () => {
    return (
        <Stack
            display="flex"
            alignItems="center"
            justifyContent="center"
            padding={4}
            spacing={{ xs: 1, sm: 2, md: 4 }}
            >
            <Typography variant="h4" padding={2}>Recipes</Typography>
            <Button variant="contained">Search Recipes</Button>
            <Button variant="contained">View Saved Recipes</Button>
            <Button variant="contained">View Your Recipes</Button>
        </Stack>
    )
}

export default Recipes;