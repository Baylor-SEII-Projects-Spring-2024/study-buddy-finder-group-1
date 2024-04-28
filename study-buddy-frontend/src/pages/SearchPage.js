import React, {useCallback, useEffect, useState} from 'react';
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
    const [joinedMeetings, setJoinedMeetings] = useState([]);

    const fetchSearchResults = async (searchTerm) => {
        const requester = JSON.parse(localStorage.getItem('user'));

        try {
            const response = await axios.get(`http://localhost:8080/meetings/search`, {
                params: {
                    courseName: searchTerm,
                    userId: requester.id
                }
            });

            setSearchResults(response.data);
            console.log(response.data);
        } catch (error) {
            console.error("Error fetching search results:", error);
            setSearchResults([]);
        }
    };


    useEffect(() => {
        const requester = JSON.parse(localStorage.getItem('user'));
        console.log("User: " + requester.id);
        const fetchJoinedMeetings = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/meetings/user/${requester.id}/upcoming`);
                setJoinedMeetings(response.data);

            } catch (error) {
                console.error("Error fetching joined meetings:", error);
            }
        };
        fetchJoinedMeetings();
    }, []);


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

    const isAlreadyJoined = (meetingId) => {
        console.log(meetingId);

        //loop over all joined meetings and if the passed one is found return true
        for (const meet of joinedMeetings) {
            console.log("Comparing: " + meet.id + " with " + meetingId);
            if (meet.id === meetingId) {
                return true
            }
        }

        return false;
    };

    const handleJoinMeeting = async (meetingId) => {
        try {
            const requester = JSON.parse(localStorage.getItem('user'));
            const userId = requester.id;

            if (userId) {
                const payload = {
                    userId: userId,
                    meetingId: meetingId
                };
                const response = await axios.post(`http://localhost:8080/meetings/join`, payload);

                if (response.status === 200) {
                    alert("Meeting joined!");
                    window.location.reload();
                }
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
                                {isAlreadyJoined(data.id) ? (
                                    <Button variant="contained" color="secondary" disabled style={{marginTop: "10px"}}>
                                        Already Joined
                                    </Button>
                                ) : (
                                    <Button variant="contained" color="primary" style={{ marginTop: "10px" }} onClick={() => handleJoinMeeting(data.id)}>
                                        Join Study Group
                                    </Button>
                                )}
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