import React, { useState } from 'react';
import { Box, Container, Typography, List, ListItem, ListItemText, TextField, Button, Divider } from '@mui/material';
import Navbar from "@/components/Navbar";

const MessagingPage = () => {
    const [selectedConversation, setSelectedConversation] = useState(null);
    const [messageInput, setMessageInput] = useState('');

    const conversations = [
        { id: 1, title: 'John Doe', messages: ['Hi', 'Hello', 'How are you?'] },
        { id: 2, title: 'Jane Smith', messages: ['Hey there', 'I am good, thanks!', 'What about you?'] },
        // Add more conversations as needed
    ];

    const handleConversationClick = (conversation) => {
        setSelectedConversation(conversation);
    };

    const handleMessageInputChange = (event) => {
        setMessageInput(event.target.value);
    };

    const handleSendMessage = () => {
        // Code to send message
        if (messageInput.trim() !== '') {
            // Add the message to the selected conversation
            setSelectedConversation(prevConversation => ({
                ...prevConversation,
                messages: [...prevConversation.messages, messageInput]
            }));
            // Clear message input
            setMessageInput('');
        }
    };

    return (
        <div>
            <Navbar showLinks={false} />

            <Box display="flex" flexDirection="row" justifyContent="center" alignItems="center" style={{ minHeight: '80vh', paddingTop: '10vh' }}>
                <Container maxWidth="lg">
                    <Typography variant="h4" gutterBottom align="center">
                        Messaging
                    </Typography>
                    <Box display="flex" flexDirection="row" sx={{ border: '1px solid #e0e0e0', borderRadius: 4 }}>
                        <Box flex="1">
                            <Typography variant="h5" gutterBottom sx={{ padding: '16px', borderBottom: '1px solid #e0e0e0' }}>
                                Conversations
                            </Typography>
                            <List>
                                {conversations.map(conversation => (
                                    <ListItem
                                        key={conversation.id}
                                        button
                                        selected={selectedConversation && selectedConversation.id === conversation.id}
                                        onClick={() => handleConversationClick(conversation)}
                                    >
                                        <ListItemText primary={conversation.title} />
                                    </ListItem>
                                ))}
                            </List>
                        </Box>
                        <Divider orientation="vertical" flexItem />
                        <Box flex="2" sx={{ padding: '16px' }}>
                            {selectedConversation &&
                                <div>
                                    <Typography variant="h5" gutterBottom>
                                        {selectedConversation.title}
                                    </Typography>
                                    <Divider sx={{ marginBottom: '16px' }} />
                                    <div>
                                        {selectedConversation.messages.map((message, index) => (
                                            <Typography key={index} variant="body1" gutterBottom>
                                                {message}
                                            </Typography>
                                        ))}
                                    </div>
                                    <Divider sx={{ marginTop: '16px', marginBottom: '16px' }} />
                                    <TextField
                                        label="Type a message"
                                        variant="outlined"
                                        value={messageInput}
                                        onChange={handleMessageInputChange}
                                        fullWidth
                                        margin="normal"
                                    />
                                    <Button onClick={handleSendMessage} variant="contained" color="primary" sx={{ marginTop: '8px' }}>
                                        Send
                                    </Button>
                                </div>
                            }
                        </Box>
                    </Box>
                </Container>
            </Box>
            <Box height={100} />
        </div>
    );
};

export default MessagingPage;
