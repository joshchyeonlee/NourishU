import { Box, Typography, Grid, Card, CardContent, CardActionArea, CircularProgress, Button, Snackbar } from "@mui/material";
import MealItemList from "../components/MealItemList";
import BottomNav from "../components/BottomNav";
import { useState, useEffect } from "react";
import { useAuthUser } from 'react-auth-kit'
import axios from 'axios';
import { Link } from "react-router-dom";
import formatRecipeData from "../utils/formatRecipeData";
import SetGoal from "../components/SetGoal";
import dayjs from "dayjs";

const Dashboard = (props) => {
    const auth = useAuthUser();
    const [userId, setUserId] = useState((props.userID) ? props.userID : auth().values.userID);
    const [isSelf, setIsSelf] = useState((props.userID) ? false : true);
    const [meals, setMeals] = useState([]);
    const [mealIDs, setMealIDs] = useState([]);
    const [goal, setGoal] = useState();
    const [totalCalories, setTotalCalories] = useState(0);
    const [isGoalModalOpen, setIsGoalModalOpen] = useState(false);
    const [isAchievementOpen, setIsAchievementOpen] = useState();

    const fetchUserGoal = async () => {
        const uid = {
            UserID: userId,
        }
        try{
            const res = await axios.post("http://localhost:3001/fetchUserGoal", uid);
            setGoal(res.data[0]);
        } catch(err) {
            throw(err);
        }
    } 

    const fetchMealContains = async (mealID) => {
        const MealID = {
            MealID: mealID
        }
        try{
            const res = await axios.post("http://localhost:3001/getMealContains", MealID);

            return formatRecipeData(res.data).totalCalories;

        } catch(err){
            throw(err);
        }
    }

    const fetchUserMeals = async () => {
        const uid = {
            UserID: userId,
        }
        try{
            const res = await axios.post("http://localhost:3001/getUserMeals", uid);
            setMeals(res.data);
            const mealIDs = res.data.map(x => x.MealID);
            setMealIDs(mealIDs);

        } catch(err){
            throw(err);
        }
    }

    const calculateCaloricIntake = async () => {
        var calories = 0;
        for(var i = 0; i < mealIDs.length; i++){
            calories += await fetchMealContains(mealIDs[i]);
        }
        setTotalCalories(calories);
    }

    const handleOpenSetGoal = () => {
        setIsGoalModalOpen(true);
    }

    const handleCloseSetGoal = () => {
        setIsGoalModalOpen(false);
    }

    const handleCaloriesConsumed = () => {
        var val = (totalCalories/goal.CalculatedCaloricIntake) * 100
        if(val > 100) val = 100;
        return val;
    }

    const deleteMeal = async (mealID) => {
        const mealObj = {
            MealID: mealID,
        }
        try{
            await axios.post("http://localhost:3001/deleteMeal", mealObj);
        } catch (err) {
            throw(err);
        }
    }

    const handleRemoveMeal = (i) => {
        deleteMeal(meals[i].MealID);
        const newMeals = [...meals];
        newMeals.splice(i,1);
        setMeals(newMeals);
    }

    const handleAchievementClose = (event, reason) => {
        if(reason === 'clickaway') return;
        setIsAchievementOpen(false);
    }

    const checkIfFirstGoal = async () => {
        const UserID = {
            UserID: userId,
        }
        try{
            const res = await axios.post("http://localhost:3001/isFirstGoal", UserID);
            if(res.data === false) return;

            setIsAchievementOpen(true);
            UserID.Time = dayjs().format("YYYY-MM-DD hh:mm:ss");
            await axios.post("http://localhost:3001/assignGoalAchievement", UserID);

        } catch (err) {
            throw(err);
        }
    }

    useEffect(() => {
        if(mealIDs.length <= 0) return;
        calculateCaloricIntake()
    }, [mealIDs, meals ])

    useEffect(() => {
        if(userId === -1 || typeof userId === 'undefined') return;
        fetchUserMeals();
        fetchUserGoal();
    }, [userId, isGoalModalOpen]);

    useEffect(() => {
        if(goal === null) return;
        if(goal && totalCalories >= goal.CalculatedCaloricIntake) checkIfFirstGoal();
    }, [totalCalories, goal])

    return(   
        <div>
            <Snackbar open={isAchievementOpen} autoHideDuration={1500} onClose={handleAchievementClose} message="Achievement Unlocked! First Goal Complete"/>
            <SetGoal open={isGoalModalOpen} onClose={handleCloseSetGoal} goal={goal}/>
            <Box display="flex" flexDirection="column" padding={4} justifyContent="center" textAlign="center">
                <Typography variant="h5">Dashboard</Typography>
            </Box>
            <Box display="flex" flexDirection="column" padding={4} justifyContent="center" textAlign="center">
                <Grid container spacing={2} height={"500px"}>
                    <Grid item xs={4} display="flex">
                        <Card variant="outlined" display="flex" justifyContent="space-between" sx={{ boxShadow: 3, width: "100%", height: "100%" }}>
                            <CardActionArea sx={{ width: "100%", height: "100%" }} onClick={handleOpenSetGoal}>
                                <CardContent sx={{ width: "100%", height: "100%" }}>
                                    {goal ? 
                                        <Box sx={{position: "relative",
                                            float: "left",
                                            top: "50%",
                                            left: "50%",
                                            transform: "translate(-50%, -50%)"}}
                                            padding={4} display="flex" flexDirection="column"
                                        >
                                            <Typography variant="h6">Calories Remaining</Typography>
                                            <Box display="flex" padding={18} justifyContent="center" alignItems="center">
                                                <Box position="absolute">
                                                    <CircularProgress variant="determinate" color={(totalCalories > goal.CalculatedCaloricIntake) ? "error" : "primary"} size={180} value={ (totalCalories < 0 || !goal) ? 0 : handleCaloriesConsumed()}/>
                                                </Box>
                                                <Box position="absolute">
                                                    <Typography>{totalCalories}/{goal.CalculatedCaloricIntake}</Typography>
                                                </Box>
                                            </Box>
                                        </Box>
                                    :   <Box sx={{position: "relative",
                                                float: "left",
                                                top: "50%",
                                                left: "50%",
                                                transform: "translate(-50%, -50%)"}}
                                            >
                                                <Typography variant="h6">No Goal Set!</Typography>
                                        </Box>
                                    }
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                    <Grid item xs={8} display="flex">
                        <Card variant="outlined" display="flex" justifyContent="space-between" sx={{ boxShadow: 3, width: "100%", height: "100%" }}>
                            <CardContent sx={{ width: "100%", height: "100%" }}>
                                <Box padding={4} display="flex" flexDirection="column" sx={{ width: "100%", height: "100%" }}>
                                    <Typography variant="h6">Your Meals</Typography>
                                    <Box padding={8} overflow="auto" sx={{ height:"300px" }}>
                                        {meals.map((value, key) => {
                                            return <MealItemList meal={value} key={key} i={key} handleRemove={handleRemoveMeal}/>
                                        })}
                                    </Box>
                                    <Box>
                                        <Button 
                                            size="large"
                                            variant="contained"
                                            component={Link}
                                            to={{pathname:"/logMeal"}}
                                        >Log Meal</Button>
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