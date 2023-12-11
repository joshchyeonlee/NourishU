import { Modal, Box, Typography, IconButton, Slider, Button } from "@mui/material";
import Close from '@mui/icons-material/Close';
import { useState } from "react";
import { useAuthUser } from 'react-auth-kit'
import axios from 'axios';
import { formatNumber } from "../utils/inputCheck";

const modalFormat = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    height: 600,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    borderRadius: 5,
};

const SetGoal = (props) => {
    const auth = useAuthUser();
    const [userId, setUserId] = useState(auth().values.userID);
    const [calorieDiff, setCalorieDiff] = useState(props.goal ? (props.goal.CalculatedCaloricIntake - props.goal.InitialCaloricIntake) : 0)
    const [initialCalories, setInitialCalories] = useState(2500);

    const updateGoal = async () => {
        const goal = {
            GoalID: props.goal.GoalID,
            Calculated: props.goal.InitialCaloricIntake + calorieDiff
        }
        try{
            const res = await axios.post("http://localhost:3001/updateGoal", goal);
            console.log(res.data)
        } catch (err) {
            throw(err);
        }
    }

    const createGoal = async () => {
        const goal = {
            UserID: userId,
            GoalID: userId,
            Calculated: initialCalories + calorieDiff,
            Initial: initialCalories
        }
        try{
            await axios.post("http://localhost:3001/createGoal", goal);
        } catch (err) {
            throw(err);
        }
    }

    const handleText = () => {
        if(props.goal.CalculatedCaloricIntake === props.goal.InitialCaloricIntake) return "Maintain Weight"
        else if(props.goal.CalculatedCaloricIntake > props.goal.InitialCaloricIntake) return "Gain Weight"
        return "Lose Weight"
    }

    const handleGoalText = () =>{
        const val = calorieDiff ? calorieDiff : 0
        if(val === 0) return "Maintain Weight"
        else if(val > 0) return "Gain Weight"
        return "Lose Weight"
    }

    const handleCaloricDiff = (val) => {
        if(!val) return 0;

        if (val > 0) return `+ ${val}`
        else if (val < 0) return `- ${val * -1}`
        return val;
    }

    const handleUpdate = () => {
        props.goal ? updateGoal() : createGoal()
        props.onClose();
    }

    const handleUpdateChangVal = (val) => {
        setCalorieDiff(formatNumber(val, -700, 700));
    }

    const handleInitialValue = (val) => {
        setInitialCalories(formatNumber(val, 1800, 3200));
    }

    const handleCalorieDiff = (val) => {
        setCalorieDiff(formatNumber(val, -700, 700));
    }

    return(
        <Modal open={props.open} onClose={props.onClose}>
            <Box sx={modalFormat} display="flex" flexDirection="column" alignItems="center">
                <Box sx={{position: "absolute", top:20, right: 20}}>
                    <IconButton onClick={props.onClose}>
                        <Close/>
                    </IconButton>
                </Box>
                <Typography padding={1} variant="h5">Set Goal</Typography>
                {props.goal ? 
                    <Box display="flex" justifyContent="center" flexDirection="column" textAlign="center" sx={{width:"90%"}}>
                        <Typography>Current Goal: {handleText()}</Typography>
                        <Box paddingTop={8} display="flex" flexDirection="column" textAlign="left">
                            <Box display="flex" justifyContent="space-between">
                                <Typography>Updated Goal:</Typography>
                                <Typography>{handleGoalText()}</Typography>
                            </Box>
                            <Box display="flex" justifyContent="space-between">
                                <Typography>Calories for Maintenance:</Typography>
                                <Typography>{props.goal.InitialCaloricIntake}</Typography>
                            </Box>
                            <Box display="flex" justifyContent="space-between">
                                <Typography>Caloric Differential:</Typography>
                                <Typography>{handleCaloricDiff(calorieDiff)}</Typography>
                            </Box>
                            <Box display="flex" justifyContent="space-between">
                                <Typography>New Caloric Intake:</Typography>
                                <Typography>{calorieDiff ? calorieDiff + props.goal.InitialCaloricIntake : props.goal.InitialCaloricIntake}</Typography>
                            </Box>
                            <Box paddingTop={8} paddingBottom={8}>
                                <Slider
                                    value={calorieDiff ? calorieDiff : 0}
                                    onChange={(e) => handleUpdateChangVal(e.target.value)}
                                    min={-700}
                                    max={700}
                                    step={100}
                                />
                            </Box>
                        </Box>
                    </Box>:
                    <Box display="flex" justifyContent="center" flexDirection="column" textAlign="center" sx={{width:"90%"}} paddingTop={2}>
                        <Box padding={2}>
                            <Typography>What is your current Caloric Intake?</Typography>
                            <Slider
                                value={initialCalories}
                                onChange={(e) => handleInitialValue(e.target.value)}
                                min={1800}
                                max={3200}
                                defaultValue={2500}
                                step={100}
                                />
                        </Box>
                        <Box padding={2}>
                            <Typography>What is your goal?</Typography>
                        <Slider
                                value={calorieDiff ? calorieDiff : 0}
                                onChange={(e) => handleCalorieDiff(e.target.value)}
                                min={-700}
                                max={700}
                                step={100}
                                marks={[{value: -700, label:"lose weight"},
                                        {value: 0, label: "maintain weight"},
                                        {value: 700, label: "gain weight"}]}
                            />
                        </Box>
                        <Box paddingTop={4} paddingLeft={2} paddingRight={2}>
                            <Box display="flex" justifyContent="space-between">
                                    <Typography>Updated Goal:</Typography>
                                    <Typography>{handleGoalText()}</Typography>
                                </Box>
                                <Box display="flex" justifyContent="space-between">
                                    <Typography>Calories for Maintenance:</Typography>
                                    <Typography>{initialCalories}</Typography>
                                </Box>
                                <Box display="flex" justifyContent="space-between">
                                    <Typography>Caloric Differential:</Typography>
                                    <Typography>{handleCaloricDiff(calorieDiff)}</Typography>
                                </Box>
                                <Box display="flex" justifyContent="space-between">
                                    <Typography>New Caloric Intake:</Typography>
                                    <Typography>{calorieDiff + initialCalories}</Typography>
                                </Box>
                            </Box>
                    </Box>
                }
                <Box sx={{position:"absolute", bottom:50}}>
                    <Button variant="contained" onClick={() => handleUpdate()}>Update</Button>
                </Box>
            </Box>
        </Modal>
    )
}

export default SetGoal;