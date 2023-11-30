import { Button, Box, Typography, Grid, Card, CardContent, IconButton, Tooltip } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import { useState, useEffect } from "react";
import axios from 'axios';
import ListModal from "../components/ListModal";
import BottomNav from "../components/BottomNav";
import AchievementList from "../components/AchievementList";
import AchievementModal from "../components/AchievementModal";
import { Link } from "react-router-dom";

const Profile = () => {
    const [userId, setUserId] = useState(2);
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
        fetchUsers();
        fetchFollowingInformation();
        fetchFollowerInformation();
        fetchAchievementsEarned();
        fetchUserRecipes();
    },[]);

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
            <ListModal open={followingOpen} onClose={handleFollowingClose} values={following}/>
            <ListModal open={followerOpen} onClose={handleFollowerClose} values={followers}/>
            <Button variant="outlined" startIcon={<EditIcon/>} sx={{position:"fixed", top:10, right:10}}>
                Edit
            </Button>
            <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" padding={4}>
                <Typography variant="h4">Welcome, {userName}!</Typography>
                <Grid container spacing={4} padding={3} alignItems="center" justifyContent="center">
                    <Grid item>
                        <Button variant="outlined" onClick={handleFollowingOpen}>
                            Following {followingCount}
                        </Button>                                
                    </Grid>
                    <Grid item>
                        <Button variant="outlined" onClick={handleFollowerOpen}>
                            Followers {followerCount}
                        </Button>
                    </Grid>
                </Grid>    
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
                <Card sx={{width: "50%"}} variant="outlined">
                    <CardContent>
                        <Box sx={{ maxHeight: "300px", overflow: "hidden", overflowY: "scroll"}} display="flex" flexDirection="column" alignItems="center">
                            <Typography variant="h6" padding={2}>Your Recipes</Typography>
                            <Grid container spacing={2} direction="column" justifyContent="center" alignItems="center">
                                {userRecipes.length === 0 ?
                                <Box sx={{height:"100%"}} alignItems="center" padding={2}>
                                    <Typography>You haven't created any recipes yet!</Typography>
                                </Box>
                                :
                                <Box sx={{width:"90%"}} display="flex" justifyContent="center" flexDirection="column">
                                    {userRecipes.map((val, key) => { return(
                                        <Box key={key} display="flex" justifyContent="space-between" flexDirection="row" alignItems="center">
                                            <Typography>
                                                {val.RecipeTitle}
                                            </Typography>
                                            <Box display="flex" padding={1}>
                                                <Box padding={1}>
                                                    <Button
                                                        component={Link}
                                                        to={{pathname: "/viewRecipe"}}
                                                        state={{prev: {from: "/profile"}, recipeID: val.RecipeID, from:"/profile"}}
                                                    >
                                                        View
                                                    </Button>
                                                </Box>
                                                <Box padding={1}>
                                                    <Button
                                                        component={Link}
                                                        to={{pathname: "/editRecipe"}}
                                                        state={{from:"/profile", recipeID: val.RecipeID}}
                                                    >Edit</Button>
                                                </Box>
                                            </Box>
                                        </Box>
                                    )})}
                                </Box>
                                }
                            </Grid>
                        </Box>
                    </CardContent>
                </Card>
            </Box>
            <BottomNav currentPage="Profile" value={2}/>
        </div>
    )
}

export default Profile;