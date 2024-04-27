import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import Navbar from "@/components/Navbar";

const FAQ = () => {
    // Custom style for the text
    const textStyle = {
        fontFamily: "'Roboto', sans-serif",
        fontSize: '3rem', // Increase font size
        textAlign: 'center', // Center the title text
        padding: '20px 0', // Add padding top and bottom
    };

    return (
        <div>
            <Navbar showLinks={false} />
            <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" style={{ minHeight: '80vh', paddingTop: '15vh' }}>
                <Container maxWidth="md">
                    <Typography variant="h4" gutterBottom style={textStyle}>
                        Frequently Asked Questions
                    </Typography>
                    <Typography variant="h5" gutterBottom style={{ textAlign: 'left', fontSize: '2rem' }}>
                        <strong>Question:</strong> What is StudyBuddies, Inc.?
                    </Typography>
                    <Typography variant="body1" gutterBottom style={{ textAlign: 'left', paddingTop: '20px', fontSize: '1.6rem' }}>
                        <strong>Answer:</strong> StudyBuddies, Inc. is a platform dedicated to creating a custom experience for students and tutors to plan study sessions anywhere, on-campus.
                    </Typography>
                    <Typography variant="h5" gutterBottom style={{ textAlign: 'left', paddingTop: '20px', fontSize: '2rem' }}>
                        <strong>Question:</strong> How can I become a study buddy?
                    </Typography>
                    <Typography variant="body1" gutterBottom style={{ textAlign: 'left', paddingTop: '20px', fontSize: '1.6rem' }}>
                        <strong>Answer:</strong> You can become a study buddy by registering on our platform and connecting with other users who share similar class(es) and/or area(s) of study.
                    </Typography>
                    <Typography variant="h5" gutterBottom style={{ textAlign: 'left', paddingTop: '20px', fontSize: '2rem' }}>
                        <strong>Question:</strong> Can I recommend study locations on StudyBuddies?
                    </Typography>
                    <Typography variant="body1" gutterBottom style={{ textAlign: 'left', paddingTop: '20px', fontSize: '1.6rem' }}>
                        <strong>Answer:</strong> Yes, you can recommend study locations to other users. Simply add your recommended locations to your profile, and they will be visible to other users with similar study preferences.
                    </Typography>
                    <Typography variant="h5" gutterBottom style={{ textAlign: 'left', paddingTop: '20px', fontSize: '2rem' }}>
                        <strong>Question:</strong> Is StudyBuddies free to use?
                    </Typography>
                    <Typography variant="body1" gutterBottom style={{ textAlign: 'left', paddingTop: '20px', fontSize: '1.6rem' }}>
                        <strong>Answer:</strong> Yes, StudyBuddies is completely free to use for both students and tutors.
                    </Typography>
                </Container>
            </Box>
            <Box height={100} />
        </div>
    );
};

export default FAQ;