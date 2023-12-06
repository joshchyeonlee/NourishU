import { Typography, Box, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useAuthUser } from "react-auth-kit";
import { Link } from "react-router-dom";
import axios from 'axios';

const Admin = () => {
    const auth = useAuthUser();
    const[adminID, setAdminID] = useState(auth().values.userID);
    const [adminInfo, setAdminInfo] = useState();

    const fetchAdmin = async () => {
        const aID = {
            AdminID: adminID,
        }
        try{
            const res = await axios.post("http://localhost:3001/fetchAdminInfo", aID);
            setAdminInfo(res.data[0]);
        } catch (err) {
            throw(err);
        }
    }

    useEffect(() => {
        fetchAdmin();
    },[])

    return(
        <Box display="flex" justifyContent="center" padding={4} flexDirection="column" textAlign="center" alignItems="center">
            <Typography variant="h5">Welcome, {adminInfo ? (adminInfo.AdminName) : " "}</Typography>
            <Box display="flex" justifyContent="center" padding={12} flexDirection="column" textAlign="center" sx={{width:"20%"}}>
                <Box padding={1}>
                    <Button variant="contained" fullWidth component={Link} to={{pathname:"/createIngredient"}}>Create Ingredient</Button>
                </Box>
                <Box padding={1}>
                    <Button variant="contained" fullWidth component={Link} to={{pathname:"/manageReviews"}}>Manage Reviews</Button>
                </Box>
            </Box>
        </Box>
    )
}

export default Admin;