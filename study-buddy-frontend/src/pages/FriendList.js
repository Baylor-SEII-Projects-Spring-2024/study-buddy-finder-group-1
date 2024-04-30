import React, {useEffect, useState} from 'react';
import { Box, Container, Typography, List, ListItem, ListItemAvatar, Avatar, ListItemText, Divider, Paper } from '@mui/material';
import Navbar from "@/components/Navbar";
import axios from "axios";


const axiosInstance = axios.create({
    //baseURL: 'http://localhost:8080', // Replace this with your backend server URL
    baseURL: 'http://34.125.65.178:8080', // Replace this with your backend server URL

    timeout: 5000, // Optional: Set a timeout for requests (in milliseconds)
    // Other default configuration options can be added here
});


const FriendList = () => {
    const [friendsList, setFriendsList] = useState([]);

    useEffect(() => {
        const getFriendsList = async () => {
            try {
                const user = JSON.parse(localStorage.getItem('user'));
                const userId = user.id;

                if (userId) {
                    const basePath = 'http://localhost:8080';
                    const response = await axiosInstance.get(`/friendships/${userId}/friends`);
                    setFriendsList(response.data);
                    console.log(response.data);
                }

            } catch (error) {
                console.log("Error", error)
            }
        }
        getFriendsList();
    }, []);

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
                            {friendsList.map(friend => (
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
                </Box>
            </Container>
        </div>
    );
};

export default FriendList;
