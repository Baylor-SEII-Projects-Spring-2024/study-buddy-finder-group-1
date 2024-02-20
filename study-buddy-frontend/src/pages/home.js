import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import {
    AppBar,
    Toolbar,
    IconButton,
    Avatar,
    Button,
    Typography,
    Box,
    Container,
    Grid,
    Paper,
    Link as MuiLink,
    Menu,
    MenuItem
} from '@mui/material';
import styles from '@/styles/Home.module.css';

// Constants
const MAIN_FONT = 'Roboto, sans-serif';
const WHITE_TEXT = 'white';

const HomePage = () => {
    const [anchorEl, setAnchorEl] = useState(null);

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <Head>
                <title>Study Buddies</title>
                <link href="https://fonts.googleapis.com/css2?family=Roboto&display=swap" rel="stylesheet" />
                <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&display=swap" rel="stylesheet" />
            </Head>

            <Box position="fixed" top={0} left={0} width="100%" height="100%" zIndex={-1}>
                <video autoPlay loop muted playsInline style={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    left: "50%",
                    top: "50%",
                    transform: "translate(-50%, -50%)"
                }}>
                    <source src="/videos/Guy and Girl.mp4" type="video/mp4" />
                </video>
            </Box>

            <AppBar position="flex" color="default" elevation={0} sx={{ backgroundColor: 'rgba(0, 36, 53)' }}>
                <Toolbar>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography variant="h2" sx={{ fontSize: '4rem', fontFamily: 'Playfair Display, serif', color: 'white', marginRight: 2 }}>
                            Study Buddies
                        </Typography>
                        <img src='/Images/Study%20Buddy%20Logo.webp' alt="Logo" style={{ maxWidth: '100px', maxHeight: '100px' }} />
                    </Box>

                    <Box sx={{ flexGrow: 1 }}></Box>

                    <Button className={styles.whiteButton} variant="outlined" sx={{ my: 1, mx: 1.5, fontFamily: 'Roboto, sans-serif' }}>
                        Study Locations
                    </Button>
                    <Button className={styles.whiteButton} variant="outlined" sx={{ my: 1, mx: 1.5, fontFamily: 'Roboto, sans-serif' }}>
                        Our Mission
                    </Button>

                    <Link href="/login" passHref>
                        <Button className={styles.whiteButton} variant="outlined" sx={{ my: 1, mx: 1.5, fontFamily: 'Roboto, sans-serif' }}>
                            Sign In
                        </Button>
                    </Link>

                    <Link href="/register" passHref>
                        <Button className={styles.whiteButton} variant="outlined" sx={{ my: 1, mx: 1.5, fontFamily: 'Roboto, sans-serif' }}>
                            Create Account
                        </Button>
                    </Link>

                    <IconButton
                        edge="end"
                        color="inherit"
                        aria-label="profile"
                        onClick={handleMenu}
                    >
                        <Avatar src='/Images/Profile%20Pic.webp' alt="Profile" />
                    </IconButton>
                </Toolbar>
            </AppBar>

            <Box display="flex" flexDirection="column" minHeight="75vh" justifyContent="flex-start" sx={{ mt: '30vh' }}>
                <Container component="main" sx={{ flexGrow: 1, mt: '64px' }}>
                    <Typography variant="h2" align="center" color="textPrimary" gutterBottom sx={{ fontFamily: MAIN_FONT, color: WHITE_TEXT }}>
                        Together, We Achieve More
                    </Typography>
                    <Typography variant="h5" align="center" color="textSecondary" component="p" sx={{ fontFamily: MAIN_FONT, color: WHITE_TEXT }}>
                        Embark on a personalized learning experience where your goals are our priority.
                    </Typography>
                    <Button
                        className={styles.whiteButton}
                        variant="outlined"
                        size="large"
                        sx={{
                            my: 5,
                            mx: 55,
                            fontFamily: MAIN_FONT,
                            color: WHITE_TEXT,
                            whiteSpace: 'nowrap',
                            transition: 'transform 0.2s ease',
                            '&:hover': {
                                transform: 'translateY(-4px)',
                                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.8)',
                                backgroundColor: 'rgba(0, 0, 0, 0.6)'
                            }
                        }}
                    >
                        Launch your Learning Experience
                    </Button>
                </Container>

                <Paper elevation={0} component="footer" sx={{ backgroundColor: 'rgba(0, 36, 53)', padding: 2 }}>
                    <Container maxWidth="lg" component="footer">
                        <Grid container spacing={2} justifyContent="center">
                            <Grid item xs={4} sm={2}>
                                <Typography variant="h6" color="textPrimary" gutterBottom sx={{ fontFamily: MAIN_FONT, color: WHITE_TEXT }}>
                                    Learn More
                                </Typography>
                                <Box>
                                    <MuiLink href="/about-us" className={styles.yourClassName} style={{ textDecoration: 'none', color: 'white' }}>
                                        About Us
                                    </MuiLink>
                                    <br />
                                    <MuiLink href="/about-us" className={styles.yourClassName} style={{ textDecoration: 'none', color: 'white' }}>
                                        FAQ
                                    </MuiLink>
                                    <br />
                                    <MuiLink href="/about-us" className={styles.yourClassName} style={{ textDecoration: 'none', color: 'white' }}>
                                        Contact Us
                                    </MuiLink>
                                </Box>
                            </Grid>

                            <Grid item xs={4} sm={2}>
                                <Typography variant="h6" color="textPrimary" gutterBottom sx={{ fontFamily: MAIN_FONT, color: WHITE_TEXT }}>
                                    Join Us
                                </Typography>
                                <Box>
                                    <MuiLink href="/about-us" className={styles.yourClassName} style={{ textDecoration: 'none', color: 'white' }}>
                                        Become a Tutor
                                    </MuiLink>
                                    <br />
                                </Box>
                            </Grid>

                            <Grid item xs={4} sm={2}>
                                <Typography variant="h6" color="textPrimary" gutterBottom sx={{ fontFamily: MAIN_FONT, color: WHITE_TEXT }}>
                                    Locations
                                </Typography>
                                <Box>
                                    <MuiLink href="/about-us" className={styles.yourClassName} style={{ textDecoration: 'none', color: 'white' }}>
                                        Moody Library
                                    </MuiLink>
                                    <br />
                                    <MuiLink href="/about-us" className={styles.yourClassName} style={{ textDecoration: 'none', color: 'white' }}>
                                        Baylor Science Building
                                    </MuiLink>
                                    <br />
                                    <MuiLink href="/about-us" className={styles.yourClassName} style={{ textDecoration: 'none', color: 'white' }}>
                                        Student Union Building
                                    </MuiLink>
                                    <br />
                                    <MuiLink href="/about-us" className={styles.yourClassName} style={{ textDecoration: 'none', color: 'white' }}>
                                        Armstrong Library
                                    </MuiLink>
                                </Box>
                            </Grid>

                            <Grid item xs style={{ flexGrow: 0.1 }} />

                            <Grid item xs={4} sm={2}>
                                <Typography variant="h6" color="textPrimary" gutterBottom sx={{ fontFamily: MAIN_FONT, color: WHITE_TEXT }}>
                                    Social Media
                                </Typography>
                                <Box>
                                    <MuiLink href="/about-us" className={styles.yourClassName} style={{ textDecoration: 'none', color: 'white' }}>
                                        Facebook
                                    </MuiLink>
                                    <br />
                                    <MuiLink href="/about-us" className={styles.yourClassName} style={{ textDecoration: 'none', color: 'white' }}>
                                        X (Twitter)
                                    </MuiLink>
                                    <br />
                                    <MuiLink href="/about-us" className={styles.yourClassName} style={{ textDecoration: 'none', color: 'white' }}>
                                        Tik Tok
                                    </MuiLink>
                                    <br />
                                    <MuiLink href="/about-us" className={styles.yourClassName} style={{ textDecoration: 'none', color: 'white' }}>
                                        Snapchat
                                    </MuiLink>
                                </Box>
                            </Grid>
                        </Grid>
                    </Container>
                </Paper>
            </Box>
        </>
    );
};

export default HomePage;