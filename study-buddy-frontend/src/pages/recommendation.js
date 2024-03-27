import React, { useEffect, useState } from 'react';
import {
    Box,
    Container,
    Typography,
    Avatar,
    Grid,
    Divider,
    Paper,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText, Button
} from '@mui/material';
import Navbar from "@/components/Navbar";
import { AuthProvider, useAuth } from "@/components/AuthContext";
import axios from 'axios';
import Link from "next/link"; // Import Axios for making API requests

const recommendation = () =>{

    const { isLoggedIn, login, logout } = useAuth();


    const meetings = [
        { id: 1, room: '212', date: 'friday', timeSlot: 'morning', subject: 'math' }
    ];
    const friends = [
        { id: 1, name: 'John Doe', userType: 'Student', major: 'Computer Science', bio: 'I am a software engineer passionate about coding and exploring new technologies.' },
        { id: 2, name: 'Jane Smith', userType: 'Tutor', major: 'Graphic Design', bio: 'I work as a graphic designer and love creating visually appealing designs.' },
        { id: 3, name: 'Alice Johnson', userType: 'Student', major: 'Education', bio: 'I am a teacher and enjoy helping students learn and grow academically.' },
        // Add more friends as needed
    ];

    const [meetingsList, setMeetingsList] = useState([]);
    useEffect(() => {
        const getMeetups = async () => {
            try {
                const user = JSON.parse(localStorage.getItem('user'));
                const userId = user.id;

                const response = await axios.get(`http://localhost:8080/recommendation`)
                setMeetingsList(response.data);
                console.log(response.data)
            } catch (error) {
                console.log("Error: ", error)
            }
        }
        getMeetups();

    }, []);



    return (
        <div style={{minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <Navbar showLinks={false}/>
            <Container maxWidth="md">
                <Box mt={5}>
                    {!isLoggedIn ? (
                        <>
                        <Typography variant="h4" align="center" gutterBottom >
                            You need to log in to see your recommendations
                        </Typography>,
                        <Link href="/login" passHref>
                            <Button
                                variant="contained"
                                color="primary"
                                size="large"
                                sx={{
                                        position: 'absolute',
                                        bottom: 0, // Position the button at the bottom of its container
                                        left: '50%', // Center the button horizontally
                                        transform: 'translateX(-50%)', // Center the button horizontally
                                        mt: 3 // Add top margin to create space between Typography and Button
                                }
                                }>
                                Go to Login
                            </Button>
                        </Link>
                        </>
                    ) : (
                        <>
                    <Typography variant="h4" align="center" gutterBottom>
                        Recommended Buddies
                    </Typography>
                            <Paper elevation={3}>
                                <List>
                                    {friends.map(friend => (
                                        <div key={friend.id}>
                                            <ListItem button alignItems="flex-start">
                                                <ListItemAvatar>
                                                    <Avatar alt={friend.name} src={`https://ui-avatars.com/api/?name=${encodeURIComponent(friend.firstName)}&background=random`} />
                                                </ListItemAvatar>
                                                <ListItemText
                                                    primary={friend.name}
                                                    secondary={
                                                        <>
                                                            <Typography variant="body1" component="span">
                                                                First Name: {friend.firstName}
                                                            </Typography>
                                                            <br />
                                                            <Typography variant="body1" component="span">
                                                                Last Name: {friend.lastName}
                                                            </Typography>
                                                            <br />
                                                            <Typography variant="body2">
                                                                User Type: {friend.userType}
                                                            </Typography>
                                                        </>
                                                    }
                                                />
                                            </ListItem>
                                            <Divider />
                                        </div>
                                    ))}
                                </List>
                            </Paper>
                    <Typography variant="h4" align="center" gutterBottom>
                        Recommended Meetups
                    </Typography>
                    <Paper>
                    <List>
                        {meetings.map(meeting => (
                            <div key={meeting.id}>
                                <ListItem button alignItems="flex-start">
                                    <ListItemAvatar>
                                        <Avatar alt={meeting.name} src={`https://ui-avatars.com/api/?name=${encodeURIComponent(meeting.subject)}&background=random`} />
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={meeting.name}
                                        secondary={
                                            <>
                                                <Typography variant="body1" component="span">
                                                    Room: {meeting.room}
                                                </Typography>
                                                <br />
                                                <Typography variant="body1" component="span">
                                                    Time Slot: {meeting.timeSlot}
                                                </Typography>
                                                <br />
                                                <Typography variant="body2">
                                                    Subject: {meeting.subject}
                                                </Typography>
                                            </>
                                        }
                                    />
                                </ListItem>
                                <Divider />
                            </div>
                        ))}
                    </List>
                        </Paper>

                        </>
                        )
                    }
                </Box>
            </Container>
        </div>
    );

}

export default recommendation;