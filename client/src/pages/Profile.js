import { Button, Box, Typography, Grid, Card, CardContent, ListItem, ListItemButton, IconButton, Tooltip } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import { useState, useEffect } from "react";
import axios from 'axios';
import ListModal from "../components/ListModal";
import BottomNav from "../components/BottomNav";
import AchievementList from "../components/AchievementList";
import AchievementModal from "../components/AchievementModal";
import { Link, useLocation } from "react-router-dom";
import { useAuthUser } from 'react-auth-kit'
import YourRecipesList from "../components/YourRecipesList";

const Profile = ( props ) => {
    const auth = useAuthUser();
    const location = useLocation();
    const [userId, setUserId] = useState();
    const [isSelf, setIsSelf] = useState(true);
    const [userName, setUserName] = useState();
    const [followingCount, setFollowingCount] = useState();
    const [followerCount, setFollowerCount] = useState();
    const [followingOpen, setFollowingOpen] = useState(false);
    const [followerOpen, setFollowerOpen] = useState(false);
    const [following, setFollowing] = useState([]);
    const [followers, setFollowers] = useState([]);
    const [achievements, setAchievements] = useState([]);
    const [achievementOpen, setAchievementOpen] = useState(false);
    const [selectedAchievement, setSelectedAchievement] = useState();
    const [userRecipes, setUserRecipes] = useState([]);

    const fetchUsers = async () => {
        const uid = {
            UserID: userId,
        }
        console.log(uid)
        try{
            const res = await axios.post("http://localhost:3001/getUserInfo", uid)
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
            setFollowingCount(res.data.length);
            setFollowing(res.data);
            console.log(res.data);
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
            setFollowerCount(res.data.length);
            setFollowers(res.data);
            console.log(res.data);
        } catch(err){
            throw(err);
        }
    }

    const fetchAchievementsEarned = async () => {
        const uid = {
            UserID: userId,
        }
        try{
            const res = await axios.post("http://localhost:3001/getUserAchievements", uid);
            setAchievements(res.data);
        } catch (err) {
            throw(err);
        }
    }

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
        if(props.userID){
            setUserId(props.userID);
        } else if (location.state && location.state.userID){
            setUserId(location.state.userID);
        } else {
            setUserId(auth().values.userID)
        }
    },[])

    useEffect(() => {
        if( typeof userId === 'undefined' || userId === -1) return
        setIsSelf(userId === auth().values.userID)
        fetchUsers();
        fetchFollowingInformation();
        fetchFollowerInformation();
        fetchAchievementsEarned();
        fetchUserRecipes();
    },[userId]);

    const handleFollowingOpen = () => setFollowingOpen(true);
    const handleFollowingClose = () => setFollowingOpen(false);
    const handleFollowerOpen = () => setFollowerOpen(true);
    const handleFollowerClose = () => setFollowerOpen(false);
    const handleAchievementOpen = () => setAchievementOpen(true);
    const handleAchievementClose = () => setAchievementOpen(false);

    const handleAchievementClick = (achievement) => {
        setSelectedAchievement(achievement);
        handleAchievementOpen();
    }

    return(
        <div>
            <AchievementModal open={achievementOpen} onClose={handleAchievementClose} value={selectedAchievement}/>
            <ListModal open={followingOpen} onClose={handleFollowingClose} values={following} setUserId={setUserId}/>
            <ListModal open={followerOpen} onClose={handleFollowerClose} values={followers} setUserId={setUserId}/>
            {isSelf ? 
            <Button variant="outlined" startIcon={<EditIcon/>} sx={{position:"fixed", top:10, right:10}}>
                Edit Profile
            </Button>
            : <></>
            }
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
                {isSelf?
                <Box padding={1} sx={{width: "50%"}}>
                    <Card variant="outlined">
                        <CardContent>
                            <Box display="flex" justifyContent="center" flexDirection="column" textAlign="center">
                                <Typography variant="h6">Achievements Earned</Typography>
                                <Box display="flex" justifyContent="center" paddingTop={1}>
                                {achievements.map((val, key) => {
                                    return (
                                        <Tooltip title={val.Name} key={key}>
                                            <IconButton onClick={() => handleAchievementClick(val)}>
                                                <AchievementList val={val}/>
                                            </IconButton>
                                        </Tooltip>)
                                })}
                                </Box>
                            </Box>
                        </CardContent>
                    </Card>
                </Box>
                :<></>
                }    
                <Card sx={{width: "50%"}} variant="outlined">
                    <CardContent>
                        <Box sx={{ maxHeight: "300px", overflow: "hidden", overflowY: "scroll"}} display="flex" flexDirection="column" alignItems="center">
                            <YourRecipesList
                                recipes={userRecipes}
                                isSelf={isSelf}
                                from="/profile"
                                title="h5"/>
                        </Box>
                    </CardContent>
                </Card>
            </Box>
            <BottomNav currentPage="Profile" value={2}/>
        </div>
    )
}

export default Profile;