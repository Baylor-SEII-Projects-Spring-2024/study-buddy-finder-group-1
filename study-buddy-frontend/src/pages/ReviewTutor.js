import React, { useState } from 'react';
import { Box, Container, Typography, Rating, TextField, Button, MenuItem, FormControl, InputLabel, Select } from '@mui/material';
import Navbar from "@/components/Navbar";

const ReviewTutor = () => {
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [selectedTutor, setSelectedTutor] = useState('');

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
        // Code to submit review
        console.log(`Tutor: ${selectedTutor}, Rating: ${rating}, Comment: ${comment}`);
        // You can add your logic to submit the review to the server
        // Reset the form after submission
        setRating(0);
        setComment('');
        setSelectedTutor('');
    };

    // Sample list of tutors from recent study sessions
    const tutors = ['John Doe', 'Jane Smith', 'Alice Johnson'];

    //Our custom style for the text
    const textStyle = {
        fontFamily: "'Roboto', sans-serif",
    };

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

export default ReviewTutor;
