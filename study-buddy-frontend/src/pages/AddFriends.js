import React, { useState, useCallback } from 'react';
import Navbar from "@/components/Navbar";
import axios from 'axios';
import { Box, TextField, Button, Card, CardContent, Typography, CircularProgress, Grid } from "@mui/material";
import { debounce } from 'lodash';

const AddFriends = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchSearchResults = async (searchTerm) => {
        setLoading(true);
        try {
            const response = await axios.get(`http://localhost:8080/users/search`, { params: { name: searchTerm } });
            setSearchResults(response.data);
        } catch (error) {
            console.error("Error fetching search results:", error);
            setSearchResults([]);
        } finally {
            setLoading(false);
        }
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

    const handleSendFriendRequest = async (requestedId) => {

        try {
            const requester = JSON.parse(localStorage.getItem('user'));
            const requesterId = requester.id;
            if (requesterId) {
                await axios.post(`http://localhost:8080/friendships/request`, null, {
                    params: { requesterId, requestedId }
                });
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
            <Box sx={{ pt: '8rem', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', marginTop: 0 }}>
                <Grid container spacing={2} alignItems="center" justifyContent="center">
                    <Grid item xs={8}>
                        <TextField
                            label="Search Users"
                            variant="outlined"
                            value={searchTerm}
                            onChange={handleSearchChange}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <Button variant="contained" color="primary" onClick={handleSearchButtonClick} disabled={loading}>
                            Search
                        </Button>
                    </Grid>
                </Grid>
                {loading && <CircularProgress />}
                {searchResults.map((user) => (
                    <Card key={user.id} sx={{ minWidth: 275, mb: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <CardContent>
                            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                {user.firstName} {user.lastName}
                            </Typography>
                            <Typography variant="body2">
                                {user.email_address}
                            </Typography>
                        </CardContent>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => handleSendFriendRequest(user.id)}
                            sx={{ m: 1 }}
                        >
                            Add Friend
                        </Button>
                    </Card>
                ))}
            </Box>
        </div>
    );
};

export default AddFriends;
