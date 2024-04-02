import React, { useEffect, useState } from 'react';
import { Box, Container, Typography, Rating, TextField, Button, MenuItem, FormControl, InputLabel, Select } from '@mui/material';
import Navbar from "@/components/Navbar";
import axios from 'axios';

const ReviewTutor = () => {
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [selectedMeetingId, setSelectedMeetingId] = useState('');
    const [meetings, setMeetings] = useState([]);

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
        const reviewData = {
            meetingId: selectedMeetingId,
            rating,
            comment,
            reviewDate: new Date(),
        };

        axios.post('http://localhost:8080/api/reviews', reviewData)
            .then(response => console.log('Review submitted:', response.data))
            .catch(error => console.error('There was an error submitting the review:', error));

        // Reset the form after submission
        setRating(0);
        setComment('');
        setSelectedMeetingId('');
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

                        {/* Dynamically display the tutor's name */}
                        {selectedMeeting && (
                            <Typography sx={{ marginBottom: 2 }}>
                                Tutor: {selectedMeeting.tutorName}
                            </Typography>
                        )}

                        {/* Other form fields like rating and comment */}
                        <Rating name="rating" value={rating} onChange={(event, newValue) => setRating(newValue)} precision={0.5} sx={{ marginBottom: 2 }} />
                        <TextField label="Write your review" multiline rows={4} variant="outlined" value={comment} onChange={(event) => setComment(event.target.value)} fullWidth margin="normal" sx={{ marginBottom: 2 }} />
                        <Button onClick={handleSubmitReview} variant="contained" color="primary">
                            Submit Review
                        </Button>
                    </Box>
                </Box>
            </Container>
        </div>
    );
};

export default ReviewTutor;