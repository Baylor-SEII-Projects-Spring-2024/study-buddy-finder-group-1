import React, {useEffect, useState} from 'react';
import { Box, Container, Typography, Rating, TextField, Button, MenuItem, FormControl, InputLabel, Select } from '@mui/material';
import Navbar from "@/components/Navbar";
import axios from 'axios';

const ReviewTutor = () => {

    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [selectedTutor, setSelectedTutor] = useState('');
    const [meetings, setMeetings] = useState([]);

    const handleRatingChange = (event, newValue) => {
        setRating(newValue);
    };

    const handleCommentChange = (event) => {
        setComment(event.target.value);
    };

    const handleTutorChange = (event) => {
        setSelectedTutor(event.target.value);
    };

    const handleSubmitReview = () => {
        const reviewData = {
            tutor: selectedTutor,
            rating,
            comment,
            reviewDate: new Date(),
        };

        axios.post('http://localhost:8080/api/reviews', reviewData)
            .then(response => {
                console.log('Review submitted:', response.data);
                // Reset the form after submission
                setRating(0);
                setComment('');
                setSelectedTutor('');
            })
            .catch(error => console.error('There was an error submitting the review:', error));
    };

    // ----------- Fetches the meetings for a given user -----------
    useEffect(() => {
        const fetchMeetings = async () => {
            try {
                const user = JSON.parse(localStorage.getItem('user'));
                const userId = user.id;

                if (userId) {
                    const response = await axios.get(`http://localhost:8080/meetings/user/${userId}`);
                    setMeetings(response.data);
                } else {
                    console.error('No user ID found in localStorage');
                }
            } catch (error) {
                console.error('There was an error fetching the meetings:', error);
            }
        };
        fetchMeetings();
    }, []);


    // Sample list of tutors from recent study sessions
    const tutors = ['John Doe', 'Jane Smith', 'Alice Johnson'];

    //Our custom style for the text
    const textStyle = {
        fontFamily: "'Roboto', sans-serif",
    };

    return (
        <div style={{minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <Navbar showLinks={false}/>
            <Container maxWidth="md">
                <Box mt={5}>
                    <Typography variant="h4" align="center" gutterBottom>
                        Review Tutor
                    </Typography>
                    <Box display="flex" flexDirection="column" alignItems="center">
                        {/* Tutor Selection Dropdown */}
                        <FormControl fullWidth variant="outlined" sx={{marginBottom: 2}}>
                            <InputLabel id="tutor-select-label">Select Tutor</InputLabel>
                            <Select
                                labelId="tutor-select-label"
                                id="tutor-select"
                                value={selectedTutor}
                                onChange={handleTutorChange}
                                label="Select Tutor"
                            >
                                {meetings.map(meeting => (
                                    <MenuItem key={meeting.id} value={meeting.tutorId}>{meeting.tutorName}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        {/* Other form fields like rating and comment */}
                        <Rating
                            name="rating"
                            value={rating}
                            onChange={handleRatingChange}
                            precision={0.5}
                            sx={{marginBottom: 2}}
                        />
                        <TextField
                            label="Write your review"
                            multiline
                            rows={4}
                            variant="outlined"
                            value={comment}
                            onChange={handleCommentChange}
                            fullWidth
                            margin="normal"
                            sx={{marginBottom: 2}}
                        />
                        <Button onClick={handleSubmitReview} variant="contained" color="primary">
                            Submit Review
                        </Button>
                    </Box>
                </Box>
            </Container>
        </div>
    );
}
export default ReviewTutor;

    /* ----------------------------- MOCK DATA -----------------------------
    return (
        <div style={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Navbar showLinks={false} />
            <Container maxWidth="md">
                <Box mt={5}>
                    <Typography variant="h4" align="center" gutterBottom>
                        Review Tutor
                    </Typography>
                    <Box display="flex" flexDirection="column" alignItems="center">
                        <FormControl fullWidth variant="outlined" sx={{ marginBottom: 2 }}>
                            <InputLabel id="tutor-select-label">Select Tutor</InputLabel>
                            <Select
                                labelId="tutor-select-label"
                                id="tutor-select"
                                value={selectedTutor}
                                onChange={handleTutorChange}
                                label="Select Tutor"
                            >
                                {tutors.map(tutor => (
                                    <MenuItem key={tutor} value={tutor}>{tutor}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <Rating
                            name="rating"
                            value={rating}
                            onChange={handleRatingChange}
                            precision={0.5}
                            sx={{ marginBottom: 2 }}
                        />
                        <TextField
                            label="Write your review"
                            multiline
                            rows={4}
                            variant="outlined"
                            value={comment}
                            onChange={handleCommentChange}
                            fullWidth
                            margin="normal"
                            sx={{ marginBottom: 2 }}
                        />
                        <Button onClick={handleSubmitReview} variant="contained" color="primary">
                            Submit Review
                        </Button>
                    </Box>
                </Box>
            </Container>
        </div>
    );
};
*/