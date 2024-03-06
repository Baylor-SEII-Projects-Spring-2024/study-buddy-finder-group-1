import React from 'react';
import { Box, Container, Typography, List, ListItem, ListItemAvatar, Avatar, ListItemText, Divider, Paper } from '@mui/material';
import Navbar from "@/components/Navbar";

const FriendList = () => {
    // Sample friend list data
    const friends = [
        { id: 1, name: 'John Doe', userType: 'Student', major: 'Computer Science', bio: 'I am a software engineer passionate about coding and exploring new technologies.' },
        { id: 2, name: 'Jane Smith', userType: 'Tutor', major: 'Graphic Design', bio: 'I work as a graphic designer and love creating visually appealing designs.' },
        { id: 3, name: 'Alice Johnson', userType: 'Student', major: 'Education', bio: 'I am a teacher and enjoy helping students learn and grow academically.' },
        // Add more friends as needed
    ];

    return (
        <div style={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Navbar showLinks={false} />
            <Container maxWidth="md">
                <Box mt={5}>
                    <Typography variant="h4" align="center" gutterBottom>
                        Friend List
                    </Typography>
                    <Paper elevation={3}>
                        <List>
                            {friends.map(friend => (
                                <div key={friend.id}>
                                    <ListItem button alignItems="flex-start">
                                        <ListItemAvatar>
                                            <Avatar alt={friend.name} src={`https://ui-avatars.com/api/?name=${encodeURIComponent(friend.name)}&background=random`} />
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary={friend.name}
                                            secondary={
                                                <>
                                                    <Typography variant="body1" component="span">
                                                        User Type: {friend.userType}
                                                    </Typography>
                                                    <br />
                                                    <Typography variant="body1" component="span">
                                                        Major: {friend.major}
                                                    </Typography>
                                                    <br />
                                                    <Typography variant="body2">
                                                        Bio: {friend.bio}
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
                </Box>
            </Container>
        </div>
    );
};

export default FriendList;
