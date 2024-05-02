import React, { useEffect, useState } from 'react';
import {
    Box, Container, Typography, List, ListItem, ListItemText, Divider,
    ListItemSecondaryAction, Button, Snackbar
} from '@mui/material';
import Navbar from "@/components/Navbar";
import axios from "axios";
import Alert from '@mui/material/Alert';
import moment from "moment";
import {useNotification} from "@/contexts/NotificationContext"; // Corrected import

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8080', // Replace this with your backend server URL
    //baseURL: 'http://34.16.179.242:8080', // Replace this with your backend server URL
    timeout: 5000, // Optional: Set a timeout for requests (in milliseconds)
});

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
    const [notifications, setNotifications] = useState([]);
    const { setNotificationCount } = useNotification();

    useEffect(() => {


        const fetchFriendRequests = async () => {
            try {
                const response = await axiosInstance.get(`/friendships/pending`)
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
                const response = await axiosInstance.get(`/meeting-invitations/pending/${userId}`);
                setMeetingInvitations(response.data);
                console.log("meeting invitations: " + meetingInvitations);
            }  catch (error) {
                console.log("Error fetching meeting invitations:", error);
            }
        };

        const fetchMeetings = async () => {
            try {
                const user = JSON.parse(localStorage.getItem('user'));
                const userId = user.id;
                const response = await axiosInstance.get(`/meetings/user/${userId}`);
                const currentMoment = moment();
                const upcomingMeetings = response.data.filter(meeting => {
                    const startTime = moment(meeting.date + " " + meeting.timeSlot.split(" - ")[0], "YYYY-MM-DD hh:mm A");
                    // check if the meeting starts within the next hour
                    return startTime.diff(currentMoment, 'minutes') <= 60 && startTime.diff(currentMoment, 'minutes') > 0;
                });

                // if you want to show notifications for these meetings
                upcomingMeetings.forEach(meeting => {
                    console.log(`Meeting ${meeting.id} is starting soon.`);
                    setNotifications(prev => [...prev, { id: meeting.id, message: `Your meeting "${meeting.title || 'Meeting'}" is starting soon at ${meeting.timeSlot.split(" - ")[0]}.` }]);
                });

                setUpcomingMeetings(upcomingMeetings); // update state with upcoming meetings
            } catch (error) {
                console.log("Error fetching meetings:", error);
            }
        };

        const totalNotifications = friendRequests.length + meetingInvitations.length + upcomingMeetings.length;
        setNotificationCount(totalNotifications);
        console.log("total notifications: " + totalNotifications);
        fetchFriendRequests();
        fetchMeetingInvitations();
        fetchMeetings();
    }, []);

    useEffect(() => {
        const totalNotifications = friendRequests.length + meetingInvitations.length + upcomingMeetings.length;
        setNotificationCount(totalNotifications);
    }, [friendRequests, meetingInvitations, upcomingMeetings, setNotificationCount]);

    const handleAccept = async (friendshipId) => {
        try {
            await axiosInstance.post(`/friendships/${friendshipId}/accept`);
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
            await axiosInstance.delete(`/friendships/${friendshipId}/decline`);
            setFriendRequests(friendRequests.filter(friendship => friendship.id !== friendshipId));
            showNotification("Friend request declined.", "info"); // Show success notification for decline
        } catch (error) {
            console.error("Error declining friend request:", error);
            showNotification("Failed to decline friend request.", "error");
        }
    };

    const handleMarkAsRead = (notificationId) => {
        const updatedNotifications = notifications.filter(notification => notification.id !== notificationId);
        setNotifications(updatedNotifications);
    }

    const handleAcceptMeetingInvitation = async (invitationId) => {
        try {
            await axiosInstance.post(`/meeting-invitations/accept/${invitationId}`);
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
            await axiosInstance.post('meeting-invitations/reject/${invitationId}');
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
                        {
                            notifications.map(notification => (
                                <div key={notification.id}>
                                    <ListItem>
                                        <ListItemText primary={notification.message} />
                                        <ListItemSecondaryAction>
                                            <Button
                                                color="primary"
                                                onClick={() => handleMarkAsRead(notification.id)}
                                            >
                                                Mark as Read
                                            </Button>
                                        </ListItemSecondaryAction>
                                    </ListItem>
                                    <Divider />
                                </div>
                            ))
                        }
                    </List>
                </Box>
            </Container>
            <NotificationComponent />
        </div>
    );
};

export default Notifications;