import React, { useState } from "react";
import {Avatar, IconButton, Menu, MenuItem, TextField} from '@mui/material';
import Head from "next/head";
import {AppBar, Box, Button, Container, Grid, Paper, Toolbar, Typography} from "@mui/material";
import Link from "next/link";
import axios from "axios";

// Constants
const MAIN_FONT = 'Roboto, sans-serif';
const WHITE_TEXT = 'white';

export default function Register() {

    // State for the anchor element of the dropdown menu
    const [anchorEl, setAnchorEl] = useState(null);

    // Open the dropdown menu
    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    // Close the dropdown menu
    const handleClose = () => {
        setAnchorEl(null);
    };

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log('Form data before submission:', formData);

        try {
            console.log('Attempting to submit form data to backend...');
            const response = await axios.post("http://localhost:8080/register", {
                firstName: formData.firstName,
                lastName: formData.lastName,
                email_address: formData.email,
                password: formData.password,
            });
            console.log('Form submitted successfully, response:', response.data);
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };


    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Head>
                <title>Register - Study Buddies</title>
                {/* Links to import fonts */}
                <link href="https://fonts.googleapis.com/css2?family=Roboto&display=swap" rel="stylesheet" />
                <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&display=swap" rel="stylesheet" />
            </Head>

            <AppBar position="static" color="default" elevation={0} sx={{ backgroundColor: 'rgba(0, 36, 53)' }}>
                <Toolbar>
                    {/* Flex container for title and logo */}
                    <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
                        {/* "Study Buddies" title */}
                        <Typography variant="h2" sx={{ fontSize: '4rem', fontFamily: 'Playfair Display, serif', color: 'white', marginRight: 2 }}>
                            Study Buddies
                        </Typography>

                        {/* Logo directly to the right of the title */}
                        <img src='/Images/Study%20Buddy%20Logo.webp' alt="Logo" style={{ maxWidth: '100px', maxHeight: '100px' }} />
                    </Box>

                    {/* Profile Icon Button */}
                    <IconButton
                        edge="end"
                        color="inherit"
                        aria-label="profile"
                        onClick={handleMenu} // Added this line to handle click events
                    >
                        <Avatar src='/Images/Profile%20Pic.webp' alt="Profile" />
                    </IconButton>

                    {/* Dropdown menu anchored to the IconButton */}
                    <Menu
                        id="profile-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                        <MenuItem onClick={handleClose}>Profile</MenuItem>
                        <MenuItem onClick={handleClose}>My account</MenuItem>
                        <MenuItem onClick={handleClose}>Logout</MenuItem>
                    </Menu>

                </Toolbar>
            </AppBar>

            {/* Spacer element to push down the main content */}
            {/* Grid item will act as a flexible spacer */}
            <Grid container style={{ flex: 1 }}>
                <Grid item xs={12} style={{ height: '0.1vh' }}></Grid> {/* This creates the dynamic space */}
            </Grid>

            {/* Main content area with registration form */}
            <div style={{ flexGrow: 1 }}>
                <Container component="main" maxWidth="sm" sx={{ mt: 4, mb: 4 }}>
                    <Typography component="h1" variant="h5" align="center" sx={{ mb: 3 }}>
                        Create Account
                    </Typography>
                    <form onSubmit={handleSubmit} noValidate>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="firstName"
                            label="First Name"
                            name="firstName"
                            autoComplete="fname"
                            autoFocus
                            value={formData.firstName}
                            onChange={handleChange}
                            sx={{ mb: 2 }}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="lastName"
                            label="Last Name"
                            name="lastName"
                            autoComplete="lname"
                            value={formData.lastName}
                            onChange={handleChange}
                            sx={{ mb: 2 }}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            value={formData.email}
                            onChange={handleChange}
                            sx={{ mb: 2 }}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            value={formData.password}
                            onChange={handleChange}
                            sx={{ mb: 2 }}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="confirmPassword"
                            label="Confirm Password"
                            type="password"
                            id="confirm-password"
                            autoComplete="new-password"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            sx={{ mb: 2 }}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Register
                        </Button>

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{
                                mt: 3,
                                mb: 2,
                                backgroundColor: 'primary', // This makes the button blue
                                '&:hover': {
                                    backgroundColor: 'darkred', // Darker red on hover
                                },
                            }}
                        >
                            Cancel
                        </Button>
                    </form>
                </Container>
            </div>

            {/* Lower link bar */}
            <Paper elevation={0} component="footer" sx={{ backgroundColor: 'rgba(0, 36, 53)', padding: 2 }}>
                <Container maxWidth="lg" component="footer">
                    <Grid container spacing={2} justifyContent="center">
                        <Grid item xs={4} sm={2}>
                            <Typography variant="h6" color="textPrimary" gutterBottom sx = {{ fontFamily: MAIN_FONT, color: WHITE_TEXT }}>
                                Learn More
                            </Typography>
                            <Box>
                                <Link href="/about-us" className="yourClassName" style={{ textDecoration: 'none', color: 'white' }}>
                                    About Us
                                </Link>
                                <br/>
                                <Link href="#" variant="subtitle1" color="textSecondary" gutterBottom sx = {{ fontFamily: MAIN_FONT, color: WHITE_TEXT }}>
                                    <Link href="/about-us" className="yourClassName" style={{ textDecoration: 'none', color: 'white' }}>
                                        FAQ
                                    </Link>

                                </Link>
                                <br/>
                                <Link href="#" variant="subtitle1" color="textSecondary" gutterBottom sx = {{ fontFamily: MAIN_FONT, color: WHITE_TEXT }}>
                                    <Link href="/about-us" className="yourClassName" style={{ textDecoration: 'none', color: 'white' }}>
                                        Contact Us
                                    </Link>
                                </Link>
                            </Box>
                        </Grid>

                        <Grid item xs={4} sm={2}>
                            <Typography variant="h6" color="textPrimary" gutterBottom sx = {{ fontFamily: MAIN_FONT, color: WHITE_TEXT }}>
                                Join Us
                            </Typography>
                            <Box>
                                <Link href="/about-us" className="yourClassName" style={{ textDecoration: 'none', color: 'white' }}>
                                    Become a Tutor
                                </Link>
                                <br/>
                            </Box>
                        </Grid>

                        <Grid item xs={4} sm={2}>
                            <Typography variant="h6" color="textPrimary" gutterBottom sx = {{ fontFamily: MAIN_FONT, color: WHITE_TEXT }}>
                                Locations
                            </Typography>
                            <Box>
                                <Link href="/about-us" className="yourClassName" style={{ textDecoration: 'none', color: 'white' }}>
                                    Moody Library
                                </Link>
                                <br/>
                                <Link href="/about-us" className="yourClassName" style={{ textDecoration: 'none', color: 'white' }}>
                                    Baylor Science Building
                                </Link>
                                <br/>
                                <Link href="/about-us" className="yourClassName" style={{ textDecoration: 'none', color: 'white' }}>
                                    Student Union Building
                                </Link>
                                <br/>
                                <Link href="/about-us" className="yourClassName" style={{ textDecoration: 'none', color: 'white' }}>
                                    Armstrong Library
                                </Link>
                            </Box>
                        </Grid>

                        {/* Invisible Grid item to push Social Media to the right */}
                        <Grid item xs style={{ flexGrow: 0.1 }} />

                        <Grid item xs={4} sm={2}>
                            <Typography variant="h6" color="textPrimary" gutterBottom sx = {{ fontFamily: MAIN_FONT, color: WHITE_TEXT }}>
                                Social Media
                            </Typography>
                            <Box>
                                <Link href="/about-us" className="yourClassName" style={{ textDecoration: 'none', color: 'white' }}>
                                    Facebook
                                </Link>
                                <br/>
                                <Link href="/about-us" className="yourClassName" style={{ textDecoration: 'none', color: 'white' }}>
                                    X (Twitter)
                                </Link>
                                <br/>
                                <Link href="/about-us" className="yourClassName" style={{ textDecoration: 'none', color: 'white' }}>
                                    Tik Tok
                                </Link>
                                <br/>
                                <Link href="/about-us" className="yourClassName" style={{ textDecoration: 'none', color: 'white' }}>
                                    Snapchat
                                </Link>
                            </Box>
                        </Grid>
                    </Grid>
                </Container>
            </Paper>
        </div>
    );
}