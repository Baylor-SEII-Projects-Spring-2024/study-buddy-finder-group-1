import React from 'react';
import { Box, Container, Typography, Button } from '@mui/material';
import Navbar from "@/components/Navbar";

const AboutUs = () => {
    // Our custom style for the text
    const textStyle = {
        fontFamily: "'Roboto', sans-serif",
        fontSize: '3rem', // Increase font size
        textAlign: 'center',
        padding: '20px 0', // Add padding top and bottom
    };

    return (
        <div>
            <Navbar showLinks={false} />
            <Container maxWidth="md" style={{ marginTop: '150px' }}>
                <Box mt={5} pb={10}>
                    <Typography variant="h4" gutterBottom style={textStyle}>
                        About Us
                    </Typography>
                    <Typography variant="body1" gutterBottom style={{ textAlign: 'left', paddingTop: '20px', fontSize: '1.6rem' }}>
                        StudyBuddies, Inc. is dedicated to creating a custom experience for students and tutors alike. Our mission is to provide a platform that facilitates planning study sessions anywhere, on- and off-campus.
                    </Typography>
                    <Typography variant="body1" gutterBottom style={{ textAlign: 'left', paddingTop: '20px', fontSize: '1.6rem' }}>
                        We aim to connect users with like-minded individuals to become "study buddies", enabling them to create and schedule meetups, recommend locations to study at, and more.
                    </Typography>
                    <Typography variant="body1" gutterBottom style={{ textAlign: 'left', paddingTop: '20px', fontSize: '1.6rem' }}>
                        Our user-friendly web app allows users to register under the appropriate classification, input their class(es) and/or area(s) of study, and find other students or tutors with similar profiles. Additionally, our team continuously enhances the application with new features to meet the evolving needs of our users.
                    </Typography>
                </Box>
            </Container>
        </div>
    );
};

export default AboutUs;
