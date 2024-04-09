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
    const [meetingInvitations, setMeetingInvitations] = useState([]);
    const [upcomingMeetings, setUpcomingMeetings] = useState([]);

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

        const fetchMeetingInvitations = async () => {
            try {
                const user = JSON.parse(localStorage.getItem('user'));
                const userId = user.id;
                const response = await axios.get(`http://localhost:8080/meeting-invitations/pending/${userId}`);
                setMeetingInvitations(response.data);
                console.log("meeting invitations: " + meetingInvitations);
            }  catch (error) {
                console.log("Error fetching meeting invitations:", error);
            }
        };

        const fetchUpcomingMeetings = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/meetings/user/${userId}/upcoming`);
                setUpcomingMeetings(response.data);
            } catch (error) {
                console.log("Error fetching upcoming meetings:", error);
            }
        };



        fetchFriendRequests();
        fetchMeetingInvitations();
        fetchUpcomingMeetings();
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
            setFriendRequests(friendRequests.filter(friendship => friendship.id !== friendshipId));
            showNotification("Friend request declined.", "info"); // Show success notification for decline
        } catch (error) {
            console.error("Error declining friend request:", error);
            showNotification("Failed to decline friend request.", "error");
        }
    };

    const handleAcceptMeetingInvitation = async (invitationId) => {
        try {
            await axios.post(`http://localhost:8080/meeting-invitations/accept/${invitationId}`);
            // Remove the accepted invitation from state
            setMeetingInvitations(meetingInvitations.filter(invitation => invitation.id !== invitationId));
            showNotification("Meeting invitation accepted!", "success");
        } catch (error) {
            console.error("Error accepting meeting invitation:", error);
            showNotification("Failed to accept meeting invitation.", "error");
        }
    };

    const handleDeclineMeetingInvitation = async (invitationId) => {
        try {
            await axios.post(`http://localhost:8080/meeting-invitations/reject/${invitationId}`);
            // Remove the declined invitation from state
            setMeetingInvitations(meetingInvitations.filter(invitation => invitation.id !== invitationId));
            showNotification("Meeting invitation declined.", "info");
        } catch (error) {
            console.error("Error declining meeting invitation:", error);
            showNotification("Failed to decline meeting invitation.", "error");
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
                        {
                            meetingInvitations.map(invitation => (
                                <div key={invitation.id}>
                                    <ListItem alignItems="flex-start">
                                        <ListItemText
                                            primary={`Meeting Invitation: ${invitation.meeting.title || 'No Title'}`}
                                            secondary={`Scheduled on ${invitation.meeting.date} at ${invitation.meeting.timeSlot}`}
                                        />
                                        <ListItemSecondaryAction>
                                            <Button
                                                onClick={() => handleAcceptMeetingInvitation(invitation.id)}
                                                sx={{ backgroundColor: 'green', '&:hover': { backgroundColor: 'darkgreen' }, color: 'white', mr: 1 }}
                                            >
                                                Accept
                                            </Button>
                                            <Button
                                                onClick={() => handleDeclineMeetingInvitation(invitation.id)}
                                                sx={{ backgroundColor: 'red', '&:hover': { backgroundColor: 'darkred' }, color: 'white' }}
                                            >
                                                Decline
                                            </Button>
                                        </ListItemSecondaryAction>
                                    </ListItem>
                                    <Divider />
                                </div>
                            ))
                        }
                        {upcomingMeetings.map(meeting => (
                            <div key={meeting.id}>
                                <ListItem>
                                    <ListItemText
                                        primary={`Upcoming Meeting: ${meeting.title}`}
                                        secondary={`Scheduled at ${meeting.date} ${meeting.timeSlot}`}
                                    />
                                </ListItem>
                                <Divider />
                            </div>
                        ))}
                    </List>
                </Box>
            </Container>
            <NotificationComponent />
        </div>
    );
};

export default Notifications;
