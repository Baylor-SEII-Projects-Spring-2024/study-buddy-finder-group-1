{/*
import React from 'react';
import {Box, Container, Typography} from '@mui/material';
import Navbar from "@/components/Navbar";

const ProfilePage = () => {

    //Our custom style for the text
    const textStyle = {
        fontFamily: "'Roboto', sans-serif",
    };

    return (
        <div>

            <Navbar showLinks={false} />

            <Box display = "flex" flexDirection = "column" justifyContent = "center" alignItems = "center" style = {{minHeight: '80vh', paddingTop: '15vh'}}>
                <Container maxWidth = "md" style = {textStyle}>
                    <Typography variant = "h3" component = "h1" gutterBottom style = {{ ...textStyle, fontWeight: 'bold', textAlign: 'center' }}>
                        [Profile Page]
                    </Typography>
                </Container>
            </Box>
            <Box height = {100} />

        </div>
    );
};

export default ProfilePage;
*/}
import React from 'react';
import { Box, Container, Typography, Avatar, Button, Grid, Divider } from '@mui/material';
import Navbar from "@/components/Navbar";

const ProfilePage = () => {

    // Our custom style for the text
    const textStyle = {
        fontFamily: "'Roboto', sans-serif",
    };

    return (
        <div>
            <Navbar showLinks={false} />

            <Box display="flex" flexDirection="column" alignItems="center" style={{ minHeight: '80vh', paddingTop: '15vh' }}>
                <Container maxWidth="md" style={textStyle}>
                    <Avatar src="/Images/Profile%20Pic.webp" alt="Profile Picture" sx={{ width: 150, height: 150, mb: 2 }} />
                    <Typography variant="h3" component="h1" gutterBottom style={{ ...textStyle, fontWeight: 'bold', textAlign: 'center' }}>
                        John Doe
                    </Typography>
                    <Typography variant="h5" gutterBottom style={{ ...textStyle, textAlign: 'center' }}>
                        Web Developer
                    </Typography>
                    <Typography variant="body1" gutterBottom style={{ ...textStyle, textAlign: 'center' }}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sit amet est id purus hendrerit ultricies ut sit amet nulla.
                    </Typography>

                    {/* Divider */}
                    <Divider style={{ margin: '20px 0' }} />

                    {/* User information */}
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <Typography variant="subtitle1" gutterBottom style={textStyle}>
                                Email:
                            </Typography>
                            <Typography variant="body1" gutterBottom style={textStyle}>
                                johndoe@example.com
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="subtitle1" gutterBottom style={textStyle}>
                                Location:
                            </Typography>
                            <Typography variant="body1" gutterBottom style={textStyle}>
                                New York, USA
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="subtitle1" gutterBottom style={textStyle}>
                                Phone:
                            </Typography>
                            <Typography variant="body1" gutterBottom style={textStyle}>
                                +1 123 456 7890
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="subtitle1" gutterBottom style={textStyle}>
                                Website:
                            </Typography>
                            <Typography variant="body1" gutterBottom style={textStyle}>
                                www.johndoe.com
                            </Typography>
                        </Grid>
                    </Grid>

                    {/* Divider */}
                    <Divider style={{ margin: '20px 0' }} />
                </Container>
            </Box>
        </div>
    );
};

export default ProfilePage;

