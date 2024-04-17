import React, { useEffect, useState } from 'react';
import { Box, Container, Typography, Rating, TextField, Button, MenuItem, FormControl, InputLabel, Select, Dialog,
         DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import Navbar from "@/components/Navbar";
import axios from 'axios';

const ReviewTutor = () => {

    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [selectedMeetingId, setSelectedMeetingId] = useState('');
    const [meetings, setMeetings] = useState([]);
    const [selectedTutorId, setSelectedTutorId] = useState('');
    const [openDialog, setOpenDialog] = useState(false);


    // Mock data for tutors
    const [tutors, setTutors] = useState([
        { id: 't1', name: 'Emma Johnson' },
        { id: 't2', name: 'Sophia Martinez' },
        { id: 't3', name: 'Ava Smith' },
        { id: 't4', name: 'Oliver Kowalski' },
        { id: 't5', name: 'Isabella Garcíaz' },
        { id: 't6', name: 'Mia Rodriguez' }
    ]);

    const handleTutorChange = (event) => {
        setSelectedTutorId(event.target.value);
    };

    // Fetches the meetings for a given user
    useEffect(() => {
        const fetchMeetings = async () => {

            // Attempt to parse user item from localStorage
            const user = JSON.parse(localStorage.getItem('user'));

            // Check if user is null or doesn't have an id property
            if(!user || !user.id){
                //User is not logged in or storage format is incorrect, so nothing will happen
                console.log("User not logged in or user data is invalid");
            } else {
                // Since user exists and has an id, proceed to fetch meetings
                console.log("User id to pass to backend for fetching meetups: " + user.id);
                const response = await axios.get(`http://localhost:8080/meetings/user/${user.id}`);
                setMeetings(response.data);
            }
        };
        fetchMeetings();
    }, []);

    const handleMeetingChange = (event) => {
        setSelectedMeetingId(event.target.value);
    };

    const handleSubmitReview = () => {
        if (selectedMeetingId && rating > 0 && comment && selectedTutorId) {
            const reviewData = {
                meetingId: selectedMeetingId,
                rating,
                comment,
                reviewDate: new Date(),
            };

            console.log('Review submitted:', reviewData); // Simulating a successful submission
            setOpenDialog(true); // Open the dialog on success

            // Reset the form after submission
            setRating(0);
            setComment('');
            setSelectedMeetingId('');
            setSelectedTutorId('');
        } else {
            alert('Please fill all the fields before submitting the review.');
        }
    };

    // Find the selected meeting to display the tutor's name
    const selectedMeeting = meetings.find(meeting => meeting.id === selectedMeetingId);

    return (
        <div style={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Navbar showLinks={false} />
            <Container maxWidth="md">
                <Box mt={5}>
                    <Typography variant="h4" align="center" gutterBottom>
                        Review Tutor
                    </Typography>
                    <Box display="flex" flexDirection="column" alignItems="center">

                        {/* Meeting Selection Dropdown */}
                        <FormControl fullWidth variant="outlined" sx={{ marginBottom: 2 }}>
                            <InputLabel id="meeting-select-label">Select Meeting</InputLabel>
                            <Select
                                labelId="meeting-select-label"
                                id="meeting-select"
                                value={selectedMeetingId}
                                onChange={handleMeetingChange}
                                label="Select Meeting"
                            >
                                {meetings.map(meeting => (
                                    <MenuItem key={meeting.id} value={meeting.id}>
                                        Meeting on {meeting.date} at {meeting.timeSlot}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        {/* Tutor Selection Dropdown */}
                        <FormControl fullWidth variant="outlined" sx={{ marginBottom: 2 }}>
                            <InputLabel id="tutor-select-label">Select Tutor</InputLabel>
                            <Select
                                labelId="tutor-select-label"
                                id="tutor-select"
                                value={selectedTutorId}
                                onChange={handleTutorChange}
                                label="Select Tutor"
                            >
                                {tutors.map(tutor => (
                                    <MenuItem key={tutor.id} value={tutor.id}>
                                        {tutor.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        {/* Rating Instruction */}
                        <Typography variant="subtitle1" gutterBottom sx={{ marginBottom: 1 }}>
                            Please rate the selected tutor out of 5 stars
                        </Typography>

                        {/* Other form fields like rating and comment */}
                        <Rating name="rating" value={rating} onChange={(event, newValue) => setRating(newValue)} precision={0.5} sx={{ marginBottom: 2 }} />
                        <TextField label="Write your review" multiline rows={4} variant="outlined" value={comment}
                                   onChange={(event) => setComment(event.target.value)}
                                   fullWidth margin="normal" sx={{ marginBottom: 2 }} />
                        <Button onClick={handleSubmitReview} variant="contained" color="primary">
                            Submit Review
                        </Button>
                    </Box>

                    <Dialog
                        open={openDialog}
                        onClose={() => setOpenDialog(false)} // This allows closing on clicking outside or pressing escape
                    >
                        <DialogTitle>{"Submission Successful"}</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                Your review has been submitted successfully!
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => setOpenDialog(false)} color="primary">
                                Close
                            </Button>
                        </DialogActions>
                    </Dialog>

                </Box>
            </Container>
        </div>
    );
};

export default ReviewTutor;