import React, { useState } from 'react';
import { Box, Container, Typography, TextField, Button, Card, CardContent } from '@mui/material';
import Navbar from "@/components/Navbar";

const SearchPage = () => {

    // Our custom style for the text
    const textStyle = {
        fontFamily: "'Roboto', sans-serif",
    };

    // State to hold the search query
    const [searchQuery, setSearchQuery] = useState('');
    // State to hold search results
    const [results, setResults] = useState([]);

    // ------------------------------- Mock function to simulate search - Replace with search logic -------------------------------
    const performSearch = () => {
        // Simulated results
        const simulatedResults = [
            { name: "Taylor Garcia", subject: "Calculus 1", location: "Browning Library" },
            { name: "Casey Jones", subject: "Computer Science 1", location: "Baylor Science Building" },
            { name: "Peyton Williams", subject: "Software Engineering 2", location: "Moody Library" },
            { name: "Taylor Johnson", subject: "Basket Weaving", location: "Student Union Building" },
        ];
        setResults(simulatedResults);
    };

    // ------------------------------- Mock function to handle sending a friend request -------------------------------
    const handleSendFriendRequest = (name) => {
        alert(`Friend request sent to ${name}!`);

        // ------------------------------- Here, implement the logic to actually send a friend request -------------------------------


    };


    return (
        <div>
            <Navbar showLinks={false} />

            <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" style={{ minHeight: '80vh', paddingTop: '15vh' }}>
                <Container maxWidth="md" style={textStyle}>
                    <Typography variant="h3" component="h1" gutterBottom style={{ ...textStyle, fontWeight: 'bold', textAlign: 'center' }}>
                        Search for Study Buddies
                    </Typography>

                    <TextField
                        label="Search by class, area of study, etc."
                        variant="outlined"
                        fullWidth
                        style={{margin: "20px 0"}}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <Button variant="contained" color="primary" onClick={performSearch}>
                        Search
                    </Button>

                    {results.map((result, index) => (

                        <Card key={index} style={{ margin: "20px 0" }}>
                            <CardContent>
                                <Typography variant="h5" component="h2">{result.name}</Typography>
                                <Typography color="textSecondary">{result.subject}</Typography>
                                <Button variant="contained" color="primary" style={{marginTop: "10px"}} onClick={() => handleSendFriendRequest(result.name)}>
                                    Send Friend Request
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