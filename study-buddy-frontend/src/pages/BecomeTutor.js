import React from 'react';
import Link from 'next/link';
import { Box, Container, Typography, Button } from '@mui/material';
import Navbar from "@/components/Navbar";
import axios from "axios";

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8080', // Replace this with your backend server URL
    //baseURL: 'http://34.16.179.242:8080', // Replace this with your backend server URL
    timeout: 5000, // Optional: Set a timeout for requests (in milliseconds)
});

const WhyBecomeTutorPage = () => {
    // Our custom style for the text
    const textStyle = {
        fontFamily: "'Roboto', sans-serif",
        fontSize: '3rem', // Increase font size
        textAlign: 'left',
        padding: '20px 0', // Add padding top and bottom
    };

    return (
        <div>
            <Navbar showLinks={false} />
            <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" style={{ minHeight: '80vh', paddingTop: '15vh' }}>
                <Container maxWidth="md" style={textStyle}>
                    <Typography variant="h3" component="h1" gutterBottom style={{ textAlign: 'center' }}>
                        Why Become a Tutor?
                    </Typography>
                    <Typography variant="body1" gutterBottom style={{ textAlign: 'left', paddingTop: '20px', fontSize: '1.6rem' }}>
                        Becoming a tutor is a rewarding experience that allows you to share your knowledge, help others succeed, and develop valuable skills.
                    </Typography>
                    <Typography variant="body1" gutterBottom style={{ textAlign: 'left', paddingTop: '20px', fontSize: '1.6rem' }}>
                        As a tutor, you'll have the opportunity to make a positive impact on the lives of students and build confidence in your own abilities.
                    </Typography>
                    <Typography variant="body1" gutterBottom style={{ textAlign: 'left', paddingTop: '20px', fontSize: '1.6rem' }}>
                        Tutoring also enhances your own understanding of the subject matter, as teaching often requires a deeper understanding of the material.
                    </Typography>
                    <Box textAlign="center" marginTop="20px"> {/* Center the button */}
                        <Link href="/register" passHref>

                            <Button variant="contained" color="primary">
                                Register as a Tutor
                            </Button>
                        </Link>
                    </Box>
                </Container>
            </Box>
            <Box height={100} />
        </div>
    );
};

export default WhyBecomeTutorPage;