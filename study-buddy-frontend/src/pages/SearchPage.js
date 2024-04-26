import React, {useCallback, useState} from 'react';
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
import axios from "axios";
import {debounce} from "lodash";

const SearchMeetups = () => {
    const textStyle = {
        fontFamily: "'Roboto', sans-serif",
    };

    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchSearchResults = async (searchTerm) => {
        setLoading(true);

        try {
            const response = await axios.get(`http://localhost:8080/meetings/search`, { params: { course: searchTerm } });

            setSearchResults(response.data);
        } catch (error) {
            console.error("Error fetching search results:", error);
            setSearchResults([]);
        } finally {
            setLoading(false);
        }
    };

    const handleSearchButtonClick = () => {
        if (searchTerm.trim()) {
            fetchSearchResults(searchTerm);
        }
    };

    const debouncedSearch = useCallback(debounce(fetchSearchResults, 500), []);

    const handleSearchChange = (e) => {
        const { value } = e.target;
        setSearchTerm(value);
        setSearchResults([]);
    };

    const handleJoinMeeting = async (meetingId) => {
        try {
            const requester = JSON.parse(localStorage.getItem('user'));
            const userId = requester.id;

            if (userId) {
                const response = await axios.post(`http://localhost:8080/meetings/join`, null, {
                    params: {
                        userId: userId,
                        meetingId: meetingId
                    }
                });

                if (response.status)
                alert("Meeting joined!");
            }
        } catch (error) {
            if (error.response && error.response.status === 400) {
                alert(error.response.data);
            } else {
                console.error("Error joining meeting:", error);
                alert("Failed to join meeting.");
            }
        }
    };

    return (
        <div>
            <Navbar showLinks={false} />
            <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" style={{ minHeight: '80vh', paddingTop: '15vh' }}>
                <Container maxWidth="md" style={textStyle}>
                    <Typography variant="h3" component="h1" gutterBottom style={{ ...textStyle, fontWeight: 'bold', textAlign: 'center' }}>
                        Find Study Meetups
                    </Typography>

                    <TextField
                        label="Search meeups by course."
                        variant="outlined"
                        fullWidth
                        style={{ margin: "20px 0" }}
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                    <Button variant="contained" color="primary" onClick={handleSearchButtonClick}>
                        Search
                    </Button>

                    {searchResults ? (
                        searchResults.map((data, index) => (
                            <Card key={index} style={{ margin: "20px 0" }}>
                            <CardContent>
                                <Typography variant="h5" component="h2">{data.courseName}</Typography>
                                <Typography color="textSecondary">{`${data.date} | ${data.timeSlot}`}</Typography>
                                <Typography color="textSecondary">{`${data.location.name} | ${data.room}`}</Typography>
                                <Button variant="contained" color="primary" style={{marginTop: "10px"}} onClick={() => handleJoinMeeting(data.id)}>
                                    Join Study Group
                                </Button>
                            </CardContent>
                            </Card>
                        ))
                    ) : (
                        <p>Loading...</p>
                    )}
                </Container>
            </Box>
            <Box height={100} />
        </div>
    );
};

export default SearchMeetups;