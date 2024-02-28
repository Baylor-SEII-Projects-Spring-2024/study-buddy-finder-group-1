
import React, {useEffect, useState} from 'react';
import styles from './Navbar.module.css';
import {AppBar, Avatar, Box, Button, IconButton, Toolbar, Typography, Menu, MenuItem} from "@mui/material";
import Link from "next/link";

export default function Navbar({ showLinks = true }) { //showLinks for the links in the navbar

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    // This is for the profile icon menu to make it NOT shift everything
    useEffect(() => {
        // Always apply the style to keep scrollbar visible
        document.documentElement.style.overflowY = 'scroll';

        // Cleanup function to remove the style when the component unmounts
        return () => {
            document.documentElement.style.overflowY = '';
        };
    }, []); // Empty dependency array means this effect runs only on mount and unmount


    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleIconClick = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

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
                        <Button className={styles.whiteButton} sx={{
                            fontSize: '1.2rem',
                            my: 1,
                            mx: 1.5,
                            fontFamily: 'YourCustomFont',
                            transition: 'color 0.3s, text-shadow 0.3s',
                            backgroundColor: 'transparent',
                            '&:hover': {
                                color: '#00BFFF',
                                textShadow: '0 0 10px #00BFFF',
                                backgroundColor: 'transparent',
                            },
                        }}>
                            <Link href="/StudyLocationsPage" passHref>
                                Study Locations
                            </Link>
                        </Button>
                        <Button className={styles.whiteButton} sx={{
                            fontSize: '1.2rem',
                            my: 1,
                            mx: 1.5,
                            fontFamily: 'YourCustomFont',
                            transition: 'color 0.3s, text-shadow 0.3s',
                            backgroundColor: 'transparent',
                            '&:hover': {
                                color: '#00BFFF',
                                textShadow: '0 0 10px #00BFFF',
                                backgroundColor: 'transparent',
                            },
                        }}>
                            <Link href="/OurMissionPage" passHref>
                                Our Mission
                            </Link>
                        </Button>
                        <Link href="/login" passHref>
                            <Button className={styles.whiteButton} sx={{
                                fontSize: '1.2rem',
                                my: 1,
                                mx: 1.5,
                                fontFamily: 'YourCustomFont',
                                transition: 'color 0.3s, text-shadow 0.3s',
                                backgroundColor: 'transparent',
                                '&:hover': {
                                    color: '#00BFFF',
                                    textShadow: '0 0 10px #00BFFF',
                                    backgroundColor: 'transparent',
                                },
                            }}>
                                Sign In
                            </Button>
                        </Link>
                        <Link href="/register" passHref>
                            <Button className={styles.whiteButton} sx={{
                                fontSize: '1.2rem',
                                my: 1,
                                mx: 1.5,
                                fontFamily: 'YourCustomFont',
                                transition: 'color 0.3s, text-shadow 0.3s',
                                backgroundColor: 'transparent',
                                '&:hover': {
                                    color: '#00BFFF',
                                    textShadow: '0 0 10px #00BFFF',
                                    backgroundColor: 'transparent',
                                },
                            }}>
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
                    <MenuItem onClick={handleClose}>Home</MenuItem>
                    <MenuItem onClick={handleClose}>Logout</MenuItem>

                </Menu>
            </Toolbar>
        </AppBar>
    );
}