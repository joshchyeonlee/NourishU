import { Box, Typography, Modal, List, ListItem, ListItemButton, IconButton } from "@mui/material";
import Close from '@mui/icons-material/Close';
import { useNavigate } from "react-router-dom";

const modalFormat = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    height: 500,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    borderRadius: 5,
};

const ListModal = (props) => {
    const handleViewUser = (userID) => {
        props.setUserId(userID);
        props.onClose();
    }

    return(
    <Modal open={props.open} onClose={props.onClose}>
        <Box sx={modalFormat} display="flex" flexDirection="column" alignItems="center">
            <Box sx={{position: "absolute", top:20, right: 20}}>
                <IconButton onClick={props.onClose}>
                    <Close/>
                </IconButton>
            </Box>
            <Typography padding={1} variant="h5">Following</Typography>
            <Box sx={{width:"100%"}}>
                <List>
                    {props.values.map((value, key) => {
                        return(
                        <ListItemButton key={key} onClick={() => handleViewUser(value.UserID)}>
                            <ListItem disablePadding>
                                <Typography>
                                    {value.UserName}
                                </Typography>
                            </ListItem>
                        </ListItemButton>
                        )
                    })}
                </List>
            </Box>
        </Box>
    </Modal>
    )
}

export default ListModal;