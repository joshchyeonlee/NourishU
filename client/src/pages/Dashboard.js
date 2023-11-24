import { Box, Typography, Grid, Card, CardContent, CardActionArea, CircularProgress, Button } from "@mui/material";
import MealItemList from "../components/MealItemList";
import BottomNav from "../components/BottomNav";

const Dashboard = () => {

    return(   
        <div>
            <Box display="flex" flexDirection="column" padding={4} justifyContent="center" textAlign="center">
                <Typography variant="h5">Dashboard</Typography>
            </Box>
            <Box display="flex" flexDirection="column" padding={4} justifyContent="center" textAlign="center">
                <Grid container spacing={2} height={"700px"}>
                    <Grid item xs={4} display="flex">
                        <Card variant="outlined" display="flex" justifyContent="space-between" sx={{ boxShadow: 3, width: "100%", height: "100%" }}>
                            <CardActionArea sx={{ width: "100%", height: "100%" }}>
                                <CardContent sx={{ width: "100%", height: "100%" }}>
                                    <Box padding={4} display="flex" flexDirection="column" sx={{ width: "100%", height: "100%" }}>
                                        <Typography variant="h6">Calories Remaining</Typography>
                                        <Box display="flex" padding={12} justifyContent="center" alignItems="center">
                                            <CircularProgress variant="determinate" color="primary" size={200} value={30}/>
                                            <Box position="absolute">
                                                <Typography>840/2500</Typography>
                                            </Box>
                                        </Box>
                                    </Box>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                    <Grid item xs={8} display="flex">
                        <Card variant="outlined" display="flex" justifyContent="space-between" sx={{ boxShadow: 3, width: "100%", height: "100%" }}>
                            <CardContent sx={{ width: "100%", height: "100%" }}>
                                <Box padding={4}>
                                    <Typography variant="h6">Your Meals</Typography>
                                    <Box padding={8} overflow="auto" sx={{ width: "100%", height: "500px" }}>
                                        <MealItemList mealName="Breakfast"/>
                                        <MealItemList mealName="Lunch"/>
                                        <MealItemList mealName="Gotta make these real meals dude"/>
                                        <MealItemList mealName="Bean"/>
                                        <MealItemList mealName="Bean"/>
                                        <MealItemList mealName="Bean"/>
                                        <MealItemList mealName="Bean"/>
                                    </Box>
                                    <Box>
                                        <Button size="large" variant="contained">Log Meal</Button>
                                    </Box>
                                </Box>
                            </CardContent>    
                        </Card>
                    </Grid>
                </Grid>
            </Box>
            <BottomNav currentPage="Dashboard" value={1}/>
        </div>     
    )
}

export default Dashboard;