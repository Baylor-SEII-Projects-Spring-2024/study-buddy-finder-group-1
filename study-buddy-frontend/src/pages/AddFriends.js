import React, {useState, useCallback, useEffect} from 'react';
import Navbar from "@/components/Navbar";
import axios from 'axios';
import { Container, Box, TextField, Button, Card, CardContent, Typography, CircularProgress, Grid } from "@mui/material";
import { debounce } from 'lodash';

const AddFriends = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [pendingRequests, setPendingRequests] = useState([]);
    const [acceptedRequests, setAcceptedRequests] = useState([]);


    const fetchSearchResults = async (searchTerm) => {
        setLoading(true);
        try {
            const response = await axios.get(`http://localhost:8080/users/search`, { params: { name: searchTerm } });
            const requester = JSON.parse(localStorage.getItem('user'));
            const requesterId = requester.id;
            const filteredResults = response.data.filter(user => user.id !== requesterId);
            setSearchResults(filteredResults);
        } catch (error) {
            console.error("Error fetching search results:", error);
            setSearchResults([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const fetchPendingRequests = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/friendships/pending`);
                setPendingRequests(response.data);
            } catch (error) {
                console.error("Error fetching pending friend requests:", error);
            }
        };
        fetchPendingRequests();
    }, []);

    useEffect(() => {
        const fetchAcceptedRequests = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/friendships/accepted`);
                setAcceptedRequests(response.data);
            } catch (error) {
                console.error("Error fetching accepted friend requests:", error);
            }
        };
        fetchAcceptedRequests();
    }, []);

    const isAlreadyFriend = (userId) => {
        return acceptedRequests.some(request =>
            (request.requested.id === userId || request.requester.id === userId) && request.status === 'accepted'
        );
    };


    // Use useCallback to memoize the debounced version
    const debouncedSearch = useCallback(debounce(fetchSearchResults, 500), []);

    const handleSearchChange = (e) => {
        const { value } = e.target;
        setSearchTerm(value);
        if (value.trim()) {
            debouncedSearch(value);
        } else {
            setSearchResults([]);
        }
    };

    const isPendingRequest = (userId) => {
        return pendingRequests.some(request => request.requested.id === userId);
    }

    const handleSendFriendRequest = async (requestedId) => {
        try {
            const requester = JSON.parse(localStorage.getItem('user'));
            const requesterId = requester.id;
            if (requesterId) {

                const response = await axios.post(`http://localhost:8080/friendships/request`, null, {
                    params: { requesterId, requestedId }
                });

                const newPendingRequest = response.data;

                setPendingRequests(prevRequests => [...prevRequests, newPendingRequest]);
                alert("Friend request sent!");
            }
        } catch (error) {
            console.error("Error sending friend request:", error);
            alert("Failed to send friend request.");
        }
    };

    // Direct search function for search button click
    const handleSearchButtonClick = () => {
        if (searchTerm.trim()) {
            fetchSearchResults(searchTerm);
        }
    };

    return (
        <div>
            <Navbar showLinks={false}/>
            <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" style={{ minHeight: '80vh', paddingTop: '15vh' }}>
                <Container maxWidth="md">
                    <Typography variant="h3" component="h1" gutterBottom style={{ fontWeight: 'bold', textAlign: 'center' }}>
                        Search for Friends
                    </Typography>

                    <TextField
                        label="Search Users"
                        variant="outlined"
                        fullWidth
                        style={{ margin: "20px 0" }}
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                    <Button variant="contained" color="primary" onClick={handleSearchButtonClick}>
                        Search
                    </Button>

                    {loading && <CircularProgress />}
                    {searchResults.map((user) => (
                        <Card key={user.id} style={{ margin: "20px 0" }}>
                            <CardContent>
                                <Typography variant="h5" component="h2">{`${user.firstName} ${user.lastName}`}</Typography>
                                <Typography color="textSecondary">{user.email_address}</Typography>
                                {isAlreadyFriend(user.id) ? (
                                    <Typography color="textSecondary">Already friends</Typography>
                                ) : isPendingRequest(user.id) ? (
                                    <Button variant="contained" color="secondary" disabled style={{marginTop: "10px"}}>
                                        Pending
                                    </Button>
                                ) : (
                                    <Button variant="contained" color="primary" style={{marginTop: "10px"}} onClick={() => handleSendFriendRequest(user.id)}>
                                        Add Friend
                                    </Button>
                                )}
                            </CardContent>
                        </Card>
                    ))}
                </Container>
            </Box>
        </div>
    );
};

export default AddFriends;