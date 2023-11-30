import { Button, Box, Typography, Modal, Grid, List, ListItem, ListItemButton } from "@mui/material";

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
    return(
        <Modal open={props.open} onClose={props.onClose}>
        <Box sx={modalFormat} display="flex" flexDirection="column" alignItems="center">
            <Typography padding={1} variant="h5">Following</Typography>
            <Box sx={{width:"100%"}}>
                <List>
                    {props.values.map((value, key) => {
                        return(
                        <ListItemButton key={key}>
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