import React, {useEffect, useState} from 'react';
import {
    Box,
    Container,
    Typography,
    TextField,
    Button,
    Radio,
    RadioGroup,
    FormControl,
    FormControlLabel,
    FormLabel,
    Alert, ListItem, ListItemIcon, ListItemText, List
} from '@mui/material';
import Navbar from "@/components/Navbar";
import axios from "axios";
//import {router} from "next/client";
import {useRouter} from "next/router";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

const EditProfile = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email_address, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [userType, setUserType] = useState('student'); // Default to student
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [passwordCriteria, setPasswordCriteria] = useState({
        minLength: false,
    });

    //redirect if no one is logged in
    const router = useRouter();

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user) {
            // If no user is logged in, redirect to the login page
            router.push('/login');
        }
    }, [router]);
    //autofill the existing values for the current user
    useEffect(() => {
        async function fetchUserData() {
            const user = JSON.parse(localStorage.getItem('user'));
            if (user && user.id) {
                try {
                    const response = await axios.get(`http://localhost:8080/users/${user.id}`);
                    setFirstName(response.data.firstName || '');
                    setLastName(response.data.lastName || '');
                    setEmail(response.data.email || '');
                    setUserType(response.data.userType || 'student');
                } catch (error) {
                    console.error('Failed to fetch user data:', error);
                }
            }
        }

        fetchUserData();

    }, []);

    const handleFirstNameChange = (event) => {
        setFirstName(event.target.value);
    };

    const handleLastNameChange = (event) => {
        setLastName(event.target.value);
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
        updatePasswordCriteria(event.target.value);
    };

    const updatePasswordCriteria = (password) => {
        setPasswordCriteria({
            minLength: password.length >= 5
        });
    };

    const handleConfirmPasswordChange = (event) => {
        setConfirmPassword(event.target.value);
    };

    const handleUserTypeChange = (event) => {
        setUserType(event.target.value);
    };

    const deleteAccount = async (e) => {
        e.preventDefault();

        const user = JSON.parse(localStorage.getItem('user'));
        const userId = user.id;

        const confirmDelete = window.confirm('Are you sure you want to delete your account? This action cannot be undone.');

        if (!confirmDelete) {
            return; //if user cancels the confirmation, exit the function
        }

        try {
            const response = await axios.delete(`http://localhost:8080/delete/${userId}`);

            //log them out
            localStorage.setItem('isLoggedIn', 'false');

            //redirect to /home
            window.location.href = '/home';

        } catch (error) {
            console.error('Error deleting account:', error);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (password.length < 5) {
            setErrorMessage('Passwords must be 5 characters in length.');
            return;
        }

        if (password !== confirmPassword) {
            setErrorMessage('Passwords do not match.');
            return;
        }

        const user = JSON.parse(localStorage.getItem('user'));
        const userId = user.id; // Make sure this is the correct way to obtain the userId

        const profileData = {
            firstName: firstName,
            lastName: lastName,
            email_address: email_address, // Make sure to include the email
            password: password,
            userType: userType
        };

        console.log(profileData);

        try {
            const response = await axios.put(
                `http://localhost:8080/editProfile/${userId}`, // Corrected endpoint URL
                profileData
            );

            console.log("HERE");
            if (response.status === 200) {
                setSuccessMessage('User profile updated successfully!');
                // Consider resetting form fields here if needed
            }
        } catch (error) {
            console.error("Error during update:", error);
            setErrorMessage(error.response.data); // Display server-provided error message if available
        }
    };

    return (
        <div>
            <Navbar showLinks={false}/>

            <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center"
                 style={{minHeight: '80vh', paddingTop: '15vh'}}>
                <Container maxWidth="md">
                    <Typography variant="h3" component="h1" gutterBottom style={{textAlign: 'center'}}>
                        Edit Profile
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            label="First Name"
                            variant="outlined"
                            value={firstName}
                            onChange={handleFirstNameChange}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="Last Name"
                            variant="outlined"
                            value={lastName}
                            onChange={handleLastNameChange}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="Email"
                            variant="outlined"
                            value={email_address}
                            onChange={handleEmailChange}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="Password"
                            variant="outlined"
                            type="password"
                            value={password}
                            onChange={handlePasswordChange}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="Confirm Password"
                            variant="outlined"
                            type="password"
                            value={confirmPassword}
                            onChange={handleConfirmPasswordChange}
                            fullWidth
                            margin="normal"
                        />
                        <List sx={{ mb: 2 }}>
                            <ListItem>
                                <ListItemIcon>
                                    {passwordCriteria.minLength ? <CheckCircleOutlineIcon color="success" /> : <HighlightOffIcon color="error" />}
                                </ListItemIcon>
                                <ListItemText primary="At least 5 characters" />
                            </ListItem>
                        </List>
                        <FormControl component="fieldset" margin="normal">
                            <FormLabel component="legend">User Type</FormLabel>
                            <RadioGroup
                                aria-label="userType"
                                name="userType"
                                value={userType}
                                onChange={handleUserTypeChange}
                                row
                            >
                                <FormControlLabel value="student" control={<Radio/>} label="Student"/>
                                <FormControlLabel value="tutor" control={<Radio/>} label="Tutor"/>
                            </RadioGroup>
                        </FormControl>
                        {errorMessage && (
                            <Alert severity="error" style={{ marginBottom: '20px' }}>
                                {errorMessage}
                            </Alert>
                        )}
                        {successMessage && (
                            <Alert severity="success" style={{ marginBottom: '20px' }}>
                                {successMessage}
                            </Alert>
                        )}
                        <Button type="submit" variant="contained" color="primary" fullWidth>
                            Update Profile
                        </Button>

                        <Button type="button" variant="contained" color="primary" onClick={deleteAccount} fullWidth>
                            Delete Profile
                        </Button>
                    </form>
                </Container>
            </Box>
            <Box height={100}/>
        </div>
    );
};

export default EditProfile;