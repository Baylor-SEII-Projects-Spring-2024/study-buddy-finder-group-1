import React, { useEffect, useState } from 'react';
import { Box, Container, Typography, Avatar, Grid, Divider } from '@mui/material';
import Navbar from "@/components/Navbar";
import axios from 'axios'; // Import Axios for making API requests


const axiosInstance = axios.create({
    //baseURL: 'http://localhost:8080', // Replace this with your backend server URL
    baseURL: 'http://34.125.65.178:8080', // Replace this with your backend server URL

    timeout: 5000, // Optional: Set a timeout for requests (in milliseconds)
    // Other default configuration options can be added here
});

const ProfilePage = () => {

    const [loginInfo, setLoginInfo] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    });

    // ------------- New way of identifying logged in user by id -------------
    useEffect(() => {
        const fetchLoginInfo = async () => {
            try {
                const user = JSON.parse(localStorage.getItem('user'));
                const userId = user.id;

                if (userId) {
                    const basePath = 'http://localhost:8080';
                    const response = await axiosInstance.get(`/ProfilePage/${userId}`);
                    setLoginInfo(response.data);
                } else {
                    console.error('No user ID found in localStorage');
                }
            } catch (error) {
                console.error('Error fetching login info:', error);
            }
        };

        fetchLoginInfo();
    }, []);

    const textStyle = {
        fontFamily: "'Roboto', sans-serif",
        fontSize: '1.5rem', // Increased font size
    };

    return (
        <div>
            <Navbar showLinks={false} />
            <Box display="flex" flexDirection="column" alignItems="center" style={{ minHeight: '80vh', paddingTop: '15vh' }}>
                <Container maxWidth="md" style={textStyle}>
                    <Typography variant="h3" component="h1" gutterBottom style={{ ...textStyle, fontWeight: 'bold', textAlign: 'center', fontSize: '3rem' }}>
                        My Profile
                    </Typography>
                    {loginInfo && (
                        <>
                            <Avatar src="/Images/Profile%20Pic.webp" alt="Profile Picture" sx={{ width: 150, height: 150, mb: 2 }} />

                            <Typography variant="subtitle1" gutterBottom style={{ ...textStyle, textAlign: 'center', fontWeight: 'bold', display: 'inline' }}>
                                Last Login: {' '}
                            </Typography>
                            <Typography variant="body1" gutterBottom style={{ ...textStyle, marginLeft: '10px', display: 'inline' }}>
                                {loginInfo.lastLogin && new Date(loginInfo.lastLogin).toLocaleString()} {/* Parse date and time */}
                            </Typography>

                            <Divider style={{ margin: '20px 0' }} />

                            <Grid container spacing={2}>
                                <Grid item xs={12}>

                                    <Typography variant="subtitle1" gutterBottom style={{ ...textStyle, fontWeight: 'bold', display: 'inline' }}>
                                        First Name: {' '}
                                    </Typography>
                                    <Typography variant="body1" gutterBottom style={{ ...textStyle, marginLeft: '10px', display: 'inline' }}>
                                        {loginInfo.firstName}
                                    </Typography>
                                    <br/>
                                    <Typography variant="subtitle1" gutterBottom style={{ ...textStyle, fontWeight: 'bold', display: 'inline' }}>
                                        Last Name: {' '}
                                    </Typography>
                                    <Typography variant="body1" gutterBottom style={{ ...textStyle, marginLeft: '10px', display: 'inline' }}>
                                        {loginInfo.lastName}
                                    </Typography>
                                    <br/>
                                    <Typography variant="subtitle1" gutterBottom style={{ ...textStyle, fontWeight: 'bold', display: 'inline' }}>
                                        User Type: {' '}
                                    </Typography>
                                    <Typography variant="body1" gutterBottom style={{ ...textStyle, marginLeft: '10px', display: 'inline' }}>
                                        {loginInfo.userType}
                                    </Typography>
                                    <br/>
                                    <Typography variant="subtitle1" gutterBottom style={{ ...textStyle, fontWeight: 'bold', display: 'inline' }}>
                                        Email: {' '}
                                    </Typography>
                                    <Typography variant="body1" gutterBottom style={{ ...textStyle, marginLeft: '10px', display: 'inline' }}>
                                        {loginInfo.email_address}
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