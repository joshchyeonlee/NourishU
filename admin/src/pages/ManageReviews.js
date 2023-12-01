import { Typography, Box, Button, Card, CardContent, IconButton, Modal } from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';

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

const ManageReviews = () => {
    const [flaggedReviews, setFlaggedReviews] = useState([]);
    const [allReviews, setAllReviews] = useState([]);
    const [reviewsOpen, setReviewsOpen] = useState(false);
    
    const fetchFlaggedReviews = async () => {
        try{
            const res = await axios.get("http://localhost:3001/fetchFlaggedReviews");
            setFlaggedReviews(res.data);
        } catch (err) {
            throw(err);
        }
    }

    const fetchAllReviews = async () => {
        try{
            const res = await axios.get("http://localhost:3001/fetchAllReviews");
            setAllReviews(res.data);
        } catch (err) {
            throw(err);
        }
    }

    const deleteReview = async (reviewId, i) => {
        const review = {
            ReviewID: reviewId,
        }
        try{
            await axios.post("http://localhost:3001/deleteReview", review);
            const newFlaggedReviews = [...flaggedReviews];
            newFlaggedReviews.splice(i, 1);
            setFlaggedReviews(newFlaggedReviews);    
        } catch (err) {
            throw(err);
        }
    }

    const unflagReview = async (reviewId, i) => {
        const review = {
            ReviewID: reviewId,
        }
        try{
            await axios.post("http://localhost:3001/unflagReview", review);
            const newFlaggedReviews = [...flaggedReviews];
            newFlaggedReviews.splice(i, 1);
            setFlaggedReviews(newFlaggedReviews);
        } catch (err) {
            throw (err);
        }
    }

    const flagReview = async (reviewId, flag, i) => {
        const review = {
            ReviewID: reviewId,
            ReviewFlagged: flag,
        }
        try{
            await axios.post("http://localhost:3001/flagReview", review);
            const newReviews = [...allReviews];
            (newReviews[i].ReviewFlagged.data[0] === 1) ? newReviews[i].ReviewFlagged.data[0] = 0 : newReviews[i].ReviewFlagged.data[0] = 1;
            setAllReviews(newReviews);
            const newFlagged = newReviews.filter((val) => val.ReviewFlagged.data[0] === 1);
            setFlaggedReviews(newFlagged);

            console.log(newReviews);
            console.log(newFlagged);
        } catch (err) {
            throw (err);
        }

    }

    const handleDelete = (reviewId, i) => {
        deleteReview(reviewId, i);
    }

    const handleUnflag = (review, i) => {
        if(review.ReviewFlagged.data[0] !== 1) return;
        unflagReview(review.ReviewID, i);
    }

    const handleFlagToggle = (review, i) => {
        flagReview(review.ReviewID, review.ReviewFlagged.data[0], i);
    }

    const handleClose = () => {
        setReviewsOpen(false);
    }

    useEffect(() => {
        fetchFlaggedReviews();
    }, []);

    useEffect(() => {
        fetchAllReviews();
        fetchFlaggedReviews();
    }, [reviewsOpen])
    
    return(
        <div>
        <Modal open={reviewsOpen} onClose={handleClose}>
            <Box sx={modalFormat} display="flex" justifyContent="center" padding={4} flexDirection="column" alignItems="center">
                <IconButton sx={{ position:"absolute", right:10, top:10}} onClick={(handleClose)}>
                    <CloseIcon/>
                </IconButton>
                <Typography variant="h5">All Reviews</Typography>
                <Box display="flex" padding={2} flexDirection="column" sx={{height:500, width:"100%", overflowY: "auto"}}>
                    {allReviews.map((val, key) => {console.log(key); return(
                        <Box display="flex" padding={2} flexDirection="column">
                            <Box display="flex" justifyContent="space-between">
                                <Typography variant="h6">{val.RComment}</Typography>
                                <Button onClick={() => handleFlagToggle(val, key)}>{val.ReviewFlagged.data[0] === 1 ? "Unflag" : "Flag"}</Button>
                            </Box>
                            <Typography>By: {val.UserName}</Typography>
                        </Box>
                    )})}
                </Box>
            </Box>
        </Modal>
        <Box display="flex" justifyContent="center" padding={4} flexDirection="column" alignItems="center">
            <IconButton sx={{position: "absolute", top:10, left: 10}}
                component={Link}
                to={{pathname:"/admin"}}>
                <ArrowBackIcon fontSize="large"/>
            </IconButton>
            <Typography variant="h5">Manage Reviews</Typography>
            <Button onClick={() => setReviewsOpen(true)}>View All Reviews</Button>
            <Box display="flex" justifyContent="center" padding={4} flexDirection="column" alignItems="center" sx={{width:"100%"}}>
                {flaggedReviews.length > 0 ? 
                    flaggedReviews.map((val, key) => { return(
                        <Box padding={1} key={key} sx={{width:"50%"}}>
                            <Card variant="outlined">
                                <CardContent>
                                    <Box paddingTop={1} display="flex" flexDirection="column" alignItems="center">
                                        <Typography variant="h6">Review: {val.RComment}</Typography>
                                        <Box paddingTop={4} display="flex" flexDirection="column" alignItems="center" sx={{width:"100%"}}>
                                            <Typography>User: {val.UserName}</Typography>
                                            <Typography>Flagged By Admin: {val.AdminName}</Typography>
                                            <Box display="flex" justifyContent="space-between" sx={{width: "50%"}} paddingTop={4}>
                                                <Button variant="contained" color="error" onClick={() => handleDelete(val.ReviewID, key)}>Delete</Button>
                                                <Button variant="contained" onClick={() => handleUnflag(val, key)}>Unflag</Button>
                                            </Box>
                                        </Box>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Box>
                    )})
                : <Typography>No Reviews Flagged!</Typography>}
            </Box>
        </Box>
        </div>
    )
}

export default ManageReviews;