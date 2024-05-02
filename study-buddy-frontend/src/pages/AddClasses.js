import React, { useState, useEffect } from 'react';
import { Box, Container, Typography, Button, Select, MenuItem, FormControl, InputLabel, Snackbar } from '@mui/material';
import Navbar from "@/components/Navbar";
import axios from 'axios';

const axiosInstance = axios.create({
    //baseURL: 'http://localhost:8080', // Replace this with backend server URL
    baseURL: 'http://34.125.60.1:8080', // Replace this with backend server URL
    timeout: 5000, //Set a timeout for requests (in milliseconds)
});

const AddClasses = () => {

    const [className, setClassName] = useState('');
    const [classesList, setClassesList] = useState([])
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [userClasses, setUserClasses] = useState([]);
    const [snackbarType, setSnackbarType] = useState('success');

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await axiosInstance.get(`/courses`)
                setClassesList(response.data);
            }
            catch (error) {
                console.log("No courses found", error);
            }
        };
        fetchCourses();
    }, []);

    const handleClassNameChange = (event) => {
        setClassName(event.target.value);
    };

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackbar(false);
    };

    useEffect(() => {
        const fetchLoginInfo = async () => {
            try {
                const user = JSON.parse(localStorage.getItem('user'));
                const userId = user.id;

                if (userId) {
                    const basePath = 'http://localhost:8080';
                    const response = await axiosInstance.get(`/ProfilePage/${userId}`);
                    const userClassesResponse = await axiosInstance.get(`/users/${userId}/courses/`);
                    setUserClasses(userClassesResponse.data);
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

        const alreadyEnrolled = userClasses.some(course => course.id === className.id);
        if (alreadyEnrolled) {
            setOpenSnackbar(true);
            setSnackbarType('error');
            setSnackbarMessage('You have already added this class!');
            return;
        }

        const user = JSON.parse(localStorage.getItem('user'));
        const userId = user.id;

        // Construct the payload with the new course name
        const payload = {
            courseName: className.name, // Using the state variable that holds the course text
        };

        axiosInstance.post(`/users/${userId}/addCourse`, payload)
            .then(response => {
                console.log('Course added to user successfully');
                setClassName('');
                setSnackbarMessage('Course added successfully!');
                setSnackbarType('success');
                setOpenSnackbar(true);
            })
            .catch(error => {
                console.error('There was an error:', error.response.data);
                setOpenSnackbar(true);
                setSnackbarMessage(error.response.data);
                setSnackbarType('error');
            });
    };

    return (
        <div>
            <Navbar showLinks={false} />
            <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" style={{ minHeight: '80vh', paddingTop: '15vh' }}>
                <Container maxWidth="md">
                    <Typography variant="h3" component="h1" gutterBottom style={{textAlign: 'center'}}>
                        Add a Class
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
                                        {course.name}
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
            <Snackbar
                open={openSnackbar}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                message={snackbarMessage}
                ContentProps={{
                    style: {
                        backgroundColor: snackbarType === 'success' ? 'green' : 'red',
                    },
                }}
            />
        </div>
    );
};

export default AddClasses;