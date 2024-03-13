import React, {useEffect, useState} from 'react';
import { Box, Container, Typography, TextField, Button, Radio, RadioGroup, FormControl, FormControlLabel, FormLabel } from '@mui/material';
import Navbar from "@/components/Navbar";
import axios from "axios";

const EditProfile = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email_address, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [userType, setUserType] = useState('student'); // Default to student

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
    };

    const handleConfirmPasswordChange = (event) => {
        setConfirmPassword(event.target.value);
    };

    const handleUserTypeChange = (event) => {
        setUserType(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        // Code to handle profile update
        const profileData = {
            firstName: firstName,
            lastName: lastName,
            email_address: email_address,
            password: password,
            userType: userType
        };

        try {
            const response = await axios.post(
                "http://localhost:8080/editProfile",
                {
                    firstName: profileData.firstName,
                    lastName: profileData.lastName,
                    email_address: profileData.email_address,
                    password: profileData.password,
                    userType: profileData.userType
                }
            );

            if (response.status === 200 && response.data.userId) {
                // Your logic here
            }
        } catch (error) {
            console.error("Error during update:", error);
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
                        <Button type="submit" variant="contained" color="primary" fullWidth>
                            Update Profile
                        </Button>
                    </form>
                </Container>
            </Box>
            <Box height={100}/>
        </div>
    );
};

export default EditProfile;