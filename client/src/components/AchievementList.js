import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PostAddIcon from '@mui/icons-material/PostAdd';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import PlaylistRemoveIcon from '@mui/icons-material/PlaylistRemove';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';

const AchievementList = (props) => {
    if(props.val.AchievementID === 0) return <PersonAddIcon/>
    else if(props.val.AchievementID === 1) return <RestaurantIcon/>
    else if(props.val.AchievementID === 2) return <AssignmentTurnedInIcon/>
    else if(props.val.AchievementID === 3) return <PostAddIcon/>
    else if(props.val.AchievementID === 4) return <PlaylistRemoveIcon/>
    else if(props.val.AchievementID === 5) return <PlaylistAddIcon/>
}

export default AchievementList;