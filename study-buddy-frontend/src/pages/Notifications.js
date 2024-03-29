import React, { useEffect, useState } from 'react';
import {
    Box, Container, Typography, List, ListItem, ListItemText, Divider,
    ListItemSecondaryAction, Button, Snackbar
} from '@mui/material';
import Navbar from "@/components/Navbar";
import axios from "axios";
import Alert from '@mui/material/Alert'; // Corrected import

// Custom hook defined outside the Notifications component
function useCustomNotification() {
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [severity, setSeverity] = useState("info"); // can be "error", "warning", "info", "success"

    const showNotification = (message, severity = "info") => {
        setMessage(message);
        setSeverity(severity);
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    const NotificationComponent = () => (
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
                {message}
            </Alert>
        </Snackbar>
    );

    return { showNotification, NotificationComponent };
}

const Notifications = () => {
    const { showNotification, NotificationComponent } = useCustomNotification();
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
            showNotification("Friend request accepted!", "success");
        } catch (error) {
            console.error("Error accepting friend request:", error);
            showNotification("Failed to accept friend request.", "error");
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

    function useCustomNotification() {
        const [open, setOpen] = useState(false);
        const [message, setMessage] = useState("");
        const [severity, setSeverity] = useState("info"); // can be "error", "warning", "info", "success"

        const showNotification = (message, severity = "info") => {
            setMessage(message);
            setSeverity(severity);
            setOpen(true);
        };

        const handleClose = (event, reason) => {
            if (reason === 'clickaway') {
                return;
            }
            setOpen(false);
        };

        const NotificationComponent = () => (
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
                    {message}
                </Alert>
            </Snackbar>
        );

        return { showNotification, NotificationComponent };
    }

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
