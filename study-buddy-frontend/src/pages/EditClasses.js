import React, { useState, useEffect } from 'react';
import {Box, Container, Typography, TextField, Button, Select, MenuItem, Snackbar} from '@mui/material';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import Navbar from "@/components/Navbar";
import axios from "axios";

const EditClasses = () => {
    const [className, setClassName] = useState('');
    const [areaOfStudy, setAreaOfStudy] = useState('');
    const [classes, setClasses] = useState([]);
    const [selectedClass, setSelectedClass] = useState('');
    const [changesSaved, setChangesSaved] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const [openDeleteSnackbar, setOpenDeleteSnackbar] = useState(false);
    const [snackbarType, setSnackbarType] = useState('success'); // 'success' or 'error'



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

    const handleCloseDeleteSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenDeleteSnackbar(false);
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
        const user = JSON.parse(localStorage.getItem('user'));
        const userId = user.id;
        const courseId = selectedClass.id;
        console.log(courseId);

        axios.delete(`http://localhost:8080/users/${userId}/courses/${courseId}`)
            .then(response => {
                console.log('Course deleted from user successfully');
                setClassName('');
            })
            .catch(error => {
                console.error('There was an error:', error);
            });
    };

    const handleClickOpen = () => {
        setOpenDialog(true);
    };

    const handleClose = () => {
        setOpenDialog(false);
    };

    const handleAddClass = () => {
        // Code to save changes to the backend
        setChangesSaved(true);
    };

    const handleConfirmRemoveClass = () => {
        const user = JSON.parse(localStorage.getItem('user'));
        const userId = user.id;
        const courseId = selectedClass.id;

        axios.delete(`http://localhost:8080/users/${userId}/courses/${courseId}`)
            .then(response => {
                console.log('Course deleted from user successfully');
                const updatedClasses = classes.filter(item => item.id !== courseId);
                setClasses(updatedClasses);
                setSelectedClass('');
                handleClose();
                setSnackbarType('success');
                setOpenDeleteSnackbar(true);
            })
            .catch(error => {
                console.error('There was an error:', error);
                setSnackbarType('error');
                setOpenDeleteSnackbar(true);
            });
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

                    <Button onClick={handleClickOpen} variant="contained" color="primary" fullWidth disabled={!selectedClass} style={{ marginTop: '20px' }}>
                        Remove Class
                    </Button>
                </Container>
            </Box>
            <Box height={100} />
            <Dialog
                open={openDialog}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Remove Class"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure you want to remove this class?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleConfirmRemoveClass} autoFocus>
                        Yes, remove it
                    </Button>
                </DialogActions>
            </Dialog>
            <Snackbar
                open={openDeleteSnackbar}
                autoHideDuration={6000}
                onClose={handleCloseDeleteSnackbar}
                message={snackbarType === 'success' ? "Course removed successfully!" : "Error removing course"}
                ContentProps={{
                    style: {
                        backgroundColor: snackbarType === 'success' ? 'green' : 'red',
                    },
                }}
            />
        </div>
    );
};

export default EditClasses;
