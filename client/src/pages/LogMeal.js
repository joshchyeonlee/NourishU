import { Box, Typography, IconButton, TextField, Button } from "@mui/material"
import { DateCalendar, DigitalClock, LocalizationProvider, MultiSectionDigitalClock } from '@mui/x-date-pickers';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useEffect, useState } from "react";
import { useAuthUser } from "react-auth-kit";
import { Link, useNavigate } from "react-router-dom";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { formatString } from "../utils/inputCheck";
import dayjs from "dayjs";
import axios from 'axios';

const LogMeal = () => {
    const auth = useAuthUser();
    const [userId, setUserId] = useState(auth().values.userID);
    const [mealTitle, setMealTitle] = useState("");
    const [date, setDate] = useState(dayjs());
    const [time, setTime] = useState(dayjs());
    const [dateTime, setDateTime] = useState("");
    const [selectedTextField, setSelectedTextField] = useState(false);
    const navigate = useNavigate();

    const handleMealTitleChange = (val) => {
        setMealTitle(formatString(val, 50));
        setSelectedTextField(true);
    }

    const roundTime = () => {
        var minutes = dayjs().minute();
        if(minutes % 10 > 7) minutes += 10 - (minutes % 10);
        else if (minutes % 10 < 3) minutes -= (minutes % 10);
        else minutes += (5 - (minutes % 10));

        setTime(dayjs().minute(minutes))
    }

    const addMeal = async () => {
        const meal = {
            UserID: userId,
            DateTime: dateTime,
            MealTitle: mealTitle,
        }
        try{
            const res = await axios.post("http://localhost:3001/createMeal", meal);
            meal.MealID = res.data.insertId;
            navigate("/searchRecipes", {state:{meal: meal, from:"/logMeal", recipes:[]}});

        } catch (err) {
            navigate("/not-found");
        }
    }

    const handleContinue = () => {
        if(mealTitle.length <= 0){
            setSelectedTextField(true);
            return;
        }
        const d = dayjs().format("YYYY-MM-DD hh:mm:ss");
        setDateTime(d);
    }

    useEffect(() => {
        if(dateTime === "") return;
        addMeal();
    },[dateTime])

    useEffect(() => {
        roundTime();
    }, []);

    return(
        <Box display="flex" flexDirection="column" padding={4} justifyContent="center" textAlign="center" alignItems="center">
            <IconButton sx={{position: "absolute", top:10, left: 10}} component={Link} to={{pathname:"/dashboard"}}>
                <ArrowBackIcon fontSize="large"/>
            </IconButton>
            <Typography variant="h5">Log Meal</Typography>
            <Box padding={4} display="flex" justifyContent="center" flexDirection="column" textAlign="left" sx={{ width:"40%" }}>
                <TextField
                    label="Meal Name"
                    variant="standard"
                    value={mealTitle}
                    helperText={(mealTitle.length <= 0 && selectedTextField) ? "Name is required" : ""}
                    error={mealTitle.length <= 0 && selectedTextField}
                    onChange={(e) => handleMealTitleChange(e.target.value)}
                    inputProps={{ maxLength: 50 }}
                    />
                <Box display="flex" justifyContent="flex-end" padding={1}>
                    <Typography variant="caption">{mealTitle.length} / 50</Typography>
                </Box>
            </Box>
            <Box padding={1} display="flex" justifyContent="center" flexDirection="column" textAlign="left" sx={{ width:"40%" }}>
                <Typography paddingTop={2}>Consumed {date.format("MMM D, YYYY")} at {time.format("hh:mm A")}</Typography>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <Box display="flex" sx={{width:"100%"}} justifyContent="space-between" flexDirection="row" alignItems="center">
                        <Box>
                            <DateCalendar disableFuture value={date} onChange={(value) => {setDate(value)}}/>
                        </Box>
                        <Box>
                            <MultiSectionDigitalClock value={time} onChange={(value) => {setTime(value)}}/>
                        </Box>
                    </Box>
                </LocalizationProvider>
            </Box>
            <Box position="absolute" bottom={50}>
                <Button variant="contained" onClick={() => handleContinue()} disabled={mealTitle.length === 0}>
                    Continue
                </Button>
            </Box>
        </Box>
    )
}

export default LogMeal;