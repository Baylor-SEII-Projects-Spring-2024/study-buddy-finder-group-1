import React from 'react';
import { Box, Container, Typography, List, ListItem, ListItemText, Divider } from '@mui/material';
import Navbar from "@/components/Navbar";

const Notifications = () => {
    // Sample notifications data
    const notifications = [
        { id: 1, title: 'New Message', description: 'You have a new message from John Doe.' },
        { id: 2, title: 'Friend Request', description: 'Jane Smith sent you a friend request.' },
        { id: 3, title: 'Meeting Reminder', description: 'Reminder: You have a meeting tomorrow at 10:00 AM.' },
        // Add more notifications as needed
    ];

    return (
        <div style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <Navbar showLinks={false} />
            <Container maxWidth="md">
                <Box mt={5}>
                    <Typography variant="h4" align="center" gutterBottom>
                        Notifications
                    </Typography>
                    <List>
                        {notifications.map(notification => (
                            <div key={notification.id}>
                                <ListItem alignItems="flex-start">
                                    <ListItemText
                                        primary={notification.title}
                                        secondary={notification.description}
                                    />
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
