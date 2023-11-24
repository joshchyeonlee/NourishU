import { Button, Box, Typography, Grid, Card, CardContent, ListItem, ListItemButton } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import { useState, useEffect } from "react";
import axios from 'axios';
import ListModal from "../components/ListModal";
import BottomNav from "../components/BottomNav";

const Profile = () => {
    const [userId, setUserId] = useState("0");
    const [userName, setUserName] = useState();
    const [followingCount, setFollowingCount] = useState();
    const [followerCount, setFollowerCount] = useState();
    const [followingOpen, setFollowingOpen] = useState(false);
    const [followerOpen, setFollowerOpen] = useState(false);
    const [following, setFollowing] = useState([]);
    const [followers, setFollowers] = useState([]);

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
            setFollowers(res.data);
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
    const handleFollowerOpen = () => setFollowerOpen(true);
    const handleFollowerClose = () => setFollowerOpen(false);

    return(
        <div>
            <ListModal open={followingOpen} onClose={handleFollowingClose} values={following}/>
            <ListModal open={followerOpen} onClose={handleFollowerClose} values={followers}/>
            <Button variant="outlined" startIcon={<EditIcon/>} sx={{position:"fixed", top:10, right:10}}>
                Edit Profile
            </Button>
            <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" padding={4}>
                <Typography variant="h4">Welcome, {userName}!</Typography>
                <Grid container spacing={4} padding={3} alignItems="center" justifyContent="center">
                    <Grid item>
                        <Button variant="contained" onClick={handleFollowingOpen}>
                            Following {followingCount}
                        </Button>                                
                    </Grid>
                    <Grid item>
                        <Button variant="contained" onClick={handleFollowerOpen}>
                            Followers {followerCount}
                        </Button>
                    </Grid>
                </Grid>
                <Card sx={{ width:"50%"}}>
                    <CardContent>
                        <Box display="flex" justifyContent="center" flexDirection="column">
                            <Box display="flex" justifyContent="center">
                                <Typography variant="h6" padding={2}>Your Recipes</Typography>
                            </Box>
                            <Box sx={{ overflow: "hidden", overflowY: "scroll", height:"600px"}} padding={2}>                                
                                <Grid container spacing={2} direction="column" justifyContent="center" alignItems="center">
                                    <Grid item sx={{width:"100%"}}>
                                        <ListItemButton>
                                            <ListItem disablePadding>
                                                <Typography>
                                                    Recipe1
                                                </Typography>
                                            </ListItem>
                                        </ListItemButton>
                                    </Grid>
                                    <Grid item sx={{width:"100%"}}>
                                        <ListItemButton>
                                            <ListItem disablePadding>
                                                <Typography>
                                                    Recipe2
                                                </Typography>
                                            </ListItem>
                                        </ListItemButton>
                                    </Grid>
                                    <Grid item sx={{width:"100%"}}>
                                        <ListItemButton>
                                            <ListItem disablePadding>
                                                <Typography>
                                                    Recipe3
                                                </Typography>
                                            </ListItem>
                                        </ListItemButton>
                                    </Grid>
                                    <Grid item sx={{width:"100%"}}>
                                        <ListItemButton>
                                            <ListItem disablePadding>
                                                <Typography>
                                                    Recipe4
                                                </Typography>
                                            </ListItem>
                                        </ListItemButton>
                                    </Grid>
                                    <Grid item sx={{width:"100%"}}>
                                        <ListItemButton>
                                            <ListItem disablePadding>
                                                <Typography>
                                                    Recipe5
                                                </Typography>
                                            </ListItem>
                                        </ListItemButton>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Box>
                    </CardContent>
                </Card>
            </Box>
            <BottomNav currentPage="Profile" value={2}/>
        </div>
    )
}

export default Profile;