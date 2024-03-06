import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import Navbar from "@/components/Navbar";

const OurMissionPage = () => {

    // Custom styles for the text to match the StudyBuddies title font and to fill up more of the page
    const textStyle = {
        fontFamily: "'Roboto', sans-serif", // Assuming 'Roboto' is the font. Replace with the correct font if different.
        padding: '40px 0', // Increase padding to give more space. Adjust as needed.
    };

    return (
        <div>
            <Navbar showLinks={false} /> {/* Inserting navbar */}

            {/* Flex container to center content */}
            <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" style={{ minHeight: '80vh', paddingTop: '15vh' }}>
                <Container maxWidth="md" style={textStyle}>
                    <Typography variant="h3" component="h1" gutterBottom style={{ fontWeight: 'bold', textAlign: 'center', paddingBottom: '20px' }}>
                        Our Mission
                    </Typography>
                    <Typography variant="body1" style={{ fontSize: '1.4rem' }}>
                        StudyBuddies, Inc. aims to change how students and tutors meet and work together to do
                        well in school. We're working on a simple, efficient platform for arranging study times
                        both on and off campus, connecting people with similar study goals. Our goal is to use
                        new technology to make it easy for users to find study partners, suggest the best places
                        to study, and build a supportive community. We want to improve the way students and
                        tutors work together, making learning better at Baylor and elsewhere, and helping
                        everyone reach their highest academic potential. We're focused on providing the tools
                        and support needed for success, making StudyBuddies, Inc. a key part of students' and
                        tutors' educational paths.
                    </Typography>
                </Container>
            </Box>

            {/* Add spacing between main content and footer */}
            <Box height={100} /> {/* Adjust height as needed for spacing */}

        </div>
    );
};

export default OurMissionPage;
