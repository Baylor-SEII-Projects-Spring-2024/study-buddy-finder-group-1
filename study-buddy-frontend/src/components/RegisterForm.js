import {Button, Container, TextField, Typography, MenuItem} from "@mui/material";
import React, {useEffect, useState} from "react";
import axios from "axios";
import { useRouter } from "next/router"; //Corrected

export default function RegisterForm() {

    const router = useRouter(); // Corrected usage of useRouter()

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        userType: '',
    });
    const [isRegistered, setIsRegistered] = useState(false);

    // State for validation message for requiring all fields to be filled before registration
    const [validationMessage, setValidationMessage] = useState('');

    useEffect(() => {
        if (isRegistered) {
            router.push('/login');
        }
    }, [isRegistered, router]);

    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormData({...formData, [name]: value});

        //Resetting the validation message
        setValidationMessage('');
    };

    const handleCancel = () => {
        // Display popup message
        alert("Registration cancelled");

        // Redirect to the homepage
        router.push('/');
    };

    const handleSubmit = async (event) => {

        // Basic character validation patterns
        const namePattern = /^[A-Za-z\s'-]+$/; // Letters, spaces, apostrophes, and hyphens
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Very basic email pattern

        console.log('Here!!!!!!!!!!!!!', window.location);

        event.preventDefault();

        // Check if all fields are filled
        if (!Object.values(formData).every(field => field.trim() !== '')) {
            setValidationMessage('Please fill out all fields.'); // Set validation message
            return; // Prevent form submission
        }

        // Name validation, we need to check if names contain only valid characters
        if (!namePattern.test(formData.firstName) || !namePattern.test(formData.lastName)) {
            setValidationMessage('Names can only contain letters, apostrophes, hyphens, and spaces.');
            return; // Stop the form submission
        }

        // Email validation, we need to check if email ends with "baylor.edu" and contains valid characters
        if (!formData.email.endsWith("baylor.edu") || !emailPattern.test(formData.email)) {
            setValidationMessage('Please use a valid Baylor University email address (ends with "baylor.edu").');
            return; // Stop the form submission
        }

        try {
            const response = await axios.post("http://localhost:8080/register", {
                firstName: formData.firstName,
                lastName: formData.lastName,
                email_address: formData.email,
                password: formData.password,
                userType: formData.userType
            })
            const data = response.data;
            console.log(data);
            if (response.status === 200) {

                // Display the popup message for successful registration
                alert("Account created");
                router.push('/login');
            } else {
                console.log("Registration was successful but the status code is not 200.");
            }

        } catch (error) {
            console.log("Error: ", error);
            // Check for the specific error indicating an existing account
            if (error.response && error.response.status === 409) {
                // Set an error message indicating the account already exists
                setValidationMessage('Account already exists. Please use a different email or log in.');
            } else {
                // Handle other types of errors (e.g., network error, server error)
                setValidationMessage('An unexpected error occurred. Please try again later.');
            }
        }
    };

    return (
        <div style={{flexGrow: 1}}>
            <Container component="main" maxWidth="sm" sx={{mt: 20, mb: 4}}>
                <Typography component="h1" variant="h5" align="center" sx={{mb: 3}}>
                    Create Account
                </Typography>

                {validationMessage && (
                    <Typography color="error" align="center">
                        {validationMessage}
                    </Typography>
                )}

                <form onSubmit={handleSubmit} noValidate>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="firstName"
                        label="First Name"
                        name="firstName"
                        autoComplete="fname"
                        autoFocus
                        value={formData.firstName}
                        onChange={handleChange}
                        sx={{mb: 2}}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="lastName"
                        label="Last Name"
                        name="lastName"
                        autoComplete="lname"
                        value={formData.lastName}
                        onChange={handleChange}
                        sx={{mb: 2}}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        value={formData.email}
                        onChange={handleChange}
                        sx={{mb: 2}}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={formData.password}
                        onChange={handleChange}
                        sx={{mb: 2}}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="confirmPassword"
                        label="Confirm Password"
                        type="password"
                        id="confirm-password"
                        autoComplete="new-password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        sx={{mb: 2}}
                    />
                    <TextField
                        select
                        margin="normal"
                        required
                        fullWidth
                        name="userType"
                        label="You are a..."
                        type="option"
                        id="choose-option"
                        autoComplete="choose-option"
                        value={formData.userType}
                        onChange={handleChange}
                        sx={{mb: 2}}
                    >
                        <MenuItem value="Student">Student</MenuItem>
                        <MenuItem value="Tutor">Tutor</MenuItem>
                    </TextField>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        sx={{mt: 3, mb: 2}}
                    >
                        Register
                    </Button>

                    <Button
                        type="button"
                        fullWidth
                        variant="contained"
                        sx={{
                            mt: 3,
                            mb: 2,
                            backgroundColor: 'primary.main', // Corrected color property
                            '&:hover': {
                                backgroundColor: 'darkred', // Darker red on hover
                            },
                        }}
                        onClick={handleCancel} // Attach the handleCancel function
                    >
                        Cancel
                    </Button>

                </form>
            </Container>
        </div>
    );
}