import React, { useEffect, useState } from 'react';
import { Box, Container, Typography, Rating, Button, MenuItem, FormControl, InputLabel, Select } from '@mui/material';
import Navbar from "@/components/Navbar";
import axios from 'axios';

const ReviewTutor = () => {
    const [rating, setRating] = useState(0);
    const [selectedTutorId, setSelectedTutorId] = useState('');
    const [tutors, setTutors] = useState([]);

    // fetches all tutors when the component mounts
    useEffect(() => {
        axios.get(`http://localhost:8080/users/tutors`)
            .then(response => {
                setTutors(response.data);
            })
            .catch(error => console.error('Error fetching tutors:', error));
    }, []);

    const handleSubmitReview = () => {
        if (!selectedTutorId || rating <= 0) {
            alert('Please select a tutor and provide a valid rating.');
            return;
        }

        const url = `http://localhost:8080/api/reviews/rate-tutor?userId=${selectedTutorId}&rating=${rating}`;

        axios.post(url)
            .then(response => {
                console.log('Review submitted:', response.data);
                alert('Tutor successfully rated!'); // Simple alert notification
                setRating(0);
                setSelectedTutorId(''); // Reset after submission
            })
            .catch(error => {
                console.error('There was an error submitting the review:', error.response?.data || 'Unknown error');
                alert('Failed to submit the review.'); // Alert on error
            });
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
                                value={selectedTutorId}
                                onChange={(event) => setSelectedTutorId(event.target.value)}
                                label="Select Tutor"
                            >
                                {tutors.map(tutor => (
                                    <MenuItem key={tutor.id} value={tutor.id}>
                                        {tutor.firstName} {tutor.lastName}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <Rating
                            name="rating"
                            value={rating}
                            onChange={(event, newValue) => setRating(newValue)}
                            precision={0.5}
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