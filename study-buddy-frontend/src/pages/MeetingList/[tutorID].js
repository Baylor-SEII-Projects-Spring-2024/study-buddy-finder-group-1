import React, { useEffect, useState } from 'react';
import { Box, Container, Typography, Rating, Button, MenuItem, FormControl, InputLabel, Select } from '@mui/material';
import Navbar from "@/components/Navbar";
import axios from 'axios';
import { useRouter } from 'next/router';

const ReviewTutor = () => {
    const [rating, setRating] = useState(0);
    const [tutor, setTutor] = useState('');
    const router = useRouter();
    const { tutorID } = router.query;

    //fetches tutor when the component mounts
    useEffect(() => {
        const fetchTutor = async () => {
            const basePath = 'http://localhost:8080';
            try {
                const response = await axios.get(`${basePath}/tutors/${tutorID}`);
                setTutor(response.data);
                console.log(response.data);
            } catch (error) {
                console.error("Error fetching tutor:", error);
            }
        };
        fetchTutor();
    }, []);

    useEffect(() => {
        console.log("Updated tutor:", tutor);
    }, [tutor]);

    const handleSubmitReview = async () => {
        console.log(rating);

        //parse the meeting id and user from storage
        const meetingId = JSON.parse(localStorage.getItem('meetingId'));
        const user = JSON.parse(localStorage.getItem('user'));

        try {
            const response = await axios.post(`http://localhost:8080/review/${tutorID}`, null, {
                params: {
                    rating: rating,
                    meetingId: meetingId,
                    studentId: user.id
                }
            });

            console.log('Review submitted:', response.data);
            alert('Tutor successfully rated!'); // Simple alert notification
            setRating(0);

        } catch (error) {
            console.error('There was an error submitting the review:', error.response?.data || 'Unknown error');
            alert('Failed to submit the review.'); // Alert on error
        }
    };

    return (
        <div style={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Navbar showLinks={false} />
            <Container maxWidth="md">
                <Box mt={5}>
                    <Typography variant="h4" align="center" gutterBottom>
                        Review {tutor.firstName} {tutor.lastName}
                    </Typography>
                    <Box display="flex" flexDirection="column" alignItems="center">

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