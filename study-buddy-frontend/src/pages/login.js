import React, { useState } from "react";
import {Avatar, IconButton, Menu, MenuItem, TextField} from '@mui/material';
import Head from "next/head";
import {AppBar, Box, Button, Container, Grid, Paper, Toolbar, Typography} from "@mui/material";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/router";

// Constants
const MAIN_FONT = 'Roboto, sans-serif';
const WHITE_TEXT = 'white';

export default function Login() {
    const router = useRouter();

    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);

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
        console.log(formData);

        try {
            const response = await axios.post('http://localhost:8080/login', null, {
                params: {
                    email: formData.email,
                    password: formData.password
                }
            });

            console.log(response.data);
            if (response.status === 200 && response.data.userId) {

                const { userId } = response.data;

                router.push(`/user/${userId}`);
            } else {
                console.log("Login was successful but the status code is not 200.");

            }
        } catch (error) {
            console.error("Login failed:", error.response || error);

        }
    };


    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Head>
                <title>Register - Study Buddies</title>
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
            {/* This Grid item will act as a flexible spacer */}
            <Grid container style={{ flex: 1 }}>
                <Grid item xs={12} style={{ height: '0.1vh' }}></Grid> {/* This creates the dynamic space */}
            </Grid>

            {/* Main content area with log in form */}
            <Container component="main" maxWidth="sm" sx={{ mt: 8, mb: 4, flex: 1 }}>
                <Typography component="h1" variant="h5" align="center" sx={{ mb: 3 }}>
                    Log In
                </Typography>
                <form onSubmit={handleSubmit} noValidate>

                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email"
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

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Submit
                    </Button>

                    {/* Forgot Password Link */}
                    <Grid container justifyContent="center" style={{ margin: '8px 0' }}>
                        <Grid item>
                            <Link href="/forgot-password" variant="body2" style={{ textDecoration: 'none', color: 'blue' }}>
                                Forgot password?
                            </Link>
                        </Grid>
                    </Grid>

                </form>
            </Container>

            {/* Footer */}
            <Paper elevation={0} component="footer" sx={{ backgroundColor: 'rgba(0, 36, 53)', padding: 2 }}>

                {/* Lower link bar */}
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