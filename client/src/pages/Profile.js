import { Button, Box, Typography, Modal } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import { useState, useEffect } from "react";
import axios from 'axios';
import Propagation from "../components/propagation";

const Profile = () => {
    const [userId, setUserId] = useState("0");
    const [userName, setUserName] = useState();
    const [followingCount, setFollowingCount] = useState();
    const [followerCount, setFollowerCount] = useState();
    const [followingOpen, setFollowingOpen] = useState(false);
    const [following, setFollowing] = useState([]);

    const fetchUsers = async () => {
        const uid = {
            UserID: userId,
        }
        try{
            const res = await axios.post("http://localhost:3001/getUserInfo", uid)
            console.log(res.data[0].UserName);
            setUserName(res.data[0].UserName);
        } catch(err){
            throw(err);
        }
    }

    const fetchFollowingInformation = async () => {
        const uid = {
            UserID: userId,
        }
        try{
            const res = await axios.post("http://localhost:3001/getFollowingCount", uid)
            console.log(res.data);
            setFollowingCount(res.data.length);
            setFollowing(res.data);
        } catch(err){
            throw(err);
        }
    }

    const fetchFollowerInformation = async () => {
        const uid = {
            UserID: userId,
        }
        try{
            const res = await axios.post("http://localhost:3001/getFollowerCount", uid)
            console.log(res);
            setFollowerCount(res.data.length);
        } catch(err){
            throw(err);
        }
    }

    useEffect(() => {
        fetchUsers();
        fetchFollowingInformation();
        fetchFollowerInformation();
    },[]);

    const handleFollowingOpen = () => setFollowingOpen(true);
    const handleFollowingClose = () => setFollowingOpen(false);
    
    const modalFormat = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    return(
        <div>
            <Modal open={followingOpen} onClose={handleFollowingClose}>
                <Box sx={modalFormat}>
                <Typography>Following</Typography>
                <div>
                    {following.map((value, key)=> {
                        return(<Typography key={key}>{value.UserName}</Typography>)
                    })}
                </div>
                </Box>
            </Modal>
            <Button variant="outlined" startIcon={<EditIcon/>}>
                Edit
            </Button>
            <Typography>Welcome {userName}</Typography>
            <Button variant="outlined" onClick={handleFollowingOpen}>
                Following {followingCount}
            </Button>
            <Button variant="outlined">
                Followers {followerCount}
            </Button>
            <Box sx={{ border: 1, width: 1/2, minheight: 1/2}}>
                <Typography>Recipes</Typography>
            </Box>
            {/* <Propagation userName={userName}/> */}
        </div>
    )
}

export default Profile;