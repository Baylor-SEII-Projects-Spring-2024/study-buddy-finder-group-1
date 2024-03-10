
import React, { useEffect, useState } from 'react';
import { Box, Container, Typography, Avatar, Grid, Divider } from '@mui/material';
import Navbar from "@/components/Navbar";
import axios from 'axios'; // Import Axios for making API requests

const ProfilePage = () => {
    const [loginInfo, setLoginInfo] = useState(null); // State to store login information

    useEffect(() => {
        // Function to fetch user login information
        const fetchLoginInfo = async () => {
            try {
                const response = await axios.get('/profile'); // Endpoint to retrieve user login info
                setLoginInfo(response.data); // Set the login info state
            } catch (error) {
                console.error('Error fetching login info:', error);
            }
        };

        fetchLoginInfo(); // Call the function to fetch login info when component mounts
    }, []);

    // Our custom style for the text
    const textStyle = {
        fontFamily: "'Roboto', sans-serif",
    };

    return (
        <div>
            <Navbar showLinks={false} />
            <Box display="flex" flexDirection="column" alignItems="center" style={{ minHeight: '80vh', paddingTop: '15vh' }}>
                <Container maxWidth="md" style={textStyle}>
                    <Typography variant="h3" component="h1" gutterBottom style={{ ...textStyle, fontWeight: 'bold', textAlign: 'center' }}>
                        My Profile
                    </Typography>
                    {loginInfo && ( // Check if loginInfo is available before rendering
                        <>
                            <Avatar src="/Images/Profile%20Pic.webp" alt="Profile Picture" sx={{ width: 150, height: 150, mb: 2 }} />
                            <Typography variant="h3" component="h1" gutterBottom style={{ ...textStyle, fontWeight: 'bold', textAlign: 'center' }}>
                                {loginInfo.firstName} {loginInfo.lastName}
                            </Typography>
                            <Typography variant="h5" gutterBottom style={{ ...textStyle, textAlign: 'center' }}>
                                {loginInfo.userType}
                            </Typography>
                            {/* Display User's Last Login */}
                            <Typography variant="body1" gutterBottom style={{ ...textStyle, textAlign: 'center' }}>
                                Last Login: {loginInfo.lastLogin}
                            </Typography>

                            {/* Divider */}
                            <Divider style={{ margin: '20px 0' }} />

                            {/* Other User Information */}
                            <Grid container spacing={2}>
                                <Grid item xs={12}>

                                    {/* Add other user info fields here */}
                                    <Typography variant="subtitle1" gutterBottom style={textStyle}>
                                        First Name:
                                    </Typography>
                                    <Typography variant="body1" gutterBottom style={{ ...textStyle, marginLeft: '10px' }}>
                                        {loginInfo.firstName}
                                    </Typography>
                                    <Typography variant="subtitle1" gutterBottom style={textStyle}>
                                        Last Name:
                                    </Typography>
                                    <Typography variant="body1" gutterBottom style={{ ...textStyle, marginLeft: '10px' }}>
                                        {loginInfo.lastName}
                                    </Typography>
                                    <Typography variant="subtitle1" gutterBottom style={textStyle}>
                                        User Type:
                                    </Typography>
                                    <Typography variant="body1" gutterBottom style={{ ...textStyle, marginLeft: '10px' }}>
                                        {loginInfo.userType}
                                    </Typography>
                                    <Typography variant="subtitle1" gutterBottom style={textStyle}>
                                        Email:
                                    </Typography>
                                    <Typography variant="body1" gutterBottom style={{ ...textStyle, marginLeft: '10px' }}>
                                        {loginInfo.emailAddress}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </>
                    )}
                </Container>
            </Box>
        </div>
    );
};

export default ProfilePage;