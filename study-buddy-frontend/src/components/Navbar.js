import React, {useEffect, useState} from 'react';
import styles from './Navbar.module.css';
import {AppBar, Avatar, Box, Button, IconButton, Toolbar, Typography, Menu, MenuItem} from "@mui/material";
import Link from "next/link";
import {useAuth} from "@/components/AuthContext";
import {useRouter} from "next/router";

export default function Navbar({ showLinks = true }) { //showLinks for the links in the navbar

    const { isLoggedIn, logout } = useAuth();
    const [isLoggedOut, setIsLoggedOut] = useState(false);
    const [userId, setUserId] = useState(null);
    const router = useRouter();
    console.log("isLoggedIn:", isLoggedIn);
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    useEffect(() => {
        const storedUserId = localStorage.getItem('userId');
        if (storedUserId) {
            setUserId(storedUserId);
        }
    }, []);

    // This is for the profile icon menu to make it NOT shift everything
    useEffect(() => {
        // Always apply the style to keep scrollbar visible
        document.documentElement.style.overflowY = 'scroll';

        // Cleanup function to remove the style when the component unmounts
        return () => {
            document.documentElement.style.overflowY = '';
        };
    }, []); // Empty dependency array means this effect runs only on mount and unmount

    useEffect(() => {
        if (isLoggedOut) {
            router.push('/home');
        }
    }, [isLoggedOut, router]);

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

    const handleLogout = () => {

        localStorage.removeItem('isLoggedIn');

        //How to reset the localstorage (cookies)
        localStorage.removeItem('user');

        setIsLoggedOut(true);

        logout();
    };

    const handleProfileClick = () => {
        {/* router.push(`/user/${userId}`); */}
        router.push(`/ProfilePage`);
    }

    const handleCreateMeetupClick = () => {
        router.push(`/MeetupCreationPage`);
    }

    const handleEditMeetupClick = () => {
        router.push(`/EditMeetupPage`);
    }

    const handleEditProfileClick = () => {
        router.push(`/EditProfile`);
    }

    const handleAddClassesClick = () => {
        router.push(`/AddClasses`);
    }

    const handleEditClassesClick = () => {
        router.push(`/EditClasses`);
    }

    const handleMessagesClick = () => {
        router.push(`/MessagingPage`);
    }

    const handleNotificationsClick = () => {
        router.push(`/Notifications`);
    }

    const handleFriendListClick = () => {
        router.push(`/FriendList`);
    }

    const handleTutorReviewClick = () => {
        router.push(`/ReviewTutor`);
    }

    const handleSettingsClick = () => {
        router.push(`/Settings`);
    }

    const handleHelpSupportClick = () => {
        router.push(`/HelpSupport`);
    }

    const handleHomeClick = () => {
        router.push(`/home`);
    }

    return (
        <AppBar position="fixed" color="default" elevation={0} sx={{ backgroundColor: 'rgba(0, 36, 53)' }}>
            <Toolbar>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
                    <Link href="/" passHref>
                        <img onClick={handleIconClick} src='/Images/Study%20Buddy%20Logo.webp' alt="Logo" style={{ cursor: 'pointer', maxWidth: '80px', maxHeight: '80px', marginRight: '8px' }} />
                    </Link>
                        <Typography variant="h2" sx={{ fontSize: '2.5rem', fontFamily: '"YourCustomFont", serif', color: 'white', transition: '0.3s ease' }}>
                        Study Buddies Boom here comes the change
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
                        {!isLoggedIn && (
                            <>
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
                                <Link href="/study-buddy-frontend/src/components/register" passHref>
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
                    {/* Function calls are embedded below */}
                    <MenuItem onClick={handleProfileClick}>My Profile</MenuItem>
                    <MenuItem onClick={handleEditProfileClick}>Edit Profile</MenuItem>
                    <MenuItem onClick={handleCreateMeetupClick}>Create Meetup</MenuItem>
                    <MenuItem onClick={handleEditMeetupClick}>Edit Meetup</MenuItem>
                    <MenuItem onClick={handleAddClassesClick}>Add Class(es) or Area(s) of Study</MenuItem>
                    <MenuItem onClick={handleEditClassesClick}>Edit Class(es) or Area(s) of Study</MenuItem>
                    <MenuItem onClick={handleMessagesClick}>Messaging</MenuItem>
                    <MenuItem onClick={handleNotificationsClick}>Notifications</MenuItem>
                    <MenuItem onClick={handleFriendListClick}>Friend List</MenuItem>
                    <MenuItem onClick={handleTutorReviewClick}>Review Tutors</MenuItem>
                    <MenuItem onClick={handleSettingsClick}>Settings</MenuItem>
                    <MenuItem onClick={handleHelpSupportClick}>Help & Support</MenuItem>
                    <MenuItem onClick={handleHomeClick}>Home</MenuItem>
                    {isLoggedIn && (
                        <MenuItem onClick={() => {
                            handleLogout()
                            handleClose()
                        }}>Logout</MenuItem>
                    )}

                </Menu>
            </Toolbar>
        </AppBar>
    );
}