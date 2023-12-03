import { Box, IconButton } from "@mui/material";
import { useAuthUser } from 'react-auth-kit'
import { useEffect, useState } from "react";
import axios from "axios";
import YourRecipesList from "../components/YourRecipesList";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link } from "react-router-dom";

const YourRecipes = () => {
    const auth = useAuthUser();
    const [userId, setUserId] = useState(auth().values.userID);
    const [userRecipes, setUserRecipes] = useState([]);

    const fetchUserRecipes = async () => {
        const uid = {
            UserID: userId,
        }
        try {
            const res = await axios.post("http://localhost:3001/getUserCreatedRecipes", uid);
            setUserRecipes(res.data);
        } catch (err) {
            throw(err);
        }
    }

    useEffect(() => {
        fetchUserRecipes();
    }, []);
    
    return(
        <div>
            <IconButton sx={{position: "absolute", top:10, left: 10}} component={Link} to={{pathname:"/recipes"}}>
                <ArrowBackIcon fontSize="large"/>
            </IconButton>
            <Box display="flex" padding={4} sx={{ width: "60%", translate:"25%"}}>
                <YourRecipesList recipes={userRecipes} from="/viewYourRecipes" title="h5" />
            </Box>
        </div>
    )
}

export default YourRecipes;