import React, { useEffect, useState } from 'react';
import { Box, Container, Typography, Rating, TextField, Button, MenuItem, FormControl, InputLabel, Select } from '@mui/material';
import Navbar from "@/components/Navbar";
import axios from 'axios';

const ReviewTutor = () => {

    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [selectedMeetingId, setSelectedMeetingId] = useState('');
    const [meetings, setMeetings] = useState([]);
    const [selectedTutorId, setSelectedTutorId] = useState('');
    const [tutors, setTutors] = useState([]); // State to store tutors

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

    // Fetch tutors when a meeting is selected
    useEffect(() => {
        const fetchTutors = async () => {
            if(selectedMeetingId) {
                axios.get(`http://localhost:8080/tutors/meeting/${selectedMeetingId}`)
                    .then(response => {
                        setTutors(response.data);
                    })
                    .catch(error => {
                        console.error('Error fetching tutors:', error);
                    });
            }
        };
        fetchTutors();
    }, [selectedMeetingId]); // This effect depends on selectedMeetingId

    const handleMeetingChange = (event) => {
        setSelectedMeetingId(event.target.value); // Grabbing the meeting id from selected meetup, for the endpoint call
        // Reset tutors and selected tutor ID when meeting changes
        setTutors([]);
        setSelectedTutorId('');
    };

    const handleTutorChange = (event) => {
        setSelectedTutorId(event.target.value);
    };

    const handleSubmitReview = () => {
        const reviewData = {
            meetingId: selectedMeetingId,
            tutorId: selectedTutorId, // Includes tutorId
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

                        <FormControl fullWidth variant="outlined" sx={{ marginBottom: 2 }}>
                            <InputLabel id="tutor-select-label">Select Tutor</InputLabel>
                            <Select
                                labelId="tutor-select-label"
                                id="tutor-select"
                                value={selectedTutorId}
                                onChange={handleTutorChange}
                                label="Select Tutor"
                            >
                                {tutors.map((tutor) => (
                                    <MenuItem key={tutor.id} value={tutor.id}>
                                        {tutor.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        {/* Other form fields like rating and comment */}
                        <Typography variant="subtitle1" align="center" sx={{ marginBottom: 2 }}>
                            Please rate your tutor's performance
                        </Typography>
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