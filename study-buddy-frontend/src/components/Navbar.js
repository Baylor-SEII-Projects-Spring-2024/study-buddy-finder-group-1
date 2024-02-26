
import React, {useState} from 'react';
import styles from './Navbar.module.css';
import {AppBar, Avatar, Box, Button, IconButton, Toolbar, Typography, Menu, MenuItem} from "@mui/material";
import Link from "next/link";

export default function Navbar({ showLinks = true }) { //showLinks for the links in the navbar

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
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
                    <Link href="/" passHref>
                        <img onClick={handleIconClick} src='/Images/Study%20Buddy%20Logo.webp' alt="Logo" style={{ cursor: 'pointer', maxWidth: '80px', maxHeight: '80px', marginRight: '8px' }} />
                    </Link>
                        <Typography variant="h2" sx={{ fontSize: '2.5rem', fontFamily: '"YourCustomFont", serif', color: 'white', transition: '0.3s ease' }}>
                        Study Buddies
                    </Typography>
                </Box>


                <Box sx={{ flexGrow: 1 }}></Box>

                {/* Conditional rendering for the links */}
                {showLinks && (
                    <>
                        <Button className={styles.whiteButton} sx={{ fontSize: '1.2rem', my: 1, mx: 1.5, fontFamily: 'YourCustomFont' }}>
                            Study Locations
                        </Button>
                        <Button className={styles.whiteButton} sx={{ fontSize: '1.2rem', my: 1, mx: 1.5, fontFamily: 'YourCustomFont' }}>
                            Our Mission
                        </Button>
                        <Link href="/login" passHref>
                            <Button className={styles.whiteButton} sx={{ fontSize: '1.2rem', my: 1, mx: 1.5, fontFamily: 'YourCustomFont' }}>
                                Sign In
                            </Button>
                        </Link>
                        <Link href="/register" passHref>
                            <Button className={styles.whiteButton} sx={{ fontSize: '1.2rem', my: 1, mx: 2.0, fontFamily: 'YourCustomFont' }}>
                                Create Account
                            </Button>
                        </Link>
                    </>
                )}

                <IconButton
                    edge="end"
                    color="inherit"
                    aria-label="profile"
                    onClick={handleMenu}
                >
                    <Avatar src='/Images/Profile%20Pic.webp' alt="Profile" />
                </IconButton>
                <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    open={open}
                    onClose={handleClose}
                >
                    <MenuItem onClick={handleClose}>My Profile</MenuItem>
                    <MenuItem onClick={handleClose}>Edit Profile</MenuItem>
                    <MenuItem onClick={handleClose}>My Sessions</MenuItem>
                    <MenuItem onClick={handleClose}>Messaging</MenuItem>
                    <MenuItem onClick={handleClose}>Notifications</MenuItem>
                    <MenuItem onClick={handleClose}>Study Locations</MenuItem>
                    <MenuItem onClick={handleClose}>Friend List</MenuItem>
                    <MenuItem onClick={handleClose}>Settings</MenuItem>
                    <MenuItem onClick={handleClose}>Help & Support</MenuItem>
                    <MenuItem onClick={handleClose}>Logout</MenuItem>

                </Menu>
            </Toolbar>
        </AppBar>
    );
}