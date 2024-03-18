import React, {useEffect, useState} from 'react';
import {
    Box,
    Container,
    Typography,
    List,
    ListItem,
    ListItemText,
    Divider,
    ListItemSecondaryAction, Button
} from '@mui/material';
import Navbar from "@/components/Navbar";
import axios from "axios";

const Notifications = () => {
    // Sample notifications data
    // const notifications = [
    //     { id: 1, title: 'New Message', description: 'You have a new message from John Doe.' },
    //     { id: 2, title: 'Friend Request', description: 'Jane Smith sent you a friend request.' },
    //     { id: 3, title: 'Meeting Reminder', description: 'Reminder: You have a meeting tomorrow at 10:00 AM.' },
    //     // Add more notifications as needed
    // ];

    const [friendRequests, setFriendRequests] = useState([]);

    useEffect(() => {
        const fetchFriendRequests = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/friendships/pending`)
                const user = JSON.parse(localStorage.getItem('user'));
                const userId = user.id;
                const filteredResults = response.data.filter(friendship => friendship.requested.id === userId);
                console.log(filteredResults)
                setFriendRequests(filteredResults)
            } catch(error) {console.log("Error", error)}
        }
        fetchFriendRequests();
    }, []);

    const handleAccept = async (friendshipId) => {
        try {
            await axios.post(`http://localhost:8080/friendships/${friendshipId}/accept`);
            // update UI to remove the accepted friend request
            setFriendRequests(friendRequests.filter(friendship => friendship.id !== friendshipId));
        } catch (error) {
            console.error("Error accepting friend request:", error);
        }
    };

    const handleDecline = async (friendshipId) => {
        try {
            await axios.delete(`http://localhost:8080/friendships/${friendshipId}/decline`);
            // update UI to remove the declined friend request
            setFriendRequests(friendRequests.filter(friendship => friendship.id !== friendshipId));
        } catch (error) {
            console.error("Error declining friend request:", error);
        }
    };


    return (
        <div style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <Navbar showLinks={false} />
            <Container maxWidth="md">
                <Box mt={5}>
                    <Typography variant="h4" align="center" gutterBottom>
                        Notifications
                    </Typography>
                    <List>
                        {friendRequests.map(friendRequest => (
                            <div key={friendRequest.id}>
                                <ListItem alignItems="flex-start">
                                    <ListItemText
                                        primary={"Friend Request"}
                                        secondary={friendRequest.requester.firstName + ' ' + friendRequest.requester.lastName + ' sent you a friend request!'}
                                    />
                                    <ListItemSecondaryAction>
                                        <Button
                                            onClick={() => handleAccept(friendRequest.id)}
                                            sx={{ backgroundColor: 'green', '&:hover': { backgroundColor: 'darkgreen' }, color: 'white' }}
                                        >
                                            Accept
                                        </Button>
                                        <Button
                                            onClick={() => handleDecline(friendRequest.id)}
                                            sx={{ backgroundColor: 'red', '&:hover': { backgroundColor: 'darkred' }, color: 'white', ml: 1 }}
                                        >
                                            Decline
                                        </Button>
                                    </ListItemSecondaryAction>
                                </ListItem>
                                <Divider />
                            </div>
                        ))}
                    </List>
                </Box>
            </Container>
        </div>
    );
};

export default Notifications;
