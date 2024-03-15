import React, { useState, useEffect } from 'react';
import { Box, Container, Typography, Button, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import Navbar from "@/components/Navbar";
import axios from 'axios';

const AddClasses = () => {

    const [className, setClassName] = useState('');

    const [classesList, setClassesList] = useState([
        "Biology 101",
        "Introduction to Computer Science",
        "Calculus II",
        "World History",
        "Literature 101",
        "Environmental Science",
        "Psychology 101",
        "American Government",
        "Philosophy 101",
        "Art History",
        "Statistics",
        "Physics I",
        "Linear Algebra"
    ]);

    const handleClassNameChange = (event) => {
        setClassName(event.target.value);
    };

    // ------------- New way of identifying logged in user by id -------------
    useEffect(() => {
        const fetchLoginInfo = async () => {
            try {
                const user = JSON.parse(localStorage.getItem('user'));
                const userId = user.id;

                if (userId) {
                    const basePath = 'http://localhost:8080';
                    const response = await axios.get(`${basePath}/ProfilePage/${userId}`);
                    setLoginInfo(response.data);
                } else {
                    console.error('No user ID found in localStorage');
                }
            } catch (error) {
                console.error('Error fetching login info:', error);
            }
        };

        fetchLoginInfo();
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();

        //const userId = localStorage.getItem('userId'); -------------- original (BAD) --------------

        // ----------- Must do it this way for it to work -----------
        //Both below are from profile page ------ (GOOD)-----------
        const user = JSON.parse(localStorage.getItem('user'));
        const userId = user.id;
        // ----------- Must do it this way for it to work -----------

        // Construct the payload with the new course name
        const payload = {
            courseName: className, // Using the state variable that holds the course text
        };

        axios.post(`http://localhost:8080/users/${userId}/addCourse`, payload)
            .then(response => {
                console.log('Course added to user successfully');
                // Handle success
                setClassName(''); // Clear the input field upon successful submission
            })
            .catch(error => {
                console.error('There was an error:', error);
                // Handle error
            });
    };

    return (
        <div>
            <Navbar showLinks={false} />
            <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" style={{ minHeight: '80vh', paddingTop: '15vh' }}>
                <Container maxWidth="md">
                    <Typography variant="h3" component="h1" gutterBottom style={{textAlign: 'center'}}>
                        Add Class(es) or Area(s) of Study
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <FormControl fullWidth margin="normal">
                            <InputLabel>Course</InputLabel>
                            <Select
                                label="Course"
                                value={className}
                                onChange={handleClassNameChange}
                                fullWidth
                            >
                                {classesList.map((course, index) => (
                                    <MenuItem key={index} value={course}>
                                        {course}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <Button type="submit" variant="contained" color="primary" fullWidth>
                            Submit
                        </Button>
                    </form>
                </Container>
            </Box>
            <Box height={100} />
        </div>
    );
};

export default AddClasses;