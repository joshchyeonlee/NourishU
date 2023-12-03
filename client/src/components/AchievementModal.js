import { Modal, Box, Typography, IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

const modalFormat = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    borderRadius: 5,
};

const AchievementModal = (props) => {
    return (
        <Modal
            open={props.open}
            onClose={props.onClose}    
        >
            <Box sx={modalFormat} display="flex" justifyContent="center" flexDirection="column" textAlign="center">
                <Box position="absolute" top={20} right={20}>
                    <IconButton onClick={props.onClose}>
                        <CloseIcon/>
                    </IconButton>
                </Box>
                <Typography variant="h5">Achievement</Typography>
                <Box padding={4}>
                    <Typography variant="h6">{props.value ? props.value.Name : ""}</Typography>
                    <Typography padding={1}>{props.value ? props.value.Description : ""}</Typography>
                </Box>
                <Box padding={2}>
                    <Typography>Time earned</Typography>
                    <Typography>{props.value ? props.value.TimeEarned : ""}</Typography>
                </Box>
            </Box>

        </Modal>
    )
}

export default AchievementModal;