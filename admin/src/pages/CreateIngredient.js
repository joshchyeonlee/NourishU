import { Typography, Box, Button, TextField, Container, MenuItem, Select, Grid } from "@mui/material";

const CreateIngredient = () => {
    return (
        <Container>
            <Box display="flex" justifyContent="center" sx={{ marginTop: 2 }}>
                <Typography variant="h4" component="div" gutterBottom>
                    Create Ingredient
                </Typography>
            </Box>
            <Box display="flex" justifyContent="center" flexDirection="row">
                <TextField label="Ingredient Name" variant="outlined" />
                <Select
                    value={1}
                    // onChange={handleChange}
                    fullWidth
                    sx={{ maxWidth: 150 }}
                >
                    <MenuItem value="">
                    </MenuItem>
                    <MenuItem >per serving</MenuItem>
                    <MenuItem value={20}>per 100 grams</MenuItem>
                </Select>
            </Box>
            <Box display="flex" justifyContent="center" sx={{ marginTop: 2 }}>
                <TextField label="Carbs(g)" variant="outlined" />
            </Box>
            <Box display="flex" justifyContent="center" sx={{ marginTop: 2 }}>
                <TextField label="Protein(g)" variant="outlined" />
            </Box>
            <Box display="flex" justifyContent="center" sx={{ marginTop: 2 }}>
                <TextField label="Saturated Fats(%)" variant="outlined" />
            </Box>
            <Box display="flex" justifyContent="center" sx={{ marginTop: 2 }}>
                <TextField label="Unsaturated Fats(%)" variant="outlined" />
            </Box>
            <Box display="flex" justifyContent="center" sx={{ marginTop: 2 }}>
                <TextField label="Calories" variant="outlined" />
            </Box>
            {/* <Box display="flex" justifyContent="center" sx={{ marginTop: 2 }}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer>
                        <DateField label="Date" />
                    </DemoContainer>
                </LocalizationProvider>
            </Box> */}
            <Box display="flex" justifyContent="center" sx={{ marginTop: 2 }}>
                <Button variant="contained">
                    Create
                </Button>
            </Box>
        </Container>
    );
}

export default CreateIngredient;