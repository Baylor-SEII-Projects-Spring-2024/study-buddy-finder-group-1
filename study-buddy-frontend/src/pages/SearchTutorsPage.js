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
import {useRouter} from "next/router";


const axiosInstance = axios.create({
    //baseURL: 'http://localhost:8080', // Replace this with your backend server URL
    baseURL: 'http://34.125.65.178:8080', // Replace this with your backend server URL

    timeout: 5000, // Optional: Set a timeout for requests (in milliseconds)
    // Other default configuration options can be added here
});


const SearchTutorsPage = () => {
    const textStyle = {
        fontFamily: "'Roboto', sans-serif",
    };

    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [localUserId, setUserId] = useState('');
    const router = useRouter();

    const fetchSearchResults = async (searchTerm) => {
        setLoading(true);
        const requester = JSON.parse(localStorage.getItem('user'));
        setUserId(requester.id);
        console.log("User: " + requester.id);
        try {
            const response = await axiosInstance.get(`/users/searchedTutors`,{
                params: {
                    subjectName: searchTerm
                }
            });

            setSearchResults(response.data);


            console.log(response.data);
            console.log(localUserId);
        }
        catch (error) {
            console.error("Error fetching search results:", error);
            setSearchResults([]);
        }
        finally {
            setLoading(false);
        }
    };

    const handleTutorSelected = (tutorid) => {
        router.push(`/MeetupCreationPage/${tutorid}`);
    };
    const handleSearchButtonClick = () => {

        searchTerm.trim();
        fetchSearchResults(searchTerm);
    };

    const debouncedSearch = useCallback(debounce(fetchSearchResults, 500), []);

    const handleSearchChange = (e) => {
        const { value } = e.target;
        setSearchTerm(value);
        setSearchResults([]);
    };

    const handleSubjectName = (userSubjects) => {
        const searchRegex = new RegExp(searchTerm, 'i');
        const matchingSubjects = [];

        // Loop through subjects of the found user and find the subjects that match the search term
        for (const subject of userSubjects) {
            if (searchRegex.test(subject.name)) {
                matchingSubjects.push(subject.name);
            }
        }

        return matchingSubjects.length > 0 ? matchingSubjects : [searchTerm];
    };

    const handleRating = (rating) => {
        if (rating === 0) {
            return "Tutor has not yet been rated"
        }
        else {
            return rating;
        }
    }

    return (
        <div>
            <Navbar showLinks={false} />
            <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" style={{ minHeight: '80vh', paddingTop: '15vh' }}>
                <Container maxWidth="md" style={textStyle}>
                    <Typography variant="h3" component="h1" gutterBottom style={{ ...textStyle, fontWeight: 'bold', textAlign: 'center' }}>
                        Find Tutors
                    </Typography>

                    <TextField
                        label="Search tutors by subject..."
                        variant="outlined"
                        fullWidth
                        style={{ margin: "20px 0" }}
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                    <Button variant="contained" color="primary" onClick={handleSearchButtonClick}>
                        Search Tutors
                    </Button>

                    {searchResults ? (
                        searchResults.map((data, index) => (
                            <Card key={index} style={{ margin: "20px 0" }}>
                                <CardContent>
                                    <Typography variant="h5" component="h2">{data.firstName} {data.lastName}</Typography>
                                    <Typography color="textSecondary">{`Subject: ${handleSubjectName(data.courses)}`}</Typography>
                                    <Typography color="textSecondary">{`Rating: ${handleRating(data.rating)}`}</Typography>
                                    <Button variant="contained" color="primary" style={{ marginTop: "10px" }} onClick={() => handleTutorSelected(data.id)}>
                                        Create Meeting with {data.firstName} {data.lastName}
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

export default SearchTutorsPage;