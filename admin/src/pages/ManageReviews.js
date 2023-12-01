import { Typography, Box, Button, Card, CardContent, IconButton } from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import axios from 'axios';

const ManageReviews = () => {
    const [flaggedReviews, setFlaggedReviews] = useState([]);
    
    const fetchFlaggedReviews = async () => {
        const res = await axios.get("http://localhost:3001/fetchFlaggedReviews");
        console.log(res.data);
        setFlaggedReviews(res.data);
    }

    //handle delete -> remove from db

    //handle unflag -> change flag to 1

    useEffect(() => {
        fetchFlaggedReviews();
    }, []);
    
    return(
        <Box display="flex" justifyContent="center" padding={4} flexDirection="column" alignItems="center">
            <IconButton sx={{position: "absolute", top:10, left: 10}}
                component={Link}
                to={{pathname:"/admin"}}>
                <ArrowBackIcon fontSize="large"/>
            </IconButton>
            <Typography variant="h5">Manage Reviews</Typography>
            <Box display="flex" justifyContent="center" padding={4} flexDirection="column" alignItems="center" sx={{width:"100%"}}>
                {flaggedReviews.map((val, key) => { return(
                    <Box padding={1} key={key} sx={{width:"50%"}}>
                        <Card variant="outlined">
                            <CardContent>
                                <Box paddingTop={1} display="flex" flexDirection="column" alignItems="center">
                                    <Typography variant="h6">User: {val.UserName}</Typography>
                                    <Box paddingTop={1} display="flex" flexDirection="column" alignItems="center" sx={{width:"100%"}}>
                                        <Typography>Review: {val.RComment}</Typography>
                                        <Box display="flex" justifyContent="space-between" sx={{width: "50%"}} paddingTop={2}>
                                            <Button variant="contained" color="error">Delete</Button>
                                            <Button variant="contained">Unflag</Button>
                                        </Box>
                                    </Box>
                                </Box>
                            </CardContent>
                        </Card>
                    </Box>
                )})}
            </Box>
        </Box>
    )
}

export default ManageReviews;