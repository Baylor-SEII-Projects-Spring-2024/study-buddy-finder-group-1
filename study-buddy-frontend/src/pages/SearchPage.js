import React, { useState } from 'react';
import {
    Box,
    Container,
    Typography,
    TextField,
    Button,
    Card,
    CardContent
} from '@mui/material';
import Navbar from "@/components/Navbar";

const SearchPage = () => {
    const textStyle = {
        fontFamily: "'Roboto', sans-serif",
    };

    const [searchQuery, setSearchQuery] = useState('');
    const [sessions, setSessions] = useState([]);

    const performSearch = () => {
        // We are simulating fetching from backend
        const simulatedSessions = [
            { id: 1, name: "Calculus Study Night", description: "Join us for a night of calculus problems and pizza!", participants: 20, subject: "Mathematics" },
            { id: 2, name: "Coding Challenges Meetup", description: "Work through coding challenges with peers.", participants: 15, subject: "Computer Science" },
            { id: 3, name: "Literature Review Session", description: "Discussing key literature themes.", participants: 10, subject: "English" },
        ];

        // I need to replace this with actual search logic based on searchQuery
        setSessions(simulatedSessions);
    };

    const handleJoinStudySession = (sessionId) => {
        alert(`You have expressed interest in joining the study session ID: ${sessionId}!`);
        // Still need to implement the logic to actually join a study session
    };

    return (
        <div>
            <Navbar showLinks={false} />
            <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" style={{ minHeight: '80vh', paddingTop: '15vh' }}>
                <Container maxWidth="md" style={textStyle}>
                    <Typography variant="h3" component="h1" gutterBottom style={{ ...textStyle, fontWeight: 'bold', textAlign: 'center' }}>
                        Find Study Sessions
                    </Typography>

                    <TextField
                        label="Search sessions by name, subject, etc."
                        variant="outlined"
                        fullWidth
                        style={{ margin: "20px 0" }}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <Button variant="contained" color="primary" onClick={performSearch}>
                        Search
                    </Button>

                    {sessions.map((session, index) => (
                        <Card key={index} style={{ margin: "20px 0" }}>
                            <CardContent>
                                <Typography variant="h5" component="h2">{session.name}</Typography>
                                <Typography color="textSecondary">{session.description}</Typography>
                                <Typography color="textSecondary">{`Participants: ${session.participants} | Subject: ${session.subject}`}</Typography>
                                <Button variant="contained" color="primary" style={{marginTop: "10px"}} onClick={() => handleJoinStudySession(session.id)}>
                                    Join Session
                                </Button>
                            </CardContent>
                        </Card>
                    ))}
                </Container>
            </Box>
            <Box height={100} />
        </div>
    );
};

export default SearchPage;
