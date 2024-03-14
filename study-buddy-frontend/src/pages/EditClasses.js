import React, { useState, useEffect } from 'react';
import { Box, Container, Typography, TextField, Button, Select, MenuItem } from '@mui/material';
import Navbar from "@/components/Navbar";
import axios from "axios";

const EditClasses = () => {
    const [className, setClassName] = useState('');
    const [areaOfStudy, setAreaOfStudy] = useState('');
    const [classes, setClasses] = useState([]);
    const [selectedClass, setSelectedClass] = useState('');
    const [changesSaved, setChangesSaved] = useState(false);

    // useEffect(() => {
    //     // Fetch user's classes or areas of study from the backend
    //     // Mocking data for demonstration
    //     const mockClasses = ['Linear Algebra', 'Physics', 'Biology'];
    //     setClasses(mockClasses);
    // }, []);

    useEffect(() => {
        const fetchUserCourses = async () => {
            try {
                const user = JSON.parse(localStorage.getItem('user'));
                const userId = user.id;

                if (userId) {
                    const response = await axios.get(`http://localhost:8080/users/${userId}/courses/`);
                    setClasses(response.data)
                }
            }
            catch (error) {
                console.log("Error: ", error)
            }
        }
        fetchUserCourses();
    }, []);

    const handleClassNameChange = (event) => {
        setClassName(event.target.value);
        setChangesSaved(false);
    };

    const handleAreaOfStudyChange = (event) => {
        setAreaOfStudy(event.target.value);
        setChangesSaved(false);
    };

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

        axios.delete(`http://localhost:8080/users/${userId}/deleteCourse`, payload)
            .then(response => {
                console.log('Course deleted from user successfully');
                // Handle success
                setClassName(''); // Clear the input field upon successful submission
            })
            .catch(error => {
                console.error('There was an error:', error);
                // Handle error
            });
    };

    const handleRemoveClass = () => {
        const updatedClasses = classes.filter(item => item !== selectedClass);
        setClasses(updatedClasses);
        setSelectedClass('');
        setChangesSaved(false);
    };

    const handleAddClass = () => {
        // Code to save changes to the backend
        setChangesSaved(true);
    };

    return (
        <div>
            <Navbar showLinks={false} />
            <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" style={{ minHeight: '80vh', paddingTop: '15vh' }}>
                <Container maxWidth="md">
                    <Typography variant="h3" component="h1" gutterBottom style={{ textAlign: 'center' }}>
                        Edit Class(es) or Area(s) of Study
                    </Typography>

                    <Typography variant="h5" component="h1" gutterBottom style={{ textAlign: 'center', marginTop: '40px' }}>
                        Remove a Class
                    </Typography>

                    <Select
                        value={selectedClass}
                        onChange={(event) => setSelectedClass(event.target.value)}
                        variant="outlined"
                        fullWidth
                        margin="normal"
                    >
                        {classes.map((item, index) => (
                            <MenuItem key={index} value={item}>
                                {item.name}
                            </MenuItem>
                        ))}
                    </Select>

                    <Button onClick={handleRemoveClass} variant="contained" color="primary" fullWidth disabled={!selectedClass} style={{ marginTop: '20px' }}>
                        Remove Class
                    </Button>

                    <Typography variant="h5" component="h1" gutterBottom style={{ textAlign: 'center', marginTop: '40px' }}>
                        Add a Class
                    </Typography>

                    <form onSubmit={handleAddClass}>
                        <TextField
                            label="Class Name"
                            variant="outlined"
                            value={className}
                            onChange={handleClassNameChange}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="Area of Study"
                            variant="outlined"
                            value={areaOfStudy}
                            onChange={handleAreaOfStudyChange}
                            fullWidth
                            margin="normal"
                        />
                        <Button type="submit" variant="contained" color="primary" fullWidth>
                            Add Class
                        </Button>
                    </form>

                    <Button onClick={handleSubmit} variant="contained" color="primary" fullWidth disabled={changesSaved} style={{ marginTop: '20px' }}>
                        Save Changes
                    </Button>
                </Container>
            </Box>
            <Box height={100} />
        </div>
    );
};

export default EditClasses;
