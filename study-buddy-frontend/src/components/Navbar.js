import React, { useEffect, useState } from 'react';
import styles from './Navbar.module.css';
import { AppBar, Avatar, Box, Button, IconButton, Toolbar, Typography, Menu, MenuItem, Badge } from "@mui/material";
import Link from "next/link";
import { useAuth } from "@/components/AuthContext";
import { useRouter } from "next/router";
import axios from "axios";
import { useNotification } from '../contexts/NotificationContext'; // Correctly placed at the top


export default function Navbar({ showLinks = true }) { //showLinks for the links in the navbar

    const { isLoggedIn, logout } = useAuth();
    const { notificationCount } = useNotification();
    const [isLoggedOut, setIsLoggedOut] = useState(true);
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

    useEffect(() => {
        const fetchNotificationCount = async () => {
            try {
                const user = JSON.parse(localStorage.getItem('user'));
                const userId = user.id;
                const response = await axios.get(`http://localhost:8080/friendships/pending/count/${userId}`);
                setNotificationCount(response.data);
                console.log(response.data);
            } catch (error) {
                console.log("Error fetching notification count:", error);
            }
        };

        fetchNotificationCount();
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

        router.push('/home');
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

    const handleAddFriendsClick = () => {
        router.push(`/AddFriends`);
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
    const handleRecommendationClick = () => {
        router.push(`/recommendation`);
    }


    const buttonStyle = {
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

                {isLoggedIn ? (
                    <>
                        <Button className={styles.whiteButton} sx={buttonStyle}>
                            <Link href="/SearchTutorsPage" passHref>Search For Tutors (TODO)</Link>
                        </Button>
                        <Button className={styles.whiteButton} sx={buttonStyle}>
                            <Link href="/SearchPage" passHref>Search For Meetups</Link>
                        </Button>
                        <Button className={styles.whiteButton} sx={buttonStyle}>
                            <Link href="/SearchPage" passHref>Search Meetups</Link>
                        </Button>
                        <Button className={styles.whiteButton} sx={buttonStyle}>
                            <Link href="/AddFriends" passHref>Search For Users</Link>
                        </Button>
                        <Button className={styles.whiteButton} sx={buttonStyle}>
                            <Link href="/AddClasses" passHref>Add a Class</Link>
                        </Button>
                    </>
                ) : (
                    <>
                        <Button className={styles.whiteButton} sx={buttonStyle}>
                            <Link href="/login" passHref>Sign In</Link>
                        </Button>
                        <Button className={styles.whiteButton} sx={buttonStyle}>
                            <Link href="/register" passHref>Create Account</Link>
                        </Button>
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
                    <MenuItem onClick={handleHomeClick}>Home</MenuItem>
                    {isLoggedIn && (
                        <>
                            <MenuItem onClick={handleProfileClick}>My Profile</MenuItem>
                            <MenuItem onClick={handleEditProfileClick}>Edit Profile</MenuItem>
                            <MenuItem onClick={handleEditMeetupClick}>Edit Meetup</MenuItem>
                            <MenuItem onClick={handleEditClassesClick}>Edit Class(es)</MenuItem>
                            <MenuItem onClick={handleNotificationsClick} sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                                <Typography variant="inherit">Notifications</Typography>
                                <Box sx={{ flexGrow: 1 }} />
                                {notificationCount > 0 && (
                                    <Badge badgeContent={notificationCount} color="primary" sx={{ marginRight: 2 }} />
                                )}
                            </MenuItem>
                            <MenuItem onClick={handleFriendListClick}>My Friends</MenuItem>
                            <MenuItem onClick={handleTutorReviewClick}>Review Tutors</MenuItem>
                            <MenuItem onClick={handleRecommendationClick}>Recommendations</MenuItem>
                            <MenuItem onClick={() => router.push('/StudyLocationsPage')}>Study Locations</MenuItem>
                            <MenuItem onClick={() => router.push('/OurMissionPage')}>Our Mission</MenuItem>
                            <MenuItem onClick={() => {
                                handleLogout();
                                handleClose();
                            }}>Logout</MenuItem>
                        </>
                    )}
                </Menu>
            </Toolbar>
        </AppBar>
    );


}