import { Button, Box, Typography, Grid, Card, CardContent, IconButton, Tooltip } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import { useState, useEffect } from "react";
import axios from 'axios';
import ListModal from "../components/ListModal";
import BottomNav from "../components/BottomNav";
import AchievementList from "../components/AchievementList";
import AchievementModal from "../components/AchievementModal";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useAuthUser } from 'react-auth-kit'
import YourRecipesList from "../components/YourRecipesList";
import LogoutIcon from '@mui/icons-material/Logout';
import { useSignOut } from 'react-auth-kit'

const Profile = ( props ) => {
    const auth = useAuthUser();
    const location = useLocation();
    const signOut = useSignOut();
    const navigate = useNavigate();
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
    const [isFollowing, setIsFollowing] = useState(false);

    const fetchUsers = async () => {
        const uid = {
            UserID: userId,
        }
        try{
            const res = await axios.post("http://localhost:3001/getUserInfo", uid)
            setUserName(res.data[0].UserName);
        } catch(err){
            navigate("/not-found");
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
            navigate("/not-found");
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
            navigate("/not-found");
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
            navigate("/not-found");
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
            navigate("/not-found");
        }
    }

    const queryFollowing = async (_isSelf) => {
        if(_isSelf) return;
        const info = {
            UserID: auth().values.userID,
            ProfileID: userId,
        }
        try{
            const res = await axios.post("http://localhost:3001/isFollowing", info);
            setIsFollowing(res.data);
        } catch (err){
            // leaving here on purpose since need to redirect to error page
            console.log(err);
        }
    }

    const followUser = async () => {
        const info = {
            UserID: auth().values.userID,
            ProfileID: userId,
        }
        try{
            await axios.post("http://localhost:3001/followUser", info);
        } catch (err){
            // leaving here on purpose since need to redirect to error page
            console.log(err);
        }
    }

    const unFollowUser = async () => {
        const info = {
            UserID: auth().values.userID,
            ProfileID: userId,
        }
        try{
            await axios.post("http://localhost:3001/unfollowUser", info);
        } catch (err){
            // leaving here on purpose since need to redirect to error page
            console.log(err);
        }
    }

    const handleFollow = () => {
        isFollowing ? unFollowUser() : followUser();

        setIsFollowing(!isFollowing);
    }

    useEffect(() => {
        if(props.userID){
            setUserId(props.userID);
            return;
        }
        
        if (location.state && location.state.userID){
            setUserId(location.state.userID);

            //remove state from https://stackoverflow.com/questions/40099431/how-do-i-clear-location-state-in-react-router-on-page-reload
            window.history.replaceState({}, document.title)
            return;
        }

        setUserId(auth().values.userID)
    },[])

    // useEffect(() => {
    //     if(!isSelf) queryFollowing();
    // }, [isSelf]);

    useEffect(() => {
        if( typeof userId === 'undefined' || userId === -1) return
        fetchFollowingInformation();
        fetchFollowerInformation();
    }, [isFollowing])

    useEffect(() => {
        if( typeof userId === 'undefined' || userId === -1) return
        setIsSelf(userId === auth().values.userID)
        fetchUsers();
        fetchFollowingInformation();
        fetchFollowerInformation();
        fetchAchievementsEarned();
        fetchUserRecipes();
        queryFollowing(userId === auth().values.userID);
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

    const handleLogOut = () => {
        signOut();
        navigate("/");
    }

    return(
        <div>
            <AchievementModal open={achievementOpen} onClose={handleAchievementClose} value={selectedAchievement}/>
            <ListModal isFollower={false} open={followingOpen} onClose={handleFollowingClose} values={following} setUserId={setUserId}/>
            <ListModal isFollower={true} open={followerOpen} onClose={handleFollowerClose} values={followers} setUserId={setUserId}/>
            {isSelf ?
            <Box display="flex" sx={{position:"fixed", top:10, right:10}} flexDirection="row">
                <IconButton>
                    <EditIcon/>
                </IconButton>
                <IconButton onClick={handleLogOut}>
                    <LogoutIcon/>
                </IconButton>
            </Box>
            : <></>
            }
            <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" padding={4}>
                {isSelf ? <Typography variant="h4">Welcome, {userName}!</Typography>
                        : <Typography variant="h4">{userName}'s Profile</Typography>
                }
                { isSelf ? <div></div> :
                <Box padding={1}>
                    <Button variant="contained" onClick={handleFollow}>
                        {(isFollowing) ? "Unfollow" :"Follow"}
                    </Button>
                </Box>
                }
                <Grid container spacing={4} padding={3} alignItems="center" justifyContent="center">
                    <Grid item>
                        <Button onClick={handleFollowingOpen}>
                            Following {followingCount}
                        </Button>                                
                    </Grid>
                    <Grid item>
                        <Button onClick={handleFollowerOpen}>
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