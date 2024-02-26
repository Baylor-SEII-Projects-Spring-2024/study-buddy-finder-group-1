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
                    <Typography variant="h3" component="h1" gutterBottom style={{ fontWeight: 'bold' }}>
                        Our Mission
                    </Typography>
                    <Typography variant="body1" style={{ fontSize: '1.4rem' }}>
                        At StudyBuddies, Inc., our mission is to revolutionize the way students and tutors connect,
                        collaborate, and succeed academically. We are dedicated to creating a dynamic, user-friendly
                        platform that facilitates the planning and scheduling of on- and off-campus study sessions,
                        seamlessly bringing together individuals with shared academic goals and interests. By
                        leveraging innovative technology, we aim to provide a personalized experience that allows
                        users to easily find study buddies, recommend ideal study locations, and foster a community
                        of learners who support one another. We believe that by making it easier for students and
                        tutors to collaborate, we can enhance the educational experience at Baylor and beyond,
                        helping every user to achieve their full academic potential. Our commitment extends beyond
                        mere functionality; we strive to empower our users with the tools and resources they need
                        to excel, making StudyBuddies, Inc. an integral part of their academic journey.
                    </Typography>
                </Container>
            </Box>

            {/* Add spacing between main content and footer */}
            <Box height={100} /> {/* Adjust height as needed for spacing */}

        </div>
    );
};

export default OurMissionPage;
