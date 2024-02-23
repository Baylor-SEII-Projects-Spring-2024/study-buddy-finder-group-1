
import React, {useState} from 'react';
import styles from './Navbar.module.css';
import {AppBar, Avatar, Box, Button, IconButton, Toolbar, Typography} from "@mui/material";
import Link from "next/link";

export default function Navbar() {
    const [anchorEl, setAnchorEl] = useState(null);
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleIconClick = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    return (
        <AppBar position="fixed" color="default" elevation={0} sx={{ backgroundColor: 'rgba(0, 36, 53)' }}>
            <Toolbar>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
                    <img onClick={handleIconClick} src='/Images/Study%20Buddy%20Logo.webp' alt="Logo" style={{ cursor: 'pointer', maxWidth: '80px', maxHeight: '80px', marginRight: '8px' }} />
                    <Typography variant="h2" sx={{ fontSize: '2.5rem', fontFamily: '"YourCustomFont", serif', color: 'white', transition: '0.3s ease' }}>
                        Study Buddies
                    </Typography>
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
    );
}
